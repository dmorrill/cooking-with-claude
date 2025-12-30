# Improvements to Sync from Personal Cooking Repo

## Summary
The personal cooking repo has evolved significantly since the last sync on December 5, 2025. Here are the key improvements that should be pulled into the public cooking-with-claude repo, with PII removed.

## 1. Enhanced CLAUDE.md Configuration

### New Workflows to Add:
- **Collaborative Cooking Together Workflow** - When cooking as a team (not just prep-and-assemble)
  - Three-phase structure: GATHER → PREP → BRINGING IT ALL TOGETHER
  - Structured GitHub issue creation
  - Calendar event templates with guest invites

- **Restaurant Review System** (sanitized version)
  - Template for logging dining experiences
  - Platform-specific review drafting (Yelp, Google Maps, etc.)
  - Content strategy tracking
  - Remove personal restaurant names and specific locations

### Proactive Behaviors Section:
- Calendar integration offers for cooking plans
- Shopping list generation after missing ingredients identified
- Recipe database updates after successful cooking
- Inventory update prompts after cooking

## 2. MAJOR: Complete Recipe Reorganization 🎯

### From Monolithic to Modular (December 29, 2025)
The personal repo underwent a complete recipe structure overhaul:
- **39 recipes extracted** from single 168KB recipe-database.md file
- **Individual recipe files** with human-readable names (e.g., `cacio-e-pepe-single-serving.md`)
- **8 category folders** for logical organization:
  - appetizers/
  - breads-rolls/
  - cocktails/
  - desserts/
  - mains/
  - sauces-condiments/
  - sides/
  - soups/
- **Comprehensive README.md** with links to all recipes by category
- **Original preserved** as recipe-database.md.backup
- **Extraction script** (`scripts/extract_recipes.py`) for maintenance

### Additional Recipe Features:
- **make-ahead-components.md** - Batch cooking system for sauces, pickles, breakfast items
- **restaurant-staples.md** - Multi-use components that work across multiple dishes
- **archive/** folder for deprecated/seasonal recipes

### Benefits of New Structure:
- Easy browsing by category folder
- Quick access without scrolling through massive file
- Better version control (changes tracked per recipe)
- Simpler sharing of individual recipes
- Easier to add new recipes
- Reduced token usage for Claude (reads only needed files)

## 3. Enhanced Inventory System

### Additional Inventory Locations (genericized):
- **ingredients-sourcing.md** - Where to find specialty ingredients
- **kitchen-drawers.md** - Tools and equipment location tracking
- **chest-freezer.md** - Separate from regular freezer for bulk storage
- **fruit-bowls.md** - Counter storage for fresh produce
- **snack-shelf.md** - Quick access items
- **laundry-room.md** - Overflow pantry storage

### Shopping List Integration:
- **shopping-list.md** in inventory folder
- Links to meal plans and missing ingredients

## 4. New Templates

### Templates to Add (sanitized):
- **going-out-of-town.md** - Food rescue workflow before trips
- **restaurant-review-template.md** - For food blogging/reviewing
- **Updated prep-and-assemble-workflow.md** - More detailed with container organization

## 5. Scripts Directory

### Sync Script (sanitized version):
```bash
scripts/sync-to-public.sh
```
- Shows commits since last sync
- Identifies new/modified recipes
- Creates sanitization checklist
- Tracks sync history

### Other Useful Scripts to Consider:
- Recipe quick-add script
- Inventory update helper
- Meal plan generator

## 6. Documentation Improvements

### Meal Planning Preferences:
- Template for tracking dietary preferences
- Nutritional goals
- Ingredient priorities
- Currently-avoiding lists

### Kitchen Maintenance:
- Equipment care schedules
- Deep cleaning checklists
- Tool sharpening reminders

### Cookbooks & Resources:
- Reading list of cooking references
- Technique resources
- Favorite cooking websites/channels

## 7. Workflow Enhancements

### Calendar Management:
- Separate "Cooking" calendar concept
- Event templates with detailed cooking instructions
- Reminder settings for prep tasks
- Guest invite workflows (genericized)

### Container Organization Strategy:
- Detailed container labeling by usage timing
- Step-by-step prep organization
- Assembly station setup guides

### Review Events:
- Creating separate review events before cooking
- Allows cook to familiarize with recipe
- Reduces cooking stress

## 8. File Structure Improvements

### Better Recipe Database:
- Split into individual files by category
- Maintain backup of original database
- Easier to navigate and update
- Better for version control

## Implementation Priority

### High Priority (Core Functionality):
1. Enhanced CLAUDE.md with new workflows
2. Recipe category reorganization
3. make-ahead-components.md
4. Updated prep-and-assemble template

### Medium Priority (Nice to Have):
1. Additional inventory locations
2. Sync script (sanitized)
3. Calendar integration workflows
4. Container organization strategy

### Low Priority (Future Enhancements):
1. Restaurant review system
2. Kitchen maintenance tracking
3. Cookbook references
4. Going out of town template

## Sanitization Required

Before syncing, ensure removal of:
- Any email addresses (replace with placeholders)
- Specific personal names (use generic roles)
- Location-specific information (addresses, local stores)
- Personal calendar details
- Actual inventory data (keep structure only)
- Personal restaurant names and reviews

## Notes
- All features should include example usage in documentation
- Templates should have clear placeholders for customization
- Scripts should work with generic directory structures
- Documentation should explain the "why" behind each feature