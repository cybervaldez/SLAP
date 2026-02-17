
interface ExampleDesignProps {
  version: string;
}

// ─── V1: "AI Slop" ──────────────────────────────────────────
// Deliberately looks like default AI output every prompter recognizes.

function V1Design() {
  return (
    <div data-testid="example-design" style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1a1a2e' }}>
      {/* HERO */}
      <section
        data-section="hero"
        data-testid="section-hero"
        style={{
          minHeight: '70vh',
          background: 'linear-gradient(135deg, #f8f9ff 0%, #eef0ff 50%, #f0e8ff 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6366F1', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          INTRODUCING FLOWSTACK
        </p>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          maxWidth: 700,
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Unlock the Power of Seamless Workflow Automation
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: 500, lineHeight: 1.6, marginBottom: '2rem' }}>
          Streamline your team's productivity with our cutting-edge platform. Built for modern teams who demand excellence.
        </p>
        <button style={{
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
          color: '#fff',
          border: 'none',
          padding: '14px 40px',
          borderRadius: 12,
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
        }}>
          Get Started Free
        </button>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem' }}>No credit card required</p>
      </section>

      {/* FEATURES */}
      <section
        data-section="features"
        data-testid="section-features"
        style={{
          minHeight: '65vh',
          background: '#fff',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Everything You Need
        </h2>
        <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '1rem' }}>
          Powerful features to supercharge your workflow
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          {[
            { title: 'Seamless Integration', desc: 'Connect with 100+ tools your team already uses. Our platform integrates effortlessly with your existing workflow.' },
            { title: 'Lightning Fast', desc: 'Experience blazing-fast performance with our optimized infrastructure. No more waiting around.' },
            { title: 'Secure by Default', desc: 'Enterprise-grade security built in from day one. Your data is protected with military-grade encryption.' },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#f8f9ff',
              borderRadius: 16,
              padding: '2rem',
              textAlign: 'left',
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                marginBottom: '1rem',
              }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        data-section="pricing"
        data-testid="section-pricing"
        style={{
          minHeight: '65vh',
          background: 'linear-gradient(180deg, #f8f9ff 0%, #fff 100%)',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Simple, Transparent Pricing
        </h2>
        <p style={{ color: '#64748b', marginBottom: '3rem' }}>Choose the plan that fits your needs</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          maxWidth: 850,
          margin: '0 auto',
        }}>
          {[
            { name: 'Starter', price: '$9', features: ['5 projects', '10 GB storage', 'Email support'] },
            { name: 'Pro', price: '$29', features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access'] },
            { name: 'Enterprise', price: '$99', features: ['Everything in Pro', 'SSO', 'Dedicated account manager', 'Custom integrations'] },
          ].map((t, i) => (
            <div key={i} style={{
              background: '#fff',
              borderRadius: 16,
              padding: '2rem',
              border: '1px solid #e2e8f0',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{t.name}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                {t.price}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#94a3b8' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '0.9rem', color: '#475569' }}>
                {t.features.map((f, j) => (
                  <li key={j} style={{ padding: '0.4rem 0' }}>{'\u2713'} {f}</li>
                ))}
              </ul>
              <button style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '10px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                background: i === 1 ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#fff',
                color: i === 1 ? '#fff' : '#1a1a2e',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        data-section="cta"
        data-testid="section-cta"
        style={{
          minHeight: '60vh',
          background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          top: -50,
          right: -80,
        }} />
        <div style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          bottom: -40,
          left: -60,
        }} />
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '1rem', maxWidth: 500 }}>
          Get Started Today
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: 400, marginBottom: '2rem', lineHeight: 1.6 }}>
          Join thousands of teams already transforming their workflow with FlowStack.
        </p>
        <button style={{
          background: '#fff',
          color: '#6366F1',
          border: 'none',
          padding: '14px 40px',
          borderRadius: 12,
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
        }}>
          Start Your Free Trial
        </button>
      </section>
    </div>
  );
}

// ─── V2: "After SLAP" ───────────────────────────────────────
// Intentional, non-default design shaped by reviewer feedback.

function V2Design() {
  return (
    <div data-testid="example-design" style={{ fontFamily: "'Courier New', monospace", color: '#F5F0E1', background: '#0D0D1A' }}>
      {/* HERO */}
      <section
        data-section="hero"
        data-testid="section-hero"
        style={{
          minHeight: '70vh',
          background: '#0D0D1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4rem 3rem',
          borderBottom: '1px solid rgba(245, 240, 225, 0.08)',
        }}
      >
        <div style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          color: '#FFD000',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          borderLeft: '3px solid #FFD000',
          paddingLeft: '0.75rem',
        }}>
          FLOWSTACK
        </div>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          maxWidth: 650,
          marginBottom: '1.5rem',
          color: '#F5F0E1',
        }}>
          Ship your first feature in 4 minutes.
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'rgba(245, 240, 225, 0.6)', maxWidth: 480, lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Not another workflow tool. FlowStack connects your code, your team, and your deployment pipeline in one command.
        </p>
        <button style={{
          background: '#FFD000',
          color: '#0D0D1A',
          border: 'none',
          padding: '14px 32px',
          fontSize: '0.85rem',
          fontWeight: 800,
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.06em',
          cursor: 'pointer',
        }}>
          START FREE &mdash; NO CREDIT CARD
        </button>
        <p style={{ fontSize: '0.65rem', color: 'rgba(245, 240, 225, 0.4)', marginTop: '0.75rem' }}>
          Used by 2,400+ teams. 4.9/5 on G2.
        </p>
      </section>

      {/* FEATURES */}
      <section
        data-section="features"
        data-testid="section-features"
        style={{
          minHeight: '65vh',
          background: '#0D0D1A',
          padding: '5rem 3rem',
          borderBottom: '1px solid rgba(245, 240, 225, 0.08)',
        }}
      >
        <h2 style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'rgba(245, 240, 225, 0.4)',
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
        }}>
          WHAT YOU GET
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: 900,
        }}>
          {[
            {
              icon: '\u2192',
              title: 'One-command deploy',
              desc: 'Push to main. FlowStack handles build, test, stage, and production. Zero config files.',
              border: '#FF6B6B',
            },
            {
              icon: '\u26A1',
              title: '40ms cold start',
              desc: 'Edge-native runtime. Your API responds before the user\'s finger lifts off the screen.',
              border: '#FFD000',
            },
            {
              icon: '\u{1F512}',
              title: 'SOC 2 from day one',
              desc: 'Audit logs, RBAC, and encryption at rest. Compliance isn\'t a feature request\u2014it\'s the default.',
              border: '#6BCB77',
            },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#1A1A2E',
              padding: '2rem',
              borderLeft: `3px solid ${f.border}`,
            }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }} role="img" aria-label={f.title}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#F5F0E1' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'rgba(245, 240, 225, 0.5)', lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section
        data-section="pricing"
        data-testid="section-pricing"
        style={{
          minHeight: '65vh',
          background: '#0D0D1A',
          padding: '5rem 3rem',
          borderBottom: '1px solid rgba(245, 240, 225, 0.08)',
        }}
      >
        <h2 style={{
          fontSize: '0.6rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'rgba(245, 240, 225, 0.4)',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          PRICING
        </h2>
        <p style={{ fontSize: '0.75rem', color: 'rgba(245, 240, 225, 0.4)', marginBottom: '2.5rem' }}>
          See what it costs in 5 seconds.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          maxWidth: 850,
        }}>
          {[
            { name: 'Starter', price: '$9', note: 'For solo builders', features: ['5 projects', '10 GB storage', 'Community support'], popular: false },
            { name: 'Pro', price: '$29', note: 'For growing teams', features: ['Unlimited projects', '100 GB storage', 'Priority support', 'API access', 'Custom domains'], popular: true },
            { name: 'Enterprise', price: '$99', note: 'For scale', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated CSM', 'SLA guarantee', '99.99% uptime'], popular: false },
          ].map((t, i) => (
            <div key={i} style={{
              background: '#1A1A2E',
              padding: '2rem',
              border: t.popular ? '2px solid #FFD000' : '1px solid rgba(245, 240, 225, 0.08)',
              position: 'relative',
            }}>
              {t.popular && (
                <div style={{
                  position: 'absolute',
                  top: -1,
                  left: 0,
                  right: 0,
                  background: '#FFD000',
                  color: '#0D0D1A',
                  textAlign: 'center',
                  fontSize: '0.5rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  padding: '3px 0',
                }}>
                  MOST POPULAR
                </div>
              )}
              <h3 style={{ fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', marginTop: t.popular ? '0.75rem' : 0 }}>{t.name}</h3>
              <p style={{ fontSize: '0.55rem', color: 'rgba(245, 240, 225, 0.4)', marginBottom: '1rem' }}>{t.note}</p>
              <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: t.popular ? '#FFD000' : '#F5F0E1' }}>
                {t.price}<span style={{ fontSize: '0.7rem', fontWeight: 400, color: 'rgba(245, 240, 225, 0.4)' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.7rem', color: 'rgba(245, 240, 225, 0.6)' }}>
                {t.features.map((f, j) => (
                  <li key={j} style={{ padding: '0.35rem 0', borderBottom: '1px solid rgba(245, 240, 225, 0.04)' }}>
                    {f}
                  </li>
                ))}
              </ul>
              <button style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '10px',
                border: t.popular ? 'none' : '1px solid rgba(245, 240, 225, 0.15)',
                background: t.popular ? '#FFD000' : 'transparent',
                color: t.popular ? '#0D0D1A' : '#F5F0E1',
                fontWeight: 700,
                fontFamily: "'Courier New', monospace",
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                cursor: 'pointer',
              }}>
                {t.popular ? 'START FREE' : 'CHOOSE PLAN'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        data-section="cta"
        data-testid="section-cta"
        style={{
          minHeight: '60vh',
          background: '#0D0D1A',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4rem 3rem',
        }}
      >
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: '#F5F0E1', marginBottom: '1rem', maxWidth: 500 }}>
          Start Free &mdash; No Credit Card
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'rgba(245, 240, 225, 0.5)', maxWidth: 400, marginBottom: '2rem', lineHeight: 1.7 }}>
          2,400 teams shipped their first feature in under 5 minutes. You're next.
        </p>
        <button style={{
          background: '#FFD000',
          color: '#0D0D1A',
          border: 'none',
          padding: '14px 32px',
          fontSize: '0.85rem',
          fontWeight: 800,
          fontFamily: "'Courier New', monospace",
          letterSpacing: '0.06em',
          cursor: 'pointer',
          marginBottom: '1.5rem',
        }}>
          CREATE ACCOUNT
        </button>
        <div style={{ fontSize: '0.65rem', color: 'rgba(245, 240, 225, 0.35)', maxWidth: 380, lineHeight: 1.6 }}>
          <p style={{ marginBottom: '0.5rem' }}>"We cut our deploy time from 45 minutes to 4. Not exaggerating." &mdash; Sarah K., Engineering Lead</p>
          <p>"The team adopted it in a day. No training needed." &mdash; Marcus R., CTO</p>
        </div>
      </section>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

export default function ExampleDesign({ version }: ExampleDesignProps) {
  if (version === 'v2') return <V2Design />;
  return <V1Design />;
}
