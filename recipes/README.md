# Recipes

A collection of recipes organized by category. Each recipe is a separate markdown file that Claude can read, search, and help you cook from.

> **Note:** These aren't placeholder recipes. Every recipe in this collection has been cooked, tested, and refined through collaboration with Claude. They include real-world learnings like altitude adjustments for Denver (5,280 ft), technique notes from multiple authoritative sources, and practical tips discovered through actual cooking. Use them as examples of what your own recipe collection can become!

## Adding New Recipes

### From a PDF or Image
If you have a recipe as a PDF, screenshot, or photo, just paste it into Claude Code:

```
"Add this recipe to my collection"
[paste or drag the PDF/image]
```

Claude will:
1. Read the recipe from the image or PDF
2. Convert it to the standard markdown format
3. Save it in the appropriate category folder
4. Add any notes about altitude adjustments, substitutions, or techniques

### From a URL
If you have a recipe URL:

```
"Add this recipe to my collection: [URL]"
```

### From Memory
Just describe the recipe:

```
"I want to add my mom's pasta recipe - it uses..."
```

### From a Cookbook
Take a photo of the page or describe it:

```
"Add this recipe from [cookbook name]"
[paste photo]
```

### Finding New Recipes with Web Research

Want to make something but need to find a good recipe? Claude can help you research and find credible sources:

```
"I want to make Parker House rolls - can you find the most credible
recipe sources and compare their techniques?"
```

Claude will:
1. Search for recipes from trusted sources (NYT Cooking, King Arthur Baking, Serious Eats, America's Test Kitchen, etc.)
2. Compare techniques across multiple sources
3. Identify what makes each approach unique
4. Help you choose the best method for your needs
5. Create a recipe adapted to your preferences (altitude, equipment, serving size)

**Example prompts for recipe research:**

- *"Find the best sourdough bread recipe - compare King Arthur vs Tartine methods"*
- *"I want to make authentic Pad Thai - what are the most authoritative sources?"*
- *"Research croissant techniques - what do serious bakers recommend?"*
- *"Find a thanksgiving turkey recipe that's highly rated and well-tested"*

**Pro tip:** Ask Claude to note why certain techniques matter. Understanding the "why" behind a recipe makes you a better cook!

---

## Recipe Index

### Mains
| Recipe | Time | Description |
|--------|------|-------------|
| [Cacio e Pepe](mains/cacio-e-pepe.md) | 15 min | Classic Roman pasta with cheese and pepper |
| [Green Linguine](mains/green-linguine.md) | 35 min | Silky pasta with kale, arugula, miso & edamame |
| [Grilled Cheese with Roasted Tomatoes](mains/grilled-cheese.md) | 25 min | Two premium cheddars with roasted heirloom tomatoes |
| [SF Giants Crazy Crab Sandwich](mains/crazy-crab-sandwich.md) | 75 min | Dungeness crab with garlic-grilled sourdough |
| [Quick Altitude Pizza Dough](mains/pizza-dough.md) | 45-60 min | Fast-rise semolina pizza dough |
| [Miso-Gochujang Tofu Sheet Pan](mains/miso-gochujang-tofu.md) | 30 min | Easy weeknight vegan meal |

### Soups
| Recipe | Time | Description |
|--------|------|-------------|
| [Coconut Butternut Squash Soup](soups/coconut-butternut-squash.md) | 2 hrs | Creamy vegan soup with curry and coconut milk |
| [Creamy Leek & White Bean Soup](soups/leek-white-bean.md) | 75 min | Double wine reduction, slow-caramelized leeks |

### Salads
| Recipe | Time | Description |
|--------|------|-------------|
| [Green Romesco Couscous Salad](salads/green-romesco-salad.md) | 50 min | Herb-based romesco with roasted vegetables |

### Sides
| Recipe | Time | Description |
|--------|------|-------------|
| [Roasted Butternut Squash](sides/roasted-butternut-squash.md) | 40 min | Simple roasted cubes with olive oil and spices |
| [Steaming Guide (Altitude)](sides/steaming-guide.md) | - | Reference for steaming vegetables at altitude |

### Breads
| Recipe | Time | Description |
|--------|------|-------------|
| [Parker House Rolls](breads/parker-house-rolls.md) | 3 hrs | Classic buttery folded rolls (small batch) |
| [Pumpkin Parker House Rolls](breads/pumpkin-parker-house-rolls.md) | 3 hrs | Autumn twist with pumpkin puree |
| [Sweet Potato Pull-Apart Rolls](breads/sweet-potato-rolls.md) | 4 hrs | Soft, buttery rolls with sweet potato |

### Condiments & Sauces
| Recipe | Time | Description |
|--------|------|-------------|
| [Red Pepper Miso Paste](condiments/red-pepper-miso-paste.md) | 75 min | Deeply caramelized, umami-rich condiment |
| [Green Chili Bean Sauce](condiments/green-chili-bean-sauce.md) | 40 min | Batch-freezer condiment |
| [Harissa Cashew Cream](condiments/harissa-cashew-cream.md) | 20 min | Velvety sauce with Middle Eastern spices |
| [Peking-Style Plum Sauce](condiments/plum-sauce.md) | overnight + 1 hr | For smoked duck |

### Desserts
| Recipe | Time | Description |
|--------|------|-------------|
| [Basque Pumpkin Cheesecake](desserts/basque-pumpkin-cheesecake.md) | 4 hrs | Burnt-top seasonal cheesecake, no crust |

### Cocktails
| Recipe | Time | Description |
|--------|------|-------------|
| [Autumn Pear Royale](cocktails/autumn-pear-royale.md) | 5 min | Elegant fall cocktail with pear brandy & Sauternes |

---

## Recipe Format

All recipes follow a consistent format:

```markdown
# Recipe Name

Brief description.

**Prep Time:** X min | **Cook Time:** X min | **Servings:** X

## Ingredients

| Item | Amount |
|------|--------|
| Ingredient | Amount |

## Instructions

1. Step one
2. Step two

## Notes

- Tips and variations
- Storage instructions
```

---

## Cooking with Claude

Once you have recipes in this folder, you can ask Claude things like:

- *"What can I make for dinner in 30 minutes?"*
- *"I have chicken thighs thawing - what recipes use those?"*
- *"Help me scale the Parker House rolls recipe to 12 rolls"*
- *"What's a good side dish to go with the crab sandwich?"*
- *"Walk me through making the pizza dough step by step"*

Claude will read the recipe files and help you cook!

---

## Meal Planning Projects

For big cooking projects like holidays, Claude can help you plan the entire event. See the [examples/](../examples/) folder for inspiration.

### Example: Thanksgiving Planning

Give Claude a list of recipes and ask for a complete cooking plan:

```
"I'm making these 7 dishes for Thanksgiving dinner at 5pm:
- Spicy Mushroom Lasagne
- Green Bean Casserole
- Sweet Potatoes with Miso-Ginger Sauce
- Apple Fennel Slaw
- Pumpkin Parker House Rolls
- Lemon Labneh Cake
- Pineapple Sage Martinis

Create a 4-day prep schedule with a shopping list and day-of timeline."
```

Claude will:
1. **Create a shopping list** - consolidated ingredients with amounts
2. **Build a prep schedule** - what to make each day leading up to the event
3. **Design a day-of timeline** - hour-by-hour cooking schedule
4. **Optimize for efficiency** - what can be made ahead, what's best fresh
5. **Account for constraints** - oven scheduling, serving temperatures, resting times

See [examples/thanksgiving-2025/](../examples/thanksgiving-2025/) for a complete example of this workflow.
