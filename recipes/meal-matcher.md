# Meal Matcher

AI-powered meal suggestion engine that matches your available ingredients and time constraints to recipes in the database.

## How It Works

1. **Inventory Check**: Claude reads all inventory files to know what you have
2. **Time Filter**: Filters recipes by your available prep/cook time
3. **Ingredient Match**: Finds recipes where you have most/all ingredients
4. **Suggestion Format**: Returns options with ingredient locations and any missing items

## Usage Examples

### Basic Queries
```
"What can I make for dinner tonight?"
"What 30-minute meals can I make with what I have?"
"I have chicken thawing - what should I make?"
"What can I cook without going to the store?"
```

### Constraint-Based Queries
```
"Quick vegetarian dinner options?"
"What can I make using the expiring tomatoes?"
"Low-effort meal for a busy night?"
"Something impressive for guests using pantry staples?"
```

## Matching Logic

### Priority Order
1. **Recipes with 100% ingredient match** - Can make right now
2. **Recipes missing 1-2 pantry staples** - Likely have substitutes
3. **Recipes missing fresh ingredients** - May need a quick shop

### Time Categories
- **Emergency (≤15 min)**: When you need food NOW
- **Quick (16-30 min)**: Standard weeknight
- **Moderate (31-45 min)**: Have some time
- **Project (45+ min)**: Weekend cooking

## Response Format

When Claude suggests meals, expect this format:

```
**Option 1: [Recipe Name] (XX min)**
✓ Pasta → Kitchen Pantry
✓ Garlic → Refrigerator
✓ Olive Oil → Kitchen Pantry
✗ Missing: Fresh basil (optional, can substitute dried)

**Option 2: [Recipe Name] (XX min)**
...
```

## Tips for Better Matches

1. **Keep inventory updated** - More accurate suggestions
2. **Add expiration dates** - Prioritizes items to use first
3. **Note quantities** - Avoids suggesting recipes for ingredients almost gone
4. **Include staples** - Salt, pepper, oils help match more recipes
