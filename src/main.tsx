import { createRoot } from 'react-dom/client';
import { useRoute } from './hooks/useRoute';
import LandingPage from './pages/LandingPage';

function App() {
  const { projectId } = useRoute();

  // Root route → landing page
  if (!projectId) return <LandingPage />;

  // Future: project pages
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D0D1A',
      color: '#F5F0E1',
      fontFamily: "'Courier New', monospace",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '0.1em' }}>
          {projectId}
        </h1>
        <p style={{ color: 'rgba(245, 240, 225, 0.5)', fontSize: '0.8rem' }}>
          Project page coming soon.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
