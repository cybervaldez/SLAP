import React from 'react';
import type { ArchetypeDemoProps } from '../../types';
import { columns, initialTasks } from './data';
import type { Task } from './data';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#F59E0B';

let nextTaskId = initialTasks.length + 1;

const TaskManagementDemo: React.FC<ArchetypeDemoProps> = (_props) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(null);
  const [draggedTaskId, setDraggedTaskId] = React.useState<string | null>(null);

  const selectedTask = selectedTaskId ? tasks.find((t) => t.id === selectedTaskId) || null : null;

  const tasksByColumn = React.useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    for (const col of columns) {
      grouped[col.id] = [];
    }
    for (const task of tasks) {
      if (grouped[task.column]) {
        grouped[task.column].push(task);
      }
    }
    return grouped;
  }, [tasks]);

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseModal = () => {
    setSelectedTaskId(null);
  };

  const handleDragStart = (taskId: string) => {
    setDraggedTaskId(taskId);
  };

  const handleMoveTask = (columnId: string) => {
    if (!draggedTaskId) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedTaskId ? { ...t, column: columnId } : t))
    );
    setDraggedTaskId(null);
  };

  const handleMoveTaskFromModal = (taskId: string, columnId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: columnId } : t))
    );
  };

  const handleUpdateTask = (updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task-${nextTaskId++}`,
      title: 'New Task',
      description: 'Describe this task...',
      priority: 'medium',
      column: 'todo',
      tags: [],
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div
      data-testid="task-management-demo"
      style={{
        minHeight: '100vh',
        backgroundColor: '#F3F4F6',
        fontFamily: FONT_FAMILY,
        padding: 32,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 800,
              color: '#111827',
            }}
          >
            Task Board
          </h1>
          <p
            style={{
              margin: '4px 0 0 0',
              fontSize: 14,
              color: '#6B7280',
            }}
          >
            {tasks.length} tasks across {columns.length} columns
          </p>
        </div>

        <button
          data-testid="add-task-btn"
          onClick={handleAddTask}
          style={{
            backgroundColor: ACCENT,
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 10,
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: FONT_FAMILY,
            cursor: 'pointer',
            transition: 'background-color 0.15s ease, transform 0.1s ease',
            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = '#D97706';
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT;
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          + Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        columns={columns}
        tasks={tasksByColumn}
        onSelectTask={handleSelectTask}
        onMoveTask={handleMoveTask}
        onDragStart={handleDragStart}
      />

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          columns={columns}
          onClose={handleCloseModal}
          onUpdate={handleUpdateTask}
          onMove={handleMoveTaskFromModal}
        />
      )}
    </div>
  );
};

export default TaskManagementDemo;
