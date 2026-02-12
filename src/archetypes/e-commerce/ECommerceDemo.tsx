import type { ArchetypeDemoProps } from '../../types';
import SlapEcommerce from './variations/SlapEcommerce';
import BrutalistEcommerce from './variations/BrutalistEcommerce';
import NeoMinimalEcommerce from './variations/NeoMinimalEcommerce';
import MaximalistEcommerce from './variations/MaximalistEcommerce';
import DarkIndustrialEcommerce from './variations/DarkIndustrialEcommerce';
import WarmOrganicEcommerce from './variations/WarmOrganicEcommerce';
import RetroFuturismEcommerce from './variations/RetroFuturismEcommerce';
import MemphisEcommerce from './variations/MemphisEcommerce';
import ArtDecoEcommerce from './variations/ArtDecoEcommerce';

export default function ECommerceDemo({ variation }: ArchetypeDemoProps) {
  switch (variation) {
    case 'brutalist':
      return <BrutalistEcommerce />;
    case 'neo-minimal':
      return <NeoMinimalEcommerce />;
    case 'maximalist':
      return <MaximalistEcommerce />;
    case 'dark-industrial':
      return <DarkIndustrialEcommerce />;
    case 'warm-organic':
      return <WarmOrganicEcommerce />;
    case 'retro-futurism':
      return <RetroFuturismEcommerce />;
    case 'memphis':
      return <MemphisEcommerce />;
    case 'art-deco':
      return <ArtDecoEcommerce />;
    default:
      return <SlapEcommerce />;
  }
}
