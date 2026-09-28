# Version 3.0.0
Released: 2026-09-28

Syncs the private working repo into the public template for the first time since v2.1.0 (2026-01-01). Also covers the February 2026 sync, which updated the README for v3 but was never released.

## Added
- `CLAUDE.md` → **Your Altitude (STANDING DEFAULT)**: elevation set once; rules for boiling, pressure cooking, baking, candy/frying, and roasting
- `CLAUDE.md` → **Nutritional Philosophy**: read `nutritional-philosophy.md` before meal planning if it exists
- `CLAUDE.md` workflows: Weekly Meal Plan, Interactive Meal Planning Session, Household Weekly Meal Plan Card, Grocery Receipt Processing (with expiration table), Leftovers
- `CLAUDE.md` proactive behaviors: nutritional alignment, feeding window, ritual drinks (non-alcoholic first), olive oil freshness, event prep packets, recipe iteration logs
- `CLAUDE.md` → **Wrapping Up a Session**: "okay to close?" opens a PR to `main`
- `templates/event-prep-packet.md`
- `templates/recipe-iteration-log.md`
- `templates/household-weekly-meal-plan.md`
- `templates/nutritional-philosophy-template.md`
- `meal-plan.md` (current-week table in the format the MCP server parses)
- `recipes/techniques/` with `cooking-beans-at-altitude.md`
- 10 recipes: `appetizers/silky-hummus`, `appetizers/christmas-lima-dip`, `mains/lemon-clam-bucatini`, `mains/mirin-miso-gochujang-tofu`, `mains/braised-goat-leg-steaks`, `desserts/rainier-cherry-pie`, `soups/french-onion-soup`, `soups/tomato-strawberry-gazpacho`, `sauces-condiments/basil-pesto`, `sauces-condiments/refrigerator-dill-pickles`
- MCP tools: `get_meal_plan`, `set_meal`, `clear_meal`, `suggest_leftover_uses`

## Changed
- `CLAUDE.md`: the old "High Altitude Cooking Adjustments" section is replaced by the standing default
- `cooking-mcp/src/meal-planner.js`: meal-plan read/write and leftover suggestions; `MealPlanner` now takes the repo path
- `cooking-mcp/src/index.js`: registers the new tools; keeps auto-detection of the repo path (`COOKING_REPO_PATH` still overrides)
- `cooking-mcp/README.md`: documents tools 10–13
- `recipes/breads-rolls/pumpkin-parker-house-rolls.md`: altitude section, proofing and preheat steps
- `recipes/mains/miso-gochujang-tofu.md`: tested crispiness fixes and variations
- `README.md`, `templates/README.md`, `recipes/README.md`: new files, counts (75 recipes)

## Fixed
- `recipes/README.md` linked to pre-rename filenames; all 81 links now resolve

## Included from the unreleased February 2026 sync
- Folder structure aligned with upstream; new `breakfast/` category
- 5 soups, 7 plant-forward mains, 3 hearty mains, 6 desserts, 3 breads, 4 sauces and condiments, kale chips
- `recipes/meal-matcher.md`, `recipes/meal-planning-helper.md`
- `templates/weekly-meal-plan-template.md`, `restaurant-review-template.md`, updated prep-and-assemble workflow
- `pantry-staples-checklist.md`, `meal-planning-preferences.md`

## Breaking changes
None. The MCP server's existing tools are unchanged.

## Migration
Pull, set or delete the altitude section in `CLAUDE.md`, and run `npm install` in `cooking-mcp/` if you use the server.
