import { Suspense } from "react";

import { EditorPreview } from "@/components/editor-preview";
import { RoomAccessForm } from "@/components/room-access-form";

const FEATURES = [
  "Shared terminal",
  "Live preview",
  "GitHub sync",
  "Video & voice",
];

export default async function Page({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const roomId = params.room?.toString() || "";

  return (
    <main className="dark flex min-h-dvh w-full flex-col bg-background lg:h-dvh lg:flex-row lg:overflow-hidden">
      {/* Left: intro + form */}
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 lg:w-[42%] lg:border-border/60 lg:border-r lg:px-14 lg:py-8">
        <div className="mx-auto w-full max-w-md lg:mx-0">
          {/* Logo mark — plain code-bracket glyph, no external asset */}
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary font-bold font-mono text-primary-foreground text-sm">
              {"<>"}
            </span>
            <span className="font-bold font-mono text-foreground text-lg tracking-tight">
              CodeRoom
            </span>
          </div>

          <h1 className="mb-3 font-semibold text-3xl text-foreground leading-[1.15] tracking-tight sm:text-4xl">
            Code together,
            <br />
            in real time.
          </h1>
          <p className="mb-6 max-w-sm text-muted-foreground text-sm sm:text-base">
            A shared editor, terminal, and preview for your team — no sign-up,
            no setup. Open a room and start.
          </p>

          <Suspense fallback={null}>
            <RoomAccessForm roomId={roomId} />
          </Suspense>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {FEATURES.map((feature) => (
              <span
                className="flex items-center gap-1.5 text-muted-foreground text-xs"
                key={feature}
              >
                <span className="size-1 rounded-full bg-muted-foreground/60" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: editor mockup */}
      <div className="relative hidden flex-1 items-center justify-center overflow-hidden p-12 lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_700px_500px_at_65%_35%,hsl(var(--primary)/0.08),transparent_70%)]"
        />
        <EditorPreview />
      </div>
    </main>
  );
}
