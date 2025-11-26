# Cooking with Claude

A template for managing recipes, meal planning, and cooking projects with Claude Code. Start simple with recipes, or go deep with inventory tracking and automated shopping lists.

> **Real recipes inside!** This isn't empty scaffolding. Browse 20+ tested recipes, a complete Thanksgiving meal plan, and templates I actually use. Fork it and make it yours.

## What's Inside

| Folder | What You'll Find |
|--------|------------------|
| [**recipes/**](recipes/) | 20+ tested recipes organized by category (mains, soups, breads, etc.) with a guide for adding your own |
| [**examples/thanksgiving-2025/**](examples/thanksgiving-2025/) | Complete holiday meal plan: 7 dishes, 4-day prep schedule, hour-by-hour cooking timeline |
| [**templates/**](templates/) | Workflows for collaborative cooking, recipe formatting, and shopping lists |
| [**inventory/**](inventory/) | Track what's in your kitchen (optional - enables "what can I make?" suggestions) |

**Quick links:**
- [Browse all recipes](recipes/README.md)
- [See the Thanksgiving example](examples/thanksgiving-2025/README.md)
- [Explore the templates](templates/README.md)

---

## Requirements

This project uses **[Claude Code](https://docs.anthropic.com/en/docs/claude-code)**, Anthropic's command-line tool for Claude. Claude Code can read and edit files on your computer, which is what makes this cooking system work - it reads your inventory files to suggest meals you can actually make.

**You'll need:**
- A Claude Pro, Max, or Team subscription ($20+/month)
- macOS or Linux (Windows via WSL)
- Node.js 18+

## Setup

### 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 2. Clone this repository

```bash
git clone https://github.com/dmorrill/cooking-with-claude.git
cd cooking-with-claude
```

### 3. Launch Claude Code

```bash
claude
```

That's it! Claude will automatically read the `CLAUDE.md` file in this directory and understand how to help you with meal planning.

### 4. Start using it

Once Claude Code is running, try:
```
"What can I cook in 30 minutes with what I have?"
```

Claude will read your inventory files and suggest meals based on what's actually in your kitchen.

## Quick Start

**Tonight's Dinner in 3 Steps:**
1. Ask: *"What can I cook in 30 minutes with what I have?"*
2. Get AI suggestions with exact ingredient locations
3. Cook with confidence - no missing ingredients, no food waste

## Core Features

### Smart Meal Matching
- AI suggests meals based on your actual inventory
- Filters by prep time, dietary needs, and available ingredients
- Shows exact storage locations for each ingredient

### Complete Recipe System
- Time-organized recipe database (15min, 30min, 45min+)
- Standardized templates for consistent formatting
- Family favorites and emergency 5-ingredient meals

### Inventory Intelligence
- Multi-location tracking (customize to your home layout)
- Expiration monitoring with usage prioritization
- Auto-generated shopping lists from meal plans

## File Structure

```
cooking-with-claude/
├── recipes/
│   ├── README.md               # Recipe index + how to add recipes
│   ├── mains/                  # Main dishes (pasta, sandwiches, etc.)
│   ├── soups/                  # Soups
│   ├── salads/                 # Salads
│   ├── sides/                  # Side dishes
│   ├── breads/                 # Breads and rolls
│   ├── condiments/             # Sauces and condiments
│   ├── desserts/               # Desserts
│   └── cocktails/              # Drinks
├── examples/
│   └── thanksgiving-2025/      # Complete meal planning example
├── templates/
│   ├── README.md               # How to use the templates
│   ├── recipe-template.md      # Standard recipe format
│   ├── prep-and-assemble-workflow.md  # Collaborative cooking
│   └── shopping-list-template.md      # Shopping list format
├── inventory/                  # Optional: track what's in your kitchen
│   ├── master-inventory.md
│   └── [location folders]/     # Customize to your home layout
└── CLAUDE.md                   # AI assistant configuration
```

## AI-Powered Workflows

### Meal Planning Commands
```
"What dinner recipes can I make in 30 minutes or less using only ingredients I have?"
"Plan 5 dinners for this week using mostly what I have on hand"
"What meals can I make using items expiring in the next 3 days?"
"What's the quickest meal I can make right now with zero shopping?"
```

### Inventory Management
```
"Check all my inventory and suggest 3 dinner options under 30 minutes"
"Generate a shopping list for next week's meal plan"
"What ingredients are expiring soon that I should use first?"
"Update my downstairs pantry inventory"
```

## Weekly Workflow

1. **Sunday Planning**: Review inventory, plan week's meals
2. **Shopping**: Auto-generated lists from meal plans
3. **Daily Cooking**: AI suggests meals based on time available
4. **Inventory Updates**: Track usage and expiration dates

## Cooking Modes

### Prep-and-Assemble Mode
**Best for:** Teaching new recipes, collaborative cooking, reducing cooking anxiety

**How it works:**
- **Person A's role**: All prep work (chopping, measuring, making sauces, setting up station)
- **Person B's role**: Cooking and assembly (following clear step-by-step instructions)

**What Claude Code does:**
1. Creates detailed task list with recipe and ingredient locations
2. Divides tasks into prep work and cooking steps
3. Guides prep with exact measurements and cutting techniques
4. Organizes ingredients into numbered containers
5. Creates calendar invitations with comprehensive cooking instructions

**Perfect recipes for this mode:**
- Cold noodle salads
- Stir-fries
- Buddha bowls
- Tacos and burrito bowls
- Grain salads

**Command:** *"Let's get organized to prep ingredients for [meal] tonight"*

See `templates/prep-and-assemble-workflow.md` for full workflow details.

## Why This System Works

- **No Food Waste**: Use what you have before it expires
- **Save Time**: Stop wondering "what's for dinner?"
- **Save Money**: Shop with purpose, avoid duplicate purchases
- **Less Stress**: Always know you can make something good

## Getting Started (After Setup)

### Path 1: Just Use the Recipes (Simple)
1. **Browse recipes**: Check out [recipes/README.md](recipes/README.md) for the full index
2. **Cook something**: Ask Claude *"Walk me through making the cacio e pepe step by step"*
3. **Add your own**: Paste a recipe PDF or describe a dish you want to add
4. **Plan a meal**: See the [Thanksgiving example](examples/thanksgiving-2025/) for complex meal planning

### Path 2: Full System with Inventory (Advanced)
1. **Populate your inventory**: Tell Claude *"Help me fill out my kitchen pantry inventory"*
2. **Customize locations**: Adjust inventory folders to match your home layout
3. **Get AI suggestions**: *"What can I cook in 30 minutes with what I have?"*
4. **Keep it updated**: Tell Claude when you buy groceries or use things up

## Customization

This template is designed to be customized to your home:

- **Rename inventory folders**: Change `upstairs/downstairs` to match your layout
- **Add/remove storage locations**: Not everyone has a basement or chest freezer
- **Adjust recipe categories**: Organize by cuisine, dietary restrictions, or whatever works for you

---

*Built for use with [Claude Code](https://docs.anthropic.com/en/docs/claude-code) - see CLAUDE.md for AI assistant configuration*
