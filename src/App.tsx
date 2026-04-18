import type { Component } from 'solid-js'

interface Service {
  name: string
  description: string
  url: string
  icon: string
}

const services: Service[] = [
  {
    name: 'Identity',
    description: 'Your @cloistr.xyz address for NIP-05 and Lightning',
    url: 'https://me.cloistr.xyz',
    icon: '🔑',
  },
  {
    name: 'Social',
    description: 'Communities and your Nostr feed',
    url: 'https://space.cloistr.xyz',
    icon: '💬',
  },
  {
    name: 'Files',
    description: 'Store and share files with Blossom',
    url: 'https://stash.cloistr.xyz',
    icon: '📁',
  },
  {
    name: 'Documents',
    description: 'Collaborative document editing',
    url: 'https://docs.cloistr.xyz',
    icon: '📝',
  },
  {
    name: 'Sheets',
    description: 'Collaborative spreadsheets',
    url: 'https://sheets.cloistr.xyz',
    icon: '📊',
  },
  {
    name: 'Whiteboard',
    description: 'Diagrams and sketches',
    url: 'https://whiteboard.cloistr.xyz',
    icon: '🎨',
  },
  {
    name: 'Slides',
    description: 'Presentation builder',
    url: 'https://slides.cloistr.xyz',
    icon: '📽️',
  },
  {
    name: 'Relay',
    description: 'Your personal Nostr relay',
    url: 'https://relay.cloistr.xyz',
    icon: '📡',
  },
  {
    name: 'Discovery',
    description: 'Find and compare Nostr relays',
    url: 'https://discover.cloistr.xyz',
    icon: '🔍',
  },
]

const App: Component = () => {
  return (
    <div class="sanctuary">
      <header class="header">
        <div class="header-content">
          <a href="/" class="logo">
            <img src="/cloistr-logo.svg" alt="Cloistr" class="logo-img" />
          </a>
          <nav class="nav">
            <a href="https://me.cloistr.xyz" class="nav-link">Login</a>
          </nav>
        </div>
      </header>

      <main class="main">
        <section class="hero">
          <h1 class="hero-title">Freedom as a Service</h1>
          <p class="hero-subtitle">
            Your sanctuary in the decentralized web. Own your identity, your data,
            and your digital life with Nostr-native productivity tools.
          </p>
          <a href="https://me.cloistr.xyz" class="cta-button">
            Claim Your @cloistr.xyz Address
          </a>
        </section>

        <section class="services">
          <h2 class="services-title">Everything You Need</h2>
          <div class="services-grid">
            {services.map((service) => (
              <a href={service.url} class="service-card">
                <span class="service-icon">{service.icon}</span>
                <h3 class="service-name">{service.name}</h3>
                <p class="service-description">{service.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section class="features">
          <div class="feature">
            <h3>Zero-Knowledge</h3>
            <p>End-to-end encryption. We can't read your data even if we wanted to.</p>
          </div>
          <div class="feature">
            <h3>Portable</h3>
            <p>Export everything anytime. Host it yourself if you prefer.</p>
          </div>
          <div class="feature">
            <h3>Open Source</h3>
            <p>Every line of code is public. Trust through transparency.</p>
          </div>
        </section>
      </main>

      <footer class="footer">
        <p>
          A sanctuary from <a href="https://cloistr.xyz">Cloistr</a> — Freedom as a Service
        </p>
        <p class="footer-links">
          <a href="https://git.coldforge.xyz/coldforge">Source Code</a>
        </p>
      </footer>
    </div>
  )
}

export default App
