/**
 * Design canvas — the landing page being reviewed.
 * Four sections: hero, features, pricing, cta.
 * Each section has data-section for the review system.
 */

interface Props {
  version: string;
}

export default function DesignCanvas({ version }: Props) {
  if (version === 'v2') return <V2Canvas />;
  return <V1Canvas />;
}

/** V1 — AI-generated "slop" (the version that gets roasted) */
function V1Canvas() {
  return (
    <>
      {/* HERO */}
      <div className="draft-section" data-section="hero" data-testid="hero-section">
        <div className="draft-section-label">Hero</div>
        <h2>Unlock the Power of Seamless Integration</h2>
        <p>
          Boost productivity by 10x with our AI-powered platform. Connect your
          tools, automate your workflows, and focus on what matters most.
        </p>
        <button className="draft-cta-btn">Get Started Today</button>
      </div>

      {/* FEATURES */}
      <div className="draft-section" data-section="features" data-testid="features-section">
        <div className="draft-section-label">Features</div>
        <h2>Everything you need to scale</h2>
        <div className="draft-feature-grid">
          <div className="draft-feature-card">
            <h4>Smart Automation</h4>
            <p>Set up workflows in minutes. Our AI handles the rest, learning from your patterns.</p>
          </div>
          <div className="draft-feature-card">
            <h4>Real-time Sync</h4>
            <p>Changes propagate instantly across all connected tools and team members.</p>
          </div>
          <div className="draft-feature-card">
            <h4>Advanced Analytics</h4>
            <p>Track performance metrics with customizable dashboards and reports.</p>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div className="draft-section" data-section="pricing" data-testid="pricing-section">
        <div className="draft-section-label">Pricing</div>
        <h2>Simple, transparent pricing</h2>
        <div className="draft-pricing-tiers">
          <div className="draft-tier">
            <h4>Starter</h4>
            <div className="draft-tier-price">$29</div>
            <p>For individuals and small teams</p>
          </div>
          <div className="draft-tier featured">
            <h4>Professional</h4>
            <div className="draft-tier-price">$79</div>
            <p>For growing businesses</p>
          </div>
          <div className="draft-tier">
            <h4>Enterprise</h4>
            <div className="draft-tier-price">$149</div>
            <p>For large organizations</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="draft-section" data-section="cta" data-testid="cta-section">
        <div className="draft-section-label">Call to Action</div>
        <h2>Ready to Transform Your Workflow?</h2>
        <p>
          Join 10,000+ teams already using our platform. Start your free trial
          today &mdash; no credit card required.
        </p>
        <button className="draft-cta-outline">Get Started &rarr;</button>
      </div>
    </>
  );
}

/** V2 — After SLAP review (intentional design) */
function V2Canvas() {
  return (
    <>
      <div className="draft-section" data-section="hero" data-testid="hero-section">
        <div className="draft-section-label">Hero</div>
        <h2>Ship your first feature in 4 minutes</h2>
        <p>
          Not &quot;get started.&quot; Not &quot;unlock the power of.&quot;
          Paste your repo URL and watch it deploy. That&apos;s it.
        </p>
        <button className="draft-cta-btn">Deploy now &mdash; free</button>
      </div>

      <div className="draft-section" data-section="features" data-testid="features-section">
        <div className="draft-section-label">Features</div>
        <h2>What you get (no buzzwords)</h2>
        <div className="draft-feature-grid">
          <div className="draft-feature-card">
            <h4>Git Push = Deploy</h4>
            <p>Push to main, see it live in 12 seconds. No CI config, no YAML.</p>
          </div>
          <div className="draft-feature-card">
            <h4>Preview per PR</h4>
            <p>Every pull request gets a unique URL. Share it with your team.</p>
          </div>
          <div className="draft-feature-card">
            <h4>Logs that help</h4>
            <p>Structured logs with context. No more grepping through walls of text.</p>
          </div>
        </div>
      </div>

      <div className="draft-section" data-section="pricing" data-testid="pricing-section">
        <div className="draft-section-label">Pricing</div>
        <h2>Pay for what you ship</h2>
        <div className="draft-pricing-tiers">
          <div className="draft-tier">
            <h4>Hobby</h4>
            <div className="draft-tier-price">$0</div>
            <p>3 projects, 100 deploys/mo</p>
          </div>
          <div className="draft-tier featured">
            <h4>Team</h4>
            <div className="draft-tier-price">$29</div>
            <p>Unlimited projects + team</p>
          </div>
          <div className="draft-tier">
            <h4>Scale</h4>
            <div className="draft-tier-price">$99</div>
            <p>SLA, SSO, priority support</p>
          </div>
        </div>
      </div>

      <div className="draft-section" data-section="cta" data-testid="cta-section">
        <div className="draft-section-label">Call to Action</div>
        <h2>Your competitors shipped while you read this</h2>
        <p>
          2,400 teams deployed last week. No credit card. No sales call.
          Just paste your repo.
        </p>
        <button className="draft-cta-outline">Deploy in 4 minutes &rarr;</button>
      </div>
    </>
  );
}
