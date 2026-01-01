#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { RecipeManager } from './recipes.js';
import { InventoryManager } from './inventory.js';
import { MealPlanner } from './meal-planner.js';

// Initialize managers with the cooking repo path
// Default to the parent directory of where the MCP server is installed
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaultPath = join(__dirname, '..', '..');

const COOKING_REPO_PATH = process.env.COOKING_REPO_PATH || defaultPath;
const recipeManager = new RecipeManager(COOKING_REPO_PATH);
const inventoryManager = new InventoryManager(COOKING_REPO_PATH);
const mealPlanner = new MealPlanner(recipeManager, inventoryManager);

// Create the MCP server
const server = new Server(
  {
    name: 'cooking-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_recipes',
        description: 'Search for recipes by name, ingredients, category, or prep time',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (recipe name, ingredient, or category)',
            },
            max_prep_time: {
              type: 'number',
              description: 'Maximum prep time in minutes (optional)',
            },
            category: {
              type: 'string',
              description: 'Recipe category: appetizers, mains, sides, soups, sauces-condiments, desserts, breads-rolls, cocktails (optional)',
            },
          },
        },
      },
      {
        name: 'get_recipe',
        description: 'Get the full details of a specific recipe',
        inputSchema: {
          type: 'object',
          properties: {
            recipe_name: {
              type: 'string',
              description: 'Name of the recipe to retrieve',
            },
          },
          required: ['recipe_name'],
        },
      },
      {
        name: 'check_inventory',
        description: 'Check what ingredients are available in inventory',
        inputSchema: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'Specific location to check: upstairs, downstairs, basement, or all (default: all)',
            },
            ingredient: {
              type: 'string',
              description: 'Specific ingredient to search for (optional)',
            },
          },
        },
      },
      {
        name: 'find_expiring_items',
        description: 'Find items that are expiring soon',
        inputSchema: {
          type: 'object',
          properties: {
            days: {
              type: 'number',
              description: 'Number of days to look ahead (default: 7)',
            },
          },
        },
      },
      {
        name: 'suggest_meals',
        description: 'Suggest meals based on available inventory and constraints',
        inputSchema: {
          type: 'object',
          properties: {
            max_prep_time: {
              type: 'number',
              description: 'Maximum prep time in minutes (optional)',
            },
            use_expiring: {
              type: 'boolean',
              description: 'Prioritize items expiring soon (default: true)',
            },
            category: {
              type: 'string',
              description: 'Preferred meal category (optional)',
            },
          },
        },
      },
      {
        name: 'check_recipe_ingredients',
        description: 'Check which ingredients are available/missing for a specific recipe',
        inputSchema: {
          type: 'object',
          properties: {
            recipe_name: {
              type: 'string',
              description: 'Name of the recipe to check',
            },
          },
          required: ['recipe_name'],
        },
      },
      {
        name: 'update_inventory_item',
        description: 'Update an existing item in inventory (quantity, expiration, notes)',
        inputSchema: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'Location: upstairs, downstairs, or basement',
            },
            storage: {
              type: 'string',
              description: 'Storage type: pantry, refrigerator, freezer, etc.',
            },
            item_name: {
              type: 'string',
              description: 'Name of the item to update',
            },
            updates: {
              type: 'object',
              description: 'Updates to apply',
              properties: {
                quantity: {
                  type: 'string',
                  description: 'New quantity (optional)',
                },
                expiration: {
                  type: 'string',
                  description: 'New expiration date MM/DD format (optional)',
                },
                notes: {
                  type: 'string',
                  description: 'New notes (optional)',
                },
              },
            },
          },
          required: ['location', 'storage', 'item_name', 'updates'],
        },
      },
      {
        name: 'add_inventory_item',
        description: 'Add a new item to inventory',
        inputSchema: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'Location: upstairs, downstairs, or basement',
            },
            storage: {
              type: 'string',
              description: 'Storage type: pantry, refrigerator, freezer, etc.',
            },
            name: {
              type: 'string',
              description: 'Name of the item',
            },
            quantity: {
              type: 'string',
              description: 'Quantity (optional)',
            },
            expiration: {
              type: 'string',
              description: 'Expiration date MM/DD format (optional)',
            },
            notes: {
              type: 'string',
              description: 'Notes about the item (optional)',
            },
            category: {
              type: 'string',
              description: 'Category for organizing (e.g., Dairy, Produce, etc.) (optional)',
            },
          },
          required: ['location', 'storage', 'name'],
        },
      },
      {
        name: 'remove_inventory_item',
        description: 'Remove an item from inventory',
        inputSchema: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'Location: upstairs, downstairs, or basement',
            },
            storage: {
              type: 'string',
              description: 'Storage type: pantry, refrigerator, freezer, etc.',
            },
            item_name: {
              type: 'string',
              description: 'Name of the item to remove',
            },
          },
          required: ['location', 'storage', 'item_name'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'search_recipes': {
        const results = await recipeManager.searchRecipes(
          args.query,
          args.max_prep_time,
          args.category
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      case 'get_recipe': {
        const recipe = await recipeManager.getRecipe(args.recipe_name);
        return {
          content: [
            {
              type: 'text',
              text: recipe || `Recipe "${args.recipe_name}" not found`,
            },
          ],
        };
      }

      case 'check_inventory': {
        const inventory = await inventoryManager.checkInventory(
          args.location || 'all',
          args.ingredient
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(inventory, null, 2),
            },
          ],
        };
      }

      case 'find_expiring_items': {
        const expiring = await inventoryManager.findExpiringItems(
          args.days || 7
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(expiring, null, 2),
            },
          ],
        };
      }

      case 'suggest_meals': {
        const suggestions = await mealPlanner.suggestMeals(
          args.max_prep_time,
          args.use_expiring !== false,
          args.category
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(suggestions, null, 2),
            },
          ],
        };
      }

      case 'check_recipe_ingredients': {
        const availability = await mealPlanner.checkRecipeIngredients(
          args.recipe_name
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(availability, null, 2),
            },
          ],
        };
      }

      case 'update_inventory_item': {
        const result = await inventoryManager.updateInventoryItem(
          args.location,
          args.storage,
          args.item_name,
          args.updates
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'add_inventory_item': {
        const result = await inventoryManager.addInventoryItem(
          args.location,
          args.storage,
          {
            name: args.name,
            quantity: args.quantity,
            expiration: args.expiration,
            notes: args.notes,
            category: args.category
          }
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'remove_inventory_item': {
        const result = await inventoryManager.removeInventoryItem(
          args.location,
          args.storage,
          args.item_name
        );
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Cooking MCP server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});