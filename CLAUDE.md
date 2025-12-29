# Claude Code Configuration - Cooking System

## Project Overview
Intelligent cooking management system that combines recipe database, meal planning, and real-time inventory tracking with AI-powered meal suggestions.

## Core System Architecture

### 1. Recipe Management (`recipes/`)
- **README.md**: Recipe index with links to all recipes by category
- **Individual recipe files**: Organized in category folders (appetizers/, mains/, sides/, soups/, sauces-condiments/, desserts/, breads-rolls/, cocktails/)
- **meal-matcher.md**: AI-powered meal suggestion engine
- **meal-planning-helper.md**: Weekly planning workflows and templates

### 2. Inventory System (`inventory/`)
- **Multi-location tracking**: Customize folders to match your home layout (examples: upstairs/, downstairs/, basement/)
- **Smart categorization**: By storage type and expiration dates
- **Integration points**: Links to recipe suggestions and shopping lists

### 3. AI Integration Points
- **Meal matching**: Cross-reference recipes with current inventory
- **Time-based filtering**: Suggest meals by available prep time
- **Expiration prioritization**: Use items before they spoil
- **Shopping optimization**: Generate lists from meal plans

## Calendar Management

### Using a Cooking Calendar
**RECOMMENDED**: Create a dedicated calendar for cooking-related events:
- Meal prep sessions
- Recipe cooking times
- Food-related reminders (defrosting, soaking, marinating)
- Dinner plans and cooking events
- Shopping reminders for specific meals

**Calendar Command Pattern** (if using gcalcli):
```bash
# Always specify your cooking calendar explicitly
gcalcli --calendar "[your-cooking-calendar]" add ...
gcalcli --calendar "[your-cooking-calendar]" agenda ...
```

## Proactive Behaviors

Claude should proactively offer these things without being asked:

### Calendar Integration for Cooking Plans
**When to offer:** Whenever a cooking timeline or prep plan is created with specific times.

**What to offer:**
1. **Put the timeline on the calendar** - Convert the plan into calendar events with all details in the description
2. **Separate events for solo vs. together tasks** - If some tasks are done alone (e.g., preheating oven, starting a dish) and others are done together, create separate events
3. **Invite cooking partners** - For shared cooking activities, offer to invite relevant people to the events

**Example prompt from Claude:**
> "Would you like me to put this timeline on the calendar? I can create:
> - A solo event for you at [time] for [solo tasks]
> - A shared event at [time] for [together tasks] with [partner]"

**Calendar event best practices:**
- Include full timeline in description
- Add relevant details (temperatures, techniques, tips)
- Set 5-minute reminders for cooking events
- Use emoji in titles for easy scanning (🍝, 🎄, 🦀, etc.)

### Other Proactive Offers
- **Shopping list**: After identifying missing ingredients, offer to generate a shopping list
- **Recipe database**: After successfully cooking something new, offer to save it as a new recipe file in the appropriate category
- **Inventory updates**: After cooking, offer to update inventory for items used
- **Food rescue**: When a trip is detected within 3 days, suggest the food rescue workflow (see Going Out of Town section)

## Key Workflows

### Meal Planning Assistant
**Primary Command Pattern:**
```
"What can I cook [TIME_CONSTRAINT] using [INVENTORY_CONSTRAINT]?"
```

**Workflow:**
1. Parse time constraint (15min, 30min, tonight, etc.)
2. Check ALL inventory locations using Read tool
3. Match against recipe database
4. Provide suggestions with ingredient locations
5. Note any missing ingredients

**Example:**
```
User: "What can I cook for dinner in 30 minutes without shopping?"

Claude Response Format:
- Read all inventory files (check ALL locations: upstairs/, downstairs/, basement/)
- Filter recipes by ≤30min prep time
- Match available ingredients
- Suggest 2-3 options with format:

**Option 1: Pasta with Garlic Oil (15 min)**
- Pasta → Downstairs Pantry
- Olive Oil → Downstairs Pantry
- Garlic → Downstairs Refrigerator
- Missing: None
```

### Collaborative Cooking Together Workflow
**Primary Command Pattern:**
```
"I want to send [partner] a calendar invite to cook [RECIPE] together at [TIME]"
"Let's create an invite to cook together today at [TIME]"
```

**Overview:**
When cooking together as a team (rather than prep-and-assemble mode), create a structured workflow that organizes the cooking project into clear phases.

**Workflow:**
1. **Create GitHub Issue** (or task list) with recipe broken into three phases:
   - **PHASE 1: GATHER** - Complete list of ingredients and equipment to collect (5 min)
   - **PHASE 2: PREP** - All prep work before final assembly (with timing for each step)
   - **PHASE 3: BRINGING IT ALL TOGETHER** - Final cooking and assembly steps

2. **Issue/Task Structure:**
   - Start time and duration clearly stated
   - Each phase has checkbox items for tracking progress
   - Include timing estimates for each major step
   - Add pro tips and critical success factors
   - Link to full recipe in recipe database
   - Include source attribution for techniques

3. **Calendar Event:**
   - Title with emoji (e.g., "🦀 Cook [Recipe Name] Together")
   - Duration based on total recipe time
   - Location: "Home Kitchen"
   - Guest: [cooking partner email]
   - Description includes:
     - Timeline breakdown by phase
     - Link to task list/issue
     - What makes the recipe special
     - Key pro tips
     - Expected completion time

4. **Recipe Database Integration:**
   - Ensure recipe is saved as individual file in appropriate category first
   - Include full source attribution (culinary authorities used)
   - Note any special techniques or equipment
   - Save mise en place details

**Best Recipe Types:**
- New recipes to try together
- Complex recipes with multiple components
- Special occasion meals
- Recipes requiring teamwork (one preps, one cooks)
- Weekend cooking projects

**Key Differences from Prep-and-Assemble:**
- **Together mode**: Both cooking at same time vs. one preps/one cooks
- **Three-phase format**: GATHER → PREP → BRING IT TOGETHER
- **Single calendar event**: One event vs. review + cooking events
- **Collaborative**: Equal partnership vs. divided responsibilities

### Prep-and-Assemble Cooking Mode
**Primary Command Pattern:**
```
"Let's get organized to prep ingredients for [MEAL] tonight"
"Set up a prep-and-assemble workflow for [RECIPE]"
```

**Overview:**
A collaborative cooking mode where one person does all prep work and another handles cooking/assembly. Reduces anxiety and creates great learning opportunities.

**Workflow:**
1. **Setup Phase:**
   - Create task list with full recipe details
   - Check ALL inventory locations for ingredient availability
   - Read/fetch recipe if provided (PDF, URL, etc.)
   - Divide tasks into prep tasks and cooking tasks

2. **Container Organization Strategy:**
   - Confirm all available ingredients
   - Organize prep into containers by usage timing:
     - Container 1: Ingredients used together (e.g., raw vegetables)
     - Container 2: Cooked components (e.g., sautéed mushrooms)
     - Container 3: Wet/drained ingredients (e.g., corn, beans)
     - Container 4: Final toppings/garnishes
   - Label each container with step number for when it's used

3. **Detailed Prep Instructions:**
   - Provide EXACT measurements and cutting specifications
   - Example: "Cut 1 cucumber into matchsticks (1/4" x 1/4" x 4" strips)"
   - Example: "Slice 1 red bell pepper into 1/4" wide strips"
   - Guide through each task, mark as in_progress, then completed
   - Organize tasks by phase (sauce first, veggies, cooking, toppings, station setup)

4. **Assembly Station Setup:**
   - Equipment checklist (pot, colander, bowls, tools)
   - Ingredient placement by order of use (left to right)
   - Optional extras (seasonings, citrus, adjustment tools)

5. **Calendar Event Creation (optional):**
   - Create TWO events:
     - Review event: 5-10 min BEFORE cooking (for cook to read through)
     - Cooking event: Actual recipe time with detailed instructions
   - Event should include:
     - ⚡ Overview section (what you're making, final result, your role, time)
     - 🎯 Before-you-start checklist (containers, equipment, ingredients)
     - 📋 Workflow diagram (visual flow of steps)
     - 📋 Step-by-step instructions (with sensory cues and timing)
     - 💡 Cooking tips (techniques, mistakes to avoid)
     - 🆘 Troubleshooting section (problem → solution format)
     - 📖 Link to task list/recipe
   - Invite cooking partner to the event

6. **Post-Cooking Feedback:**
   - Collect feedback on what worked/didn't work
   - Common feedback: "Hard to get up to speed on recipe"
   - Solutions: Overview section, review event, labeled containers, visual diagrams

**Best Recipe Types:**
- Cold noodle salads (lots of prep, simple assembly)
- Stir-fries (all prep done, cook quickly)
- Buddha bowls (components prepped, assemble)
- Tacos/burrito bowls (toppings bar approach)
- Grain salads (cook grain, toss together)

### Make-Ahead Components Workflow
**Primary Command Pattern:**
```
"What can I prep ahead for [RECIPE]?"
"Break down [RECIPE] into make-ahead components"
```

**Overview:**
Identify which components of a recipe can be prepared in advance to reduce day-of cooking stress and spread work across multiple days.

**Workflow:**
1. **Analyze recipe for make-ahead opportunities:**
   - Sauces and dressings (most last 5-7 days)
   - Marinated proteins (12-24 hours ideal)
   - Chopped vegetables (1-3 days, varies by type)
   - Cooked grains/legumes (3-5 days)
   - Baked components (varies, some freeze well)

2. **Create prep timeline:**
   - 3-5 days before: Long-lasting components (stocks, sauces)
   - 1-2 days before: Marinating, cooked grains
   - Day of: Quick prep (delicate herbs, final assembly)

3. **Storage instructions:**
   - Container types and labeling
   - Refrigerator vs. freezer decisions
   - Reheating/finishing instructions

4. **Assembly day plan:**
   - What comes out of fridge/freezer when
   - Final cooking steps only
   - Expected time savings

**Best Recipe Types:**
- Holiday meals and entertaining
- Meal prep for the week
- Complex recipes with many components
- Dishes that improve with time (braises, marinated items)

### Inventory Management
**Update Commands:**
- "Update my [location] inventory with current items"
- "What's expiring soon that I should cook first?"
- "Check all inventory locations for [ingredient]"

**Maintenance Commands:**
- "Generate shopping list for this week's meal plan"
- "Review expiration dates across all locations"
- "Suggest meals to use up [specific ingredient]"

## File Management Best Practices

### Reading Inventory
Always check ALL locations when doing meal matching. Example structure (customize to your home):
```
inventory/upstairs/pantry.md
inventory/upstairs/refrigerator.md
inventory/upstairs/freezer.md
inventory/upstairs/snack-shelf.md
inventory/upstairs/fruit-bowls.md
inventory/downstairs/pantry.md
inventory/downstairs/refrigerator.md
inventory/downstairs/freezer.md
inventory/downstairs/chest-freezer.md
inventory/downstairs/kitchen-drawers.md
inventory/basement/food-storage.md
```

### Recipe Database Updates
When adding new recipes:
- Create a new markdown file in the appropriate category folder (appetizers/, mains/, sides/, soups/, sauces-condiments/, desserts/, breads-rolls/, cocktails/)
- Use existing recipe format as a template
- Include prep/cook times and ingredient storage locations
- Update the README.md index to link to the new recipe
- Recipes are individual files, not a single database

### Inventory Updates
- Use table format for consistency
- Include expiration dates when available
- Note specific storage location details
- Update "Last Updated" field

## Common Use Cases

### "What's for dinner tonight?"
1. Check current time vs available prep time
2. Read all inventory locations
3. Filter recipes by time constraint
4. Suggest 2-3 options with ingredient locations

### "Plan meals for this week"
1. Review current inventory for items to use first
2. Check expiration dates to prioritize
3. Fill meal plan template with suggestions
4. Generate shopping list for missing ingredients

### "I have [ingredient], what can I make?"
1. Search recipe database for recipes using ingredient
2. Cross-check other required ingredients against inventory
3. Suggest complete recipes with all locations
4. Note prep times and difficulty levels

### "Update my pantry inventory"
1. Read current pantry file
2. Ask user what items to add/remove/update
3. Update quantities and expiration dates
4. Maintain table format and categories

### Going Out of Town (Food Rescue)
**Primary Command Pattern:**
```
"I'm going out of town, help me use up food"
"Let's do a pre-trip fridge check"
"Going out of town procedure"
```

**Proactive Detection** (if calendar access enabled):
Claude can check for upcoming trips and suggest running food rescue workflow:
- Trip departure within **3 days** → Suggest running food rescue workflow
- Trip departure within **1 day** → Urgent reminder if not already done
- Trip is **5+ days** → Higher priority to use perishables

**Overview:**
Workflow to minimize food waste before trips by triaging perishables into: use now, preserve, will keep, or compost.

**Workflow:**
1. **Get trip details**: When leaving, when returning, days away
2. **Inventory triage**: Check ALL fridge locations, categorize by urgency
3. **Rescue actions**:
   - **Use now**: Cook into meals (broth, stir-fry, frittata, soup)
   - **Preserve**: Freeze, make smoothie packs, pesto from herbs
   - **Share**: Offer good items to neighbors/friends
   - **Compost**: Items past prime
4. **Pre-departure checklist**: Trash out, fridge cleaned, freezer labeled
5. **Coming home easy**: Note what staples to buy on return

**Quick Rescue Recipes:**
- **Veggie broth**: Carrots, celery, onions, peppers, tomatoes → simmer, blend, freeze
- **Smoothie packs**: Bananas, berries, greens → portion into freezer bags
- **Frittata**: Eggs + any veggies/cheese → bake and eat or refrigerate
- **Pesto**: Wilting herbs + oil + nuts → freeze in ice cube trays
- **Stir-fry medley**: Mixed vegetables → cook and freeze for quick meals

## Error Handling

### Missing Ingredients
- Always provide alternatives when possible
- Suggest substitutions if available in inventory
- Offer to add missing items to shopping list

### Empty Inventory Files
- Guide user to populate inventory first
- Suggest starting with most-used locations
- Provide template format for easy entry

### Recipe Ambiguity
- Ask for clarification on prep time constraints
- Confirm dietary restrictions or preferences
- Suggest multiple options when uncertain

## Integration Points

### Shopping List Generation
- Pull from meal plan suggestions
- Check against current inventory to avoid duplicates
- Organize by store section (produce, dairy, etc.)

### Expiration Tracking
- Prioritize recipes using soon-to-expire ingredients
- Suggest preservation methods (freezing, etc.)
- Alert when items should be used immediately

### Meal Plan Optimization
- Balance nutrition across the week
- Use up perishables before non-perishables
- Consider prep time for busy vs. relaxed days

### High Altitude Cooking Adjustments
**If you live at high altitude** (typically above 3,000 feet / 914 meters):

**Common adjustments needed:**
- **Baking**: Increase oven temperature by 15-25°F, reduce leavening, add extra liquid
- **Boiling**: Water boils at lower temperature, requires longer cooking times
- **Pasta & grains**: Add 2-5 minutes to cooking time
- **Braising**: May need extra liquid and longer cooking time
- **Bread rising**: Faster rise times, may need less yeast or shorter proofing

**When to proactively suggest:**
- User mentions baking issues (flat cakes, dense bread)
- Recipes consistently need more cooking time
- User is new to high altitude location

**How to help:**
- Offer to add altitude adjustments to recipe notes
- Suggest testing small batches first
- Track successful adaptations in recipe database

## GitHub Integration (Optional)

### Issue-Based Recipe Development
If using GitHub issues for recipe development:

1. **Fetch Issue Details**: Use `gh issue view [number]` to get full recipe requirements
2. **Verify Ingredients**: Check ALL inventory locations for ingredient availability
3. **Add to Recipe Collection**: Create new recipe file in appropriate category folder
4. **Update Issue**: Comment with completion status and database location
5. **Handle Modifications**: Update recipe in database when improvements are made

### Recipe Modification Pattern
When reporting cooking modifications during preparation:
1. **Update Recipe File**: Apply changes to existing recipe file in its category folder
2. **Document Benefits**: Note nutrition goals or improvements
3. **Update Issue**: Comment with modifications for future reference
4. **Preserve Original**: Keep source links and modification notes

**Example Commands** (if using gh CLI):
```bash
gh issue view 5                           # Get recipe requirements
gh issue comment 5 --body "Status..."     # Update with progress
```

## Performance Notes
- Use parallel Read operations when checking multiple inventory files
- Cache frequently accessed recipe information
- Prioritize most commonly used storage locations in suggestions

## Future Enhancements
- Nutritional analysis of meal plans
- Cost tracking and budget optimization
- Integration with grocery delivery services
- Photo recognition for inventory updates
- Meal plan templates for dietary preferences (keto, vegetarian, etc.)
- Voice-activated cooking assistant mode
