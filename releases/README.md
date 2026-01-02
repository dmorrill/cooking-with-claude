# Release History

All releases for the cooking-with-claude project, organized chronologically with standardized documentation.

## Release Structure

Each release contains:
- **CHANGELOG.md** - Technical details and migration guide
- **RELEASE-NOTES.md** - User-facing announcement
- **SOCIAL-MEDIA.md** - Platform-specific marketing content

## Releases

### 🚀 Latest Release

#### [v1.1.0 - MCP Integration](v1.1.0-mcp-integration/)
*Released: January 1, 2026*

Natural language cooking management through Claude Desktop! Talk to Claude naturally about your inventory and recipes.

**Highlights:**
- 9 new MCP tools for recipe and inventory management
- Natural language queries ("What can I make with what I have?")
- Direct inventory updates without editing markdown
- Automatic path detection

[Read Changelog](v1.1.0-mcp-integration/CHANGELOG.md) | [Release Notes](v1.1.0-mcp-integration/RELEASE-NOTES.md) | [Social Media](v1.1.0-mcp-integration/SOCIAL-MEDIA.md)

---

### 📜 Previous Releases

#### v1.0.0 - Initial Public Release
*Released: December 5, 2024*

The first public release of cooking-with-claude, featuring:
- 20+ tested recipes organized by category
- Complete Thanksgiving meal planning example
- Inventory tracking system
- Meal planning workflows
- Claude Code integration

*Note: Release notes from v1.0.0 are available in the original blog post: [Cooking With Claude - Learning to Practice Life in Small, Delicious Pieces](https://ellemorrill.substack.com/p/cooking-with-claude)*

---

## Version History

| Version | Date | Feature | Breaking Changes |
|---------|------|---------|-----------------|
| v1.1.0 | 2026-01-01 | MCP Server Integration | No |
| v1.0.0 | 2024-12-05 | Initial Public Release | N/A |

## Versioning Policy

We follow [Semantic Versioning](https://semver.org/):
- **Major (X.0.0)**: Breaking changes or complete overhauls
- **Minor (0.Y.0)**: New features, backward compatible
- **Patch (0.0.Z)**: Bug fixes and minor improvements

## Creating a New Release

1. Copy the template from `templates/RELEASE-TEMPLATE.md`
2. Create a new directory: `releases/vX.Y.Z-feature-name/`
3. Fill out all three required files
4. Update this README with the new release
5. Create a git tag: `git tag vX.Y.Z`
6. Push to GitHub and create a GitHub Release

## Contributing

Found a bug? Have a feature request? Please check our [releases](https://github.com/dmorrill/cooking-with-claude/releases) first, then [open an issue](https://github.com/dmorrill/cooking-with-claude/issues).

---

*For release templates and guidelines, see [templates/RELEASE-TEMPLATE.md](templates/RELEASE-TEMPLATE.md)*