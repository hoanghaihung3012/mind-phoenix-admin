import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useMessages } from '../../application/hooks';
import { Card, Avatar, Button } from '../components/ui';

export const MessagesPage: React.FC = () => {
  const { threads, activeThreadId, setActiveThreadId, messages, loading, sendMessage } = useMessages();
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <Card title="Messages & Customer Support" subtitle="Direct inquiries and notifications">
      <div className="grid grid-cols-1 md:grid-cols-3 border border-[#EFF1F6] rounded-2xl overflow-hidden mt-2 h-[550px]">
        {/* Thread List */}
        <div className="border-r border-[#EFF1F6] bg-white overflow-y-auto">
          {loading && threads.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#737791]">Đang tải tin nhắn...</div>
          ) : (
            threads.map(t => {
              const isSelected = t.id === activeThreadId;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`p-4 border-b border-[#EFF1F6] cursor-pointer flex items-center gap-3 transition-colors ${
                    isSelected ? 'bg-[#F4F5FF]' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <Avatar src={t.avatar} name={t.contactName} size="md" isOnline={t.isOnline} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-bold text-[#151D48] truncate">{t.contactName}</span>
                      <span className="text-[10px] text-[#A0A4B8]">{t.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#737791] truncate">{t.lastMessage}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 flex flex-col bg-[#F9FAFB]">
          {activeThread ? (
            <>
              {/* Header */}
              <div className="p-4 bg-white border-b border-[#EFF1F6] flex items-center gap-3">
                <Avatar src={activeThread.avatar} name={activeThread.contactName} size="sm" isOnline={activeThread.isOnline} />
                <div>
                  <h4 className="text-xs font-bold text-[#151D48]">{activeThread.contactName}</h4>
                  <p className="text-[10px] text-[#737791]">{activeThread.contactEmail}</p>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.map(m => {
                  const isMe = m.sender === 'user';
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                          isMe
                            ? 'bg-[#5D5FEF] text-white rounded-br-none shadow-sm'
                            : 'bg-white border border-[#EFF1F6] text-[#151D48] rounded-bl-none shadow-xs'
                        }`}
                      >
                        <p>{m.content}</p>
                        <span className={`text-[9px] block text-right mt-1 ${isMe ? 'text-white/70' : 'text-[#A0A4B8]'}`}>
                          {m.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EFF1F6] flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 bg-[#F9FAFB] border border-[#EFF1F6] rounded-xl px-4 py-2 text-xs text-[#151D48] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF]"
                />
                <Button type="submit" variant="primary" size="sm" icon={<Send className="w-4 h-4" />}>
                  Gửi
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#737791]">
              Chọn một cuộc hội thoại để bắt đầu
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
