import React from 'react';
import type { Task } from '../data';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const PRIORITY_COLORS: Record<string, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

interface TaskCardProps {
  task: Task;
  onSelect: (taskId: string) => void;
  onDragStart: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSelect, onDragStart }) => {
  const priorityColor = PRIORITY_COLORS[task.priority] || '#9CA3AF';

  return (
    <div
      data-testid={`task-card-${task.id}`}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', task.id);
        onDragStart(task.id);
      }}
      onClick={() => onSelect(task.id)}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        cursor: 'grab',
        fontFamily: FONT_FAMILY,
        transition: 'box-shadow 0.2s ease, transform 0.15s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#111827',
          marginBottom: 8,
          lineHeight: 1.4,
        }}
      >
        {task.title}
      </div>

      {/* Priority badge */}
      <span
        style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 600,
          color: '#FFFFFF',
          backgroundColor: priorityColor,
          borderRadius: 4,
          padding: '2px 8px',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 8,
        }}
      >
        {task.priority}
      </span>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
          {task.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: '#6B7280',
                backgroundColor: '#F3F4F6',
                borderRadius: 4,
                padding: '2px 6px',
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
