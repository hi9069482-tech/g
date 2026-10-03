import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Search, 
  Check, 
  CheckCheck, 
  Phone, 
  ShieldCheck, 
  Paperclip, 
  Smile,
  MessageSquare
} from 'lucide-react';

export const ChatModal: React.FC = () => {
  const { 
    conversations, 
    activeChatId, 
    setActiveChatId, 
    isChatModalOpen, 
    setIsChatModalOpen, 
    sendMessage,
    showToast
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [searchConv, setSearchConv] = useState('');

  if (!isChatModalOpen) return null;

  const activeConv = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage);
    setInputMessage('');
  };

  const filteredConversations = conversations.filter(c => 
    c.providerName.toLowerCase().includes(searchConv.toLowerCase()) ||
    c.providerCategory.toLowerCase().includes(searchConv.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      
      <div className="relative w-full max-w-4xl h-[620px] max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Column: Conversations List */}
        <div className="w-full md:w-80 border-r border-gray-100 flex flex-col h-full bg-[#F7F8FC]">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#5865F2]" />
              <h3 className="font-heading font-bold text-sm text-[#111A4A]">Messages</h3>
            </div>
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="md:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search conversation */}
          <div className="p-3 border-b border-gray-100 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchConv}
                onChange={(e) => setSearchConv(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2]"
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {filteredConversations.map(conv => {
              const isSelected = activeConv?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveChatId(conv.id)}
                  className={`p-3.5 cursor-pointer flex items-center gap-3 transition-colors ${
                    isSelected ? 'bg-white border-l-4 border-[#5865F2] shadow-2xs' : 'hover:bg-gray-100/60'
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                    <img
                      src={conv.providerImage}
                      alt={conv.providerName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#18B88A] ring-2 ring-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="font-heading font-bold text-xs text-[#111A4A] truncate">
                        {conv.providerName}
                      </h4>
                      <span className="text-[10px] text-gray-400 flex-shrink-0">
                        {conv.lastTimestamp}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-500 truncate leading-snug">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Chat Window */}
        <div className="flex-1 flex flex-col h-full bg-white">
          
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={activeConv.providerImage}
                      alt={activeConv.providerName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#18B88A] ring-2 ring-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#111A4A]">
                      {activeConv.providerName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="text-[#18B88A] font-semibold">● Online</span>
                      <span>·</span>
                      <span>{activeConv.providerCategory}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast('Direct phone numbers stay masked until service agreement.')}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    title="Phone privacy active"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#18B88A]" />
                  </button>
                  <button
                    onClick={() => setIsChatModalOpen(false)}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3 bg-[#F7F8FC]">
                
                {/* Privacy Banner */}
                <div className="mx-auto max-w-sm p-2.5 rounded-xl bg-white border border-gray-200/80 text-center text-[11px] text-gray-500 shadow-2xs">
                  🛡️ Internal Safe Chat. Pricing & appointment can be finalized here before work begins.
                </div>

                {activeConv.messages.map(msg => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                          isUser
                            ? 'bg-[#5865F2] text-white rounded-br-xs shadow-sm'
                            : 'bg-white text-gray-800 rounded-bl-xs shadow-sm border border-gray-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-gray-100 bg-white flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Image attachments are ready in production mode.')}
                  className="p-2 text-gray-400 hover:text-[#5865F2] rounded-xl hover:bg-gray-50"
                  title="Attach Photo"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message (e.g. Rate for repair at Chak 19/SP?)..."
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#5865F2] focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] disabled:opacity-50 text-white transition active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
              Select a conversation to start chatting
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
