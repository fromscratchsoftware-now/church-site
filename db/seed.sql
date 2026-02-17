-- Seed sample content (idempotent inserts)
SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- Sermons (based on current UI examples)
INSERT INTO sermons (title, speaker, sermon_date, summary, youtube_url, thumbnail_url, duration_seconds, is_published)
SELECT 'Walking in Purpose', 'Pastor James Williams', '2026-02-09',
       'Discover God''s unique calling for your life and learn practical steps to walk confidently in the purpose He has designed specifically for you.',
       'https://www.youtube.com/embed/dQw4w9WgXcQ',
       'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&q=80',
       2700, 1
WHERE NOT EXISTS (SELECT 1 FROM sermons WHERE title='Walking in Purpose' AND sermon_date='2026-02-09');

INSERT INTO sermons (title, speaker, sermon_date, summary, youtube_url, thumbnail_url, duration_seconds, is_published)
SELECT 'The Power of Prayer', 'Minister Sarah Johnson', '2026-02-02',
       'Unlock the supernatural power of prayer and learn how to develop an effective prayer life that moves mountains and transforms circumstances.',
       'https://www.youtube.com/embed/dQw4w9WgXcQ',
       'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&q=80',
       2280, 1
WHERE NOT EXISTS (SELECT 1 FROM sermons WHERE title='The Power of Prayer' AND sermon_date='2026-02-02');

INSERT INTO sermons (title, speaker, sermon_date, summary, youtube_url, thumbnail_url, duration_seconds, is_published)
SELECT 'Faith Over Fear', 'Pastor James Williams', '2026-01-26',
       'Learn how to overcome fear through faith and step into the peace and confidence that comes from trusting God.',
       'https://www.youtube.com/embed/dQw4w9WgXcQ',
       'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=600&q=80',
       2520, 1
WHERE NOT EXISTS (SELECT 1 FROM sermons WHERE title='Faith Over Fear' AND sermon_date='2026-01-26');

-- Events (upcoming)
INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Youth Revival Weekend',
       'Three nights of powerful worship, inspiring messages, and life-changing encounters with God designed specifically for youth.',
       'Main Sanctuary',
       '2026-02-21 19:00:00', NULL,
       'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80',
       'Youth', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Youth Revival Weekend');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Women''s Prayer Breakfast',
       'Join us for a morning of prayer, worship, and fellowship as we seek God''s presence together.',
       'Fellowship Hall',
       '2026-02-28 09:00:00', NULL,
       'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
       'Women', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Women''s Prayer Breakfast');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Community Outreach Day',
       'Serve our community with acts of kindness, free food distribution, and sharing the love of Christ.',
       'City Park',
       '2026-03-01 10:00:00', NULL,
       'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
       'Outreach', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Community Outreach Day');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Marriage Enrichment Seminar',
       'Strengthen your marriage with biblical principles, practical tools, and meaningful connection time.',
       'Conference Room',
       '2026-03-07 18:30:00', NULL,
       'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
       'Couples', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Marriage Enrichment Seminar');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Choir Anniversary Concert',
       'Celebrate 25 years of powerful worship with special guests, testimonies, and an unforgettable musical experience.',
       'Main Sanctuary',
       '2026-03-14 17:00:00', NULL,
       'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
       'Music', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Choir Anniversary Concert');

INSERT INTO events (title, description, location_name, starts_at, ends_at, image_url, category, registration_enabled, is_published)
SELECT 'Men''s Fellowship Breakfast',
       'Men, join us for food, fellowship, and encouragement as we grow together in faith and brotherhood.',
       'Fellowship Hall',
       '2026-03-21 08:00:00', NULL,
       'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80',
       'Men', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM events WHERE title='Men''s Fellowship Breakfast');

-- Testimonials (homepage carousel examples)
INSERT INTO testimonials (full_name, title, quote, avatar_url, is_published, sort_order)
SELECT 'Sarah Johnson', 'Member since 2015',
       'This church has been my spiritual home for years. The community is warm, the teaching is biblical, and I''ve grown so much in my faith here.',
       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
       1, 1
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE full_name='Sarah Johnson' AND avatar_url LIKE '%1494790108377%');

INSERT INTO testimonials (full_name, title, quote, avatar_url, is_published, sort_order)
SELECT 'Michael Thompson', 'Youth Ministry Volunteer',
       'Serving in the youth ministry has been life-changing. Watching young people encounter God''s love and grow in their faith is incredibly rewarding.',
       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
       1, 2
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE full_name='Michael Thompson' AND avatar_url LIKE '%1507003211169%');

INSERT INTO testimonials (full_name, title, quote, avatar_url, is_published, sort_order)
SELECT 'Emily Davis', 'New Member',
       'As a new member, I was welcomed with open arms. The genuine love and care from everyone here made me feel like I belonged from day one.',
       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
       1, 3
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE full_name='Emily Davis' AND avatar_url LIKE '%1438761681033%');

INSERT INTO testimonials (full_name, title, quote, avatar_url, is_published, sort_order)
SELECT 'James Wilson', 'Worship Team',
       'Being part of the worship team has deepened my relationship with God. The way our church community worships together is truly powerful.',
       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
       1, 4
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE full_name='James Wilson' AND avatar_url LIKE '%1500648767791%');

-- Admin users (role-based admin CMS)
-- Default demo credentials (change after first login):
--  - admin / ChurchAdmin!2026
--  - editor / ChurchEditor!2026
INSERT INTO admin_users (full_name, username, email, password_hash, role, is_active)
SELECT 'Church Admin', 'admin', 'admin@church.local', '$2b$10$r0AyIXeO3HtL9X5bfmnH/uNmbepYvYDZcx2d.HOUQ.9XJD8IGfMw2', 'admin', 1
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username='admin' OR email='admin@church.local');

INSERT INTO admin_users (full_name, username, email, password_hash, role, is_active)
SELECT 'Church Editor', 'editor', 'editor@church.local', '$2b$10$4sTOs6fNZKNmYluPZ2UtL.RZwc6uAd49cSu5qIRwntSaBRMWXLuVW', 'editor', 1
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE username='editor' OR email='editor@church.local');

