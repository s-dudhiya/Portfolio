import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/CustomCursor";
import { SideNav } from "@/components/SideNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Notes } from "@/components/Notes";
import { Contact } from "@/components/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shabbir Dudhiya — Developer" },
      {
        name: "description",
        content:
          "Cinematic portfolio of Shabbir Dudhiya — Python automation engineer and full-stack developer building scalable backend systems, scraping infrastructure, and real-world digital products.",
      },
      { property: "og:title", content: "Shabbir Dudhiya — Python Automation Engineer" },
      {
        property: "og:description",
        content: "Scalable automation systems & real-world digital products.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain-overlay vignette relative min-h-screen w-full overflow-x-hidden bg-background">
      <CustomCursor />
      <SideNav />
      <main className="relative w-full lg:pr-44 xl:pr-48">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Notes />
        <Contact />
      </main>
    </div>
  );
}
