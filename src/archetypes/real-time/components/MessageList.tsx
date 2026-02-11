import React, { useEffect, useRef } from 'react';
import type { Message } from '../data';
import { avatarColors } from '../data';

const ACCENT = '#06B6D4';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface MessageListProps {
  messages: Message[];
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    fontFamily: FONT_FAMILY,
  },
  messageRowOwn: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 10,
  },
  messageRowOther: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: FONT_FAMILY,
    flexShrink: 0,
  },
  bubbleOwn: {
    background: ACCENT,
    color: '#FFFFFF',
    borderRadius: '16px 16px 4px 16px',
    padding: '10px 14px',
    maxWidth: '65%',
    wordWrap: 'break-word',
  },
  bubbleOther: {
    background: '#F1F5F9',
    color: '#1E293B',
    borderRadius: '16px 16px 16px 4px',
    padding: '10px 14px',
    maxWidth: '65%',
    wordWrap: 'break-word',
  },
  authorName: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 2,
    fontFamily: FONT_FAMILY,
  },
  content: {
    fontSize: 14,
    lineHeight: 1.45,
    fontFamily: FONT_FAMILY,
    margin: 0,
  },
  timestamp: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontFamily: FONT_FAMILY,
  },
  timestampOwn: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    fontFamily: FONT_FAMILY,
  },
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={styles.container}>
      {messages.map((msg) => {
        const avatarColor = avatarColors[msg.author] || '#6B7280';
        const initial = msg.author.charAt(0).toUpperCase();

        if (msg.isOwn) {
          return (
            <div key={msg.id} data-testid={`message-${msg.id}`} style={styles.messageRowOwn}>
              <div style={styles.bubbleOwn}>
                <div style={{ ...styles.authorName, color: 'rgba(255,255,255,0.85)' }}>
                  {msg.author}
                </div>
                <p style={{ ...styles.content, color: '#FFFFFF' }}>{msg.content}</p>
                <div style={styles.timestampOwn}>{formatTimestamp(msg.timestamp)}</div>
              </div>
              <div style={{ ...styles.avatar, backgroundColor: avatarColor }}>{initial}</div>
            </div>
          );
        }

        return (
          <div key={msg.id} data-testid={`message-${msg.id}`} style={styles.messageRowOther}>
            <div style={{ ...styles.avatar, backgroundColor: avatarColor }}>{initial}</div>
            <div style={styles.bubbleOther}>
              <div style={{ ...styles.authorName, color: avatarColor }}>{msg.author}</div>
              <p style={styles.content}>{msg.content}</p>
              <div style={styles.timestamp}>{formatTimestamp(msg.timestamp)}</div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
