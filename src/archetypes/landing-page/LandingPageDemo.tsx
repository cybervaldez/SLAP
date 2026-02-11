import type { ArchetypeDemoProps } from '../../types';
import SlapLanding from './variations/SlapLanding';
import BrutalistLanding from './variations/BrutalistLanding';
import NeoMinimalLanding from './variations/NeoMinimalLanding';
import MaximalistLanding from './variations/MaximalistLanding';
import DarkIndustrialLanding from './variations/DarkIndustrialLanding';
import WarmOrganicLanding from './variations/WarmOrganicLanding';
import RetroFuturismLanding from './variations/RetroFuturismLanding';

export default function LandingPageDemo({ variation }: ArchetypeDemoProps) {
  switch (variation) {
    case 'brutalist':
      return <BrutalistLanding />;
    case 'neo-minimal':
      return <NeoMinimalLanding />;
    case 'maximalist':
      return <MaximalistLanding />;
    case 'dark-industrial':
      return <DarkIndustrialLanding />;
    case 'warm-organic':
      return <WarmOrganicLanding />;
    case 'retro-futurism':
      return <RetroFuturismLanding />;
    default:
      return <SlapLanding />;
  }
}
