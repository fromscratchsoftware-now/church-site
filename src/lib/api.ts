function absoluteUrl(path: string): string {
  // path can be absolute-like: "/1/api/..." or relative-like: "api/..."
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith("/")) return new URL(path, window.location.origin).toString();
  return new URL(path, window.location.origin + "/").toString();
}

export function apiPath(path: string): string {
  // BASE_URL is "/1/" in production, "/" in dev.
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\/+/, "")}`;
}

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(absoluteUrl(path), {
    method: "GET",
    ...init,
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return data;
}

export async function postJson<T>(path: string, body: unknown, init?: RequestInit): Promise<T> {
  const res = await fetch(absoluteUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    body: JSON.stringify(body),
    ...init,
  });

  const text = await res.text();
  const data = text ? (JSON.parse(text) as T) : ({} as T);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return data;
}
