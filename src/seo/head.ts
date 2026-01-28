import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_ORIGIN,
} from "./site";

function ensureMetaByName(name: string) {
  let el = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  return el;
}

function ensureMetaByProperty(property: string) {
  let el = document.head.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink(rel: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = SITE_ORIGIN.replace(/\/$/, "");
  const p = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${p}`;
}

export interface SeoInput {
  title?: string;
  description?: string;
  path?: string;
  canonicalPath?: string;
  image?: string;
  noindex?: boolean;
}

export function applySeo(input: SeoInput) {
  const title = input.title?.trim() || DEFAULT_TITLE;
  const description = input.description?.trim() || DEFAULT_DESCRIPTION;
  const canonicalPath =
    (input.canonicalPath || input.path || "/").startsWith("/")
      ? input.canonicalPath || input.path || "/"
      : `/${input.canonicalPath || input.path || ""}`;

  const url = toAbsoluteUrl(canonicalPath);
  const image = toAbsoluteUrl(input.image || DEFAULT_OG_IMAGE);

  document.title = title;

  ensureLink("canonical").setAttribute("href", url);
  ensureMetaByName("description").setAttribute("content", description);
  ensureMetaByName("twitter:card").setAttribute("content", "summary_large_image");
  ensureMetaByName("twitter:title").setAttribute("content", title);
  ensureMetaByName("twitter:description").setAttribute("content", description);
  ensureMetaByName("twitter:image").setAttribute("content", image);

  if (input.noindex) {
    ensureMetaByName("robots").setAttribute("content", "noindex,nofollow");
  } else {
    const robotsEl = document.head.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement | null;
    if (robotsEl) robotsEl.remove();
  }

  ensureMetaByProperty("og:site_name").setAttribute("content", SITE_NAME);
  ensureMetaByProperty("og:type").setAttribute("content", "website");
  ensureMetaByProperty("og:title").setAttribute("content", title);
  ensureMetaByProperty("og:description").setAttribute("content", description);
  ensureMetaByProperty("og:url").setAttribute("content", url);
  ensureMetaByProperty("og:image").setAttribute("content", image);
}

export function applySeoFromRouteMeta(to: any) {
  const meta = (to && to.meta) || {};
  const title = typeof meta.title === "string" ? meta.title : undefined;
  const description = typeof meta.description === "string" ? meta.description : undefined;
  const noindex = Boolean(meta.noindex);
  const canonicalPath = typeof meta.canonicalPath === "string" ? meta.canonicalPath : undefined;
  const image = typeof meta.image === "string" ? meta.image : undefined;

  applySeo({
    title,
    description,
    noindex,
    image,
    canonicalPath,
    path: to?.fullPath || "/",
  });
}
