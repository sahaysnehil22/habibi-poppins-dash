import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  Anchor,
  Bug,
  ChevronDown,
  Clock3,
  Database,
  Globe2,
  KeyRound,
  Lightbulb,
  Link2,
  LockKeyhole,
  Menu,
  Search,
  Shield,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import globeImage from "@/assets/security-globe.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GillNet AI | Security Dashboard" },
      { name: "description", content: "Scan suspicious links and messages with the GillNet AI security dashboard." },
      { property: "og:title", content: "GillNet AI | Security Dashboard" },
      { property: "og:description", content: "Scan suspicious links and messages with GillNet AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const activity = [
  ["google.com", "safe", "12 mins ago"],
  ["xyz-login.com", "phishing", "30 mins ago"],
  ["youtube.com", "safe", "1 hour ago"],
  ["fake-bank.com", "suspicious", "2 hours ago"],
  ["youtube.com", "malware", "4 hours ago"],
  ["microsoft.com", "safe", "10 hours ago"],
  ["cloude.ai", "safe", "1 day ago"],
];

const navigation = ["Home", "Scan", "Password", "History", "Security", "Profile"];

function ScanField({ password = false }: { password?: boolean }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const check = () => {
    setMessage(value.trim() ? (password ? "Strong password" : "No immediate threats found") : "Enter something to check");
  };

  return (
    <div>
      <div className="flex h-12 items-center rounded-full border border-foreground/80 bg-background px-5">
        {password ? <LockKeyhole className="size-4 shrink-0" /> : <Link2 className="size-4 shrink-0" />}
        <input
          aria-label={password ? "Password to check" : "URL or suspicious message"}
          type={password ? "password" : "text"}
          value={value}
          onChange={(event) => { setValue(event.target.value); setMessage(""); }}
          onKeyDown={(event) => event.key === "Enter" && check()}
          placeholder={password ? "Enter your password here..." : "Enter a URL or suspicious message..."}
          className="min-w-0 flex-1 bg-transparent px-4 font-sans text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <Button onClick={check} className="h-10 shrink-0 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
          {password ? "Check Now" : "Scan Now"}
        </Button>
      </div>
      {message && <p className="mt-2 pl-5 font-sans text-xs text-safe" role="status">{message}</p>}
    </div>
  );
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-shell p-0 sm:p-2">
      <div className="mx-auto flex min-h-[calc(100vh-1rem)] max-w-[1536px] overflow-hidden rounded-none border-frame bg-background sm:rounded-[24px] sm:border-4">
        <aside className={`${menuOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 z-30 w-64 flex-col border-r border-ink/35 bg-sidebar-panel md:static md:flex md:w-[238px] md:shrink-0`}>
          <div className="flex h-[98px] items-center justify-between border-b border-ink/35 px-8">
            <span className="font-display text-3xl text-ink">GillNet AI</span>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button>
          </div>
          <nav className="flex flex-1 flex-col items-center gap-14 pt-20" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-display text-xl text-ink transition-opacity hover:opacity-55" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 bg-background">
          <header className="flex h-[98px] items-center gap-4 border-b border-border px-5 lg:px-12">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
            <div className="hidden max-w-[750px] flex-1 md:block"><ScanField /></div>
            <div className="ml-auto flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-primary font-display text-xl text-primary-foreground">M</div>
              <span className="hidden font-sans text-base sm:block">Mayank</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </header>

          <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,2fr)_minmax(285px,1fr)] lg:p-9">
            <div className="space-y-4">
              <section className="relative flex h-[160px] items-center overflow-hidden rounded-[24px] border border-border px-10">
                <div className="relative z-10">
                  <h1 className="font-display text-[34px] leading-tight">Welcome back, Mayank</h1>
                  <p className="mt-2 max-w-sm font-sans text-sm leading-6 text-muted-foreground">Stay one step ahead. Scan, Secure, and<br className="hidden sm:block" /> stay safe with GillNet AI.</p>
                </div>
                <img src={globeImage} alt="" aria-hidden className="pointer-events-none absolute -right-8 top-1/2 h-[190%] w-auto -translate-y-1/2 object-cover object-right opacity-80 mix-blend-screen" />
              </section>

              <section className="grid grid-cols-2 gap-2 xl:grid-cols-4" aria-label="Security statistics">
                <Metric icon={<Search />} title="Total Scans" value="82/100" tone="neutral" progress />
                <Metric icon={<Shield />} title="Safe Score" value="24" tone="safe" />
                <Metric icon={<AlertTriangle />} title="Threats" value="5" tone="danger" />
                <Metric icon={<Database />} title="Detected" value="3" tone="violet" />
              </section>

              <section id="scan" className="rounded-[24px] border border-border px-6 py-4">
                <PanelTitle icon={<Search />} title="Quick threat Scan" subtitle="Enter a URL or paste a suspicious message to check for threats." />
                <div className="mt-4"><ScanField /></div>
              </section>

              <section id="password" className="rounded-[24px] border border-border px-6 py-4">
                <PanelTitle icon={<KeyRound />} title="Password checker" subtitle="Check how strong your password is..." />
                <div className="mt-4"><ScanField password /></div>
                <div className="mt-3 flex items-center gap-2 px-1 font-sans text-xs text-muted-foreground">
                  <span>Strength :</span>
                  <div className="flex flex-1 gap-1">
                    <i className="h-1 flex-1 rounded-full bg-safe" /><i className="h-1 flex-1 rounded-full bg-safe" /><i className="h-1 flex-1 rounded-full bg-safe" /><i className="h-1 flex-1 rounded-full bg-muted-foreground" />
                  </div>
                  <span className="text-safe">Strong</span>
                </div>
              </section>

              <section id="security" className="rounded-[24px] border border-border px-6 py-4">
                <PanelTitle icon={<Shield />} title="Security Overview" subtitle="Our AI helps you stay protected in real time." />
                <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <Feature icon={<Bug />} title="Malware Detection" text="Detect malicious files and links." />
                  <Feature icon={<Anchor />} title="Phishing Protection" text="Identify phishing attempts." />
                  <Feature icon={<LockKeyhole />} title="Password Analysis" text="Check Password security and strength." />
                  <Feature icon={<Globe2 />} title="Real time threat Intel" text="Stay up-to date with real world threats." />
                </div>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="rounded-[24px] border border-border px-6 py-5">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h2 className="flex items-center gap-3 font-display text-lg"><Clock3 className="size-5" />Recent Activity</h2>
                  <a href="#history" className="font-sans text-xs">View all →</a>
                </div>
                <div className="divide-y divide-border/30">
                  {activity.map(([domain, status, time], index) => (
                    <div key={`${domain}-${index}`} className="grid grid-cols-[24px_1fr_auto] items-center gap-3 py-3 font-sans text-[11px]">
                      <span className="grid size-5 place-items-center rounded bg-activity"><Link2 className="size-3" /></span>
                      <span>{domain}</span>
                      <span className="flex items-center gap-2"><i className={`size-1.5 rounded-full ${status === "safe" ? "bg-safe" : status === "suspicious" ? "bg-warning" : "bg-destructive"}`} /><b className={`font-normal ${status === "safe" ? "text-safe" : status === "suspicious" ? "text-warning" : "text-destructive"}`}>{status}</b><small className="ml-2 text-[8px] text-muted-foreground">{time}</small></span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-border px-6 py-5">
                <h2 className="flex items-center gap-3 border-b border-border pb-3 font-display text-lg"><Lightbulb className="size-5" />Tips for a safer Internet</h2>
                <ul className="mt-3 space-y-3 font-sans text-[11px] text-muted-foreground">
                  {["Don't click on suspicious links.", "Use strong and unique passwords.", "Be aware of phishing attempts.", "Keep your devices updated."].map(tip => <li key={tip} className="flex gap-3"><span className="text-safe">●</span>{tip}</li>)}
                </ul>
              </section>

              <section className="flex min-h-40 items-center gap-6 rounded-[24px] border border-border px-7 py-6">
                <div className="grid size-20 shrink-0 place-items-center rounded-full bg-icon"><Shield className="size-10" /></div>
                <blockquote className="font-sans text-base leading-7">“Security is not a process<br />but a process.”<footer className="mt-2 text-right font-display text-xs italic text-muted-foreground">–Bruce Schneier</footer></blockquote>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function PanelTitle({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return <div className="flex gap-3"><span className="mt-0.5 [&_svg]:size-5">{icon}</span><div><h2 className="font-display text-lg leading-none">{title}</h2><p className="mt-1 font-sans text-[10px] text-muted-foreground">{subtitle}</p></div></div>;
}

function Metric({ icon, title, value, tone, progress = false }: { icon: ReactNode; title: string; value: string; tone: "neutral" | "safe" | "danger" | "violet"; progress?: boolean }) {
  const toneClass = { neutral: "bg-neutral", safe: "bg-safe/25", danger: "bg-destructive/45", violet: "bg-violet" }[tone];
  return <div className="flex min-h-[86px] items-center gap-3 rounded-[22px] border border-border px-4"><span className={`grid size-12 shrink-0 place-items-center rounded-full ${toneClass} [&_svg]:size-5`}>{icon}</span><div className="min-w-0 flex-1 text-center"><div className="font-sans text-xs">{title}</div><div className="font-sans text-lg leading-5">{value}</div>{progress && <div className="mt-2 h-1 rounded-full bg-muted"><div className="h-full w-4/5 rounded-full bg-foreground" /></div>}</div></div>;
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="flex min-h-[72px] gap-2 rounded-[22px] border border-border bg-surface px-3 py-3"><span className="[&_svg]:size-5">{icon}</span><div><h3 className="font-sans text-[10px] leading-tight">{title}</h3><p className="mt-1 font-sans text-[8px] leading-3 text-muted-foreground">{text}</p></div></article>;
}