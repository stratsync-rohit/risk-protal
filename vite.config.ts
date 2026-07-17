import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  // Generate Vercel Build Output API files instead of the Cloudflare fallback.
  nitro: { preset: "vercel" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
