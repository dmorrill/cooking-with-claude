# 🚀 Launch Issue: Cooking with Claude v2.0 Release

## Overview
Sync all improvements from personal cooking repo to public cooking-with-claude repo for v2.0 release.

**Target Date**: December 29, 2025
**Last Sync**: December 5, 2025

## Pre-Launch Checklist

### Phase 1: Analysis & Planning ✅
- [x] Compare both repos and identify improvements
- [x] Create improvements list (PII-free)
- [x] Draft release notes
- [x] Write blog post
- [x] Create this launch issue

### Phase 2: Recipe Reorganization
**Impact**: This is the biggest change - transforms entire recipe structure

- [ ] **Run recipe extraction script**
  - Extract all recipes from `recipes/recipe-database.md`
  - Create 8 category folders (appetizers, breads-rolls, cocktails, desserts, mains, sauces-condiments, sides, soups)
  - Generate individual files with human-readable names
  - Create comprehensive README.md index
  - Preserve original as `recipe-database.md.backup`

  **What this gets us**:
  - 45+ individual recipe files instead of one 168KB file
  - Easy browsing by category
  - 98% token reduction for Claude (reads only needed recipes)
  - Better git history (changes tracked per recipe)
  - Simpler sharing of individual recipes

- [ ] **Port extraction script**
  - Copy `scripts/extract_recipes.py` (sanitized)
  - Update paths for public repo structure
  - Document usage in README

### Phase 3: Core System Updates

- [ ] **Update CLAUDE.md**
  - Add Collaborative Cooking Together workflow
  - Add Prep-and-Assemble enhanced workflow
  - Add Proactive Behaviors section
  - Add Calendar Integration guidance
  - Update file paths to match new structure
  - Remove any PII (emails, names, locations)

- [ ] **Sync new templates**
  - [ ] `templates/prep-and-assemble-workflow.md` (enhanced version)
  - [ ] `templates/going-out-of-town.md` (food rescue workflow)
  - [ ] `templates/restaurant-review-template.md` (sanitized)

### Phase 4: New Features

- [ ] **Add make-ahead components system**
  - [ ] Create `recipes/make-ahead-components.md`
  - [ ] Add storage guidelines
  - [ ] Include pairing suggestions
  - [ ] Remove any personal preferences

- [ ] **Add restaurant staples concept**
  - [ ] Create `recipes/restaurant-staples.md`
  - [ ] Include multi-use component ideas
  - [ ] Sanitize any business-specific content

- [ ] **Enhance inventory structure**
  - [ ] Add `inventory/ingredients-sourcing.md` template
  - [ ] Add additional location examples (chest-freezer, fruit-bowls, etc.)
  - [ ] Keep all inventory files empty (structure only)

### Phase 5: Scripts & Tools

- [ ] **Add sync script**
  - [ ] Copy `scripts/sync-to-public.sh`
  - [ ] Update paths to be generic
  - [ ] Remove personal repo references
  - [ ] Document in README

- [ ] **Create helper scripts**
  - [ ] Recipe quick-add template
  - [ ] Inventory update helper
  - [ ] Meal plan generator template

### Phase 6: Documentation

- [ ] **Update main README.md**
  - [ ] New features section
  - [ ] Updated quickstart guide
  - [ ] Migration instructions from v1
  - [ ] Link to blog post

- [ ] **Update examples/**
  - [ ] Add collaborative cooking examples
  - [ ] Add make-ahead planning example
  - [ ] Add calendar integration example

### Phase 7: Testing & Validation

- [ ] **Test recipe extraction**
  - [ ] Verify all recipes extracted correctly
  - [ ] Check category assignments
  - [ ] Confirm links in README work

- [ ] **Test with Claude Code**
  - [ ] Load new CLAUDE.md
  - [ ] Try meal planning with new structure
  - [ ] Test collaborative workflows
  - [ ] Verify inventory management works

- [ ] **Final sanitization check**
  - [ ] No email addresses
  - [ ] No personal names (except generic roles)
  - [ ] No specific locations/addresses
  - [ ] No actual inventory data

### Phase 8: Release

- [ ] **Create git commit**
  - [ ] Clear commit message referencing v2.0
  - [ ] List major changes
  - [ ] Credit Claude Code

- [ ] **Create GitHub PR**
  - [ ] Title: "Release v2.0: Complete recipe reorganization and collaborative workflows"
  - [ ] Add release notes in PR description
  - [ ] Tag as `enhancement` and `breaking-change`

- [ ] **Post-release**
  - [ ] Merge PR
  - [ ] Create GitHub release with tag v2.0.0
  - [ ] Publish blog post
  - [ ] Update personal repo `.last-sync` file

## Commit Message Template
```
Release v2.0: Complete recipe reorganization and collaborative workflows

BREAKING CHANGE: Recipes moved from monolithic database to individual files

- Extract 45+ recipes into category-based file structure
- Add collaborative cooking workflows (team & prep-and-assemble)
- Introduce make-ahead components system
- Enhanced calendar integration and proactive behaviors
- Add recipe extraction script for maintenance
- Improve inventory management with more locations
- Add sync tooling for future updates

See RELEASE_NOTES_v2.md for migration guide

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Success Metrics
- [ ] All recipes accessible as individual files
- [ ] Claude can navigate new structure efficiently
- [ ] Collaborative workflows documented and working
- [ ] No PII in public repo
- [ ] Clean git history with clear commit

## Notes
- Focus on structure and workflows, not actual recipe content
- Keep inventory templates empty (users fill their own)
- Prioritize breaking change (recipe reorg) first
- Test thoroughly before pushing to public repo

---

**Ready to start?** Let's begin with Phase 2: Recipe Reorganization!