import { useNostrAuth } from '@cloistr/auth'
import { SharedAuthProvider, Header, Footer, ToastProvider, ThemeProvider, useSharedSession, Spinner } from '@cloistr/ui/components'
import '@cloistr/ui/styles'

// ──────────────────────────────────────────────────────────────────────────────
// Service catalog
// ──────────────────────────────────────────────────────────────────────────────

interface Service {
  id: string
  name: string
  description: string
  url: string
  icon: string
}

const FEATURED: Service = {
  id: 'space',
  name: 'Space',
  description: 'Your Nostr social feed — posts, communities, and the people you follow.',
  url: 'https://space.cloistr.xyz',
  icon: '💬',
}

const WORKSPACE_SERVICES: Service[] = [
  { id: 'docs',       name: 'Docs',       description: 'Collaborative documents',   url: 'https://docs.cloistr.xyz',       icon: '📝' },
  { id: 'sheets',     name: 'Sheets',     description: 'Spreadsheets',             url: 'https://sheets.cloistr.xyz',     icon: '📊' },
  { id: 'slides',     name: 'Slides',     description: 'Presentations',            url: 'https://slides.cloistr.xyz',     icon: '📽️' },
  { id: 'whiteboard', name: 'Whiteboard', description: 'Infinite canvas',          url: 'https://whiteboard.cloistr.xyz', icon: '🎨' },
  { id: 'tasks',      name: 'Tasks',      description: 'Task management',          url: 'https://tasks.cloistr.xyz',      icon: '✅' },
  { id: 'stash',      name: 'Stash',      description: 'Encrypted file storage',   url: 'https://stash.cloistr.xyz',      icon: '📁' },
  { id: 'email',      name: 'Email',      description: 'Your @cloistr.xyz email',  url: 'https://email.cloistr.xyz',      icon: '✉️' },
  { id: 'vault',      name: 'Vault',      description: 'Secrets and credentials',  url: 'https://vault.cloistr.xyz',      icon: '🔒' },
  { id: 'me',         name: 'Identity',   description: 'Your profile and address', url: 'https://me.cloistr.xyz',         icon: '🔑' },
]

const LANDING_SERVICES: Service[] = [
  { id: 'me',         name: 'Identity',   description: 'Your @cloistr.xyz address—NIP-05 verification, Lightning payments, and the key to everything else.', url: 'https://me.cloistr.xyz',         icon: '🔑' },
  { id: 'space',      name: 'Space',      description: 'Your Nostr home. Follow people, join communities, and never miss a note from the people who matter.',  url: 'https://space.cloistr.xyz',      icon: '💬' },
  { id: 'stash',      name: 'Stash',      description: 'Encrypted file storage powered by Blossom. Upload, organize, and share—your files, your rules.',       url: 'https://stash.cloistr.xyz',      icon: '📁' },
  { id: 'docs',       name: 'Docs',       description: 'Collaborative documents with real-time editing. Think Google Docs, but you own it.',                  url: 'https://docs.cloistr.xyz',       icon: '📝' },
  { id: 'sheets',     name: 'Sheets',     description: 'Spreadsheets that sync across devices. Formulas, charts, and collaboration—all encrypted.',            url: 'https://sheets.cloistr.xyz',     icon: '📊' },
  { id: 'whiteboard', name: 'Whiteboard', description: 'Infinite canvas for diagrams, sketches, and visual thinking. Collaborate in real time.',               url: 'https://whiteboard.cloistr.xyz', icon: '🎨' },
  { id: 'slides',     name: 'Slides',     description: 'Build presentations that travel with you. Present from any device, share via Nostr.',                  url: 'https://slides.cloistr.xyz',     icon: '📽️' },
  { id: 'relay',      name: 'Relay',      description: 'Your personal Nostr relay with inbox/outbox support. Control who can reach you.',                      url: 'https://relay.cloistr.xyz',      icon: '📡' },
  { id: 'discover',   name: 'Discovery',  description: 'Find the right relays for you. Compare speed, uptime, and policies across hundreds of relays.',         url: 'https://discover.cloistr.xyz',   icon: '🔍' },
]

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

function shortPubkey(pubkey: string): string {
  if (!pubkey || pubkey.length < 16) return pubkey
  return `${pubkey.slice(0, 8)}…${pubkey.slice(-8)}`
}

// ──────────────────────────────────────────────────────────────────────────────
// Dashboard — shown when signed in
// ──────────────────────────────────────────────────────────────────────────────

function Dashboard({ pubkey }: { pubkey: string }) {
  return (
    <div className="sanctuary">
      <Header logoHref="/" activeServiceId="home" />

      <main className="main">
        <section className="dashboard-welcome">
          <div className="dashboard-welcome-text">
            <h1 className="dashboard-heading">Welcome back</h1>
            <p className="dashboard-pubkey">
              Signed in as <code>{shortPubkey(pubkey)}</code>
            </p>
          </div>
          <a href="https://me.cloistr.xyz" className="dashboard-profile-link">
            View profile
          </a>
        </section>

        <section className="dashboard-featured">
          <a href={FEATURED.url} className="featured-card">
            <span className="featured-icon">{FEATURED.icon}</span>
            <div className="featured-content">
              <h2 className="featured-name">{FEATURED.name}</h2>
              <p className="featured-description">{FEATURED.description}</p>
            </div>
            <span className="featured-arrow">{'→'}</span>
          </a>
        </section>

        <section className="dashboard-apps">
          <h2 className="dashboard-section-title">Your workspace</h2>
          <div className="app-grid">
            {WORKSPACE_SERVICES.map((svc) => (
              <a key={svc.id} href={svc.url} className="app-card">
                <span className="app-icon">{svc.icon}</span>
                <div className="app-info">
                  <span className="app-name">{svc.name}</span>
                  <span className="app-description">{svc.description}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Marketing page — shown when signed out
// ──────────────────────────────────────────────────────────────────────────────

function MarketingPage() {
  return (
    <div className="sanctuary">
      <Header logoHref="/" activeServiceId="home" />

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Freedom as a Service</h1>
          <p className="hero-subtitle">
            Your sanctuary in the decentralized web. Own your identity, your data,
            and your digital life with Nostr-native productivity tools.
          </p>
        </section>

        <section className="services">
          <h2 className="services-title">Everything You Need</h2>
          <div className="services-grid">
            {LANDING_SERVICES.map((service) => (
              <a key={service.id} href={service.url} className="service-card">
                <span className="service-icon">{service.icon}</span>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2 className="cta-title">Ready to Take Control?</h2>
          <p className="cta-subtitle">
            Get your @cloistr.xyz address and join thousands who own their digital identity.
          </p>
          <a href="https://me.cloistr.xyz/register" className="cta-button">
            Claim Your @cloistr.xyz Address
          </a>
        </section>

        <section className="features">
          <div className="feature">
            <h3>Zero-Knowledge</h3>
            <p>End-to-end encryption. We can't read your data even if we wanted to.</p>
          </div>
          <div className="feature">
            <h3>Portable</h3>
            <p>Export everything anytime. Host it yourself if you prefer.</p>
          </div>
          <div className="feature">
            <h3>Open Source</h3>
            <p>Every line of code is public. Trust through transparency.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// AppContent — auth-aware routing; must live inside SharedAuthProvider
// ──────────────────────────────────────────────────────────────────────────────

function AppContent() {
  const { authState } = useNostrAuth()
  const { isResolving } = useSharedSession()

  // Hold until the SSO session restore settles — prevents the marketing page
  // flashing before a returning user's session loads.
  if (isResolving) {
    return (
      <div className="sanctuary sanctuary--loading">
        <Spinner size="lg" />
      </div>
    )
  }

  if (authState.isConnected && authState.pubkey) {
    return <Dashboard pubkey={authState.pubkey} />
  }

  return <MarketingPage />
}

// ──────────────────────────────────────────────────────────────────────────────
// App root
// ──────────────────────────────────────────────────────────────────────────────

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <SharedAuthProvider>
          <AppContent />
        </SharedAuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
