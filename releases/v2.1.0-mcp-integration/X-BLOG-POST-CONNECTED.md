# Adding MCP to cooking-with-claude: A Technical Walkthrough

*Published on X.com - January 1, 2026*

---

A few days ago, [I posted about reorganizing cooking-with-claude](https://x.com/DanielleMorrill/status/2006003493098734028) - splitting recipes into individual files, improving workflows. Today I added MCP (Model Context Protocol) support, which lets you interact with the cooking system using natural language in Claude Desktop.

## What I Built

I asked Claude Code to create an MCP server for the cooking repository. In about 30 minutes, it generated a working Node.js server with 9 tools:

**Recipe Tools:**
- `search_recipes` - Find recipes by name, ingredients, or prep time
- `get_recipe` - Retrieve full recipe details
- `suggest_meals` - Get meal suggestions based on inventory and time constraints
- `check_recipe_ingredients` - See what you have/need for a recipe

**Inventory Tools:**
- `check_inventory` - Query ingredients across all storage locations
- `find_expiring_items` - List items expiring within specified days
- `update_inventory_item` - Update quantities, expiration dates, notes
- `add_inventory_item` - Add new items to inventory
- `remove_inventory_item` - Remove items from inventory

## How It Works

The MCP server reads and writes to the same markdown files that the cooking system uses:

```
cooking-with-claude/
├── recipes/
│   ├── mains/
│   ├── sides/
│   └── ...
├── inventory/
│   ├── upstairs/
│   ├── downstairs/
│   └── basement/
└── cooking-mcp/
    └── src/
        ├── index.js        # MCP server
        ├── recipes.js      # Recipe manager
        └── inventory.js    # Inventory manager
```

The server uses the `@modelcontextprotocol/sdk` package and auto-detects the repository location, so it works with any fork without configuration changes.

## Installation Process

For anyone using the cooking-with-claude repo:

1. Clone the repository
2. Install the MCP server:
   ```bash
   cd cooking-mcp
   npm install
   ```

3. Add to Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "cooking-mcp": {
         "command": "node",
         "args": ["/path/to/cooking-with-claude/cooking-mcp/src/index.js"]
       }
     }
   }
   ```

4. Restart Claude Desktop

## Practical Examples

Instead of editing markdown files, you can now have conversations like:

**Finding meals:**
- "What can I cook in 30 minutes with what I have?"
- "Show me recipes that use bell peppers"
- "What's expiring in the next 3 days?"

**Managing inventory:**
- "Add 2 pounds of chicken to the downstairs freezer"
- "Update milk in upstairs fridge - expires January 15"
- "Remove the used garlic from downstairs pantry"

**Meal planning:**
- "Suggest three dinners for this week using what's in the fridge"
- "Do I have everything for the pasta carbonara recipe?"

## Technical Details

The implementation is straightforward:
- ~1,400 lines of JavaScript across 3 files
- Preserves markdown table formatting when updating inventory
- Handles relative paths for recipe cross-references
- Fuzzy matching for ingredient searches
- Date parsing for expiration tracking

The code is all in the repository if you want to extend it or adapt it for other use cases.

## Results So Far

Since adding MCP support:
- Inventory updates are much faster (speaking vs typing/formatting)
- I actually maintain the inventory now because there's no friction
- Finding recipes based on what's available is instant
- Discovered items I'd forgotten about by asking "what expires soon?"

## Next Steps

The current implementation covers the basics. Some ideas for expansion:
- Shopping list generation from meal plans
- Nutrition tracking
- Recipe scaling
- Photo attachments for recipes
- Integration with grocery delivery APIs

The repository is open source: [cooking-with-claude](https://github.com/dmorrill/cooking-with-claude)

If you're already using cooking-with-claude, the MCP addition is backward compatible - your existing files work as-is. If you're new to it, Claude can help you set up the whole system.

---

*Context: I've been building cooking-with-claude to manage ADHD-related kitchen chaos. Version 1 was basic templates. Version 2 reorganized everything into individual files. Version 2.1 adds natural language interaction through MCP.*

---

**Links:**
- 🔗 GitHub: [cooking-with-claude](https://github.com/dmorrill/cooking-with-claude)
- 🔗 Previous improvements: [December 28 thread](https://x.com/DanielleMorrill/status/2006003493098734028)
- 🔗 MCP documentation: [modelcontextprotocol.io](https://modelcontextprotocol.io)

#MCP #ClaudeDesktop #OpenSource #CookingWithClaude #BuildInPublic