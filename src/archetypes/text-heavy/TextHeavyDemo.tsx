import type { ArchetypeDemoProps } from '../../types';
import SlapTextHeavy from './variations/SlapTextHeavy';
import BrutalistTextHeavy from './variations/BrutalistTextHeavy';
import NeoMinimalTextHeavy from './variations/NeoMinimalTextHeavy';
import MaximalistTextHeavy from './variations/MaximalistTextHeavy';
import DarkIndustrialTextHeavy from './variations/DarkIndustrialTextHeavy';
import WarmOrganicTextHeavy from './variations/WarmOrganicTextHeavy';
import RetroFuturismTextHeavy from './variations/RetroFuturismTextHeavy';
import MemphisTextHeavy from './variations/MemphisTextHeavy';
import ArtDecoTextHeavy from './variations/ArtDecoTextHeavy';

export default function TextHeavyDemo({ variation }: ArchetypeDemoProps) {
  switch (variation) {
    case 'brutalist':
      return <BrutalistTextHeavy />;
    case 'neo-minimal':
      return <NeoMinimalTextHeavy />;
    case 'maximalist':
      return <MaximalistTextHeavy />;
    case 'dark-industrial':
      return <DarkIndustrialTextHeavy />;
    case 'warm-organic':
      return <WarmOrganicTextHeavy />;
    case 'retro-futurism':
      return <RetroFuturismTextHeavy />;
    case 'memphis':
      return <MemphisTextHeavy />;
    case 'art-deco':
      return <ArtDecoTextHeavy />;
    default:
      return <SlapTextHeavy />;
  }
}
