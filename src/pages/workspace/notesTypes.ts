import type { TrafficLight } from '../../data/reviews';

export interface SavedFinding {
  reviewerId: string;
  reviewerName: string;
  section: string;
  findingIndex: number;
  text: string;
  comment: string;
  light: TrafficLight;
}

export function findingKey(f: SavedFinding): string {
  return `${f.reviewerId}:${f.section}:${f.findingIndex}`;
}
