export interface MetricSummary {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export interface MonthlyDataPoint {
  month: string;
  revenue: number;
  users: number;
  orders: number;
}

export interface TableRow {
  id: number;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

export type TimeRange = '7d' | '30d' | '90d' | '1y';

export const timeRanges: TimeRange[] = ['7d', '30d', '90d', '1y'];

export const metricSummaries: MetricSummary[] = [
  { id: 'revenue', label: 'Revenue', value: '$48,352', change: 12.5, trend: 'up' },
  { id: 'users', label: 'Users', value: '3,842', change: 8.1, trend: 'up' },
  { id: 'orders', label: 'Orders', value: '1,247', change: -3.2, trend: 'down' },
  { id: 'conversion', label: 'Conversion', value: '3.6%', change: 1.8, trend: 'up' },
];

export const monthlyData: MonthlyDataPoint[] = [
  { month: 'Jan', revenue: 28400, users: 2100, orders: 780 },
  { month: 'Feb', revenue: 31200, users: 2340, orders: 820 },
  { month: 'Mar', revenue: 29800, users: 2280, orders: 790 },
  { month: 'Apr', revenue: 35600, users: 2650, orders: 910 },
  { month: 'May', revenue: 33100, users: 2520, orders: 870 },
  { month: 'Jun', revenue: 38400, users: 2890, orders: 980 },
  { month: 'Jul', revenue: 36700, users: 2780, orders: 950 },
  { month: 'Aug', revenue: 41200, users: 3100, orders: 1050 },
  { month: 'Sep', revenue: 39500, users: 3020, orders: 1010 },
  { month: 'Oct', revenue: 43800, users: 3350, orders: 1120 },
  { month: 'Nov', revenue: 45600, users: 3540, orders: 1180 },
  { month: 'Dec', revenue: 48352, users: 3842, orders: 1247 },
];

export const tableData: TableRow[] = [
  { id: 1, customer: 'Alice Johnson', amount: 1250.00, status: 'completed', date: '2025-12-01' },
  { id: 2, customer: 'Bob Martinez', amount: 890.50, status: 'completed', date: '2025-12-02' },
  { id: 3, customer: 'Carol Williams', amount: 2100.75, status: 'pending', date: '2025-12-03' },
  { id: 4, customer: 'David Kim', amount: 450.00, status: 'failed', date: '2025-12-04' },
  { id: 5, customer: 'Eva Chen', amount: 3200.25, status: 'completed', date: '2025-12-05' },
  { id: 6, customer: 'Frank Osei', amount: 780.60, status: 'pending', date: '2025-12-06' },
  { id: 7, customer: 'Grace Liu', amount: 1650.00, status: 'completed', date: '2025-12-07' },
  { id: 8, customer: 'Hassan Ali', amount: 920.30, status: 'failed', date: '2025-12-08' },
  { id: 9, customer: 'Iris Patel', amount: 2450.90, status: 'completed', date: '2025-12-09' },
  { id: 10, customer: 'James Rivera', amount: 1100.00, status: 'pending', date: '2025-12-10' },
];

export const rangeMetricOverrides: Record<TimeRange, MetricSummary[]> = {
  '7d': [
    { id: 'revenue', label: 'Revenue', value: '$9,120', change: 5.3, trend: 'up' },
    { id: 'users', label: 'Users', value: '684', change: 2.1, trend: 'up' },
    { id: 'orders', label: 'Orders', value: '213', change: -1.4, trend: 'down' },
    { id: 'conversion', label: 'Conversion', value: '3.2%', change: -0.6, trend: 'down' },
  ],
  '30d': [
    { id: 'revenue', label: 'Revenue', value: '$48,352', change: 12.5, trend: 'up' },
    { id: 'users', label: 'Users', value: '3,842', change: 8.1, trend: 'up' },
    { id: 'orders', label: 'Orders', value: '1,247', change: -3.2, trend: 'down' },
    { id: 'conversion', label: 'Conversion', value: '3.6%', change: 1.8, trend: 'up' },
  ],
  '90d': [
    { id: 'revenue', label: 'Revenue', value: '$124,500', change: 18.7, trend: 'up' },
    { id: 'users', label: 'Users', value: '9,960', change: 14.3, trend: 'up' },
    { id: 'orders', label: 'Orders', value: '3,350', change: 6.5, trend: 'up' },
    { id: 'conversion', label: 'Conversion', value: '3.8%', change: 2.4, trend: 'up' },
  ],
  '1y': [
    { id: 'revenue', label: 'Revenue', value: '$452,100', change: 24.2, trend: 'up' },
    { id: 'users', label: 'Users', value: '34,520', change: 31.0, trend: 'up' },
    { id: 'orders', label: 'Orders', value: '11,210', change: 15.8, trend: 'up' },
    { id: 'conversion', label: 'Conversion', value: '3.5%', change: 0.9, trend: 'up' },
  ],
};
