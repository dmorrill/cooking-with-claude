# Cooking with Claude

An intelligent cooking workflow that combines recipe management, meal planning, and real-time inventory tracking. Make better food decisions with AI-powered meal suggestions based on what you actually have at home.

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
│   ├── recipe-database.md      # Recipe collection & templates
│   ├── meal-matcher.md         # AI meal suggestion engine
│   └── meal-planning-helper.md # Weekly planning workflows
├── inventory/
│   ├── master-inventory.md     # Central dashboard
│   ├── upstairs/               # Upper level storage (customize)
│   │   ├── pantry.md
│   │   ├── refrigerator.md
│   │   └── freezer.md
│   ├── downstairs/             # Main kitchen storage (customize)
│   │   ├── pantry.md
│   │   ├── refrigerator.md
│   │   └── freezer.md
│   └── basement/               # Long-term storage (optional)
│       └── food-storage.md
├── templates/
│   ├── recipe-template.md
│   └── prep-and-assemble-workflow.md
└── shopping-list.md            # Smart shopping lists
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

## Getting Started

1. **Customize Inventory Structure**: Adjust folders to match your home (kitchen, garage, basement, etc.)
2. **Update Inventory**: Fill out your current food storage locations
3. **Add Recipes**: Use templates in `recipes/recipe-database.md`
4. **Start Asking**: Try the AI meal matching commands above
5. **Iterate**: Update inventory as you cook and shop

## Customization

This template is designed to be customized to your home:

- **Rename inventory folders**: Change `upstairs/downstairs` to match your layout
- **Add/remove storage locations**: Not everyone has a basement or chest freezer
- **Adjust recipe categories**: Organize by cuisine, dietary restrictions, or whatever works for you

---

*Built for use with [Claude Code](https://claude.ai/claude-code) - see CLAUDE.md for AI assistant configuration*
