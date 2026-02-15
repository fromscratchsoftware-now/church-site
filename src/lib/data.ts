import { apiPath, getJson } from "./api";

export async function loadWithFallback<TApi, TOut>(opts: {
  url: string;
  fallback: TOut;
  isValid: (api: TApi) => boolean;
  map: (api: TApi) => TOut;
}): Promise<TOut> {
  try {
    const api = await getJson<TApi>(apiPath(opts.url));
    if (!opts.isValid(api)) return opts.fallback;
    return opts.map(api);
  } catch {
    return opts.fallback;
  }
}
