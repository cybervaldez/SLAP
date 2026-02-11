import { useState } from 'react';
import type { ArchetypeDemoProps } from '../../types';
import type { TimeRange } from './data';
import { monthlyData, tableData, rangeMetricOverrides } from './data';
import MetricCard from './components/MetricCard';
import SimpleChart from './components/SimpleChart';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';

const ACCENT = '#059669';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type SortableColumn = 'customer' | 'amount' | 'status' | 'date';
type SortDirection = 'asc' | 'desc';

export default function DataDashboardDemo(_props: ArchetypeDemoProps) {
  const [activeRange, setActiveRange] = useState<TimeRange>('30d');
  const [sortColumn, setSortColumn] = useState<SortableColumn>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const metrics = rangeMetricOverrides[activeRange];

  const handleSort = (column: SortableColumn) => {
    if (column === sortColumn) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div
      data-testid="data-dashboard-demo"
      style={{
        fontFamily: FONT_FAMILY,
        maxWidth: '960px',
        margin: '0 auto',
        padding: '2.5rem 1.5rem',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#111827',
            margin: '0 0 0.35rem',
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            fontSize: '0.95rem',
            color: '#6B7280',
            margin: 0,
          }}
        >
          Track your key business metrics at a glance.
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <FilterBar activeRange={activeRange} onRangeChange={setActiveRange} />
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Chart */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#111827',
            margin: '0 0 0.75rem',
          }}
        >
          Monthly Revenue
        </h2>
        <SimpleChart data={monthlyData} dataKey="revenue" color={ACCENT} />
      </div>

      {/* Data Table */}
      <div>
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#111827',
            margin: '0 0 0.75rem',
          }}
        >
          Recent Transactions
        </h2>
        <DataTable
          data={tableData}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </div>
    </div>
  );
}
