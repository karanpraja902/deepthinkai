// "use client"
// import { useState } from "react";
// import ChatInput from "./chat/ChatInput";
// // import ChatSidebar from "./chat/ChatSidebar";

// type Message = {
//   text: string;
//   sender: string;
// };

// export default function ChatPage() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSend = async (message: string, files?: File[]) => {
//     setIsLoading(true);
//     // Simulate API call (replace with your actual logic)
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: message, sender: "user" }]);
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* <ChatSidebar /> */}
      
//       <div className="flex-1 flex flex-col">
//         {/* Chat messages list */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.map((msg, i) => (
//             <div key={i} className="mb-2 p-3 bg-gray-100 rounded-lg">
//               <strong>{msg.sender}:</strong> {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Input area */}
//         <ChatInput onSend={handleSend} isLoading={isLoading} />
//       </div>
//     </div>
//   );
// }

"use client"
import { useState } from "react";
import ChatInput from "./chat/ChatInput";

type Message = {
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string, files?: File[]) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate API call (replace with your actual logic)
    setTimeout(() => {
      const assistantMessage: Message = {
        text: `I received your message: "${message}". This is a simulated response.`,
        sender: "assistant",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:block">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">DeepThink Chat</h1>
          
          {/* New Chat Button */}
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-4">
            + New Chat
          </button>
          
          {/* Recent Chats */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recent Chats</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              No recent chats
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">AI Assistant</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to DeepThink Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start a conversation with the AI assistant
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                  <div className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}