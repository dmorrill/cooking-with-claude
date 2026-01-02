# Version 2.1.0 - MCP Integration
Released: January 1, 2026

## 🎯 Release Overview
Natural language cooking management through Claude Desktop using MCP (Model Context Protocol) server integration.

## ✨ New Features

### MCP Server Integration
- **9 new tools** for natural language interaction:
  - `search_recipes` - Find recipes by name, ingredients, or prep time
  - `get_recipe` - Retrieve full recipe details
  - `check_inventory` - Query ingredients across all locations
  - `find_expiring_items` - Track items expiring soon
  - `suggest_meals` - AI-powered meal suggestions based on inventory
  - `check_recipe_ingredients` - See what's available/missing for recipes
  - `update_inventory_item` - Update quantities, expiration dates, notes
  - `add_inventory_item` - Add new items to inventory
  - `remove_inventory_item` - Remove items from inventory

### Automatic Path Detection
- MCP server automatically detects repository location
- Zero configuration required for standard installations
- Environment variable override available for custom structures

### Inventory Management Improvements
- Direct inventory updates through natural language
- Automatic "Last Updated" timestamp management
- Validation of location/storage combinations
- Maintains markdown table formatting

## 🔧 Technical Changes
- Added Node.js MCP server implementation
- Integrated @modelcontextprotocol/sdk
- File system operations preserve markdown structure
- Fuzzy matching for ingredient searches
- Expiration date parsing and tracking

## 📚 Documentation
- Complete MCP setup guide in main README
- Detailed tool documentation in cooking-mcp/README.md
- Platform-specific configuration instructions
- Example queries and use cases

## 🐛 Bug Fixes
- N/A (new feature release)

## 💔 Breaking Changes
- None - fully backward compatible

## 🔄 Migration Guide
No migration needed. To enable MCP features:
1. `cd cooking-mcp && npm install`
2. Add to Claude Desktop config
3. Restart Claude Desktop

## 📊 Impact Metrics
- **Setup time**: 2 minutes
- **Tools available**: 9
- **Lines of code**: ~1,400
- **Dependencies added**: 1 (@modelcontextprotocol/sdk)

## 🙏 Contributors
- Elle Morrill (@dmorrill)
- Claude (AI pair programmer)

## 📝 Release Notes
- [Full Release Announcement](RELEASE-NOTES.md)
- [Social Media Posts](SOCIAL-MEDIA.md)