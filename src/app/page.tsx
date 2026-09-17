"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

const integrations = ["Mintlify", "Knowunity", "Composio", "Cargo", "Loop AI", "Moda", "Dart", "Chronicle Labs", "Sorce", "Taiga", "Trellis", "Hyperspell", "Totalis", "Parrot"];
const heroAgents = ["Claude Code", "Codex", "Opencode", "Cursor", "Pi", "DeepSeek", "Kimi", "Muse Code"];
const integrationMedia = {
  Dashboard: ["dashboard.png", "dashboard-alpha.webm"],
  Slack: ["slack.png", "slack-alpha.webm"],
  Linear: ["linear.png", "linear-alpha.webm"],
  "GitHub & GitLab": ["github.png", "github-alpha.webm"],
  "Automations & API": ["automations.png", "automations-alpha.webm"],
} as const;

const providerSlug = (provider: string) => provider.toLowerCase().replace(/\s+/g, "");

function ProviderLogo({ provider }: { provider: string }) {
  if (provider === "Claude Code") return <svg className="provider-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" /></svg>;
  if (provider === "Codex") return <svg className="provider-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zM9.4041 10.4976l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" /></svg>;
  if (provider === "Opencode") return <svg className="provider-logo provider-logo-opencode" viewBox="0 0 240 300" aria-hidden="true"><path fill="currentColor" d="M180 240H60V120H180V240Z" /><path fill="currentColor" d="M180 60H60V240H180V60ZM240 300H0V0H240V300Z" opacity=".72" /></svg>;
  if (provider === "Cursor") return <svg className="provider-logo" viewBox="640 340 320 320" aria-hidden="true"><path fill="currentColor" d="M920.015 424.958 805.919 359.086c-3.663-2.116-8.184-2.116-11.848 0l-114.09 65.872c-3.08 1.778-4.981 5.067-4.981 8.629v132.832c0 3.562 1.901 6.85 4.981 8.629l114.096 65.872c3.663 2.116 8.184 2.116 11.848 0l114.095-65.872c3.08-1.779 4.981-5.067 4.981-8.629V433.587c0-3.562-1.901-6.851-4.981-8.629h-.005Zm-7.167 13.953L802.706 629.682c-.745 1.286-2.711.761-2.711-.728V504.039c0-2.496-1.333-4.805-3.497-6.058l-108.177-62.455c-1.285-.745-.76-2.71.729-2.71h220.284c3.128 0 5.083 3.39 3.519 6.101h-.005Z" /></svg>;
  if (provider === "Pi") return <svg className="provider-logo" viewBox="0 0 800 800" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M165.29 165.29h352.07V400H400v117.36H282.65v117.36H165.29V165.29Zm117.36 117.36V400H400V282.65H282.65Z" /><path fill="currentColor" d="M517.36 400h117.36v234.72H517.36V400Z" /></svg>;
  if (provider === "DeepSeek") return <svg className="provider-logo provider-logo-deepseek" viewBox="0 0 56.2 41.36" aria-hidden="true"><path fill="currentColor" d="M55.613 3.471c-.596-.292-.852.264-1.2.547-.12.09-.22.21-.321.319-.87.929-1.887 1.54-3.215 1.467-1.942-.11-3.6.5-5.064 1.986-.312-1.831-1.347-2.925-2.922-3.626-.825-.365-1.658-.73-2.235-1.522-.403-.565-.513-1.194-.714-1.813-.129-.374-.257-.756-.687-.82-.467-.073-.65.319-.834.647-.732 1.339-1.016 2.815-.989 4.309.064 3.362 1.484 6.04 4.305 7.945.32.218.403.437.302.756-.192.656-.421 1.294-.623 1.95-.128.419-.32.51-.769.328-1.548-.647-2.885-1.604-4.067-2.761-2.006-1.94-3.819-4.082-6.081-5.758a22.9 22.9 0 0 0-1.612-1.103c-2.308-2.241.302-4.082.907-4.3.632-.228.22-1.012-1.823-1.003-2.042.01-3.91.693-6.292 1.604-.348.137-.714.237-1.09.319-2.161-.41-4.405-.501-6.75-.237-4.414.492-7.94 2.579-10.532 6.141C.191 13.129-.541 17.994.356 23.069c.944 5.348 3.673 9.776 7.868 13.239 4.35 3.589 9.36 5.348 15.076 5.01 3.471-.2 7.336-.664 11.696-4.354 1.099.546 2.253.765 4.167.929 1.475.136 2.895-.073 3.994-.301 1.722-.364 1.603-1.959.98-2.25-5.047-2.351-3.939-1.394-4.946-2.169 2.564-3.034 6.43-6.186 7.94-16.4.12-.81.019-1.321 0-1.977-.009-.4.083-.556.54-.601 1.265-.146 2.492-.492 3.619-1.112 3.27-1.785 4.588-4.72 4.9-8.236.045-.538-.01-1.094-.577-1.376ZM27.119 35.123c-4.891-3.845-7.263-5.112-8.243-5.057-.916.055-.751 1.103-.55 1.786.211.674.486 1.139.87 1.731.266.392.45.975-.265 1.412-1.575.976-4.314-.327-4.442-.391-3.188-1.877-5.853-4.355-7.73-7.745-1.814-3.262-2.867-6.76-3.041-10.496-.046-.902.22-1.221 1.117-1.385a14.16 14.16 0 0 1 3.581-.09c4.992.728 9.242 2.96 12.805 6.495 2.033 2.014 3.572 4.42 5.156 6.77 1.686 2.496 3.5 4.875 5.807 6.824.815.684 1.465 1.203 2.088 1.586-1.877.21-5.01.255-7.153-1.44Zm2.345-15.079a.72.72 0 1 1 1.438 0 .72.72 0 0 1-1.438 0Zm7.281 3.736c-.467.191-.934.355-1.383.373-.696.037-1.456-.246-1.868-.592-.641-.538-1.099-.839-1.292-1.777-.082-.4-.036-1.02.037-1.375.165-.766-.018-1.257-.559-1.704-.44-.364-.998-.465-1.612-.465-.229 0-.44-.1-.595-.182-.257-.128-.467-.447-.266-.838.064-.128.376-.438.449-.492.833-.474 1.795-.319 2.684.036.824.337 1.447.957 2.344 1.831.916 1.057 1.08 1.349 1.603 2.142.412.619.788 1.257 1.044 1.986.156.455-.045.829-.586 1.057Z" /></svg>;
  if (provider === "Kimi") return <svg className="provider-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.7 16.8A9 9 0 1 1 7.2 4.3 7.25 7.25 0 0 0 19.7 16.8Z" /></svg>;
  return <svg className="provider-logo provider-logo-muse" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 4h4.5l4.5 7.2L16.5 4H21v16h-4V10.5l-5 7.5-5-7.5V20H3V4Z" /></svg>;
}

const faqs = [
  ["What kind of work can Klyna run?", "Start with a ticket, pull request, production alert, or short prompt. Klyna turns it into a scoped engineering run with a visible plan and a reviewable result."],
  ["Do we need to change our workflow?", "No. Use the tools your team already has. Klyna can be started from the dashboard, a chat thread, an issue, or an API call."],
  ["How are workspaces isolated?", "Each run receives an independent, short-lived environment with a repository checkout, its own secrets boundary, and a full activity record."],
  ["Can we use our preferred coding tools?", "Yes. Set a team default or choose a harness per task. Your organization keeps control of environment setup and allowed integrations."],
  ["How does billing work?", "Usage is attributed to the workspace, harness, model, and credential that ran it, so teams can understand exactly what their engineering automation costs."],
];

const environmentTabs = [
  ["Isolated VMs", "Every task boots its own Linux VM in the cloud, sharing nothing with the agents running beside it."],
  ["Configured Environments", "Warm hooks preinstall your dependencies and images, along with MCPs, skills, files, and variables."],
  ["Full Computer Use", "Agents drive a real desktop and browser, then hand back screenshots and screen recordings of the work."],
] as const;

const environmentMedia = [
  ["machines", "machines.png", "machines.webm"],
  ["configure", "configure.png", "configure.webm"],
  ["computer-use", "computer-use.png", "computer-use.webm"],
] as const;

const HERO_GRID_COLUMNS = 256;
const HERO_GRID_ROWS = 160;
const HERO_CELL_SIZE = 64;
type LifePattern = ReadonlyArray<readonly [number, number]>;
const lifeCellKey = (row: number, column: number) => `${row}:${column}`;

const glider: LifePattern = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
const blinker: LifePattern = [[0, 0], [0, 1], [0, 2]];
const toad: LifePattern = [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]];
const movingPatterns = [glider, blinker, toad] as const;

function movingSeeds(seed: number) {
  let value = (seed + 1) * 1664525 + 1013904223;
  const nextRandom = () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
  const cells = new Set<string>();
  movingPatterns.forEach((pattern, index) => {
    const row = 64 + Math.floor(nextRandom() * 30);
    const column = 104 + Math.floor(nextRandom() * 48);
    pattern.forEach(([rowOffset, columnOffset]) => {
      cells.add(lifeCellKey(row + rowOffset, column + columnOffset));
    });
    if (index === movingPatterns.length - 1) {
      const extraColumn = 104 + Math.floor(nextRandom() * 48);
      cells.add(lifeCellKey(70 + Math.floor(nextRandom() * 24), extraColumn));
    }
  });
  return cells;
}

const initialLifeCells = (() => {
  const cells = new Set<string>();
  const place = (row: number, column: number, pattern: LifePattern) => {
    pattern.forEach(([rowOffset, columnOffset]) => {
      cells.add(lifeCellKey(row + rowOffset, column + columnOffset));
    });
  };

  // Keep the initial population around the center of the large virtual field.
  // This mirrors the reference composition while leaving enough empty space
  // for the simulation to breathe on every viewport.
  place(74, 106, blinker);
  place(74, 122, blinker);
  place(74, 138, blinker);
  // Keep the visible composition moving: every seed is an oscillator or
  // travelling pattern, so the field never contains hand-pinned still lifes.
  place(75, 116, toad);
  place(75, 135, blinker);
  place(66, 109, glider);
  place(66, 135, toad);
  place(88, 101, glider);
  place(88, 146, glider);
  place(98, 116, toad);
  place(107, 126, blinker);

  return cells;
})();

// Conway's Game of Life, B3/S23: every generation is calculated from the
// previous generation so births and deaths happen simultaneously.
function evolveLife(cells: ReadonlySet<string>) {
  const neighbourCounts = new Map<string, number>();

  cells.forEach((cell) => {
    const [rowText, columnText] = cell.split(":");
    const row = Number(rowText);
    const column = Number(columnText);
    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
        if (rowOffset === 0 && columnOffset === 0) continue;
        const neighbourRow = (row + rowOffset + HERO_GRID_ROWS) % HERO_GRID_ROWS;
        const neighbourColumn = (column + columnOffset + HERO_GRID_COLUMNS) % HERO_GRID_COLUMNS;
        const neighbour = lifeCellKey(neighbourRow, neighbourColumn);
        neighbourCounts.set(neighbour, (neighbourCounts.get(neighbour) ?? 0) + 1);
      }
    }
  });

  const nextGeneration = new Set<string>();
  neighbourCounts.forEach((count, cell) => {
    if (count === 3 || (count === 2 && cells.has(cell))) nextGeneration.add(cell);
  });
  return nextGeneration;
}

function Arrow() { return <span aria-hidden="true">↗</span>; }

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealIfVisible = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) node.classList.add("is-visible");
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => { revealIfVisible(node); observer.observe(node); });
    const onScroll = () => nodes.forEach(revealIfVisible);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);
}

function ProductMark() {
  return <span className="product-mark" aria-hidden="true"><i /><i /><i /><i /></span>;
}

type NavIconKind = "pricing" | "blog" | "enterprise" | "customers" | "docs";

function NavIcon({ kind }: { kind: NavIconKind }) {
  const paths = {
    pricing: <><path d="M12 4v16" /><path d="M16 7.5c-.7-1-2-1.5-4-1.5-2.4 0-4 1.1-4 2.8 0 4.2 8 1.8 8 6 0 1.7-1.6 2.7-4 2.7-2 0-3.3-.5-4-1.5" /></>,
    blog: <><rect x="5" y="4" width="14" height="16" rx="1" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    enterprise: <><path d="M5 20V9l5-3v14M10 20h9V4h-9M13 8h3M13 12h3M13 16h3" /></>,
    customers: <><circle cx="9" cy="8" r="2.5" /><circle cx="16" cy="9" r="2" /><path d="M4.5 18c.3-2.7 2-4.2 4.5-4.2s4.2 1.5 4.5 4.2M14 14c2.7-.2 4.5 1.1 5 3.5" /></>,
    docs: <><path d="M5 4.5h5c1.1 0 2 .9 2 2V20c0-1.1-.9-2-2-2H5zM19 4.5h-5c-1.1 0-2 .9-2 2V20c0-1.1.9-2 2-2h5z" /></>,
  };
  return <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

function PreviewChrome({ label }: { label: string }) {
  return <div className="preview-chrome"><span className="preview-logo"><ProductMark /></span><span>{label}</span><span className="preview-menu">···</span></div>;
}

function IntegrationsPreview({ kind, paused }: { kind: string; paused: boolean }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setPhase((current) => (current + 1) % 3), 2400);
    return () => window.clearInterval(timer);
  }, [paused]);
  const media = integrationMedia[kind as keyof typeof integrationMedia];
  if (media) return <div className="integration-preview reference-integration-preview" style={{ backgroundImage: `url(https://replicas.dev/landing/integrations/${media[0]})` }}><video autoPlay={!paused} loop muted playsInline poster={`https://replicas.dev/landing/integrations/${media[0]}`} src={`https://replicas.dev/landing/integrations/${media[1]}`} /></div>;
  if (kind === "Dashboard") { const messages = ["Show file provenance in the changes tree", "Reviewing the changes tree and test output", "Ready to open a pull request"]; return <div className="integration-preview dashboard-preview"><PreviewChrome label="Replicas / workspace" /><div className="preview-sidebar"><b>⌘</b><span>Search</span><span>Environments</span><span>Automations</span><span>Analytics</span><span>Settings</span></div><div className="preview-main"><div className="preview-tabs"><b>Claude Code 1</b><span>Codex 2</span><span>Cursor 1</span></div><p className="preview-muted preview-changing">{messages[phase]}</p><p>Four chats now read as four coloured threads. The work is visible, reviewable, and ready to send.</p><div className="code-window"><small>{phase === 2 ? "pull request" : "diff"}</small><code>+ export function ChangesTree(files) {'{'}</code><code className={phase > 0 ? "line-added" : ""}>+ &nbsp; &nbsp;return files.map((file) =&gt; &lt;FileRow /&gt;)</code><code>{'}'}</code></div><div className="preview-input">{phase === 2 ? "Create a pull request from these changes" : "Ask Claude Code to help with coding tasks..."} <b>↗</b></div></div></div>; }
  if (kind === "Slack") return <div className="integration-preview slack-preview"><div className="slack-window"><div className="slack-window-bar"><span> # feature-requests</span><b>···</b></div><div className="slack-thread"><div className="slack-person"><span className="avatar">C</span><b>Connor</b><small>2:34 PM</small></div><p><strong>@Replicas</strong> {phase === 0 ? "can you add dark mode to settings?" : "fix the flaky checkout test"}</p><span className="slack-reaction">◉ 1</span></div></div><div className="slack-followup"><ProductMark /><b>Replicas</b><small> APP · 2:34 PM</small><p>{phase === 2 ? "Done — added a theme toggle in Settings → Appearance." : "Reproducing in a workspace..."}</p>{phase === 2 && <span className="slack-pr">↗ &nbsp; View PR #418</span>}</div></div>;
  if (kind === "Linear") return <div className="integration-preview linear-preview"><div className="linear-window"><div className="linear-window-bar"><span><i>◉</i> ENG-142</span><b className="linear-status">◐ In Progress</b></div><h4>Implement notification preferences</h4><div className="linear-assignee"><small>Assignee</small><span><ProductMark /> Replicas</span></div>{phase === 2 && <div className="linear-log">AGENT SESSION · reading issue context</div>}</div></div>;
  if (kind === "GitHub & GitLab") return <div className="integration-preview github-preview"><div className="github-window"><div className="github-window-bar"><span><i>◉</i><i>◒</i> src/api/handler.ts</span><b>PR #479</b></div><div className="diff-lines"><code>12&nbsp;&nbsp; const result = await fetch(url);</code><code className="line-removed">13 - return result.json();</code><code className="line-added">13 + return await result.json();</code><code>14&nbsp;&nbsp; &#125;</code></div><div className="review-note"><div><span className="review-avatar">C</span><b>connortbot</b><small>@tryreplicas</small></div><p>this never awaits — can you fix it?</p><div className="review-reply"><ProductMark /><b>replicas-connector</b><small>BOT</small></div><p className="reply-copy">{phase === 2 ? "Fixed — the promise was never awaited." : "Reproducing in a workspace..."}</p></div></div></div>;
  const apiLines = phase === 0 ? ["curl -X POST https://api.klyna.dev/v1/replica", "-H Authorization: Bearer $API_KEY", "-d '{", "  \"name\": \"fix-auth-bug\",", "  \"environment_id\": \"$ENV_ID\",", "  \"message\": \"Fix the login timeout\",", "  \"coding_agent\": \"claude\"", "}'"] : phase === 1 ? ["curl -X POST https://api.klyna.dev/v1/replica", "-d '{ \"message\": \"Run tests\" }'", "", "status: creating workspace", "", "", "", ""] : ["POST /v1/replica", "202 Accepted", "", "workspace_id: ws_2048", "agent: claude", "status: running", "", ""];
  return <div className="integration-preview api-preview"><div className="automation-window"><div className="automation-title"><span>ϟ</span> Triage Flaky Tests</div><div className="automation-rule"><small>TRIGGER</small><div><b>◉</b> Every weekday at 9:00 AM</div><small>ACTION</small><div><b>‹›</b> {phase === 2 ? "Notify the team in Slack" : "Quarantine flaky specs"}</div></div></div></div>;
}

export default function Home() {
  useReveal();
  const [fieldPaused, setFieldPaused] = useState(false);
  const [liveCells, setLiveCells] = useState<Set<string>>(initialLifeCells);
  const [previousLifeCells, setPreviousLifeCells] = useState<Set<string>>(initialLifeCells);
  const [integrationPaused, setIntegrationPaused] = useState(false);
  const [flowPaused, setFlowPaused] = useState(false);
  const [flowTick, setFlowTick] = useState(0);
  const [analyticsPaused, setAnalyticsPaused] = useState(false);
  const [analyticsTick, setAnalyticsTick] = useState(0);
  const [environmentPaused, setEnvironmentPaused] = useState(false);
  const [whatIsOpen, setWhatIsOpen] = useState(false);
  const [environment, setEnvironment] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const lifeGeneration = useRef(0);
  const [fieldAlignment, setFieldAlignment] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const alignFieldToGrid = () => {
      const hero = document.querySelector<HTMLElement>(".hero");
      const field = document.querySelector<HTMLElement>(".agent-field");
      if (!hero || !field) return;
      const heroBounds = hero.getBoundingClientRect();
      const fieldBounds = field.getBoundingClientRect();
      const remainder = (value: number) => ((value % HERO_CELL_SIZE) + HERO_CELL_SIZE) % HERO_CELL_SIZE;
      setFieldAlignment({
        x: -remainder(fieldBounds.left - heroBounds.left),
        y: -remainder(fieldBounds.top - heroBounds.top),
      });
    };
    alignFieldToGrid();
    window.addEventListener("resize", alignFieldToGrid);
    return () => window.removeEventListener("resize", alignFieldToGrid);
  }, []);

  useEffect(() => {
    if (fieldPaused) return;
    const timer = window.setInterval(() => {
      setLiveCells((current) => {
        setPreviousLifeCells(current);
        const generation = lifeGeneration.current;
        lifeGeneration.current += 1;
        const evolved = evolveLife(current);
        return generation % 4 === 0 || evolved.size < 14 ? movingSeeds(generation) : evolved;
      });
    }, 1333);
    return () => window.clearInterval(timer);
  }, [fieldPaused]);

  useEffect(() => {
    if (flowPaused) return;
    const timer = window.setInterval(() => setFlowTick((current) => (current + 1) % 3), 1900);
    return () => window.clearInterval(timer);
  }, [flowPaused]);

  useEffect(() => {
    if (analyticsPaused) return;
    const timer = window.setInterval(() => setAnalyticsTick((current) => (current + 1) % 3), 1500);
    return () => window.clearInterval(timer);
  }, [analyticsPaused]);

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(".environment-media video");
    videos.forEach((video) => {
      if (environmentPaused) video.pause();
      else void video.play().catch(() => {});
    });
  }, [environmentPaused, environment]);

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(".reference-integration-preview video");
    videos.forEach((video) => {
      if (integrationPaused) video.pause();
      else void video.play().catch(() => {});
    });
  }, [integrationPaused]);

  const toggleLifeCell = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const column = Math.floor((event.clientX - bounds.left) / HERO_CELL_SIZE);
    const row = Math.floor((event.clientY - bounds.top) / HERO_CELL_SIZE);
    if (row < 0 || row >= HERO_GRID_ROWS || column < 0 || column >= HERO_GRID_COLUMNS) return;
    const cell = lifeCellKey(row, column);
    setPreviousLifeCells(liveCells);
    setLiveCells((current) => {
      const next = new Set(current);
      if (next.has(cell)) next.delete(cell);
      else next.add(cell);
      return next;
    });
  };

  const visibleLifeCells = new Set([...liveCells, ...previousLifeCells]);

  return (
    <main>
      <nav className="nav">
        <div className="nav-inner">
          <a className="brand" href="#top"><ProductMark /> KLYNA</a>
          <div className="nav-links">
            <a href="#workflow"><NavIcon kind="pricing" /><span>Pricing</span></a>
            <a href="#control"><NavIcon kind="blog" /><span>Blog</span></a>
            <a href="#environment"><NavIcon kind="enterprise" /><span>Enterprise</span></a>
            <a href="#teams"><NavIcon kind="customers" /><span>Customers</span></a>
            <a href="#faq"><NavIcon kind="docs" /><span>Docs</span></a>
          </div>
          <div className="nav-actions"><a className="button ghost nav-demo" href="#contact">BOOK A DEMO</a><a className="button ghost nav-signin" href="#contact">SIGN IN</a><a className="button mint" href="#start">GET STARTED <Arrow /></a></div>
        </div>
      </nav>

      <div className="hero-shell">
      <section className="hero" id="top">
        <div className={`agent-field ${fieldPaused ? "paused" : ""}`} role="grid" aria-label="Interactive Conway's Game of Life agent field" onPointerDown={toggleLifeCell} style={{ "--grid-x-shift": `${fieldAlignment.x}px`, "--grid-y-shift": `${fieldAlignment.y}px` } as CSSProperties}>{Array.from(visibleLifeCells, (cell) => { const [rowText, columnText] = cell.split(":"); const row = Number(rowText); const column = Number(columnText); const active = liveCells.has(cell); const rightEdge = !liveCells.has(lifeCellKey(row, (column + 1) % HERO_GRID_COLUMNS)); const bottomEdge = !liveCells.has(lifeCellKey((row + 1) % HERO_GRID_ROWS, column)); const index = row * HERO_GRID_COLUMNS + column; const statuses = ["CODING", "LINTING", "REFACTORING", "RUNNING TESTS", "DEPLOYING", "MERGING"]; return <span key={cell} role="gridcell" aria-label={`Agent ${String((37 * index + 13) % 100).padStart(2, "0")}, ${statuses[index % statuses.length]}`} className={`field-cell ${active ? "active" : "fading"} ${rightEdge ? "has-right-edge" : ""} ${bottomEdge ? "has-bottom-edge" : ""}`} style={{ gridColumn: column + 1, gridRow: row + 1 }}><b>AGENT-{String((37 * index + 13) % 100).padStart(2, "0")}</b><i>{statuses[index % statuses.length]}</i></span>; })}</div>
        <div className="hero-panel hero-intro" data-reveal>
          <span className="corner top-left">+</span><span className="corner top-right">+</span><span className="corner bottom-left">+</span><span className="corner bottom-right">+</span>
          <p className="eyebrow hero-intro-item">THE CLOUD CODING AGENT</p>
          <h1 className="hero-harness-heading hero-intro-item" aria-label="Your coding agent on Cloud" data-playing="true"><span className="hero-harness-window" aria-hidden="true"><span className="hero-harness-track">{[...heroAgents, heroAgents[0]].map((provider, index) => <span key={`${provider}-${index}-hero`} className="hero-harness-name" data-provider={providerSlug(provider)}><span className={`hero-harness-brand hero-provider-${providerSlug(provider)}`}><ProviderLogo provider={provider} /><span>{provider}</span></span></span>)}</span></span><span className="hero-harness-suffix" aria-hidden="true"> on Cloud</span></h1>
          <p className="hero-copy hero-intro-item">Run coding agents inside cloud machines with your codebases, tooling, and dependencies. Delegate, iterate, review from anywhere.</p>
          <div className="hero-actions hero-intro-item"><a className="button ghost" href="#contact">BOOK A DEMO</a><a className="button mint" href="#start">GET STARTED FOR FREE <Arrow /></a></div>
          <small className="hero-intro-item">Try for 14 days, no card required.</small>
        </div>
        <div className="hero-controls"><button className="what-button" type="button" onMouseEnter={() => setWhatIsOpen(true)} onFocus={() => setWhatIsOpen(true)} onClick={() => setWhatIsOpen(true)} aria-expanded={whatIsOpen}>WHAT IS THIS?</button><button className="pause" type="button" aria-label={fieldPaused ? "Resume Game of Life" : "Pause Game of Life"} onClick={() => setFieldPaused((value) => !value)}><span aria-hidden="true">{fieldPaused ? "▶" : "Ⅱ"}</span> {fieldPaused ? "RESUME" : "PAUSE"}</button>{whatIsOpen && <div className="what-popover" role="dialog" aria-label="About the Game of Life"><b>GAME OF LIFE · B3/S23</b><h3>Conway’s Game of Life</h3><p>Every square is either alive or dead. Each generation is calculated at the same time from the current generation.</p><ul><li>A live cell survives with two or three live neighbours.</li><li>A dead cell becomes alive with exactly three live neighbours.</li><li>All other live cells die, and all other dead cells stay empty.</li></ul><p className="what-popover-note">Click any square in the field to seed or remove a cell.</p><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noreferrer">Read the rules on Wikipedia ↗</a><button type="button" onClick={() => setWhatIsOpen(false)}>CLOSE</button></div>}</div>
      </section>

      <div className="ticker-viewport"><div className="ticker" aria-label="Trusted teams">{[...integrations, ...integrations].map((name, index) => <span key={`${name}-${index}`}>{name}</span>)}</div></div>
      </div>

      <section className="reference-section light workflow" id="workflow" data-reveal>
        <div className="section-intro"><p className="eyebrow dark-eyebrow">HOW IT WORKS</p><h2>Delegate to any coding agent.<br />Get engineering work back.</h2></div>
        <div className="flow-grid">
          <article className="flow-card"><h3>Assign from anywhere</h3><p>From Linear, Slack, GitHub, GitLab, or the dashboard. No new workflow.</p><div className={`paper-preview linear-paper flow-state-${flowTick}`}><b>◉ &nbsp; LINEAR</b><span>{flowTick === 2 ? "@Replicas investigate the checkout regression" : "@Replicas fix the flaky checkout test"}</span><small>{flowTick === 2 ? "◉ Agent started" : "◌ New issue"}</small></div></article>
          <article className="flow-card"><h3>Work with any harness</h3><p>Claude Code, Codex, Cursor, or Opencode — each in its own Linux VM.</p><div className={`paper-preview harness-paper flow-state-${flowTick}`}><b>✳ &nbsp; Fix the flaky checkout test</b><span>✳ &nbsp; {flowTick === 1 ? "Codex" : "Claude Code"} <em>{flowTick === 2 ? "completed" : "thinking..."}</em></span><small>Ubuntu 24.04 · 8 vCPU · 16 GB</small></div></article>
          <article className="flow-card"><h3>Review what comes back</h3><p>A pull request, a reply, a recording. Merge it, comment on it, or send it again.</p><div className={`paper-preview review-paper flow-state-${flowTick}`}><b>◉ &nbsp; Fix the flaky checkout test</b><span className="diffs">+128 &nbsp; -34</span><small>{flowTick === 2 ? "✓ &nbsp; Ready to merge" : "✓ &nbsp; Opened PR #2138"}</small></div></article>
        </div>
        <button className="section-pause flow-pause" type="button" aria-label={flowPaused ? "Resume the How it works previews" : "Pause the How it works previews"} onClick={() => setFlowPaused((value) => !value)}>{flowPaused ? "▶ RESUME" : "Ⅱ PAUSE"}</button>
      </section>

      <section className="reference-section dark integration-section" id="control" data-reveal>
        <div className="section-intro"><p className="eyebrow">INTEGRATIONS</p><h2>Start agents wherever<br />work shows up.</h2></div>
        <div className="integration-grid">{[["Dashboard", "Chat directly from the web for full control. Watch the diff, steer the plan, and pair with the agent when you want to."], ["Slack", "Ping Klyna from any channel to start work instantly. No context switching, just agents running where your team already talks."], ["Linear", "Turn issues into active agent runs. Klyna reads the ticket, gathers context, and starts implementation without another handoff."], ["GitHub & GitLab", "Tag Klyna inside a comment or pull request. The agent investigates the codebase, tests a fix, and comes back with changes ready to review."], ["Automations & API", "Fire a run from a schedule, a webhook, or one API call. Klyna provisions the workspace and reports back with nobody in the room."]].map(([name, description]) => <article className="integration-card" key={name}><h3><span className="integration-icon">{name === "Slack" ? "✣" : name === "Linear" ? "◉" : name === "GitHub & GitLab" ? "◉ ◒" : name === "Automations & API" ? "ϟ" : "▦"}</span>{name}</h3><IntegrationsPreview kind={name} paused={integrationPaused} /><p>{description}</p></article>)}</div>
        <button className="section-pause" type="button" aria-label={integrationPaused ? "Resume the integration previews" : "Pause the integration previews"} onClick={() => setIntegrationPaused((value) => !value)}>{integrationPaused ? "▶ RESUME" : "Ⅱ PAUSE"}</button>
      </section>

      <section className="reference-section light analytics" data-reveal>
        <div className="section-intro analytics-intro"><p className="eyebrow dark-eyebrow">ANALYTICS</p><h2>Visibility into how<br />your team works</h2><p>Every minute is attributable — to a source, a person, a harness, a model, the credential that paid for it, and the skills and MCP servers the agent reached for.</p></div>
        <div className="analytics-card"><div className="analytics-stats"><div><small>WORKSPACES CREATED</small><strong>{analyticsTick === 2 ? "138" : "124"}</strong></div><div><small>COMPUTE MINUTES</small><strong>{analyticsTick === 1 ? "8,691" : "8,432"}</strong></div><div><small>PRS OPENED</small><strong>{analyticsTick === 2 ? "103" : "96"}</strong></div><div><small>MERGE RATE</small><strong>{analyticsTick === 1 ? "89%" : "87%"}</strong></div></div><div className="analytics-body"><div className="usage"><b>Usage</b><span>Compute minutes by source over time</span><div className="chart">{[[22, 36, 28, 54, 47, 64, 58, 82, 73, 92, 78, 100], [28, 43, 35, 61, 52, 70, 64, 88, 79, 96, 84, 100], [18, 32, 44, 48, 63, 59, 76, 71, 87, 80, 95, 100]][analyticsTick].map((height, index) => <i key={`${analyticsTick}-${index}`} style={{ height: `${height}%` }} />)}</div><div className="chart-axis"><span>JUL 01</span><span>JUL 15</span><span>AUG 01</span><span>AUG 15</span></div></div><div className="leaderboard"><b>Leaderboard</b><span>Ranked by compute minutes</span>{[["01", "Mira Chen", "2,418", "31"], ["02", "Devon Park", "1,980", "26"], ["03", "Alia Shah", "1,344", "18"]].map(([rank, name, minutes, prs]) => <p key={rank}><small>{rank}</small><strong>{name}</strong><span>{minutes}</span><em>{prs} PRs</em></p>)}</div></div></div>
        <button className="section-pause analytics-pause" type="button" aria-label={analyticsPaused ? "Resume the analytics animation" : "Pause the analytics animation"} onClick={() => setAnalyticsPaused((value) => !value)}>{analyticsPaused ? "▶ RESUME" : "Ⅱ PAUSE"}</button>
      </section>

      <section className="reference-section dark environment" id="environment" data-reveal>
        <div className="section-intro environment-intro"><p className="eyebrow">SANDBOXED ENVIRONMENTS</p><h2>Every agent gets<br />its own machine.</h2><p>Each task runs in an isolated Linux VM you configure once. Agents install dependencies, run services, drive a browser, and verify their own work.</p></div>
        <div className="environment-panel">
          <div className="environment-tabs" role="tablist" aria-label="Sandbox capabilities">
            {environmentTabs.map(([title, description], index) => {
              const tabOffsets = [65 + 94 * (environment === 0 ? 1 : 0), 130 + 94 * (environment < 2 ? 1 : 0), 289];
              return <button key={title} id={`environment-tab-${index}`} type="button" role="tab" aria-selected={environment === index} aria-controls={`environment-panel-${index}`} className={environment === index ? "active" : ""} style={{ transform: `translate3d(0, ${tabOffsets[index]}px, 0)` }} onClick={() => setEnvironment(index)}><span className="environment-tab-title">{title}</span>{environment === index && <span className="environment-tab-description">{description}</span>}</button>;
            })}
          </div>
          <div className="environment-gutter" aria-hidden="true" />
          <div className="environment-preview" aria-live="polite">
            {environmentMedia.map(([slug, poster, video], index) => <div key={slug} id={`environment-panel-${index}`} role="tabpanel" aria-labelledby={`environment-tab-${index}`} aria-hidden={environment !== index} className={`environment-media ${environment === index ? "is-active" : ""}`}><video autoPlay loop muted playsInline poster={`https://replicas.dev/landing/environments/${poster}`} preload="metadata" src={`https://replicas.dev/landing/environments/${video}`} /></div>)}
          </div>
        </div>
        <button className="section-pause environment-pause" type="button" aria-label={environmentPaused ? "Resume the environment previews" : "Pause the environment previews"} onClick={() => setEnvironmentPaused((value) => !value)}>{environmentPaused ? "▶ RESUME" : "Ⅱ PAUSE"}</button>
      </section>

      <section className="reference-section dark teams" id="teams" data-reveal><div className="section-intro"><p className="eyebrow">CUSTOMERS</p><h2>Powering engineering<br />teams at the forefront.</h2><p className="teams-intro">Teams hand code review, recurring maintenance, and feature work to agents running in the cloud — then measure exactly what shipped.</p></div><div className="proof-grid"><article className="proof-quote large"><span>“</span><p>I think Klyna makes it super easy to spin up coding agents and switch between different harnesses. Developer machines and cloud machines basically have the same environment now.</p><footer><b>ERIK DAHL</b><small>Co-founder &amp; CTO, Parrot</small></footer></article><article className="proof-stat"><strong>50%</strong><span>of pull requests produced by cloud agents</span><small>KNOWUNITY</small><b>◒ knowunity</b></article><article className="proof-quote"><p>Klyna completely changed the way we run engineering by allowing engineers to trigger cloud agents from anywhere.</p><footer><b>LUCAS HILD</b><small>CTO, Knowunity</small></footer></article><article className="proof-stat"><strong>23.5k</strong><span>automated cloud-agent jobs in July</span><small>PARROT</small></article><article className="proof-quote"><p>Going from local to cloud coding agents was arguably as big of a jump as using coding agents in the first place.</p><footer><b>PRANAV BEDI</b><small>CEO, Moda</small></footer></article><article className="proof-stat accent"><strong>100%</strong><span>of the engineering team using Klyna over other IDEs</span><small>MODA</small><b>◉ dart</b></article><a className="proof-cta" href="#contact">Read every<br />customer story <Arrow /></a></div></section>

      <section className="reference-section light faq" id="faq" data-reveal><div className="section-intro"><p className="eyebrow dark-eyebrow">FAQS</p><h2>Frequently Asked<br />Questions</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <article key={question} className={openFaq === index ? "open" : ""}><button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{openFaq === index ? "−" : "+"}</span>{question}</button>{openFaq === index && <p>{answer}</p>}</article>)}</div></section>

      <section className="closing dark" id="start" data-reveal><div className="hero-panel"><span className="corner top-left">+</span><span className="corner top-right">+</span><span className="corner bottom-left">+</span><span className="corner bottom-right">+</span><p className="eyebrow">THE NEXT RUN STARTS HERE</p><h2>Bring coding agents<br />to the cloud.</h2><div className="hero-actions"><a className="button ghost" href="#contact">BOOK A DEMO</a><a className="button mint" href="#top">GET STARTED <Arrow /></a></div><small>Try for 14 days, no card required.</small></div></section>
      <footer className="footer" id="contact"><div><a className="brand" href="#top"><ProductMark /> KLYNA</a><p>The cloud coding agent. Run agents inside cloud environments with your codebases, tooling, and dependencies.</p></div><div className="footer-links"><div><b>PRODUCT</b><a href="#workflow">Pricing</a><a href="#control">Enterprise</a><a href="#environment">Docs</a><a href="#control">API</a></div><div><b>COMPANY</b><a href="#teams">Customers</a><a href="#teams">Careers</a><a href="#top">Brand</a><a href="mailto:hello@klyna.dev">Contact</a></div><div><b>RESOURCES</b><a href="#top">All resources</a><a href="#top">Blog</a><a href="#top">Support</a><a href="#top">Privacy</a></div></div><small>© 2026 Klyna Systems. All systems operational.</small></footer>
    </main>
  );
}
