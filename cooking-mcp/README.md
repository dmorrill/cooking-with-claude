# Cooking MCP Server

An intelligent cooking management system exposed as an MCP (Model Context Protocol) server. This server provides tools for recipe search, inventory management, and AI-powered meal planning based on available ingredients.

## Features

- **Recipe Management**: Search and retrieve recipes from organized markdown files
- **Inventory Tracking**: Check ingredients across multiple storage locations
- **Inventory Updates**: Add, update, or remove items from inventory directly
- **Expiration Monitoring**: Find items expiring soon to reduce waste
- **Meal Suggestions**: Get recipe suggestions based on available inventory
- **Ingredient Matching**: Check which ingredients you have/need for specific recipes

## Available Tools

### Recipe Tools

#### 1. `search_recipes`
Search for recipes by name, ingredients, category, or prep time.

**Parameters:**
- `query` (optional): Search term for recipe name or ingredients
- `max_prep_time` (optional): Maximum preparation time in minutes
- `category` (optional): Filter by category (appetizers, mains, sides, soups, sauces-condiments, desserts, breads-rolls, cocktails)

**Example:**
```json
{
  "query": "pasta",
  "max_prep_time": 30,
  "category": "mains"
}
```

#### 2. `get_recipe`
Get the full details of a specific recipe.

**Parameters:**
- `recipe_name` (required): Name of the recipe to retrieve

**Example:**
```json
{
  "recipe_name": "Cacio e Pepe"
}
```

### Inventory Tools (Read)

#### 3. `check_inventory`
Check what ingredients are available in your inventory.

**Parameters:**
- `location` (optional): Specific location (upstairs, downstairs, basement, or all)
- `ingredient` (optional): Search for a specific ingredient

**Example:**
```json
{
  "location": "upstairs",
  "ingredient": "cheese"
}
```

#### 4. `find_expiring_items`
Find items that are expiring soon.

**Parameters:**
- `days` (optional, default: 7): Number of days to look ahead

**Example:**
```json
{
  "days": 14
}
```

### Meal Planning Tools

#### 5. `suggest_meals`
Get meal suggestions based on available inventory and constraints.

**Parameters:**
- `max_prep_time` (optional): Maximum preparation time in minutes
- `use_expiring` (optional, default: true): Prioritize items expiring soon
- `category` (optional): Preferred meal category

**Example:**
```json
{
  "max_prep_time": 45,
  "use_expiring": true,
  "category": "mains"
}
```

#### 6. `check_recipe_ingredients`
Check which ingredients are available or missing for a specific recipe.

**Parameters:**
- `recipe_name` (required): Name of the recipe to check

**Example:**
```json
{
  "recipe_name": "Mushroom Lasagna"
}
```

### Inventory Tools (Write)

#### 7. `update_inventory_item`
Update an existing item in your inventory (quantity, expiration, notes).

**Parameters:**
- `location` (required): Location (upstairs, downstairs, or basement)
- `storage` (required): Storage type (pantry, refrigerator, freezer, etc.)
- `item_name` (required): Name of the item to update
- `updates` (required): Object with updates to apply
  - `quantity` (optional): New quantity
  - `expiration` (optional): New expiration date (MM/DD format)
  - `notes` (optional): New notes

**Example:**
```json
{
  "location": "upstairs",
  "storage": "refrigerator",
  "item_name": "Milk",
  "updates": {
    "quantity": "1/2 gallon",
    "expiration": "01/15"
  }
}
```

#### 8. `add_inventory_item`
Add a new item to your inventory.

**Parameters:**
- `location` (required): Location (upstairs, downstairs, or basement)
- `storage` (required): Storage type (pantry, refrigerator, freezer, etc.)
- `name` (required): Name of the item
- `quantity` (optional): Quantity
- `expiration` (optional): Expiration date (MM/DD format)
- `notes` (optional): Notes about the item
- `category` (optional): Category for organizing (e.g., Dairy, Produce)

**Example:**
```json
{
  "location": "upstairs",
  "storage": "pantry",
  "name": "Pasta - Bucatini",
  "quantity": "1 lb",
  "notes": "De Cecco brand",
  "category": "Pasta"
}
```

#### 9. `remove_inventory_item`
Remove an item from your inventory.

**Parameters:**
- `location` (required): Location (upstairs, downstairs, or basement)
- `storage` (required): Storage type (pantry, refrigerator, freezer, etc.)
- `item_name` (required): Name of the item to remove

**Example:**
```json
{
  "location": "upstairs",
  "storage": "refrigerator",
  "item_name": "Old Yogurt"
}
```

## Installation

### 1. Install Dependencies

```bash
cd cooking-mcp
npm install
```

### 2. Configure in Claude Desktop

Add this server to your Claude Desktop configuration file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "cooking-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/your/cooking-with-claude/cooking-mcp/src/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/your/cooking-with-claude` with the actual path where you cloned this repository.

For example:
- **macOS**: `/Users/yourname/Documents/cooking-with-claude`
- **Windows**: `C:\\Users\\yourname\\Documents\\cooking-with-claude`

Note: The MCP will automatically detect the cooking repository location (parent directory of cooking-mcp). If you have a custom structure, you can override with the COOKING_REPO_PATH environment variable.

### 3. Restart Claude Desktop

After updating the configuration, restart Claude Desktop to load the MCP server.

## Testing the Server

You can test the server using the MCP Inspector:

```bash
# Install the inspector if you haven't already
npm install -g @modelcontextprotocol/inspector

# Run the inspector from the cooking-mcp directory
cd cooking-mcp
npx @modelcontextprotocol/inspector node src/index.js
```

This will open a web interface where you can test all the tools interactively.

## Directory Structure

The server expects the following structure in your cooking repository:

```
cooking/
├── recipes/
│   ├── appetizers/
│   ├── mains/
│   ├── sides/
│   ├── soups/
│   ├── sauces-condiments/
│   ├── desserts/
│   ├── breads-rolls/
│   └── cocktails/
├── inventory/
│   ├── upstairs/
│   │   ├── pantry.md
│   │   ├── refrigerator.md
│   │   └── freezer.md
│   ├── downstairs/
│   │   ├── pantry.md
│   │   ├── refrigerator.md
│   │   └── freezer.md
│   └── basement/
│       └── food-storage.md
└── cooking-mcp/
    └── (this MCP server)
```

## Recipe Format

Recipes should be in markdown format with the following structure:

```markdown
# Recipe Name
- **Prep Time**: X minutes
- **Cook Time**: Y minutes
- **Total Time**: Z minutes
- **Difficulty**: Easy/Medium/Hard

### Ingredients
- [ ] **Ingredient Name** (quantity) - *Location: storage location*
- [ ] **Another Ingredient** (amount) - *Location: where to find*

### Instructions
1. Step one
2. Step two
```

## Inventory Format

Inventory files should use markdown tables:

```markdown
# Location - Storage Type

## Category Name

| Item | Quantity | Expiration | Notes |
|------|----------|------------|-------|
| Milk | 1 gallon | 12/31 | Whole milk |
| Eggs | 1 dozen | 1/15 | Free range |
```

## Development

To modify or extend the server:

1. Edit the source files in `src/`
2. Test changes with the inspector
3. Restart Claude Desktop to load the updated server

### Adding New Tools

To add a new tool:

1. Add the tool definition in `index.js` under `ListToolsRequestSchema`
2. Add the tool handler in `index.js` under `CallToolRequestSchema`
3. Implement any supporting logic in the appropriate manager class

## Troubleshooting

### Server not appearing in Claude

1. Check that the path in `claude_desktop_config.json` is correct
2. Ensure Node.js is installed and accessible
3. Check Claude Desktop logs for errors
4. Try running the server manually to see error messages:
   ```bash
   node /path/to/cooking-mcp/src/index.js
   ```

### Tools not working as expected

1. Use the MCP Inspector to test tools individually
2. Check that your recipe and inventory files follow the expected format
3. Verify file paths and permissions

## Future Enhancements

Potential features to add:

- [ ] Add/update inventory items
- [ ] Create new recipes
- [ ] Generate shopping lists
- [ ] Meal planning calendar integration
- [ ] Nutritional information tracking
- [ ] Recipe scaling for different serving sizes
- [ ] Photo attachment support
- [ ] Restaurant recipe recreation suggestions

## License

MIT

## Author

Elle Morrill