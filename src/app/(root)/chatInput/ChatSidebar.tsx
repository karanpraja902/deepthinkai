"use client"
import React, { useState, useEffect } from "react";

type Conversation = {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
};

export default function ChatSidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with your API calls
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: "1",
        title: "Explain quantum computing",
        lastMessage: "Quantum computing uses qubits...",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      },
      {
        id: "2",
        title: "DeepSeek architecture",
        lastMessage: "It's based on transformer models...",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
      },
    ];
    setConversations(mockConversations);
    setIsLoading(false);
  }, []);

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      {/* Mobile toggle button (hidden on desktop) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed lg:hidden z-20 top-4 left-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-10 transform transition-transform duration-200 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close button (mobile only) */}
          <div className="flex justify-end lg:hidden mb-4">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ✕
            </button>
          </div>

          {/* New chat button */}
          <button className="flex items-center gap-2 w-full p-3 mb-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            +
            <span>New Chat</span>
          </button>

          {/* Search bar */}
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredConversations.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                {searchQuery ? "No matching conversations" : "No conversations yet"}
              </p>
            ) : (
              <ul className="space-y-1">
                {filteredConversations.map((conv) => (
                  <li key={conv.id}>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="flex-shrink-0 h-4 w-4 text-gray-400">💬</span>
                          <p className="font-medium truncate">{conv.title}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {formatDate(conv.timestamp)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User profile */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="h-4 w-4 text-gray-600 dark:text-gray-300">👤</span>
              </div>
              <div className="text-left">
                <p className="font-medium">User Name</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay (mobile only) */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
        />
      )}
    </>
  );
}