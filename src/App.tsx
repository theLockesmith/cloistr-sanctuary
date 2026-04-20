import { useState, useEffect } from 'react'

// NIP-07 window.nostr interface
declare global {
  interface Window {
    nostr?: {
      getPublicKey(): Promise<string>
    }
  }
}

interface Service {
  name: string
  description: string
  url: string
  icon: string
}

const services: Service[] = [
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
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [hasExtension, setHasExtension] = useState(false)

  // Check for NIP-07 extension on mount
  useEffect(() => {
    const timer = setTimeout(() => setHasExtension(!!window.nostr), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowLoginModal(false)
    }
  }

  return (
    <div className="sanctuary">
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">
            <img src="/cloistr-logo.svg" alt="Cloistr" className="logo-img" />
          </a>
          <nav className="nav">
            <button className="nav-link login-btn" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          </nav>
        </div>
      </header>

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
            {services.map((service) => (
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={handleBackdropClick}>
          <div className="modal">
            <div className="modal-header">
              <h2>Login with Nostr</h2>
              <button className="modal-close" onClick={() => setShowLoginModal(false)}>&times;</button>
            </div>
            <div className="modal-content">
              <p className="modal-description">
                Cloistr uses your Nostr keys for authentication. No passwords, no email—just your keys.
              </p>

              <div className="login-options">
                {hasExtension ? (
                  <div className="login-option recommended">
                    <h3>🔐 Browser Extension</h3>
                    <p>Detected! Visit any Cloistr service and click Login to use your extension.</p>
                    <a href="https://space.cloistr.xyz" className="option-link">Go to Space →</a>
                  </div>
                ) : (
                  <div className="login-option">
                    <h3>🔐 Browser Extension</h3>
                    <p>Install a Nostr extension like Alby or nos2x for seamless login across all services.</p>
                    <a href="https://getalby.com" target="_blank" rel="noopener noreferrer" className="option-link">Get Alby →</a>
                  </div>
                )}

                <div className="login-option">
                  <h3>📱 Remote Signer</h3>
                  <p>Use nsec.app, Amber, or any NIP-46 signer. Keep your keys on your phone.</p>
                  <a href="https://nsec.app" target="_blank" rel="noopener noreferrer" className="option-link">Try nsec.app →</a>
                </div>

                <div className="login-option">
                  <h3>🆕 New to Nostr?</h3>
                  <p>Create a new identity and get your @cloistr.xyz address.</p>
                  <a href="https://me.cloistr.xyz/register" className="option-link">Create Account →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>
          A sanctuary from <a href="https://cloistr.xyz">Cloistr</a> — Freedom as a Service
        </p>
        <p className="footer-links">
          <a href="https://git.aegis-hq.xyz/coldforge">Source Code</a>
        </p>
      </footer>
    </div>
  )
}

export default App
