import React from 'react';
import type { Column, Task } from '../data';
import TaskCard from './TaskCard';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#F59E0B';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onSelectTask: (taskId: string) => void;
  onDrop: (columnId: string) => void;
  onDragStart: (taskId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  onSelectTask,
  onDrop,
  onDragStart,
}) => {
  const [dragOver, setDragOver] = React.useState(false);

  return (
    <div
      data-testid={`column-${column.id}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        onDrop(column.id);
      }}
      style={{
        flex: 1,
        minWidth: 260,
        maxWidth: 380,
        backgroundColor: dragOver ? '#FEF3C7' : '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: FONT_FAMILY,
        transition: 'background-color 0.2s ease',
        border: dragOver ? `2px dashed ${ACCENT}` : '2px solid transparent',
      }}
    >
      {/* Column header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '2px solid #E5E7EB',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 700,
            color: '#111827',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {column.title}
        </h3>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: ACCENT,
            backgroundColor: '#FEF3C7',
            borderRadius: 12,
            padding: '2px 10px',
            minWidth: 20,
            textAlign: 'center',
          }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Task cards */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onSelect={onSelectTask}
            onDragStart={onDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              color: '#9CA3AF',
              fontSize: 13,
              padding: '32px 16px',
              fontStyle: 'italic',
            }}
          >
            No tasks yet
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
