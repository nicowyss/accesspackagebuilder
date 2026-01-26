# Changelog

All notable changes to Access Package Builder will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Server-side caching for instant repeat loads
- Clustered visualization for 10,000+ user tenants
- Export to Excel for offline analysis
- Direct deployment to Entra ID without PowerShell

---

## [2.0.0] - 2026-01-26

### Added
- Microsoft Graph Batch API for parallel user/group fetching
- Gzip compression middleware for smaller response sizes
- ETags and cache headers for static assets
- DataTables `deferRender` for faster table rendering
- Performance benchmark endpoint at `/test/compare-full`

### Changed
- Algorithm now uses Set/Map data structures for O(1) lookups (previously O(n))
- API calls reduced from N to N/100 using batch requests with 5 concurrent batches
- Static middleware consolidated (removed duplicate)

### Performance
- **API Fetch:** 34.7s → 9.08s (74% faster)
- **Algorithm:** 2.37s → 0.088s (96% faster)
- **Total Page Load:** 37.1s → 9.17s (75% faster)
- Tested with 2,279 users across multiple group memberships

---

## [1.0.0] - 2025-XX-XX

### Added
- Initial release of Access Package Builder
- Automatic Access Package suggestions based on department/company structure
- Manual Access Package Builder with drag-and-drop
- Role Matrix for access reviews
- Group Membership Analyzer
- Interactive network visualization with vis.js
- Data Quality view for user attribute validation
- PowerShell deployment script integration
- Docsify documentation site
- Microsoft Entra ID multi-tenant authentication
- Application Insights integration for production monitoring

---

## How to Read This Changelog

- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Features that will be removed in future versions
- **Removed** - Features that were removed
- **Fixed** - Bug fixes
- **Security** - Security-related changes
- **Performance** - Performance improvements

---

[Unreleased]: https://github.com/nicowyss/accesspackagebuilder/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/nicowyss/accesspackagebuilder/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/nicowyss/accesspackagebuilder/releases/tag/v1.0.0
