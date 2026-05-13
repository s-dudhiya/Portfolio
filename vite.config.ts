import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { copyFileSync, existsSync, mkdirSync } from "fs";

function copyPublicFilesToClient() {
  return {
    name: "copy-public-files-to-client",
    closeBundle() {
      mkdirSync("dist/client", { recursive: true });

      if (existsSync("public/shabbir-resume.pdf")) {
        copyFileSync("public/shabbir-resume.pdf", "dist/client/shabbir-resume.pdf");
      }

      if (existsSync("public/favicon.ico")) {
        copyFileSync("public/favicon.ico", "dist/client/favicon.ico");
      }
    },
  };
}

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
    },
  },
  vite: {
    plugins: [copyPublicFilesToClient()],
  },
});