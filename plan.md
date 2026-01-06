**Core Concepts**
- **Single-Household Focus**: Single primary home (optionally multiple properties for owner if needed), users can select their profile, but don't need to sign in with an account. They should simply be able to select their profile name.
- **Open-Source / Self-Hosted**: Simple Docker Compose deployment, local-first defaults, opt-in cloud integrations; privacy-by-default.

**Core Features**
- **Asset & System Registry**: Track appliances, mechanical systems (HVAC, water heater), structural systems (roof, siding), electrical panels, plumbing nodes, yard equipment. Store serials, model, purchase date, warranty end, manuals.
- **Work Records (Repairs & Installs)**: Log each installation, repair, or upgrade with date, contractor/vendor, cost, receipt attachment, notes, and before/after photos.
- **Maintenance Tasks & Recurrence**: Create maintenance tasks with due date or RRULE recurrence (e.g., HVAC filter every 90 days) and compute next occurrences; support single-occurrence edits and series overrides.
- **Task Occurrences**: Materialize near-term occurrences (e.g., next 6–12 months) so each reminder and completion maps to a concrete occurrence record.
- **Reminders & Notifications**: Email first (SMTP or SendGrid) and local web-push later; schedule reminders with configurable offsets (days/hours before due).
- **Receipts & Attachments**: Attach receipts, invoices, photos, manuals (presigned S3 or local filesystem). Capture metadata: vendor, cost, tax, warranty period, scanned OCR text (optional).
- **Checklists & Procedure Templates**: Per-task checklists (e.g., steps for seasonal HVAC check) and reusable task templates for common jobs.
- **Vendors & Contacts**: Store contractor/shop info, ratings, past jobs, preferred contacts, and invoice history.
- **Cost Tracking & Budgeting**: Track costs per job/asset and aggregate by year/category (repairs vs upgrades), with basic budget alerts.
- **Maintenance Timeline & History**: Chronological timeline per asset/property showing installs, repairs, completed maintenance occurrences, and attachments.
- **Search, Tags & Filters**: prepare layout so search can be added later; tag assets, tasks, vendors for easy filtering.
- **Audit Log & Change History**: Immutable-ish history of changes for tasks/assets/attachments and who performed actions (useful even for single user).

**Exterior & Yard Features**
- **Exterior Projects**: Track roof, siding, deck, gutter, paint jobs with project status, cost estimates, contractor bids, and warranty info.
- **Lawn & Landscape Scheduling**: Fertilize, aerate, overseed, irrigation maintenance schedules; map tasks to seasons and store product used.
- **Seasonal Checklists**: Pre-built seasonal jobs (spring/fall) with recommended intervals and templates.

**Systems / Trades Features**
- **Plumbing & Electrical Logs**: Track pipe replacements, line flushes, electrical panel upgrades, permit dates, code notes, and serial numbers for replaced parts.
- **Appliance Lifecycle Tracking**: Track installation date, expected lifecycle, warranty/extended warranty reminders, recommended service intervals.

**Receipts, Warranties & Documents**
- **Warranty & Manual Tracker**: Link receipts to warranty periods and manuals; auto-alert for upcoming warranty expirations.
- **Receipt OCR & Indexing (optional)**: Run OCR on receipts to extract vendor, date, and amount for easier search and import. This will not be implemented initially, but will be in the future.
- **Document Versions**: Keep revisions of manuals/specs and make them linkable to assets.

**Reports & Exports**
- **Maintenance Report**: Export CSV/JSON of maintenance history, costs, and upcoming scheduled work for a date range.
- **Warranty & Expiry Report**: List items with upcoming warranty expirations in a time window.
- **Tax/Insurance Report**: Export receipts and improvements for insurance claims or tax deductions.
- **Print/Share Job Summary**: Printable job summaries for contractors.

**Integrations**
- **Calendar Sync / ICS Export**: Export occurrences as .ics and optionally one-way Google Calendar sync. Won't be implemented initially, but will be in the future. 
- **Webhooks & API**: Simple REST API and webhook support for custom automations (e.g., home automation triggers). Won't be implemented initially, but will be in the future. 
- **Import/Export**: CSV import of assets/tasks/vendors; export full data as JSON for backup/migration.

**UX & Product Helpers**
- **Dashboard & Insights**: Next-up tasks, upcoming warranty expirations, monthly maintenance cost, and quick action tiles.
- **Templates & Presets**: Preloaded templates for common systems (HVAC, water heater, lawn care) to speed setup.
- **Bulk Actions**: Bulk complete/skip/reschedule occurrences, bulk attach receipts, bulk tag.
- **Photo Before/After & Annotate**: Compare before/after photos and annotate areas of damage.

**Self-Hosting & Admin**
- **Docker Compose Starter**: Compose with Postgres, Redis (optional for queues), MinIO (S3-compatible), backend, and frontend.
- **Backup & Restore**: One-click DB export/import and attachment archive backup; recommended automated cron script.
- **Storage Limits & Quotas**: Per-installation config for max storage and retention policy with pruning options.
- **Single-User + Guest Links**: Primary admin user, plus create guest shareable read-only links (expiring) for contractors.
- **Local-Only Mode**: Option to disable external network calls (no external analytics or cloud integrations) for privacy.

**Privacy, Security & Data Portability**
- **Privacy Defaults**: No telemetry; opt-in integrations.
- **Encryption**: TLS for transport and support provider-managed encryption for attachments; optional at-rest field encryption for sensitive info.
- **Data Export / Erase**: Full export and secure erase endpoints to satisfy self-hosting needs.

**Advanced / Nice-to-Have**
- **Predictive Maintenance Suggestions**: Suggest maintenance based on asset age, usage, and community-shared patterns (optional and opt-in). This is a future feature, not implemented at this time. 
- **Smart Scheduling Assistant**: Suggest optimal windows for outdoor work by season and historical intervals.
- **Role-based Access for Household**: Read/write roles for family members (basic sharing without multi-tenant complexity).


**Highest priorities (single-household, self-hosted)**
- **Asset registry**: add assets with serials, purchase date, warranty.
- **Task + Recurrence**: create tasks and RRULE recurrence; materialize near-term occurrences.
- **Complete/skip occurrences & logs**: mark occurrences done, attach receipts/photos.
- **Attachment uploads**: presigned/local uploads and download.
- **Email reminders**: simple SMTP support for notifications.
- **Dashboard & Task List/Calendar**: quick view of upcoming maintenance and next occurrences.
- **CSV Import/Export**: assets and tasks.
- **Docker Compose**: easy self-host deploy with Postgres or SQLite backend.
