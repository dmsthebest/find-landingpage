import { BarberPole, BarberPoleIcon } from '../../components/BarberPole'

const FIND_APP_URL = 'https://find-gamma-ten.vercel.app'

const management = [
  ['Caixa', 'Entradas, saídas e saldo em tempo real.'],
  ['Financeiro', 'Faturamento, despesas e lucro claros.'],
  ['Agenda', 'Horários sem conflito, confirmados na hora.'],
  ['Equipe', 'Barbeiros, serviços e clientes no mesmo lugar.'],
]

const steps = [
  ['01', 'Escolha a barbearia', 'Encontre a barbearia que combina com você.'],
  ['02', 'Selecione o serviço', 'Corte, barba ou o combo que você precisa.'],
  ['03', 'Escolha o horário', 'Veja só os horários que estão livres de verdade.'],
  ['04', 'Confirme', 'Pronto. Seu horário fica reservado.'],
]

export function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-text">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <a href="#inicio" className="flex items-center gap-2.5">
            <BarberPoleIcon size={26} />
            <span className="font-display text-3xl tracking-wider text-text">FIND</span>
          </a>
          <a
            href={`${FIND_APP_URL}/entrar`}
            className="rounded-lg border border-border px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-brass hover:text-brass"
          >
            Entrar
          </a>
        </div>
        <BarberPole height="h-1.5" animated />
      </header>

      {/* Hero — brand first, one composition */}
      <section id="inicio" className="landing-glow landing-noise relative px-4 pb-16 pt-16 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="animate-fade-up mx-auto mb-8 flex w-fit items-center gap-2 border border-brass/35 bg-surface/80 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brass">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            Grande atualização
          </div>

          <div className="animate-fade-up-delay-1 mx-auto mb-5 flex justify-center">
            <BarberPoleIcon size={48} />
          </div>

          <h1 className="animate-fade-up-delay-1 font-display text-7xl leading-[0.86] tracking-wider text-text sm:text-8xl lg:text-[9.5rem]">
            FIND
          </h1>

          <BarberPole className="animate-fade-up-delay-2 mx-auto my-7 max-w-xs sm:max-w-md" height="h-1.5" animated />

          <p className="animate-fade-up-delay-2 font-display text-3xl leading-none text-brass sm:text-5xl">
            Sua barbearia.
            <br />
            Sob controle.
          </p>

          <p className="animate-fade-up-delay-3 mx-auto mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">
            Agendamentos, clientes, equipe, caixa e financeiro — tudo em um só lugar.
          </p>

          <div className="animate-fade-up-delay-3 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`${FIND_APP_URL}/painel`}
              className="rounded-lg bg-brass px-6 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-brass-light"
            >
              Começar teste grátis →
            </a>
            <a
              href="#demo"
              className="rounded-lg border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-text transition-colors hover:border-brass hover:text-brass"
            >
              Ver o FIND em ação
            </a>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
            30 dias grátis · sem cartão
          </p>
        </div>
      </section>

      {/* Video — dominant product plane */}
      <section id="demo" className="relative bg-bg px-0 pb-4 sm:px-4 sm:pb-16">
        <BarberPole className="mb-0 sm:mb-10" height="h-1" />
        <div className="mx-auto max-w-5xl overflow-hidden border-y border-border bg-black sm:rounded-2xl sm:border sm:shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-barber-red" />
            <span className="h-2 w-2 rounded-full bg-brass" />
            <span className="h-2 w-2 rounded-full bg-barber-blue" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted">
              O FIND evoluiu — gestão completa
            </span>
          </div>
          <video
            className="block aspect-[9/16] max-h-[78vh] w-full bg-black object-contain sm:aspect-video sm:max-h-none"
            controls
            playsInline
            preload="metadata"
            poster="/find-demo-poster.jpg"
          >
            <source src="/find-demo.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>
        <BarberPole className="mt-0 sm:mt-10" height="h-1" />
      </section>

      {/* Management evolution */}
      <section className="landing-glow px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brass">
            Não é só agenda
          </p>
          <h2 className="mt-3 font-display text-5xl leading-none text-text sm:text-6xl">
            AGORA, SUA BARBEARIA
            <br />
            <span className="text-brass">SOB CONTROLE.</span>
          </h2>
          <BarberPole className="mt-8 max-w-sm" height="h-1.5" />
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            O FIND deixou de ser só para receber agendamentos. Ele ajuda o barbeiro a gerenciar a operação.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {management.map(([title, desc], i) => (
              <div key={title} className="border-l-2 border-brass/50 pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-2 font-display text-3xl text-text">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two sides */}
      <section className="border-y border-border bg-surface px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brass">
            Feito para os dois lados
          </p>
          <h2 className="mt-3 font-display text-5xl leading-none text-text sm:text-6xl">
            MENOS MENSAGENS.
            <br />
            MAIS CONTROLE.
          </h2>
          <BarberPole className="mt-8 max-w-xs" height="h-1" />

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-mono text-xs text-brass">01 — Clientes</p>
              <h3 className="mt-4 font-display text-4xl text-text">MARQUE EM SEGUNDOS</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>Agendamento rápido e direto</li>
                <li>Sem precisar mandar mensagem</li>
                <li>Horários atualizados em tempo real</li>
              </ul>
              <a
                href={FIND_APP_URL}
                className="mt-8 inline-block text-sm font-semibold text-brass transition-colors hover:text-brass-light"
              >
                Encontrar barbearias →
              </a>
            </div>
            <div>
              <p className="font-mono text-xs text-brass">02 — Barbeiros</p>
              <h3 className="mt-4 font-display text-4xl text-text">OPERAÇÃO SOB CONTROLE</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li>Agenda, equipe e serviços juntos</li>
                <li>Controle de caixa e visão financeira</li>
                <li>Dashboard com o que importa</li>
              </ul>
              <a
                href={`${FIND_APP_URL}/painel`}
                className="mt-8 inline-block text-sm font-semibold text-brass transition-colors hover:text-brass-light"
              >
                Testar para minha barbearia →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-brass">
            Em poucos toques
          </p>
          <h2 className="mt-3 font-display text-5xl leading-none text-text sm:text-6xl">
            COMO FUNCIONA
          </h2>
          <BarberPole className="mt-8 max-w-sm" height="h-1.5" animated />

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, description]) => (
              <article key={number}>
                <p className="font-mono text-xs text-brass">{number}</p>
                <div className="my-4 h-px w-10 bg-border" />
                <h3 className="font-display text-2xl leading-none text-text">{title.toUpperCase()}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <BarberPole className="absolute inset-x-0 top-0" height="h-2" animated />
        <div className="landing-glow absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl text-center">
          <BarberPoleIcon size={40} className="mx-auto mb-6" />
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
            FIND
          </p>
          <h2 className="mt-4 font-display text-5xl leading-[0.9] text-text sm:text-7xl">
            EXPERIMENTE GRÁTIS
            <br />
            POR 30 DIAS.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted">
            Organize a operação e ofereça uma experiência melhor para cada cliente.
          </p>
          <a
            href={`${FIND_APP_URL}/painel`}
            className="mt-8 inline-block rounded-lg bg-brass px-7 py-3.5 text-sm font-semibold text-bg transition-colors hover:bg-brass-light"
          >
            Começar agora →
          </a>
        </div>
        <BarberPole className="absolute inset-x-0 bottom-0" height="h-2" animated />
      </section>

      <footer className="border-t border-border px-4 py-8 text-center">
        <BarberPole className="mx-auto mb-5 max-w-xs" height="h-1" />
        <p className="font-display text-2xl tracking-wider text-text">FIND</p>
        <p className="mt-2 text-sm text-muted">Sua barbearia. Sob controle.</p>
      </footer>
    </div>
  )
}
