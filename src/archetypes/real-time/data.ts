export interface Channel {
  id: string;
  name: string;
  unread: number;
}

export interface Message {
  id: string;
  channelId: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface SimulatedMessage {
  author: string;
  content: string;
}

export const channels: Channel[] = [
  { id: 'general', name: 'general', unread: 2 },
  { id: 'random', name: 'random', unread: 0 },
  { id: 'tech', name: 'tech', unread: 5 },
];

export const initialMessages: Record<string, Message[]> = {
  general: [
    {
      id: 'msg-g1',
      channelId: 'general',
      author: 'Alice',
      content: 'Hey everyone! How is it going?',
      timestamp: '2026-02-10T09:00:00Z',
      isOwn: false,
    },
    {
      id: 'msg-g2',
      channelId: 'general',
      author: 'You',
      content: 'Doing great, thanks! Just started the new sprint.',
      timestamp: '2026-02-10T09:01:30Z',
      isOwn: true,
    },
    {
      id: 'msg-g3',
      channelId: 'general',
      author: 'Bob',
      content: 'Same here. Anyone up for a quick sync later today?',
      timestamp: '2026-02-10T09:03:00Z',
      isOwn: false,
    },
    {
      id: 'msg-g4',
      channelId: 'general',
      author: 'Charlie',
      content: 'Count me in! Let me know the time.',
      timestamp: '2026-02-10T09:04:15Z',
      isOwn: false,
    },
  ],
  random: [
    {
      id: 'msg-r1',
      channelId: 'random',
      author: 'Dana',
      content: 'Has anyone tried the new coffee place on 5th?',
      timestamp: '2026-02-10T08:30:00Z',
      isOwn: false,
    },
    {
      id: 'msg-r2',
      channelId: 'random',
      author: 'You',
      content: 'Not yet, but I heard it is really good!',
      timestamp: '2026-02-10T08:32:00Z',
      isOwn: true,
    },
    {
      id: 'msg-r3',
      channelId: 'random',
      author: 'Eve',
      content: 'Their cold brew is fantastic. Highly recommend it.',
      timestamp: '2026-02-10T08:35:00Z',
      isOwn: false,
    },
  ],
  tech: [
    {
      id: 'msg-t1',
      channelId: 'tech',
      author: 'Frank',
      content: 'Just deployed the new API endpoints. Tests are green.',
      timestamp: '2026-02-10T10:00:00Z',
      isOwn: false,
    },
    {
      id: 'msg-t2',
      channelId: 'tech',
      author: 'You',
      content: 'Nice work! I will start integrating the frontend.',
      timestamp: '2026-02-10T10:02:00Z',
      isOwn: true,
    },
    {
      id: 'msg-t3',
      channelId: 'tech',
      author: 'Grace',
      content: 'Should we add rate limiting before going live?',
      timestamp: '2026-02-10T10:05:00Z',
      isOwn: false,
    },
    {
      id: 'msg-t4',
      channelId: 'tech',
      author: 'Frank',
      content: 'Good call. I will set up throttling on the gateway.',
      timestamp: '2026-02-10T10:06:30Z',
      isOwn: false,
    },
    {
      id: 'msg-t5',
      channelId: 'tech',
      author: 'Hana',
      content: 'Also, do not forget to update the OpenAPI spec.',
      timestamp: '2026-02-10T10:08:00Z',
      isOwn: false,
    },
  ],
};

export const simulatedMessagesPool: SimulatedMessage[] = [
  { author: 'Alice', content: 'Just pushed a fix for the login bug.' },
  { author: 'Bob', content: 'Can someone review my PR? It is ready for merge.' },
  { author: 'Charlie', content: 'Lunch break! Be back in 30 minutes.' },
  { author: 'Dana', content: 'The CI pipeline is looking much faster now.' },
  { author: 'Eve', content: 'Anyone else seeing the flaky test on staging?' },
  { author: 'Frank', content: 'Great standup today. Let us keep the momentum going.' },
  { author: 'Grace', content: 'I updated the docs with the new endpoint details.' },
  { author: 'Hana', content: 'Heads up: deploying to production at 3 PM.' },
];

export const botNames = ['Alice', 'Bob', 'Charlie', 'Dana', 'Eve', 'Frank', 'Grace', 'Hana'];

export const avatarColors: Record<string, string> = {
  Alice: '#EF4444',
  Bob: '#F59E0B',
  Charlie: '#10B981',
  Dana: '#8B5CF6',
  Eve: '#EC4899',
  Frank: '#3B82F6',
  Grace: '#F97316',
  Hana: '#14B8A6',
  You: '#06B6D4',
};
