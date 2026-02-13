import type { CrewDef } from '../types';

export const crew: CrewDef[] = [
  {
    id: 'prompter',
    name: 'ALEX',
    role: 'Prompt Engineer',
    taste: 'AI art community, prompt engineering forums, "the model is the artist" philosophy',
    icon: '\u{1F916}',
    bg: 'rgba(99,102,241,0.15)',
    ringBorder: '#818CF8',
  },
  {
    id: 'junior',
    name: 'KAI',
    role: 'Junior Designer',
    taste: 'Design Twitter, Dribbble daily inspiration, tutorial follower, template user',
    icon: '\u{1F3A8}',
    bg: 'rgba(244,114,182,0.15)',
    ringBorder: '#F472B6',
  },
  {
    id: 'pm',
    name: 'JORDAN',
    role: 'Product Manager',
    taste: 'Metrics dashboards, OKR frameworks, ship-fast culture, A/B test everything',
    icon: '\u{1F4C8}',
    bg: 'rgba(34,197,94,0.15)',
    ringBorder: '#22C55E',
  },
  {
    id: 'founder',
    name: 'RILEY',
    role: 'Startup Founder',
    taste: 'Indie hacker forums, built-this-in-a-weekend threads, bootstrap culture',
    icon: '\u{1F680}',
    bg: 'rgba(251,146,60,0.15)',
    ringBorder: '#FB923C',
  },
];

const crewMap = new Map(crew.map(c => [c.id, c]));

export function getCrewMember(id: string): CrewDef | undefined {
  return crewMap.get(id);
}
