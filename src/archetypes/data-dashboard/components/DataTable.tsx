import React from 'react';
import type { TableRow } from '../data';

const ACCENT = '#059669';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

type SortableColumn = 'customer' | 'amount' | 'status' | 'date';
type SortDirection = 'asc' | 'desc';

interface DataTableProps {
  data: TableRow[];
  sortColumn: SortableColumn;
  sortDirection: SortDirection;
  onSort: (column: SortableColumn) => void;
}

const statusColors: Record<TableRow['status'], { bg: string; color: string }> = {
  completed: { bg: '#D1FAE5', color: '#065F46' },
  pending: { bg: '#FEF3C7', color: '#92400E' },
  failed: { bg: '#FEE2E2', color: '#991B1B' },
};

const columns: { key: SortableColumn; label: string }[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

export default function DataTable({ data, sortColumn, sortDirection, onSort }: DataTableProps) {
  const sortedData = [...data].sort((a, b) => {
    const dir = sortDirection === 'asc' ? 1 : -1;
    const valA = a[sortColumn];
    const valB = b[sortColumn];

    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * dir;
    }
    return String(valA).localeCompare(String(valB)) * dir;
  });

  const headerStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#6B7280',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    cursor: 'pointer',
    userSelect: 'none',
    borderBottom: '2px solid #E5E7EB',
    background: '#F9FAFB',
    whiteSpace: 'nowrap',
  };

  const cellStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontSize: '0.9rem',
    color: '#111827',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #F3F4F6',
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        overflowX: 'auto',
      }}
    >
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '560px',
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => {
              const isActive = sortColumn === col.key;
              const arrow = isActive ? (sortDirection === 'asc' ? ' \u2191' : ' \u2193') : '';
              return (
                <th
                  key={col.key}
                  data-testid={`sort-${col.key}`}
                  style={{
                    ...headerStyle,
                    color: isActive ? ACCENT : '#6B7280',
                  }}
                  onClick={() => onSort(col.key)}
                >
                  {col.label}{arrow}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              data-testid={`table-row-${row.id}`}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.background = '#F9FAFB';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
              }}
            >
              <td style={{ ...cellStyle, fontWeight: 500 }}>{row.customer}</td>
              <td style={cellStyle}>${row.amount.toFixed(2)}</td>
              <td style={cellStyle}>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: statusColors[row.status].bg,
                    color: statusColors[row.status].color,
                    textTransform: 'capitalize',
                  }}
                >
                  {row.status}
                </span>
              </td>
              <td style={{ ...cellStyle, color: '#6B7280' }}>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
