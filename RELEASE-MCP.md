# 🎉 New Release: MCP Server for Claude Desktop - Natural Language Cooking Management!

**tl;dr:** You can now talk to Claude Desktop naturally about your cooking! "What can I make with what's in my fridge?" "Add milk to the shopping list." "What's expiring soon?" It just works. ✨

## What's New

I'm excited to share a major upgrade to cooking-with-claude: **full MCP (Model Context Protocol) integration** for Claude Desktop users!

This means you can now manage your entire cooking system through natural conversation - no more editing markdown files by hand (unless you want to).

### 🗣️ Just Ask Claude

Instead of manually editing inventory files:
- ❌ Old way: Open `inventory/upstairs/refrigerator.md`, find the table, edit the row...
- ✅ New way: "Add 2 pounds of chicken to the downstairs freezer"

Instead of searching through recipes:
- ❌ Old way: Browse folders, open files, check prep times...
- ✅ New way: "What pasta dishes can I make in 30 minutes?"

### 🚀 What You Can Do Now

**Recipe Management:**
- "Search for recipes with mushrooms"
- "Show me all desserts I can make"
- "What's the recipe for cacio e pepe?"

**Inventory Tracking:**
- "Check what's in my upstairs pantry"
- "Add eggs to the fridge, expires 1/15"
- "Remove the old yogurt from downstairs fridge"
- "Update milk quantity to half gallon"

**Meal Planning:**
- "What can I make with what I have?"
- "Suggest meals using items expiring soon"
- "What ingredients am I missing for lasagna?"
- "Find recipes I can make in 20 minutes"

## Setup Takes 2 Minutes

1. **Clone the repo** (if you haven't already):
```bash
git clone https://github.com/dmorrill/cooking-with-claude.git
cd cooking-with-claude
```

2. **Install the MCP server**:
```bash
cd cooking-mcp
npm install
```

3. **Add to Claude Desktop config** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
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

4. **Restart Claude Desktop and start cooking!**

## Why This Matters

The friction of maintaining a cooking system often kills it. You cook something great, but you're tired, and updating three markdown files feels like work. So the system slowly goes stale.

With MCP, updating is as easy as telling Claude what you did:
- "I used up the chicken and half the rice"
- "Add the leftover soup to the fridge, good for 3 days"
- "We're out of olive oil"

The system maintains itself through natural conversation.

## Real Examples From My Kitchen

This week alone, using the MCP server:
- Found 3 meals I could make without shopping (saved $40 and reduced waste)
- Discovered forgotten items in the basement freezer before they got freezer burn
- Planned meals that used up everything expiring before my weekend trip
- Added grocery items as I noticed them running low - just by talking

## The Magic: It's Still Just Markdown

Everything is still stored as readable markdown files. You can:
- Version control your recipes and inventory
- Edit files directly when you prefer
- Share recipes with friends (they're just .md files!)
- Keep everything local and private

The MCP server is just a friendly interface on top - not a database you're locked into.

## What's Next?

I'm working on:
- Meal plan templates (weekly planning made easy)
- Shopping list generation from meal plans
- Nutrition tracking
- Recipe scaling ("make this for 8 people")

But I need your help! If this is useful to you:

### ⭐ Star the repo to help us reach 100 stars by January 31st!

Stars help others discover the project. We're at [current count]/100 - every star counts!

### 💬 Share your cooking wins

Made something great? Saved money with meal planning? Share it! Tag #cookingwithclaude

### 🐛 Report issues or request features

The best features come from real use. What would make this more useful for you?

## Try It Today

The hardest part of any cooking system is starting. But with cooking-with-claude + MCP:
1. Fork the repo (or clone it)
2. Add a few items to your inventory
3. Ask Claude "What can I make?"
4. Cook something delicious

That's it. The system grows naturally from there.

**Repo:** https://github.com/dmorrill/cooking-with-claude

**Remember:** If you find this useful, please star the repo! Let's build the best AI-powered cooking system together. 🌟

---

*P.S. - This started as a personal tool for managing my ADHD kitchen chaos. Two months later, it's helped me cook 50+ new recipes, reduce food waste by 70%, and actually enjoy meal planning. If it helps even one other person stress less about cooking, it's worth sharing.*

*P.P.S. - Yes, Claude helped write these release notes. We're eating our own dog food here... or should I say, cooking our own recipes? 🍳*