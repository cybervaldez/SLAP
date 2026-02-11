import React from 'react';
import type { Channel } from '../data';

const ACCENT = '#06B6D4';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

interface ChannelSidebarProps {
  channels: Channel[];
  activeChannelId: string;
  onSelectChannel: (channelId: string) => void;
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 200,
    minWidth: 200,
    background: '#1E293B',
    color: '#CBD5E1',
    fontFamily: FONT_FAMILY,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRight: '1px solid #334155',
  },
  header: {
    padding: '16px 16px 12px',
    fontSize: 13,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.2,
    color: '#94A3B8',
    borderBottom: '1px solid #334155',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: '8px 0',
    flex: 1,
    overflowY: 'auto' as const,
  },
  channelItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    fontFamily: FONT_FAMILY,
    transition: 'background-color 0.15s ease',
    borderRadius: 0,
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left' as const,
    color: '#CBD5E1',
  },
  badge: {
    background: ACCENT,
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 700,
    fontFamily: FONT_FAMILY,
    borderRadius: 10,
    padding: '2px 7px',
    minWidth: 18,
    textAlign: 'center' as const,
    lineHeight: '16px',
  },
};

const ChannelSidebar: React.FC<ChannelSidebarProps> = ({
  channels,
  activeChannelId,
  onSelectChannel,
}) => {
  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>Channels</div>
      <ul style={styles.list}>
        {channels.map((channel) => {
          const isActive = channel.id === activeChannelId;
          return (
            <li key={channel.id} style={{ margin: 0, padding: 0 }}>
              <button
                data-testid={`channel-${channel.id}`}
                onClick={() => onSelectChannel(channel.id)}
                style={{
                  ...styles.channelItem,
                  backgroundColor: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: isActive ? ACCENT : '#CBD5E1',
                  fontWeight: isActive ? 600 : 500,
                  borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span># {channel.name}</span>
                {channel.unread > 0 && (
                  <span style={styles.badge}>{channel.unread}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelSidebar;
