import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ArchetypeDemoProps } from '../../types';
import ChannelSidebar from './components/ChannelSidebar';
import MessageList from './components/MessageList';
import TypingIndicator from './components/TypingIndicator';
import MessageInput from './components/MessageInput';
import {
  channels as channelData,
  initialMessages,
  simulatedMessagesPool,
} from './data';
import type { Channel, Message } from './data';

const ACCENT = '#06B6D4';
const FONT_FAMILY = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    fontFamily: FONT_FAMILY,
    display: 'flex',
    height: '85vh',
    maxHeight: 700,
    border: '1px solid #E2E8F0',
    borderRadius: 12,
    overflow: 'hidden',
    background: '#FFFFFF',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
  },
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  chatHeader: {
    padding: '14px 20px',
    borderBottom: '1px solid #E2E8F0',
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: 600,
    color: '#1E293B',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FFFFFF',
  },
  channelHash: {
    color: ACCENT,
    fontSize: 18,
    fontWeight: 700,
  },
};

let messageCounter = 1000;

function generateId(): string {
  messageCounter += 1;
  return `msg-sim-${messageCounter}`;
}

export default function RealTimeDemo(_props: ArchetypeDemoProps) {
  const [activeChannelId, setActiveChannelId] = useState<string>('general');
  const [channelList, setChannelList] = useState<Channel[]>(() =>
    channelData.map((ch) => ({ ...ch }))
  );
  const [messagesByChannel, setMessagesByChannel] = useState<Record<string, Message[]>>(() => {
    const copy: Record<string, Message[]> = {};
    for (const key of Object.keys(initialMessages)) {
      copy[key] = [...initialMessages[key]];
    }
    return copy;
  });
  const [typingUser, setTypingUser] = useState<string | null>(null);

  const simIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSendMessage = useCallback(
    (content: string) => {
      const newMsg: Message = {
        id: generateId(),
        channelId: activeChannelId,
        author: 'You',
        content,
        timestamp: new Date().toISOString(),
        isOwn: true,
      };
      setMessagesByChannel((prev) => ({
        ...prev,
        [activeChannelId]: [...(prev[activeChannelId] || []), newMsg],
      }));
    },
    [activeChannelId]
  );

  const handleSelectChannel = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
    // Clear unread count for the selected channel
    setChannelList((prev) =>
      prev.map((ch) => (ch.id === channelId ? { ...ch, unread: 0 } : ch))
    );
  }, []);

  // Simulated incoming messages
  useEffect(() => {
    function scheduleNext() {
      const delay = 8000 + Math.random() * 4000; // 8-12 seconds
      intervalRef.current = setTimeout(() => {
        const poolMsg = simulatedMessagesPool[simIndexRef.current % simulatedMessagesPool.length];
        simIndexRef.current += 1;

        // Pick a random channel for the incoming message
        const targetChannelId =
          channelData[Math.floor(Math.random() * channelData.length)].id;

        // Show typing indicator
        setTypingUser(poolMsg.author);

        typingTimeoutRef.current = setTimeout(() => {
          setTypingUser(null);

          const newMsg: Message = {
            id: generateId(),
            channelId: targetChannelId,
            author: poolMsg.author,
            content: poolMsg.content,
            timestamp: new Date().toISOString(),
            isOwn: false,
          };

          setMessagesByChannel((prev) => ({
            ...prev,
            [targetChannelId]: [...(prev[targetChannelId] || []), newMsg],
          }));

          // Increment unread if not the active channel
          setActiveChannelId((currentActive) => {
            if (targetChannelId !== currentActive) {
              setChannelList((prevChannels) =>
                prevChannels.map((ch) =>
                  ch.id === targetChannelId ? { ...ch, unread: ch.unread + 1 } : ch
                )
              );
            }
            return currentActive;
          });

          scheduleNext();
        }, 2000);
      }, delay);
    }

    scheduleNext();

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const activeChannel = channelList.find((ch) => ch.id === activeChannelId);
  const currentMessages = messagesByChannel[activeChannelId] || [];

  return (
    <div data-testid="real-time-demo" style={styles.wrapper}>
      <ChannelSidebar
        channels={channelList}
        activeChannelId={activeChannelId}
        onSelectChannel={handleSelectChannel}
      />
      <div style={styles.chatArea}>
        <div style={styles.chatHeader}>
          <span style={styles.channelHash}>#</span>
          <span>{activeChannel?.name || activeChannelId}</span>
        </div>
        <MessageList messages={currentMessages} />
        <TypingIndicator name={typingUser || ''} isVisible={typingUser !== null} />
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
