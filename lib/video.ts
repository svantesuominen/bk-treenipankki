const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;
const DRIVE_ID = /^[A-Za-z0-9_-]{10,}$/;

export type ParsedVideo =
  | {
      kind: "youtube";
      id: string;
      embedUrl: string;
      thumbnailUrl: string;
    }
  | {
      kind: "drive";
      id: string;
      embedUrl: string;
    };

export function parseVideoUrl(input: string): ParsedVideo | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }

  if (url.protocol !== "https:") return null;
  const host = url.hostname.toLowerCase().replace(/^www\./, "");

  if (host === "youtu.be") {
    return youtube(url.pathname.split("/").filter(Boolean)[0]);
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") return youtube(url.searchParams.get("v"));
    const [kind, id] = url.pathname.split("/").filter(Boolean);
    if (kind === "embed" || kind === "shorts" || kind === "live" || kind === "v") {
      return youtube(id);
    }
  }

  if (host === "drive.google.com") {
    const fromPath = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1];
    return drive(fromPath ?? url.searchParams.get("id"));
  }

  return null;
}

function youtube(id: string | null | undefined): ParsedVideo | null {
  if (!id || !YOUTUBE_ID.test(id)) return null;
  return {
    kind: "youtube",
    id,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    thumbnailUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
  };
}

function drive(id: string | null | undefined): ParsedVideo | null {
  if (!id || !DRIVE_ID.test(id)) return null;
  return {
    kind: "drive",
    id,
    embedUrl: `https://drive.google.com/file/d/${id}/preview`,
  };
}
