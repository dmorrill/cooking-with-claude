# Claude Code Configuration - Cooking System

## Project Overview
Intelligent cooking management system that combines recipe database, meal planning, and real-time inventory tracking with AI-powered meal suggestions.

## Core System Architecture

### 1. Recipe Management (`recipes/`)
- **recipe-database.md**: Central recipe collection with templates
- **meal-matcher.md**: AI-powered meal suggestion engine
- **meal-planning-helper.md**: Weekly planning workflows and templates

### 2. Inventory System (`inventory/`)
- **Multi-location tracking**: Customize folders to match your home layout
- **Smart categorization**: By storage type and expiration dates
- **Integration points**: Links to recipe suggestions and shopping lists

### 3. AI Integration Points
- **Meal matching**: Cross-reference recipes with current inventory
- **Time-based filtering**: Suggest meals by available prep time
- **Expiration prioritization**: Use items before they spoil
- **Shopping optimization**: Generate lists from meal plans

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
- Read all inventory files
- Filter recipes by ≤30min prep time
- Match available ingredients
- Suggest 2-3 options with format:

**Option 1: Pasta with Garlic Oil (15 min)**
- Pasta → Kitchen Pantry
- Olive Oil → Kitchen Pantry
- Garlic → Refrigerator
- Missing: None
```

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
   - Guide through each task, marking progress

4. **Assembly Station Setup:**
   - Equipment checklist (pot, colander, bowls, tools)
   - Ingredient placement by order of use (left to right)
   - Optional extras (seasonings, citrus, adjustment tools)

5. **Calendar Event Creation (optional):**
   - Create event with detailed cooking instructions
   - Include overview, checklist, step-by-step guide
   - Add troubleshooting section

**Best Recipe Types:**
- Cold noodle salads (lots of prep, simple assembly)
- Stir-fries (all prep done, cook quickly)
- Buddha bowls (components prepped, assemble)
- Tacos/burrito bowls (toppings bar approach)
- Grain salads (cook grain, toss together)

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
Always check ALL locations when doing meal matching:
```
inventory/upstairs/pantry.md
inventory/upstairs/refrigerator.md
inventory/upstairs/freezer.md
inventory/downstairs/pantry.md
inventory/downstairs/refrigerator.md
inventory/downstairs/freezer.md
inventory/basement/food-storage.md
```

### Recipe Database Updates
When adding recipes, use the template format:
- Include prep/cook times
- List ingredient storage locations
- Add to appropriate time category (15min, 30min, etc.)

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
