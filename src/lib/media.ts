/**
 * Normalizes an image path or full URL for cholilnafis.id.
 * Ensures that images pointing to api.mcnid.net are always loaded over HTTPS.
 */
export function getPublicImageUrl(path: string | null | undefined): string {
  if (!path) return "/placeholder-news.jpg";

  // Use the public API URL from env or fallback to the official secure one
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.mcnid.net";
  
  // 1. If it's a JSON-stringified array (legacy format used in some posts), parse it
  let cleanPath = path;
  if (path.startsWith("[") && path.endsWith("]")) {
    try {
      const parsed = JSON.parse(path);
      if (Array.isArray(parsed) && parsed.length > 0) cleanPath = parsed[0];
    } catch {
      // Not a JSON array, use as-is
    }
  }

  // 2. If it points to api.mcnid.net via http (insecure) or localhost, normalize it
  if (cleanPath.includes("http://api.mcnid.net") || cleanPath.includes("localhost:4000")) {
    return cleanPath.replace("http://api.mcnid.net", "https://api.mcnid.net")
                    .replace(/http:\/\/localhost:4000/g, publicApiUrl);
  }

  // 3. If it's a relative path (e.g. "uploads/..."), prefix it with the API URL
  if (!cleanPath.startsWith("http")) {
    const prefixedPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    return `${publicApiUrl}${prefixedPath}`;
  }

  // 4. Default: already an absolute URL (e.g. S3, external)
  // Double-check our domain to upgrade it just in case
  return cleanPath.replace("http://api.mcnid.net", "https://api.mcnid.net");
}
