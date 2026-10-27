import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BK-46 Treenipankki",
    short_name: "Treenipankki",
    description: "BK-46 Fotboll rf:n harjoitteet pelaajille ja valmentajille.",
    start_url: "/",
    display: "standalone",
    background_color: "#d21f2a",
    theme_color: "#d21f2a",
    icons: [
      {
        src: "/bk46-logo.png",
        sizes: "300x300",
        type: "image/png",
      },
    ],
  };
}
