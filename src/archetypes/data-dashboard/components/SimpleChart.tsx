import { useState } from 'react';
import type { MonthlyDataPoint } from '../data';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface SimpleChartProps {
  data: MonthlyDataPoint[];
  dataKey: keyof Omit<MonthlyDataPoint, 'month'>;
  color: string;
}

export default function SimpleChart({ data, dataKey, color }: SimpleChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const values = data.map((d) => Number(d[dataKey]));
  const maxValue = Math.max(...values);

  const chartWidth = 720;
  const chartHeight = 260;
  const barPadding = 8;
  const labelHeight = 28;
  const topPadding = 24;
  const barWidth = (chartWidth - barPadding * (data.length + 1)) / data.length;

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        overflowX: 'auto',
      }}
    >
      <svg
        width="100%"
        viewBox={`0 0 ${chartWidth} ${chartHeight + labelHeight + topPadding}`}
        style={{ display: 'block' }}
      >
        {data.map((item, index) => {
          const value = Number(item[dataKey]);
          const barHeight = maxValue > 0 ? (value / maxValue) * chartHeight : 0;
          const x = barPadding + index * (barWidth + barPadding);
          const y = topPadding + (chartHeight - barHeight);

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                data-testid={`chart-bar-${index}`}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={hoveredIndex === index ? color : `${color}CC`}
                style={{ transition: 'fill 0.15s, height 0.3s, y 0.3s', cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Tooltip on hover */}
              {hoveredIndex === index && (
                <>
                  <rect
                    x={x + barWidth / 2 - 36}
                    y={y - 32}
                    width={72}
                    height={24}
                    rx={6}
                    fill="#111827"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 16}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight={600}
                    fontFamily={FONT_FAMILY}
                  >
                    {value.toLocaleString()}
                  </text>
                </>
              )}

              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={topPadding + chartHeight + 18}
                textAnchor="middle"
                fill="#6B7280"
                fontSize="11"
                fontWeight={500}
                fontFamily={FONT_FAMILY}
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
