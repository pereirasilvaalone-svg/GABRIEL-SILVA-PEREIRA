import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Clock, Star, Sparkles, ShieldCheck, Smile, HeartPulse, Gem, Stethoscope } from "lucide-react";
import consultorio from "@/assets/dra-luana-consultorio.jpg.asset.json";
import retrato from "@/assets/dra-luana-retrato.jpg.asset.json";
import { SiteNav } from "@/components/SiteNav";
import { Reveal } from "@/components/Reveal";
import { WHATSAPP } from "@/lib/agenda";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dra. Luana Souza Dariva — Dentista em Alto Garças/MT" },
      { name: "description", content: "Odontologia com cuidado e sorriso em Alto Garças, MT. Nota 5,0 no Google. Agende sua consulta online." },
      { property: "og:title", content: "Dra. Luana Souza Dariva — Dentista em Alto Garças" },
      { property: "og:description", content: "Nota 5,0 no Google. Agende sua consulta com a Dra. Luana." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const servicos = [
  { icon: Stethoscope, t: "Avaliação completa", d: "Diagnóstico cuidadoso e plano de tratamento explicado sem pressa." },
  { icon: ShieldCheck, t: "Prevenção e limpeza", d: "Profilaxia e orientação para manter o sorriso saudável." },
  { icon: Smile, t: "Restaurações", d: "Recupere forma e função dos dentes com acabamento natural." },
  { icon: Sparkles, t: "Clareamento", d: "Um sorriso mais claro, com acompanhamento profissional." },
  { icon: Gem, t: "Estética do sorriso", d: "Harmonia e detalhes que fazem diferença na sua autoestima." },
  { icon: HeartPulse, t: "Urgências", d: "Dor de dente? Fale pelo WhatsApp para atendimento rápido." },
];

function useCount(target: number, run: boolean, dec = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const s = performance.now();
    const tick = (n: number) => { const p = Math.min(1, (n - s) / 1400); setV(+(target * (1 - Math.pow(1 - p, 3))).toFixed(dec)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [run, target, dec]);
  return v;
}

function Rating() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => { const io = new IntersectionObserver(([e]) => e?.isIntersecting && setOn(true), { threshold: 0.4 }); ref.current && io.observe(ref.current); return () => io.disconnect(); }, []);
  const nota = useCount(5, on, 1);
  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] bg-ink p-10 text-ink-foreground md:p-16">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
      <p className="text-sm uppercase tracking-[0.3em] text-ink-foreground/60">Avaliação no Google</p>
      <div className="mt-4 flex flex-wrap items-end gap-6">
        <span className="font-display text-[7rem] leading-none md:text-[10rem]">{nota.toFixed(1).replace(".", ",")}</span>
        <div className="pb-6">
          <div className="flex gap-1">{on && [0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-9 w-9 animate-star fill-gold text-gold" style={{ animationDelay: `${i * 150}ms` }} />)}</div>
          <p className="mt-2 text-ink-foreground/70">Nota máxima em todas as avaliações de pacientes</p>
        </div>
      </div>
      <a href="https://maps.app.goo.gl/uitkWLAJwieWjxWe6" target="_blank" rel="noreferrer" className="mt-8 inline-block rounded-full border border-ink-foreground/30 px-6 py-3 text-sm transition hover:bg-ink-foreground hover:text-ink">Ler as avaliações no Google →</a>
    </div>
  );
}

function Index() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="relative overflow-hidden bg-blush">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-primary shadow-soft"><Star className="h-4 w-4 fill-gold text-gold" /> 5,0 no Google · Alto Garças/MT</p>
            <h1 className="text-5xl leading-[1.05] text-primary md:text-7xl">Seu sorriso merece <em className="text-foreground">cuidado de verdade.</em></h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">Dra. Luana Souza Dariva — odontologia acolhedora, moderna e feita com atenção a cada detalhe.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/agendar" className="rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5">Agendar consulta</Link>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="rounded-full border border-primary/30 px-7 py-4 font-semibold text-primary transition hover:bg-secondary">WhatsApp</a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm"
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -10, y: ((e.clientX - r.left) / r.width - 0.5) * 10 }); }}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
            <div className="overflow-hidden rounded-[2.5rem] shadow-soft transition-transform duration-200" style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
              <img src={consultorio.url} alt="Dra. Luana em seu consultório" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 animate-float rounded-2xl bg-card p-4 shadow-soft">
              <p className="font-display text-3xl text-primary">+10 anos</p><p className="text-xs text-muted-foreground">cuidando de sorrisos</p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl">
          {Array.from({ length: 2 }).flatMap((_, k) => ["Prevenção", "✦", "Estética", "✦", "Clareamento", "✦", "Restaurações", "✦", "Acolhimento", "✦", "Nota 5,0", "✦"].map((w, i) => <span key={`${k}${i}`}>{w}</span>))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal><h2 className="max-w-xl text-4xl text-primary md:text-5xl">Tratamentos pensados para você</h2></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <div className="group h-full rounded-3xl border border-border bg-card p-7 transition duration-500 hover:-translate-y-2 hover:bg-primary hover:text-primary-foreground hover:shadow-soft">
                <s.icon className="h-9 w-9 text-primary transition group-hover:rotate-12 group-hover:text-primary-foreground" />
                <h3 className="mt-5 text-2xl">{s.t}</h3>
                <p className="mt-2 text-muted-foreground group-hover:text-primary-foreground/80">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5"><Reveal><Rating /></Reveal></section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <Reveal><img src={retrato.url} alt="Dra. Luana Souza Dariva" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-[2.5rem] object-cover shadow-soft" /></Reveal>
        <Reveal delay={150}>
          <h2 className="text-4xl text-primary md:text-5xl">Prazer, sou a Dra. Luana.</h2>
          <p className="mt-6 text-lg text-muted-foreground">Atendo em Alto Garças com um propósito simples: que você saia do consultório mais confiante do que entrou. Cada consulta é tranquila, explicada e no seu tempo.</p>
          <ul className="mt-8 space-y-4">
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" /> Av. 7 de Setembro, 700 — Centro, Alto Garças/MT</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-primary" /> (66) 99934-0983</li>
            <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-primary" /> Seg–Qui 7:30–11h · 13–19h · Sex até 17:30</li>
          </ul>
        </Reveal>
      </section>

      <section className="bg-blush py-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl px-5 text-4xl text-primary md:text-6xl">Pronto para sorrir sem receio?</h2>
          <Link to="/agendar" className="mt-10 inline-block rounded-full bg-primary px-10 py-5 text-lg font-semibold text-primary-foreground shadow-soft transition hover:scale-105">Escolher meu horário</Link>
        </Reveal>
      </section>
      <footer className="py-8 text-center text-sm text-muted-foreground">© Dra. Luana Souza Dariva · Dentista · Alto Garças/MT</footer>
    </div>
  );
}
