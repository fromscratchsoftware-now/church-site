-- Additional sample events (idempotent inserts)
SET NAMES utf8mb4;
SET time_zone = '+00:00';

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Easter Sunrise Service',
       'Celebrate the resurrection of Jesus with an outdoor sunrise service followed by breakfast.',
       'Outdoor Pavilion',
       '2026-04-05 06:00:00', NULL,
       'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80',
       'Worship', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Easter Sunrise Service');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Women''s Conference',
       'Two days of worship, powerful teaching, and life-changing ministry for women of all ages.',
       'Main Sanctuary',
       '2026-04-25 19:00:00', NULL,
       'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
       'Women', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Women''s Conference');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Missions Sunday',
       'Hear inspiring testimonies from missionaries and learn how you can support global missions.',
       'Main Sanctuary',
       '2026-05-03 08:00:00', NULL,
       'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
       'Outreach', 0, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Missions Sunday');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Worship Night',
       'An evening dedicated to worship, prayer, and encountering God''s presence together.',
       'Main Sanctuary',
       '2026-05-16 19:00:00', NULL,
       'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
       'Music', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Worship Night');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'New Members Class',
       'Learn our vision, meet leaders, and discover ways to get connected at Church Name.',
       'Conference Room',
       '2026-05-24 12:30:00', NULL,
       'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80',
       'Community', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='New Members Class');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Youth Summer Camp',
       'A week of outdoor adventure, spiritual growth, and unforgettable memories at our annual youth camp.',
       'Camp Retreat Center',
       '2026-06-15 09:00:00', NULL,
       'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80',
       'Youth', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Youth Summer Camp');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Baptism Sunday',
       'Celebrate life change with baptisms during our Sunday services. Sign up if you''re ready to take your next step.',
       'Main Sanctuary',
       '2026-06-28 10:30:00', NULL,
       'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80',
       'Worship', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Baptism Sunday');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Back to School Blessing',
       'Pray for students, teachers, and families as we prepare for the new school year.',
       'Main Sanctuary',
       '2026-08-09 10:30:00', NULL,
       'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
       'Youth', 0, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Back to School Blessing');

