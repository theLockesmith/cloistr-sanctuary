import { SharedAuthProvider, Header, Footer, ToastProvider, ThemeProvider } from '@cloistr/ui/components'
import '@cloistr/ui/styles'

interface LandingService {
  name: string
  description: string
  url: string
  icon: string
}

const landingServices: LandingService[] = [
  {
    name: 'Identity',
    description: 'Your @cloistr.xyz address—NIP-05 verification, Lightning payments, and the key to everything else.',
    url: 'https://me.cloistr.xyz',
    icon: '🔑',
  },
  {
    name: 'Space',
    description: 'Your Nostr home. Follow people, join communities, and never miss a note from the people who matter.',
    url: 'https://space.cloistr.xyz',
    icon: '💬',
  },
  {
    name: 'Stash',
    description: 'Encrypted file storage powered by Blossom. Upload, organize, and share—your files, your rules.',
    url: 'https://stash.cloistr.xyz',
    icon: '📁',
  },
  {
    name: 'Docs',
    description: 'Collaborative documents with real-time editing. Think Google Docs, but you own it.',
    url: 'https://docs.cloistr.xyz',
    icon: '📝',
  },
  {
    name: 'Sheets',
    description: 'Spreadsheets that sync across devices. Formulas, charts, and collaboration—all encrypted.',
    url: 'https://sheets.cloistr.xyz',
    icon: '📊',
  },
  {
    name: 'Whiteboard',
    description: 'Infinite canvas for diagrams, sketches, and visual thinking. Collaborate in real time.',
    url: 'https://whiteboard.cloistr.xyz',
    icon: '🎨',
  },
  {
    name: 'Slides',
    description: 'Build presentations that travel with you. Present from any device, share via Nostr.',
    url: 'https://slides.cloistr.xyz',
    icon: '📽️',
  },
  {
    name: 'Relay',
    description: 'Your personal Nostr relay with inbox/outbox support. Control who can reach you.',
    url: 'https://relay.cloistr.xyz',
    icon: '📡',
  },
  {
    name: 'Discovery',
    description: 'Find the right relays for you. Compare speed, uptime, and policies across hundreds of relays.',
    url: 'https://discover.cloistr.xyz',
    icon: '🔍',
  },
]

function App() {
  return (
    <ThemeProvider>
    <ToastProvider>
      <SharedAuthProvider>
        <div className="sanctuary">
        <Header
          logoHref="/"
          activeServiceId="home"
        />

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
              {landingServices.map((service) => (
                <a key={service.name} href={service.url} className="service-card">
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
      </SharedAuthProvider>
    </ToastProvider>
    </ThemeProvider>
  )
}

export default App
