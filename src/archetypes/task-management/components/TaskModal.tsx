import React from 'react';
import type { Column, Task, Priority } from '../data';

const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const ACCENT = '#F59E0B';

const PRIORITY_COLORS: Record<string, string> = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

interface TaskModalProps {
  task: Task;
  columns: Column[];
  onClose: () => void;
  onUpdate: (updated: Task) => void;
  onMove: (taskId: string, columnId: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, columns, onClose, onUpdate, onMove }) => {
  const [title, setTitle] = React.useState(task.title);
  const [description, setDescription] = React.useState(task.description);
  const [priority, setPriority] = React.useState<Priority>(task.priority);

  React.useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
  }, [task]);

  const handleTitleBlur = () => {
    if (title !== task.title) {
      onUpdate({ ...task, title });
    }
  };

  const handleDescriptionBlur = () => {
    if (description !== task.description) {
      onUpdate({ ...task, description });
    }
  };

  const handlePriorityChange = (p: Priority) => {
    setPriority(p);
    onUpdate({ ...task, priority: p });
  };

  return (
    <div
      data-testid="task-modal"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        fontFamily: FONT_FAMILY,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          width: '100%',
          maxWidth: 520,
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 28,
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Close button */}
        <button
          data-testid="modal-close"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 22,
            color: '#9CA3AF',
            cursor: 'pointer',
            padding: 4,
            lineHeight: 1,
            borderRadius: 6,
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#111827';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#9CA3AF';
          }}
        >
          X
        </button>

        {/* Editable title */}
        <input
          data-testid="modal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          style={{
            width: '100%',
            fontSize: 20,
            fontWeight: 700,
            color: '#111827',
            border: 'none',
            borderBottom: '2px solid transparent',
            outline: 'none',
            padding: '4px 0',
            marginBottom: 16,
            fontFamily: FONT_FAMILY,
            background: 'transparent',
            transition: 'border-color 0.15s ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = ACCENT;
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent';
          }}
        />

        {/* Editable description */}
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleDescriptionBlur}
          rows={4}
          style={{
            width: '100%',
            fontSize: 14,
            color: '#374151',
            border: '1px solid #E5E7EB',
            borderRadius: 8,
            padding: 12,
            outline: 'none',
            fontFamily: FONT_FAMILY,
            resize: 'vertical',
            lineHeight: 1.5,
            transition: 'border-color 0.15s ease',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = ACCENT;
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = '#E5E7EB';
          }}
        />

        {/* Priority selector */}
        <div style={{ marginTop: 20 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Priority
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {PRIORITIES.map((p) => (
              <button
                key={p}
                onClick={() => handlePriorityChange(p)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: FONT_FAMILY,
                  border: priority === p ? `2px solid ${PRIORITY_COLORS[p]}` : '2px solid #E5E7EB',
                  borderRadius: 8,
                  backgroundColor: priority === p ? PRIORITY_COLORS[p] : '#FFFFFF',
                  color: priority === p ? '#FFFFFF' : '#6B7280',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.15s ease',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        {task.tags.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                fontWeight: 600,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Tags
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 12,
                    color: '#374151',
                    backgroundColor: '#F3F4F6',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Move to column */}
        <div style={{ marginTop: 24 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Move to
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {columns
              .filter((col) => col.id !== task.column)
              .map((col) => (
                <button
                  key={col.id}
                  data-testid={`modal-move-${col.id}`}
                  onClick={() => onMove(task.id, col.id)}
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: FONT_FAMILY,
                    border: `1px solid ${ACCENT}`,
                    borderRadius: 8,
                    backgroundColor: '#FFFBEB',
                    color: '#92400E',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT;
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFBEB';
                    (e.currentTarget as HTMLElement).style.color = '#92400E';
                  }}
                >
                  {col.title}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
