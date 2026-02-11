export type Priority = 'low' | 'medium' | 'high';

export interface Column {
  id: 'todo' | 'in-progress' | 'done';
  title: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  column: string;
  tags: string[];
}

export const columns: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Design homepage wireframe',
    description: 'Create a low-fidelity wireframe for the new homepage layout including hero section and navigation.',
    priority: 'high',
    column: 'todo',
    tags: ['design', 'ui'],
  },
  {
    id: 'task-2',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment to staging environment.',
    priority: 'high',
    column: 'todo',
    tags: ['devops', 'infrastructure'],
  },
  {
    id: 'task-3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with request/response examples using OpenAPI spec.',
    priority: 'medium',
    column: 'todo',
    tags: ['docs', 'api'],
  },
  {
    id: 'task-4',
    title: 'Add dark mode support',
    description: 'Implement a theme toggle that switches between light and dark color schemes across the app.',
    priority: 'low',
    column: 'todo',
    tags: ['feature', 'ui'],
  },
  {
    id: 'task-5',
    title: 'Implement user authentication',
    description: 'Build login and registration flows with JWT tokens and refresh token rotation.',
    priority: 'high',
    column: 'in-progress',
    tags: ['backend', 'security'],
  },
  {
    id: 'task-6',
    title: 'Optimize image loading',
    description: 'Add lazy loading and responsive srcset attributes to all product images for faster page loads.',
    priority: 'medium',
    column: 'in-progress',
    tags: ['performance', 'frontend'],
  },
  {
    id: 'task-7',
    title: 'Fix mobile nav bug',
    description: 'The hamburger menu does not close after selecting a navigation link on mobile devices.',
    priority: 'medium',
    column: 'done',
    tags: ['bug', 'mobile'],
  },
  {
    id: 'task-8',
    title: 'Set up error monitoring',
    description: 'Integrate Sentry for real-time error tracking and alerting in production.',
    priority: 'low',
    column: 'done',
    tags: ['devops', 'monitoring'],
  },
];
