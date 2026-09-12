import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
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
      { name: "description", content: "Scan suspicious links, messages, and passwords with the GillNet AI security dashboard." },
      { property: "og:title", content: "GillNet AI | Security Dashboard" },
      { property: "og:description", content: "Scan suspicious links, messages, and passwords with GillNet AI." },
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
] as const;

const navigation = ["Home", "Scan", "Password", "History", "Security", "Profile"];

function ScanField({ password = false, compact = false }: { password?: boolean; compact?: boolean }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const check = () => setMessage(value.trim() ? (password ? "Strong password" : "No immediate threats found") : "Enter something to check");

  return (
    <div className="relative">
      <div className="flex h-[53px] items-center rounded-[40px] border-2 border-frame bg-background pl-5">
        {password ? <LockKeyhole className="size-5 shrink-0" /> : <Link2 className={compact ? "size-6 shrink-0" : "size-5 shrink-0"} />}
        <input
          aria-label={password ? "Password to check" : "URL or suspicious message"}
          type={password ? "password" : "text"}
          value={value}
          onChange={(event) => { setValue(event.target.value); setMessage(""); }}
          onKeyDown={(event) => event.key === "Enter" && check()}
          placeholder={password ? "Enter your password here..." : "Enter a URL or suspicious message..."}
          className={`min-w-0 flex-1 bg-transparent px-4 font-sans text-foreground outline-none placeholder:text-foreground ${compact ? "text-xl" : "text-base"}`}
        />
        <Button onClick={check} className={`h-[53px] w-32 shrink-0 rounded-[40px] bg-primary p-0 font-normal text-primary-foreground hover:bg-primary/90 ${compact ? "text-xl" : "text-base"}`}>
          {password ? "Check Now" : "Scan Now"}
        </Button>
      </div>
      {message && <p className="absolute left-6 top-full mt-1 font-sans text-xs text-safe" role="status">{message}</p>}
    </div>
  );
}

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-shell p-0 xl:p-0">
      <div className="relative mx-auto min-h-screen w-full overflow-hidden border-2 border-frame bg-background xl:h-[960px] xl:min-h-0 xl:max-w-[1440px] xl:rounded-[25px]">
        <aside className={`${menuOpen ? "flex" : "hidden"} fixed inset-y-0 left-0 z-40 w-[226px] flex-col bg-sidebar-panel xl:absolute xl:inset-y-0 xl:flex`}>
          <div className="flex h-[99px] items-center justify-between border-b border-sidebar-line px-10">
            <span className="font-brand text-[32px] leading-none text-ink">GillNet AI</span>
            <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button>
          </div>
          <nav className="flex flex-col items-center gap-10 pt-[66px]" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-brand text-2xl leading-[29px] text-ink transition-opacity hover:opacity-55" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </nav>
        </aside>

        <header className="flex h-[106px] items-center gap-5 px-5 xl:absolute xl:left-[286px] xl:top-0 xl:h-[106px] xl:w-[1116px] xl:px-0">
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
          <div className="min-w-0 flex-1 xl:w-[740px] xl:flex-none"><ScanField compact /></div>
          <div className="ml-auto flex items-center gap-3">
            <div className="grid size-[55px] shrink-0 place-items-center rounded-full bg-primary font-sans text-2xl text-primary-foreground">M</div>
            <span className="hidden font-sans text-xl text-bright sm:block">Mayank</span>
            <ChevronDown className="size-4 text-bright" />
          </div>
        </header>

        <div className="grid gap-4 px-4 pb-6 xl:absolute xl:left-[272px] xl:top-[120px] xl:grid-cols-[740px_368px] xl:gap-4 xl:p-0">
          <div>
            <section className="relative h-[124px] overflow-hidden rounded-[25px] border border-frame">
              <div className="absolute left-8 top-[14px] z-10">
                <h1 className="font-display text-[32px] leading-[42px]">Welcome back, Mayank</h1>
                <p className="mt-0 w-[349px] font-sans text-base leading-6 text-muted-foreground">Stay one step ahead. Scan, Secure, and<br />stay safe with GillNet AI.</p>
              </div>
              <div className="absolute -top-px right-[8px] h-[124px] w-[204px] overflow-hidden rounded-[25px] border border-ink bg-background">
                <img src={globeImage} alt="Digital security globe" className="h-full w-full object-cover object-right opacity-80 mix-blend-screen" />
              </div>
            </section>

            <section className="flex h-[124px] items-center gap-2" aria-label="Security statistics">
              <Metric icon={<Search />} title="Total Scans" value="82" suffix="/100" tone="neutral" width="w-[203px]" progress />
              <Metric icon={<Shield />} title="Safe Score" value="24" tone="safe" width="w-[184px]" />
              <Metric icon={<AlertTriangle />} title="Threats" value="5" tone="danger" width="w-[164px]" />
              <Metric icon={<Database />} title="Detected" value="3" tone="violet" width="w-[164px]" />
            </section>

            <section id="scan" className="h-[149px] rounded-[25px] border border-frame px-[26px] pt-[16px]">
              <PanelTitle icon={<Search />} title="Quick threat Scan" subtitle="Enter a URL or paste a suspicious message to check for threats." />
              <div className="mt-[17px]"><ScanField /></div>
            </section>

            <section id="password" className="mt-[14px] h-[183px] rounded-[25px] border border-frame px-[26px] pt-[16px]">
              <PanelTitle icon={<KeyRound />} title="Password checker" subtitle="Check how strong your password is..." />
              <div className="mt-[17px]"><ScanField password /></div>
              <div className="mt-[11px] flex items-center font-sans text-[15px] text-muted-foreground">
                <span className="mr-3">Strength :</span>
                <div className="flex gap-1">
                  <i className="h-1 w-[38px] rounded-full bg-safe" /><i className="h-1 w-[38px] rounded-full bg-safe" /><i className="h-1 w-[38px] rounded-full bg-safe" /><i className="h-1 w-[38px] rounded-full bg-progress" />
                </div>
                <span className="ml-auto mr-4 text-safe">Strong</span>
              </div>
            </section>

            <section id="security" className="mt-[14px] h-[166px] rounded-[25px] border border-frame px-[29px] pt-[16px]">
              <PanelTitle icon={<Shield />} title="Security Overview" subtitle="Our AI helps you stay protected in real time." />
              <div className="mt-[10px] grid grid-cols-4 gap-2">
                <Feature icon={<Bug />} title="Malware Detection" text="Detect malicious files and links." />
                <Feature icon={<Anchor />} title="Phishing Protection" text="Identify phishing attempts." />
                <Feature icon={<LockKeyhole />} title="Password Analysis" text="Check Password security and strength." />
                <Feature icon={<Globe2 />} title="Real time threat Intel" text="Stay up-to date with real world threats." />
              </div>
            </section>
          </div>

          <aside>
            <section id="history" className="h-[398px] rounded-[25px] border border-frame px-[23px] pt-[17px]">
              <div className="flex h-[41px] items-start justify-between border-b border-divider px-1">
                <h2 className="flex items-center gap-3 font-display text-xl"><Clock3 className="size-5" />Recent Activity</h2>
                <a href="#history" className="pt-1 font-sans text-sm">View all&nbsp; →</a>
              </div>
              <div>
                {activity.map(([domain, status, time], index) => (
                  <div key={`${domain}-${index}`} className="grid h-[43px] grid-cols-[21px_1fr_auto] items-center gap-3 px-1 font-sans text-[11px]">
                    <span className="grid size-[21px] place-items-center rounded-[5px] bg-activity"><Link2 className="size-3" /></span>
                    <span>{domain}</span>
                    <span className="grid grid-cols-[6px_62px_50px] items-center gap-1"><i className={`size-1 rounded-full ${status === "safe" ? "bg-safe" : status === "suspicious" ? "bg-warning" : "bg-destructive"}`} /><b className={`font-normal ${status === "safe" ? "text-safe" : status === "suspicious" ? "text-warning" : "text-destructive"}`}>{status}</b><small className="text-right text-[7px] text-foreground">{time}</small></span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-[14px] h-[184px] rounded-[25px] border border-frame px-[23px] pt-[17px]">
              <h2 className="flex h-[38px] items-start gap-3 border-b border-divider px-1 font-display text-xl"><Lightbulb className="size-5" />Tips for a safer Internet</h2>
              <ul className="mt-[10px] space-y-[7px] px-3 font-sans text-[11px] text-bright">
                {["Don't click on suspicious links.", "Use strong and unique passwords.", "Be aware of phishing attempts.", "Keep your devices updated."].map(tip => <li key={tip} className="flex items-center gap-3"><span className="size-[7px] shrink-0 rounded-full bg-safe" />{tip}</li>)}
              </ul>
            </section>

            <section className="mt-[14px] flex h-[166px] items-center rounded-[25px] border border-frame px-[25px]">
              <div className="grid size-20 shrink-0 place-items-center rounded-full border border-frame/60 bg-icon"><Shield className="size-[43px]" /></div>
              <blockquote className="ml-[25px] w-[204px] font-sans text-base leading-6 text-bright">“Security is not a process<br />but a process.”<footer className="mt-2 text-right font-sans text-[13px] italic">–Bruce Schneier</footer></blockquote>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PanelTitle({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) {
  return <div className="flex gap-[11px]"><span className="mt-0.5 [&_svg]:size-5">{icon}</span><div><h2 className="font-display text-xl leading-6">{title}</h2><p className="font-sans text-[11px] leading-4 text-muted-foreground">{subtitle}</p></div></div>;
}

function Metric({ icon, title, value, suffix, tone, width, progress = false }: { icon: ReactNode; title: string; value: string; suffix?: string; tone: "neutral" | "safe" | "danger" | "violet"; width: string; progress?: boolean }) {
  const toneClass = { neutral: "bg-neutral/60", safe: "bg-safe-muted/60 text-safe-soft", danger: "bg-danger-muted/60 text-danger-icon", violet: "bg-violet-muted/60 text-violet-icon" }[tone];
  return <article className={`relative flex h-[90px] shrink-0 items-center rounded-[25px] border border-frame px-[13px] ${width}`}><span className={`grid size-[50px] shrink-0 place-items-center rounded-full border border-frame/60 ${toneClass} [&_svg]:size-6`}>{icon}</span><div className="min-w-0 flex-1 text-center"><div className="font-sans text-base leading-6">{title}</div><div className="font-numeric text-xl leading-5">{value}<span className="text-base">{suffix}</span></div>{progress && <div className="absolute bottom-[11px] left-[70px] h-1 w-[114px] rounded-full bg-track"><div className="h-full w-[96px] rounded-full bg-progress" /></div>}</div></article>;
}

function Feature({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <article className="flex h-[71px] min-w-0 items-start gap-2 rounded-[25px] border border-frame bg-surface px-3 py-3"><span className="shrink-0 [&_svg]:size-5">{icon}</span><div className="min-w-0"><h3 className="font-sans text-[11px] leading-4">{title}</h3><p className="font-sans text-[9px] leading-[11px] text-muted-foreground">{text}</p></div></article>;
}