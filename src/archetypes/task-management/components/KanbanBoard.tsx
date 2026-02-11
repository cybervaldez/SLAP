import React from 'react';
import type { Column, Task } from '../data';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  columns: Column[];
  tasks: Record<string, Task[]>;
  onSelectTask: (taskId: string) => void;
  onMoveTask: (columnId: string) => void;
  onDragStart: (taskId: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  columns,
  tasks,
  onSelectTask,
  onMoveTask,
  onDragStart,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: 20,
        overflowX: 'auto',
        padding: '4px 0',
        alignItems: 'flex-start',
      }}
    >
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasks[column.id] || []}
          onSelectTask={onSelectTask}
          onDrop={onMoveTask}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
