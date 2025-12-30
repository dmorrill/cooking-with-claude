# Cooking with Claude v2: From Chaos to Categories

*December 29, 2025*

A month ago, I open-sourced [Cooking with Claude](https://github.com/dmorrill/cooking-with-claude), a system for using AI to manage recipes, inventory, and meal planning. Since then, I've been dogfooding it daily, and the system has evolved dramatically based on real-world usage. Today, I'm excited to share version 2.0, which includes a complete structural overhaul and powerful new collaborative features.

## The Problem with Monolithic Recipe Files

Version 1.0 stored all recipes in a single 168KB markdown file called `recipe-database.md`. This seemed logical at first—everything in one place! But as I used the system daily, the problems became clear:

- **Scrolling fatigue**: Finding a specific recipe meant endless scrolling or searching
- **Git conflicts**: Multiple edits to different recipes created merge conflicts
- **Token inefficiency**: Claude had to read the entire file just to find one recipe
- **Sharing difficulty**: Sending someone a recipe meant copy-pasting from a huge file
- **Poor discoverability**: Hard to browse recipes by category

## The Great Recipe Liberation of 2025

On December 29, I finally tackled the reorganization I'd been putting off. Using Claude Code (naturally), I extracted 45 recipes from the monolithic database into individual files organized by category:

```
recipes/
├── appetizers/
│   └── beet-goat-cheese-phyllo-tartlets.md
├── breads-rolls/
│   ├── elles-quick-altitude-pizza-dough.md
│   ├── parker-house-rolls-small-batch.md
│   └── yorkshire-puddings-small-batch.md
├── cocktails/
│   └── autumn-pear-royale-martini-style.md
├── desserts/
│   ├── high-fiber-coffee-cardamom-brownies.md
│   └── molasses-ginger-cookies.md
├── mains/
│   ├── cacio-e-pepe-single-serving.md
│   └── mushroom-enhanced-soyrizo.md
├── sauces-condiments/
│   └── pan-cooked-red-pepper-miso-paste.md
├── sides/
│   └── restaurant-style-mexican-rice.md
└── soups/
    └── white-bean-stew-with-winter-vegetables.md
```

Each recipe now has a human-readable filename. No more searching through a massive file to find "that pasta recipe"—it's right there: `cacio-e-pepe-single-serving.md`.

## Beyond Structure: New Collaborative Workflows

The structural improvements were just the beginning. Real-world cooking revealed gaps in the original workflows, especially around cooking with others. Version 2.0 introduces two new collaborative modes:

### Prep-and-Assemble Mode

This workflow emerged from a pattern in my household: one person (me) likes to prep ingredients methodically, while another prefers to jump straight into cooking. The new workflow divides labor intelligently:

1. **Container Organization**: Ingredients grouped by when they're used
2. **Precise Prep Instructions**: "Cut 1 cucumber into matchsticks (1/4" x 1/4" x 4" strips)"
3. **Review Events**: Cook gets a 5-minute preview event to familiarize with the recipe
4. **Assembly Station Setup**: Equipment and ingredients arranged by order of use

### Team Cooking Mode

Sometimes you want to cook together as equals. The new team mode structures collaborative cooking into three phases:

- **GATHER** (5 min): Collect all ingredients and equipment
- **PREP** (varies): All preparation work with time estimates
- **BRINGING IT ALL TOGETHER**: Final cooking and assembly

Each phase has checkboxes for tracking progress, making it easy to divide tasks or work together.

## Proactive AI Behaviors

One of the most delightful improvements is Claude's new proactive behaviors. Instead of waiting for explicit commands, Claude now offers helpful actions contextually:

- **Calendar Integration**: "Would you like me to put this cooking timeline on your calendar?"
- **Shopping Lists**: After identifying missing ingredients, "Should I generate a shopping list?"
- **Recipe Saving**: After cooking something new, "Should I save this as a new recipe?"
- **Inventory Updates**: Post-cooking, "Want me to update the inventory for items used?"

These small touches transform Claude from a passive assistant into an active cooking partner.

## Make-Ahead Components: The Secret to Weeknight Cooking

Version 2.0 introduces a make-ahead components system inspired by restaurant prep kitchens. The idea is simple: batch-cook versatile components on Sunday that can be mixed and matched throughout the week.

```markdown
### Chimichurri
- Roasted vegetables
- Grilled proteins
- Grain bowls
- Roasted potatoes

### Pickled Mushrooms
- Salads
- Grain bowls
- Charcuterie boards
- Snacking
```

Each component includes storage guidelines, pairing suggestions, and integration with the meal planning system. It's the difference between "what's for dinner?" panic and "let me combine these ready components."

## Technical Improvements for Developers

If you're building your own Claude-powered systems, here are some technical insights:

### Token Efficiency
Reading individual 2-3KB recipe files instead of a 168KB database reduces token usage by ~98% for single recipe lookups. This matters when you're making dozens of queries daily.

### Git-Friendly Structure
Individual files mean changes to different recipes never conflict. Multiple people can add recipes simultaneously without merge issues.

### Extraction Script
The Python script that performed the reorganization (`scripts/extract_recipes.py`) uses regex patterns to identify recipe boundaries and smart categorization logic:

```python
def categorize_recipe(name, content):
    """Determine which category folder a recipe belongs in."""
    name_lower = name.lower()

    if 'cocktail' in name_lower or 'martini' in name_lower:
        return 'cocktails'
    elif any(word in name_lower for word in ['brownie', 'cookie', 'cheesecake']):
        return 'desserts'
    elif any(word in name_lower for word in ['roll', 'bread', 'dough']):
        return 'breads-rolls'
    # ... more categories
    else:
        return 'mains'  # sensible default
```

## Lessons Learned

### Start Modular, Not Monolithic
It's tempting to put everything in one file initially, but resist! Starting with a modular structure saves painful refactoring later.

### Real Usage Reveals Real Needs
The collaborative cooking workflows emerged only after repeatedly experiencing friction while cooking with my partner. Dogfooding your own tools is irreplaceable.

### Proactive > Reactive
The best AI assistants anticipate needs. Building in proactive behaviors makes the difference between a tool and a true assistant.

### Structure Enables Features
The new file structure didn't just solve existing problems—it enabled new features like category browsing, recipe sharing, and efficient meal matching that weren't practical before.

## What's Next

Version 2.0 sets the foundation for exciting future features:

- **Nutritional tracking** per recipe with daily/weekly summaries
- **Cost analysis** to optimize grocery spending
- **Seasonal planning** that suggests recipes based on what's fresh
- **Recipe scaling** to adjust serving sizes dynamically
- **Community recipes** where users can share their own creations

## Try It Yourself

Cooking with Claude v2.0 is available now at [github.com/dmorrill/cooking-with-claude](https://github.com/dmorrill/cooking-with-claude). The repository includes:

- Complete setup instructions
- All 45+ recipes in the new structure
- Templates for every workflow
- The extraction script for migrating your own recipes
- Comprehensive documentation with examples

Whether you're a solo cook looking to organize your kitchen or part of a household trying to coordinate meals, version 2.0 has workflows that adapt to your style.

## The Joy of Cooking with AI

What started as an experiment in AI-assisted cooking has become an essential part of my daily routine. Claude doesn't just store recipes—it understands cooking patterns, suggests meals based on what's expiring, and even helps coordinate cooking with others.

The real magic isn't in any single feature, but in how they work together. When Claude notices you're planning a dinner party, suggests recipes that use your expiring ingredients, helps you prep efficiently, creates calendar events for your cooking timeline, and then saves successful new dishes to your recipe collection—that's when it stops feeling like software and starts feeling like a sous chef who really gets you.

Happy cooking! 🧑‍🍳

---

*Want to follow my cooking and coding adventures? I share updates about Cooking with Claude and other projects on [GitHub](https://github.com/dmorrill) and write about the intersection of AI and daily life here on the blog.*

*Have questions or suggestions for Cooking with Claude? Open an issue on [GitHub](https://github.com/dmorrill/cooking-with-claude/issues) or reach out—I love hearing how others are using AI to transform their cooking.*