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

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeepThink Chat",
  description: "AI-powered chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        {children}
      </body>
    </html>
  );
}