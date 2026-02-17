# Meal Matcher System

## How to Use This System

1. **Update your inventory files** with current items and quantities
2. **Set your parameters** below (prep time, servings needed)  
3. **Run the matcher** by asking Claude to suggest meals based on your criteria

## Current Parameters
- **Maximum prep time**: __ minutes
- **Servings needed**: __
- **Dietary restrictions**: 
- **Avoid ingredients**: 
- **Must include ingredients**: 

## Recipe Matching Process

### Step 1: Inventory Check
*Claude will check these locations for available ingredients:*

#### Upstairs Locations
- [ ] Pantry (`inventory/upstairs/pantry.md`)
- [ ] Refrigerator (`inventory/upstairs/refrigerator.md`)  
- [ ] Freezer (`inventory/upstairs/freezer.md`)
- [ ] Snack Shelf (`inventory/upstairs/snack-shelf.md`)
- [ ] Fruit Bowls (`inventory/upstairs/fruit-bowls.md`)

#### Downstairs Locations  
- [ ] Pantry (`inventory/downstairs/pantry.md`)
- [ ] Refrigerator (`inventory/downstairs/refrigerator.md`)
- [ ] Freezer (`inventory/downstairs/freezer.md`) 
- [ ] Chest Freezer (`inventory/downstairs/chest-freezer.md`)
- [ ] Kitchen Drawers (`inventory/downstairs/kitchen-drawers.md`)

#### Basement
- [ ] Food Storage (`inventory/basement/food-storage.md`)

### Step 2: Recipe Filtering
*Filters applied:*
- Prep time ≤ specified maximum
- All required ingredients available
- Serves specified number of people

### Step 3: Suggestion Output Format

**Recipe Suggestion: [Recipe Name]**
- **Prep Time**: X minutes
- **Servings**: X people  
- **Ingredients & Locations**:
  - Ingredient 1 → Location (e.g., "Downstairs Pantry")
  - Ingredient 2 → Location 
  - Ingredient 3 → Location
- **Missing Items**: [None/List items to buy]
- **Difficulty**: Easy/Medium/Hard

## Sample Usage

### Example Query
*"I want to cook dinner without going to the store tonight, what recipes could I make that are less than 30 minutes to prepare?"*

### Example Response Format
```
Based on your inventory, here are 3 dinner options under 30 minutes:

**Option 1: Spaghetti with Garlic Oil (15 min)**
- Pasta → Downstairs Pantry  
- Olive Oil → Downstairs Pantry
- Garlic → Downstairs Fridge
- Parmesan → Downstairs Fridge
- Missing: None

**Option 2: Scrambled Eggs with Toast (10 min)**  
- Eggs → Downstairs Fridge
- Butter → Downstairs Fridge  
- Bread → Upstairs Counter
- Missing: None

**Option 3: Chicken Stir-fry (25 min)**
- Frozen Chicken → Downstairs Freezer
- Frozen Vegetables → Upstairs Freezer  
- Soy Sauce → Kitchen Drawers
- Rice → Downstairs Pantry
- Missing: None
```

## Quick Commands for Claude

*Copy and paste these commands:*

**30-minute meals**: "What dinner recipes can I make in 30 minutes or less using only ingredients I have?"

**15-minute meals**: "What quick meals can I make in 15 minutes or less?"  

**Use specific ingredient**: "What recipes can I make using [ingredient] that take less than [X] minutes?"

**Breakfast options**: "What breakfast options can I make in 20 minutes or less?"

**Lunch ideas**: "What lunch recipes are available with my current inventory under 25 minutes?"