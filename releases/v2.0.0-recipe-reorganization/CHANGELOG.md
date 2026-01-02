# Version 2.0.0 - Recipe Reorganization
Released: December 2025

## 🎯 Release Overview
Major restructuring of the recipe system from monolithic database to individual files, plus new collaborative cooking workflows and enhanced meal planning features. This release represents a complete overhaul based on one month of real-world usage.

## ✨ New Features

### Recipe Reorganization
- **Individual Recipe Files**: 45+ recipes extracted into separate markdown files
- **8 Category Folders**: appetizers, breads-rolls, cocktails, desserts, mains, sauces-condiments, sides, soups
- **Human-Readable Filenames**: Clear names like `cacio-e-pepe-single-serving.md`
- **Comprehensive Index**: README with links to all recipes by category
- **Archive Support**: Storage for deprecated and seasonal recipes

### Collaborative Cooking Workflows
- **Team Cooking Mode**: Structured phases (Gather → Prep → Assembly)
- **Enhanced Prep-and-Assemble**: Container organization by usage timing
- **Review Events**: Preview calendar events for recipe familiarization
- **Container Strategy**: Smart labeling system for ingredient organization

### Calendar Integration
- **Proactive Management**: Claude offers to create calendar events
- **Dedicated Cooking Calendar**: Separate calendar for meal planning
- **Guest Invitations**: Support for collaborative cooking sessions
- **Smart Reminders**: 5-minute alerts for cooking events

### Restaurant Reviews System
- **Individual Restaurant Files**: Track all visits to each restaurant
- **Multi-Platform Support**: Yelp, Beli, Google Maps, Instagram
- **Review Tracker**: Central dashboard for posting status
- **Quick Entry Script**: `new-restaurant-review.sh` for easy logging

### Enhanced Workflows
- **Make-Ahead Components**: Break recipes into advance prep steps
- **Food Rescue Mode**: Pre-trip workflow to minimize waste
- **Altitude Adjustments**: Denver-specific cooking modifications
- **GitHub Integration**: Issue-based recipe development

## 🔧 Technical Changes
- **Token Efficiency**: 90% reduction in AI token usage
- **Better Version Control**: Individual file tracking
- **Extraction Script**: Python tool for recipe management
- **Template System**: Standardized formats for consistency

## 💔 Breaking Changes
- **Recipe Database Split**: `recipe-database.md` replaced with individual files
- **File Paths Changed**: All recipe references need updating
- **Category Structure**: New folder organization

## 🔄 Migration Guide
1. Backup existing `recipe-database.md`
2. Run extraction script: `python scripts/extract_recipes.py`
3. Update any scripts referencing old structure
4. Review extracted recipes for formatting

## 📊 Impact Metrics
- **Recipes Extracted**: 45+
- **Token Usage**: -90%
- **File Size**: 168KB → ~4KB per recipe
- **Search Speed**: 10x faster
- **Categories**: 8

## 🙏 Contributors
- Elle Morrill (@dmorrill)
- Claude (AI pair programmer)

## 📝 Release Notes
- [Full Release Announcement](RELEASE-NOTES.md)