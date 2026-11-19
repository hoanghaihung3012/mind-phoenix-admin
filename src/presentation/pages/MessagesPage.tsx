import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, MessageSquare, CheckCheck, Circle, RefreshCw } from 'lucide-react';
import { useMessages } from '../../application/hooks';
import { useLanguage } from '../../application/LanguageContext';
import { Card, Avatar, Button } from '../components/ui';

export const MessagesPage: React.FC = () => {
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    messages,
    loading,
    sendMessage,
    deleteThread,
    refetch,
  } = useMessages();
  const { t, language } = useLanguage();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t('confirmDeleteChat'))) {
      deleteThread(id);
    }
  };

  return (
    <Card
      title={t('messagesSupportTitle')}
      subtitle={t('messagesSupportSub')}
      action={
        <div className="flex items-center gap-2">
          <Button
            variant="export"
            icon={<RefreshCw className={`w-3.5 h-3.5 text-[#737791] ${loading ? 'animate-spin' : ''}`} />}
            onClick={() => refetch()}
          >
            {t('refresh')}
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 border border-[#EFF1F6] rounded-2xl overflow-hidden mt-2 h-[600px] shadow-xs">
        {/* Thread List */}
        <div className="border-r border-[#EFF1F6] bg-white overflow-y-auto">
          <div className="p-3 border-b border-[#EFF1F6] bg-[#FAFBFC] flex items-center justify-between">
            <span className="text-xs font-bold text-[#151D48] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#5D5FEF]" />
              {t('conversations')} ({threads.length})
            </span>
            <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />
              {t('livePolling')}
            </span>
          </div>

          {loading && threads.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#737791]">{t('loading')}</div>
          ) : threads.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#737791]">
              {t('noMessagesYet')}
            </div>
          ) : (
            threads.map(tItem => {
              const isSelected = tItem.id === activeThreadId;
              return (
                <div
                  key={tItem.id}
                  onClick={() => setActiveThreadId(tItem.id)}
                  className={`p-3.5 border-b border-[#EFF1F6] cursor-pointer flex items-center gap-3 transition-colors group relative ${
                    isSelected ? 'bg-[#F4F5FF]' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <Avatar src={tItem.avatar} name={tItem.contactName} size="md" isOnline={tItem.isOnline} />
                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-xs font-bold text-[#151D48] truncate">{tItem.contactName}</span>
                      <span className="text-[10px] text-[#A0A4B8] shrink-0 ml-1">{tItem.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-[#737791] truncate">{tItem.lastMessage}</p>
                  </div>

                  {/* Unread badge & Action */}
                  <div className="absolute right-3 flex items-center gap-1.5">
                    {tItem.unreadCount > 0 && (
                      <span className="bg-[#5D5FEF] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {tItem.unreadCount}
                      </span>
                    )}
                    <button
                      onClick={(e) => handleDelete(tItem.id, e)}
                      title={t('deleteConversation')}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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
              <div className="p-4 bg-white border-b border-[#EFF1F6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={activeThread.avatar} name={activeThread.contactName} size="sm" isOnline={activeThread.isOnline} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#151D48]">{activeThread.contactName}</h4>
                      {activeThread.contactEmail ? (
                        <span className="text-[10px] bg-[#5D5FEF]/10 text-[#5D5FEF] px-1.5 py-0.2 rounded font-medium">
                          {t('memberBadge')}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                          {t('guestBadge')}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#737791]">
                      {activeThread.contactEmail || `ID: ${activeThread.id}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(activeThread.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title={t('deleteConversation')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-xs text-[#737791] space-y-1">
                    <MessageSquare className="w-8 h-8 text-slate-300" />
                    <span>{language === 'vi' ? 'Chưa có tin nhắn trong cuộc trò chuyện này.' : 'No messages in this chat yet.'}</span>
                    <span className="text-[11px] text-slate-400">{language === 'vi' ? 'Gửi lời chào để bắt đầu hỗ trợ!' : 'Say hello to start assisting!'}</span>
                  </div>
                ) : (
                  messages.map(m => {
                    const isMe = m.sender === 'user';
                    return (
                      <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                            isMe
                              ? 'bg-[#5D5FEF] text-white rounded-br-none shadow-xs'
                              : 'bg-white border border-[#EFF1F6] text-[#151D48] rounded-bl-none shadow-xs'
                          }`}
                        >
                          <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                          <div className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${isMe ? 'text-white/70' : 'text-[#A0A4B8]'}`}>
                            <span>{m.timestamp}</span>
                            {isMe && <CheckCheck className="w-3 h-3 text-white/90" />}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#EFF1F6] flex gap-2">
                <input
                  type="text"
                  placeholder={t('typeReplyPlaceholder')}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 bg-[#F9FAFB] border border-[#EFF1F6] rounded-xl px-4 py-2.5 text-xs text-[#151D48] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/30 focus:border-[#5D5FEF]"
                />
                <Button type="submit" variant="primary" size="sm" icon={<Send className="w-4 h-4" />}>
                  {t('replyBtn')}
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-xs text-[#737791] gap-2">
              <MessageSquare className="w-10 h-10 text-slate-300" />
              <p>{t('selectConversationPrompt')}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};