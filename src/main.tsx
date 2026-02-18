import { createRoot } from 'react-dom/client';
import { useRoute } from './hooks/useRoute';
import LandingPage from './pages/LandingPage';
import DraftWorkspace from './draft/DraftWorkspace';
import RosterPage from './pages/RosterPage';

function App() {
  const { projectId } = useRoute();

  if (!projectId) return <LandingPage />;
  if (projectId === 'roster') return <RosterPage />;
  return <DraftWorkspace />;
}

createRoot(document.getElementById('root')!).render(<App />);
