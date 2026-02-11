import React, { useState } from 'react';

const ACCENT = '#06B6D4';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface MessageInputProps {
  onSend: (content: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 20px 16px',
    borderTop: '1px solid #E2E8F0',
    background: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    border: '1px solid #CBD5E1',
    borderRadius: 8,
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    outline: 'none',
    color: '#1E293B',
    transition: 'border-color 0.15s ease',
  },
  sendBtn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: 8,
    backgroundColor: ACCENT,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: FONT_FAMILY,
    cursor: 'pointer',
    transition: 'opacity 0.15s ease',
    whiteSpace: 'nowrap' as const,
  },
};

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onSend(trimmed);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={styles.container}>
      <input
        data-testid="message-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        style={styles.input}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor = ACCENT;
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.borderColor = '#CBD5E1';
        }}
      />
      <button
        data-testid="send-btn"
        onClick={handleSend}
        style={styles.sendBtn}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '1';
        }}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
