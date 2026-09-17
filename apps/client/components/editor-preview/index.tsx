/**
 * Static illustrative "editor window" shown on the homepage hero.
 * Represents CodeRoom's actual product surface — a shared editor with
 * live collaborator cursors and a terminal — rather than decorative
 * screenshots or floating cards.
 *
 * Colors are inlined as hex values on purpose: this component should
 * render correctly even before/without any tailwind.config.ts changes.
 *
 * This is presentational only; it renders no real session data.
 */

const PRESENCE = {
  red: "#F2555A",
  amber: "#E8B84B",
  teal: "#4FD1C5",
  green: "#3FB950",
} as const;

const FILE_TABS = [
  { name: "app.tsx", active: true },
  { name: "server.ts", active: false },
  { name: "styles.css", active: false },
];

function PresenceCaret({ color, name }: { color: string; name: string }) {
  return (
    <span className="relative ml-2 inline-flex items-center gap-1.5 align-middle">
      <span
        className="inline-block h-3.5 w-0.5 animate-pulse"
        style={{ backgroundColor: color }}
      />
      <span
        className="rounded px-1.5 py-px font-medium font-sans text-[10px]"
        style={{ backgroundColor: color, color: "#0A0D12" }}
      >
        {name}
      </span>
    </span>
  );
}

const EditorPreview = () => (
  <div
    className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card"
    style={{ boxShadow: "0 40px 80px -30px rgba(0,0,0,0.6)" }}
  >
    {/* Window chrome */}
    <div
      className="flex items-center gap-2 border-border border-b px-3.5 py-2.5"
      style={{ backgroundColor: "hsl(var(--panel-2))" }}
    >
      <span
        className="size-2.5 rounded-full"
        style={{ backgroundColor: PRESENCE.red }}
      />
      <span
        className="size-2.5 rounded-full"
        style={{ backgroundColor: PRESENCE.amber }}
      />
      <span
        className="size-2.5 rounded-full"
        style={{ backgroundColor: PRESENCE.green }}
      />
    </div>

    {/* File tabs */}
    <div
      className="flex border-border border-b"
      style={{ backgroundColor: "hsl(var(--panel-2))" }}
    >
      {FILE_TABS.map((tab) => (
        <div
          className={
            tab.active
              ? "border-b-2 bg-card px-4 py-2 font-mono text-foreground text-xs"
              : "border-transparent border-r border-b-2 px-4 py-2 font-mono text-muted-foreground text-xs"
          }
          key={tab.name}
          style={
            tab.active
              ? { borderBottomColor: "hsl(var(--primary))" }
              : undefined
          }
        >
          {tab.name}
        </div>
      ))}
    </div>

    {/* Code */}
    <div className="flex py-4 font-mono text-[13px] leading-[1.85]">
      <div className="select-none pr-3.5 pl-4 text-right text-muted-foreground/50">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div className="flex-1 pr-5 text-foreground/90">
        <div>
          <span style={{ color: "#C792EA" }}>import</span> {"{ useRoom }"}{" "}
          <span style={{ color: "#C792EA" }}>from</span>{" "}
          <span style={{ color: "#C3E88D" }}>&quot;./hooks&quot;</span>
        </div>
        <div>&nbsp;</div>
        <div>
          <span style={{ color: "#C792EA" }}>export function</span>{" "}
          <span style={{ color: "#82AAFF" }}>Editor</span>() {"{"}
        </div>
        <div>
          {"  "}
          <span style={{ color: "#C792EA" }}>const</span> [content, setContent]
          = <span style={{ color: "#82AAFF" }}>useState</span>(
          <span style={{ color: "#C3E88D" }}>&quot;&quot;</span>)
          <PresenceCaret color={PRESENCE.amber} name="Ananya" />
        </div>
        <div>&nbsp;</div>
        <div>
          {"  "}
          <span style={{ color: "#C792EA" }}>return</span> &lt;
          <span style={{ color: "#82AAFF" }}>CodeMirror</span> value=
          {"{content}"}
          <PresenceCaret color={PRESENCE.teal} name="Marcus" />
        </div>
        <div>
          {"    "}onChange={"{setContent}"} {"/>"}
        </div>
        <div>{"}"}</div>
        <div className="text-muted-foreground/70">
          {/* synced across 2 collaborators */}
        </div>
      </div>
    </div>

    {/* Presence row */}
    <div className="flex items-center gap-2.5 border-border border-t px-4 py-3">
      <div className="flex -space-x-2">
        <span
          className="flex size-[22px] items-center justify-center rounded-full border-2 font-semibold text-[10px]"
          style={{
            backgroundColor: PRESENCE.amber,
            borderColor: "hsl(var(--card))",
            color: "#0A0D12",
          }}
        >
          A
        </span>
        <span
          className="flex size-[22px] items-center justify-center rounded-full border-2 font-semibold text-[10px]"
          style={{
            backgroundColor: PRESENCE.teal,
            borderColor: "hsl(var(--card))",
            color: "#0A0D12",
          }}
        >
          M
        </span>
      </div>
      <span className="text-muted-foreground text-xs">
        2 people editing this file
      </span>
    </div>

    {/* Terminal strip */}
    <div
      className="border-border border-t px-4 py-3 font-mono text-xs"
      style={{ backgroundColor: "hsl(var(--panel-2))" }}
    >
      <div className="text-muted-foreground">
        <span style={{ color: PRESENCE.green }}>➜</span> npm run dev
      </div>
      <div className="mt-1 text-muted-foreground/60">
        ✓ ready on http://localhost:3000
      </div>
    </div>
  </div>
);

export { EditorPreview };
