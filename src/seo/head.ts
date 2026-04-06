import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
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

function removeJsonLd() {
  const existing = document.head.querySelector('script[type="application/ld+json"]');
  if (existing) existing.remove();
}

export interface SeoInput {
    title?: string;
    description?: string;
    path?: string;
    canonicalPath?: string;
    image?: string;
    type?: string;
    noindex?: boolean;
    keywords?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
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
  const type = (input.type || "website").trim() || "website";

  document.title = title;

  // Canonical URL
  ensureLink("canonical").setAttribute("href", url);

  // Basic meta tags
  ensureMetaByName("description").setAttribute("content", description);

  // Keywords - combine default with input keywords
  const combinedKeywords = input.keywords
    ? `${DEFAULT_KEYWORDS},${input.keywords}`
    : DEFAULT_KEYWORDS;
  ensureMetaByName("keywords").setAttribute("content", combinedKeywords);

  // Twitter Cards
  ensureMetaByName("twitter:card").setAttribute("content", "summary_large_image");
  ensureMetaByName("twitter:site").setAttribute("content", "@micrabbit");
  ensureMetaByName("twitter:title").setAttribute("content", title);
  ensureMetaByName("twitter:description").setAttribute("content", description);
  ensureMetaByName("twitter:image").setAttribute("content", image);
  ensureMetaByName("twitter:image:width").setAttribute("content", "1200");
  ensureMetaByName("twitter:image:height").setAttribute("content", "630");

  // Robots
  if (input.noindex) {
    ensureMetaByName("robots").setAttribute("content", "noindex,nofollow");
  } else {
    const robotsEl = document.head.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement | null;
    if (robotsEl) robotsEl.remove();
  }

  // Open Graph
  ensureMetaByProperty("og:site_name").setAttribute("content", SITE_NAME);
  ensureMetaByProperty("og:type").setAttribute("content", type);
  ensureMetaByProperty("og:title").setAttribute("content", title);
  ensureMetaByProperty("og:description").setAttribute("content", description);
  ensureMetaByProperty("og:url").setAttribute("content", url);
  ensureMetaByProperty("og:image").setAttribute("content", image);
  ensureMetaByProperty("og:image:width").setAttribute("content", "1200");
  ensureMetaByProperty("og:image:height").setAttribute("content", "630");
  ensureMetaByProperty("og:locale").setAttribute("content", "zh_CN");

  // Article-specific Open Graph (for blog posts)
  if (type === "article" && input.publishedTime) {
    ensureMetaByProperty("article:published_time").setAttribute("content", input.publishedTime);
    if (input.modifiedTime) {
      ensureMetaByProperty("article:modified_time").setAttribute("content", input.modifiedTime);
    }
    if (input.author) {
      ensureMetaByProperty("article:author").setAttribute("content", input.author);
    }
    if (input.tags && input.tags.length > 0) {
      input.tags.forEach((tag) => {
        ensureMetaByProperty("article:tag").setAttribute("content", tag);
      });
    }
  }

  // JSON-LD Structured Data
  removeJsonLd();
  const jsonLd = type === "article"
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": image,
        "url": url,
        "datePublished": input.publishedTime,
        "dateModified": input.modifiedTime || input.publishedTime,
        "author": {
          "@type": "Person",
          "name": input.author || "MicRabbit",
          "url": SITE_ORIGIN
        },
        "publisher": {
          "@type": "Person",
          "name": "MicRabbit",
          "url": SITE_ORIGIN
        },
        "keywords": combinedKeywords,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": SITE_ORIGIN,
        "description": DEFAULT_DESCRIPTION,
        "publisher": {
          "@type": "Person",
          "name": "MicRabbit",
          "url": SITE_ORIGIN
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_ORIGIN}/?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
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
