import { SITE } from "../config/site";
import { loadWithFallback } from "./data";

export type Sermon = {
  title: string;
  speaker: string;
  date: string;
  category: string;
  series: string;
  image: string;
  duration: string;
  views: string;
  videoUrl: string;
  description: string;
};

export type Event = {
  title: string;
  date: string;
  time: string;
  category: string;
  status: string;
  location: string;
  image: string;
  description: string;
};

export type Testimonial = {
  name: string;
  role: string;
  category: string;
  image: string;
  quote: string;
  rating: number;
  date: string;
};

type SermonsApiResponse = {
  ok: boolean;
  sermons?: Array<{
    id: number;
    title: string;
    speaker: string | null;
    sermon_date: string | null;
    summary: string | null;
    youtube_url: string | null;
    audio_url: string | null;
    thumbnail_url: string | null;
    duration_seconds: number | null;
  }>;
  error?: string;
};

type EventsApiResponse = {
  ok: boolean;
  events?: Array<{
    id: number;
    title: string;
    description: string | null;
    location_name: string | null;
    starts_at: string | null;
    ends_at: string | null;
    image_url: string | null;
    category: string | null;
  }>;
  error?: string;
};

type TestimonialsApiResponse = {
  ok: boolean;
  testimonials?: Array<{
    full_name: string;
    title: string | null;
    quote: string;
    avatar_url: string | null;
    created_at?: string | null;
  }>;
  error?: string;
};

function formatDuration(durationSeconds: number | null): string {
  if (!durationSeconds || durationSeconds <= 0) return "";
  const minutes = Math.round(durationSeconds / 60);
  return `${minutes} min`;
}

function toEmbedUrl(url: string | null): string {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const m = url.match(/[?&]v=([^&]+)/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return url;
}

function formatEventDateTime(startsAt: string | null): { date: string; time: string; status: string } {
  if (!startsAt) return { date: "TBD", time: "TBD", status: "upcoming" };
  const d = new Date(startsAt);
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const now = new Date();
  const diffDays = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  const status = diffDays <= 7 ? "this_week" : "upcoming";
  return { date, time, status };
}

export async function loadSermons(fallback: Sermon[]): Promise<Sermon[]> {
  if (!SITE.features.useLiveApi) return fallback;

  return loadWithFallback<SermonsApiResponse, Sermon[]>({
    url: "api/sermons.php",
    fallback,
    isValid: (api) => Boolean(api && api.ok && Array.isArray(api.sermons)),
    map: (api) =>
      (api.sermons || []).map((s) => ({
        title: s.title,
        speaker: s.speaker || SITE.name,
        date: s.sermon_date ? new Date(s.sermon_date).toLocaleDateString() : "",
        category: "Recent",
        series: "Sunday Service",
        image: s.thumbnail_url || "/images/unsplash/1507692049790-de58290a4334-w800.jpg",
        duration: formatDuration(s.duration_seconds),
        views: "",
        videoUrl: toEmbedUrl(s.youtube_url) || SITE.links.youtubeLive,
        description: s.summary || "",
      })),
  });
}

export async function loadEvents(fallback: Event[]): Promise<Event[]> {
  if (!SITE.features.useLiveApi) return fallback;

  return loadWithFallback<EventsApiResponse, Event[]>({
    url: "api/events.php",
    fallback,
    isValid: (api) => Boolean(api && api.ok && Array.isArray(api.events)),
    map: (api) =>
      (api.events || []).map((e) => {
        const dt = formatEventDateTime(e.starts_at);
        return {
          title: e.title,
          date: dt.date,
          time: dt.time,
          status: dt.status,
          category: e.category || "Community",
          location: e.location_name || "TBD",
          image: e.image_url || "/images/unsplash/1507692049790-de58290a4334-w800.jpg",
          description: e.description || "",
        };
      }),
  });
}

export async function loadTestimonials(fallback: Testimonial[]): Promise<Testimonial[]> {
  if (!SITE.features.useLiveApi) return fallback;

  return loadWithFallback<TestimonialsApiResponse, Testimonial[]>({
    url: "api/testimonials.php",
    fallback,
    isValid: (api) => Boolean(api && api.ok && Array.isArray(api.testimonials)),
    map: (api) =>
      (api.testimonials || []).map((t) => ({
        name: t.full_name,
        role: t.title || "",
        category: "All",
        image: t.avatar_url || "/images/unsplash/1494790108377-be9c29b29330-w400.jpg",
        quote: t.quote,
        rating: 5,
        date: t.created_at ? new Date(t.created_at).toLocaleDateString(undefined, { month: "long", year: "numeric" }) : "",
      })),
  });
}
