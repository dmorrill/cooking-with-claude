# Inventory System

Track what food you have and where it's stored. This is the "advanced" feature that powers AI meal suggestions based on what's actually in your kitchen.

> **This is optional!** You can use the recipes and templates without ever touching inventory. But if you want Claude to answer "What can I make with what I have?", start here.

## Why Track Inventory?

Once Claude knows what's in your kitchen, you can ask:

- *"What can I cook for dinner in 30 minutes with what I have?"*
- *"What's expiring soon that I should use up?"*
- *"Generate a shopping list for these 3 recipes, minus what I already have"*
- *"I just bought groceries - help me update my inventory"*

Without inventory data, Claude can only suggest recipes. With it, Claude becomes a meal planning assistant that reduces food waste and saves money.

## Getting Started

### Step 1: Customize the structure (5 minutes)

The default setup assumes a multi-level home:
```
inventory/
├── upstairs/      (pantry, fridge, freezer)
├── downstairs/    (pantry, fridge, freezer)
└── basement/      (long-term storage)
```

**Rename or delete folders to match your home.** Common alternatives:
- Single kitchen → just use `kitchen/`
- Apartment → `kitchen/` + `storage-closet/`
- House + garage → `kitchen/` + `garage/`

### Step 2: Start with one location (10-15 minutes)

Don't try to inventory everything at once. Pick your main pantry or fridge and tell Claude:

```
"Help me inventory my kitchen pantry. I'll tell you what's on each shelf."
```

Claude will ask you questions and build out the inventory file.

### Step 3: Add more over time

Add other locations as you have time. The system works with partial data - even one well-maintained pantry file helps Claude make better suggestions.

## File Structure

| File | Purpose |
|------|---------|
| [master-inventory.md](master-inventory.md) | Dashboard linking to all locations |
| `[location]/pantry.md` | Dry goods, canned items, snacks |
| `[location]/refrigerator.md` | Fresh items, dairy, produce |
| `[location]/freezer.md` | Frozen items, batch-cooked meals |

## Keeping It Updated

The inventory is only useful if it's reasonably current. Some approaches:

**After shopping:**
```
"I just got back from the grocery store. Here's what I bought: [list]. Update my inventory."
```

**Weekly refresh:**
```
"Let's do a quick inventory check of my main fridge - I'll tell you what's changed."
```

**When cooking:**
```
"I used up the last of the chicken thighs and heavy cream making dinner tonight."
```

## Tips

- **Don't obsess over perfection** - A roughly accurate inventory is far more useful than none
- **Focus on perishables** - Track things that expire; don't worry about tracking every spice
- **Use expiration dates** - Claude can alert you to items that need to be used soon
- **Note quantities loosely** - "half full", "2 packages", "almost out" is fine

## Example Inventory Entry

```markdown
### Proteins
| Item | Quantity | Expires | Notes |
|------|----------|---------|-------|
| Chicken thighs | 1.5 lbs | Nov 28 | In freezer bag |
| Ground beef | 1 lb | Nov 26 | Use soon! |
| Eggs | ~8 | Dec 5 | |

### Dairy
| Item | Quantity | Expires | Notes |
|------|----------|---------|-------|
| Heavy cream | Half pint | Nov 29 | |
| Parmesan wedge | ~4 oz | Jan 15 | |
```

---

**Start simple:** Inventory your main fridge or pantry today. You can always add more later.
