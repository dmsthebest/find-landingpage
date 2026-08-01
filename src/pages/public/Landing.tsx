import { BarberPole } from '../../components/BarberPole'

const FIND_APP_URL = 'https://find-gamma-ten.vercel.app'

const steps = [
  ['01', 'Escolha a barbearia', 'Encontre a barbearia que combina com você.'],
  ['02', 'Selecione o serviço', 'Corte, barba ou o cuidado que você procura.'],
  ['03', 'Escolha o horário', 'Veja os horários que estão livres de verdade.'],
  ['04', 'Confirme o agendamento', 'Pronto. Seu horário fica reservado.'],
]

export function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-paper text-ink">
      <header className="border-b border-paper-dark bg-paper px-4"><div className="mx-auto flex max-w-5xl items-center justify-between py-4"><a href="#inicio" className="font-display text-3xl tracking-wider text-ink">FIND</a><a href={`${FIND_APP_URL}/entrar`} className="rounded border border-ink/20 px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-brass hover:text-brass">Entrar</a></div><BarberPole height="h-1.5" /></header>
      <section id="inicio" className="landing-grid paper-noise border-b border-paper-dark px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-brass/40 bg-paper px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted"><span className="h-1.5 w-1.5 rounded-full bg-brass" /> Agendamento sem enrolação</div>
          <h1 className="font-display text-6xl leading-[.86] text-ink sm:text-8xl lg:text-9xl">SUA BARBEARIA.<br />NO SEU HORÁRIO.</h1>
          <BarberPole className="mx-auto my-8 max-w-md" height="h-2" />
          <p className="mx-auto max-w-xl text-base leading-7 text-ink-muted sm:text-lg">Agende sua barbearia em menos de 30 segundos. Sem troca de mensagens, sem fila, com estilo.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={`${FIND_APP_URL}/painel`} className="rounded bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-brass">Começar teste grátis →</a><a href={FIND_APP_URL} className="rounded border border-ink/25 bg-paper/70 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass">Encontrar uma barbearia</a></div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-muted">30 dias grátis · sem cartão de crédito</p>
        </div>
      </section>

      <section className="bg-charcoal px-4 py-10 sm:py-16"><div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-white/15 bg-black shadow-2xl"><div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><span className="h-2 w-2 rounded-full bg-[#c41e3a]" /><span className="h-2 w-2 rounded-full bg-brass" /><span className="h-2 w-2 rounded-full bg-[#1e3a8a]" /><span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-charcoal-muted">Veja o FIND funcionando</span></div><video className="block aspect-video w-full bg-black object-contain" controls playsInline preload="metadata"><source src="/find-demo.mp4" type="video/mp4" />Seu navegador não suporta vídeo.</video></div></section>

      <section className="bg-paper px-4 py-16 sm:py-24"><div className="mx-auto max-w-5xl"><div className="mb-10 max-w-xl"><p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-brass">Feito para os dois lados</p><h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">MENOS MENSAGENS.<br />MAIS CLIENTES.</h2></div><div className="grid gap-4 md:grid-cols-2"><article className="rounded-lg border border-paper-dark bg-white p-7 shadow-sm sm:p-9"><p className="font-mono text-xs text-brass">01 — CLIENTES</p><h3 className="mt-6 font-display text-4xl text-ink">MARQUE EM SEGUNDOS</h3><ul className="mt-5 space-y-3 text-sm text-ink-muted"><li>✓ Agendamento rápido e direto</li><li>✓ Sem precisar mandar mensagem</li><li>✓ Horários atualizados em tempo real</li></ul><a href={FIND_APP_URL} className="mt-8 inline-block text-sm font-semibold text-brass hover:text-ink">Encontrar barbearias →</a></article><article className="rounded-lg bg-ink p-7 text-paper shadow-sm sm:p-9"><p className="font-mono text-xs text-brass-light">02 — BARBEIROS</p><h3 className="mt-6 font-display text-4xl">AGENDA SOB CONTROLE</h3><ul className="mt-5 space-y-3 text-sm text-paper/70"><li>✓ Agenda organizada em um lugar</li><li>✓ Confirmações automáticas para clientes</li><li>✓ Controle de equipe e preços</li></ul><a href={`${FIND_APP_URL}/painel`} className="mt-8 inline-block text-sm font-semibold text-brass-light hover:text-paper">Testar para minha barbearia →</a></article></div></div></section>

      <section className="border-y border-paper-dark bg-paper-dark px-4 py-16 sm:py-24"><div className="mx-auto max-w-5xl"><p className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-brass">Em poucos toques</p><h2 className="mt-3 font-display text-5xl leading-none text-ink sm:text-6xl">COMO FUNCIONA</h2><div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, description]) => <article key={number} className="bg-paper p-6"><p className="font-mono text-xs text-brass">{number}</p><h3 className="mt-12 font-display text-2xl leading-none text-ink">{title.toUpperCase()}</h3><p className="mt-3 text-sm leading-6 text-ink-muted">{description}</p></article>)}</div></div></section>

      <section className="bg-ink px-4 py-20 text-center sm:py-28"><div className="mx-auto max-w-2xl"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-brass-light">Sua agenda, do seu jeito</p><h2 className="mt-4 font-display text-6xl leading-[.88] text-paper sm:text-7xl">EXPERIMENTE GRÁTIS POR 30 DIAS.</h2><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-paper/65">Organize sua barbearia e ofereça uma experiência melhor para cada cliente.</p><a href={`${FIND_APP_URL}/painel`} className="mt-8 inline-block rounded bg-brass px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-brass-light">Começar agora →</a></div></section>
    </div>
  )
}
