# Cooking with Claude v3.0.0

Version 3 brings over ten months of changes from the private repo I cook from every week. Most of them came out of a specific meal or problem.

## Set your altitude once

`CLAUDE.md` now has a **Your Altitude** section. Put in your elevation and Claude adjusts every cooking instruction for it without being asked, with a short note when a number differs from the recipe:

- Boiling and simmering (beans, grains, pasta): 15–30% longer; cook to texture, not the clock
- Pressure cooking: about 5% more time per 1,000 ft above 2,000 ft
- Leavened baking: less leavening, a little more liquid, oven 15–25°F hotter
- Candy and frying: about 2°F lower per 1,000 ft
- Roasting and searing: unchanged

Delete the section if you're near sea level. There's also a new guide, [`recipes/techniques/cooking-beans-at-altitude.md`](../../recipes/techniques/cooking-beans-at-altitude.md).

## New templates

- **[Event prep packet](../../templates/event-prep-packet.md):** turns a menu for a big meal into something you can run: which appliance does what, a countdown from days out, a cook-day timeline with the unattended blocks marked, and an on-hand vs. buy list.
- **[Recipe iteration log](../../templates/recipe-iteration-log.md):** for a recipe that takes several attempts. The target in the taster's words, a log of each attempt, what to change next, and a note on keeping each test honest.
- **[Household weekly meal plan](../../templates/household-weekly-meal-plan.md):** a Sunday-night card with the week's meals tagged 🍳 home / 🥡 delivery / 🍽️ out, with reservations pulled from your calendar. Claude drafts the email; you send it.
- **[Nutritional philosophy](../../templates/nutritional-philosophy-template.md):** write down why you eat the way you do. Claude reads it before planning meals.

## More workflows in `CLAUDE.md`

- Weekly meal plan in a new [`meal-plan.md`](../../meal-plan.md)
- Interactive meal planning, with the calendar as the source of truth
- Grocery receipt processing with expiration estimates by category
- Leftovers, sorted by what freezes well
- Olive oil tracked by harvest date and open date
- "Okay to close?" opens a pull request instead of leaving work on a branch

## MCP server

Four new tools for Claude Desktop:

- `get_meal_plan`, `set_meal`, `clear_meal`: read and edit `meal-plan.md` ("put tacos on Wednesday")
- `suggest_leftover_uses`: sorts leftovers by freezability and suggests what to make, including a freezer-burrito guide

## Recipes

75 recipes, up from 45 in v2.

**New in this release:** silky hummus, Christmas lima bean dip, lemon clam bucatini, mirin-miso-gochujang roasted tofu, braised goat leg steaks, Rainier cherry pie (untested), French onion soup, tomato-strawberry gazpacho, basil pesto by weight, refrigerator dill pickles.

**Updated:** pumpkin Parker House rolls (altitude section, proofing steps) and miso-gochujang tofu (crispiness fixes, variations).

**Shipped in February, never announced:** a breakfast category (Eleven Madison Park granola), 5 soups, 10 mains, 6 desserts, 3 breads, 4 sauces, kale chips, the meal matcher and meal planning helper, a pantry staples checklist, and a meal planning preferences template.

The recipe index also had broken links left over from the file renames. All 81 links now resolve.

## Upgrading

If you forked earlier:
1. Pull, or copy over `CLAUDE.md`, `templates/`, `meal-plan.md`, and `cooking-mcp/src/`
2. Put your elevation in `CLAUDE.md` → **Your Altitude**, or delete the section
3. If you use the MCP server, run `npm install` in `cooking-mcp/` and restart Claude Desktop

Full details: [CHANGELOG.md](CHANGELOG.md)
