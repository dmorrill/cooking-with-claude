# Release Template

Use this template when creating new releases. Copy to `releases/vX.Y.Z-feature-name/` directory.

## Directory Structure
```
releases/
└── vX.Y.Z-feature-name/
    ├── CHANGELOG.md      # Technical changelog
    ├── RELEASE-NOTES.md  # User-facing announcement
    └── SOCIAL-MEDIA.md   # Platform-specific posts
```

## Version Numbering
- **Major (X.0.0)**: Breaking changes or major feature additions
- **Minor (0.Y.0)**: New features, backward compatible
- **Patch (0.0.Z)**: Bug fixes and minor improvements

---

# CHANGELOG.md Template

```markdown
# Version X.Y.Z - Feature Name
Released: [Date]

## 🎯 Release Overview
[One paragraph summary of what this release accomplishes]

## ✨ New Features
- **Feature Name**: Description
- **Feature Name**: Description

## 🔧 Technical Changes
- Implementation details
- Architecture changes
- Dependencies added/removed

## 📚 Documentation
- What documentation was added/updated
- New guides or examples

## 🐛 Bug Fixes
- Fixed: [Description of bug and fix]

## 💔 Breaking Changes
- [List any breaking changes]
- [Migration steps needed]

## 🔄 Migration Guide
[Steps users need to take to upgrade]

## 📊 Impact Metrics
- **Metric**: Value
- **Performance**: Impact

## 🙏 Contributors
- Name (@github-handle)

## 📝 Release Notes
- [Full Release Announcement](RELEASE-NOTES.md)
- [Social Media Posts](SOCIAL-MEDIA.md)
```

---

# RELEASE-NOTES.md Template

```markdown
# 🎉 Release Title - Catchy Description

**tl;dr:** [One sentence summary that captures the value]

## What's New
[2-3 paragraphs explaining the feature and its benefits]

## Why This Matters
[Real-world impact, problems solved]

## Quick Start
[Simple steps to try the new feature]
1. Step one
2. Step two
3. Step three

## Examples
[Concrete examples of using the feature]

## What's Next
[Upcoming features or improvements]

## Get Involved
- ⭐ Star the repo: [link]
- 🐛 Report issues: [link]
- 💬 Join discussion: [link]

## Thank You
[Acknowledgments and personal note]
```

---

# SOCIAL-MEDIA.md Template

```markdown
# Social Media Posts for [Release Name]

## Twitter/X Thread
**Tweet 1:**
[Hook - announce the feature]

**Tweet 2:**
[Details - what it does]

**Tweet 3:**
[Impact - results/benefits]

**Tweet 4:**
[CTA - star/try/share]

## LinkedIn Post
**Title:** [Professional headline]
[Longer form post with business angle]

## Reddit r/[subreddit]
**Title:** [Community-appropriate title]
[Post tailored to subreddit culture]

## Discord/Slack
[Quick casual announcement]

## Instagram
[Visual-focused caption with emojis]
#hashtag #hashtag
```

---

## Release Checklist

Before releasing, ensure:

- [ ] Version number follows semantic versioning
- [ ] CHANGELOG.md is complete with all changes
- [ ] RELEASE-NOTES.md is engaging and clear
- [ ] SOCIAL-MEDIA.md has platform-specific versions
- [ ] Code is tested and working
- [ ] Documentation is updated
- [ ] Migration guide is included if needed
- [ ] Contributors are credited
- [ ] Release is tagged in git
- [ ] GitHub Release is created
- [ ] Social media posts are scheduled