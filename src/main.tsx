import { createRoot } from 'react-dom/client';
import { useRoute } from './hooks/useRoute';
import LandingPage from './pages/LandingPage';
import DraftWorkspace from './draft/DraftWorkspace';

function App() {
  const { projectId } = useRoute();

  if (!projectId) return <LandingPage />;
  return <DraftWorkspace />;
}

createRoot(document.getElementById('root')!).render(<App />);
