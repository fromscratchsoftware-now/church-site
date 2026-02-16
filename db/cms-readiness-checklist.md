# Church CMS Readiness Checklist (SiteGround)

Use this checklist to confirm the CMS is fully ready for real content entry.

## A) Server prerequisites
- [ ] PHP 8+ available on SiteGround
- [ ] MySQL DB + user created
- [ ] `db/schema.sql` imported successfully
- [ ] `public_html/1/api/config.local.php` uploaded with real DB credentials
- [ ] `ADMIN_PASSWORD_HASH` set in `config.local.php`

## B) Health + routing
- [ ] `https://church.fromscratchsoftware.net/1/api/health.php` returns `{ "ok": true, "db": true }`
- [ ] `https://church.fromscratchsoftware.net/1/events` loads (SPA routing)
- [ ] SiteGround cache flushed after deploy

## C) Admin auth
- [ ] `https://church.fromscratchsoftware.net/1/admin/login.php` accepts password
- [ ] `/1/admin/` dashboard loads

## D) Real content entry tests
### Sermons
- [ ] Create sermon with title/speaker/date
- [ ] Add YouTube URL (`watch?v=` or `/embed/`)
- [ ] Add thumbnail URL
- [ ] Verify row appears in `/1/admin/sermons.php`
- [ ] Verify API includes sermon in `/1/api/sermons.php`
- [ ] Verify frontend renders sermon card and opens video

### Events
- [ ] Create event with title/date/time/location/image/category
- [ ] Verify row appears in `/1/admin/events.php`
- [ ] Verify API includes event in `/1/api/events.php`
- [ ] Verify frontend event card displays correctly

### Testimonials
- [ ] Create testimonial in `/1/admin/testimonials.php`
- [ ] Verify API includes testimonial in `/1/api/testimonials.php`
- [ ] Verify frontend testimonials section shows it

### Forms
- [ ] Submit “Plan Your Visit” form from frontend
- [ ] Submit “Contact” form from frontend
- [ ] Confirm rows appear in `/1/admin/messages.php` (contact + visit)

## E) Content governance
- [ ] Confirm who owns weekly updates (sermons/events)
- [ ] Define naming convention for YouTube titles/thumbnails
- [ ] Set weekly backup cadence for DB

## Notes
- Vercel preview is frontend-only; CMS writes and DB checks must be validated on SiteGround.
- If a page looks stale after deploy, use `?v=<timestamp>` and flush SiteGround Dynamic Cache.
