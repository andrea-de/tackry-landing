import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  // Previewing the built site from another machine on the tailnet: Vite rejects a
  // request whose Host header it does not recognise, and a tailnet name ("hel",
  // "hel.<tailnet>.ts.net") is not localhost. Preview only — this is never served
  // in production, where Vercel serves dist/ directly.
  preview: { allowedHosts: [".ts.net", "hel", "xps", "mac", "nur"] },
  server: { allowedHosts: [".ts.net", "hel", "xps", "mac", "nur"] },
});
