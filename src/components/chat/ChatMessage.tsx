import { cn } from "@/lib/utils";
import { userAuthStore } from "@/store/authStore";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Loader } from "../Loader";
import Markdown from "../Markdown";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import toast from "react-hot-toast";

interface ChatMessageProps {
  message: {
    role: "user" | "assistant" | "system";
    content: string;
    comment?: string;
  };
  isUserLoading?: boolean;
  isAiLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isAiLoading,
  isUserLoading,
}) => {
  const { user } = userAuthStore();
  const isUser = message.role === "user";
  
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4 mb-6 relative",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {isUser ? (
        // User message - right side
        <>
          <div className="flex-1 max-w-[70%] space-y-2">
            {isUserLoading ? (
              <Loader type="user" position="right" />
            ) : (
              <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-br-md">
                <div className="prose prose-sm max-w-none text-white">
                  <Markdown content={message.content} />
                </div>
              </div>
            )}
            
            {/* Action buttons for user message */}
            {!isUserLoading && (
              <div className="flex justify-end gap-2 mt-2">
                <Copy
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => handleCopy(message.content)}
                />
              </div>
            )}
          </div>

          <Avatar className="h-8 w-8 flex-shrink-0">
            {user?.profilePicture ? (
              <AvatarImage
                src={user?.profilePicture}
                alt={user?.name}
              />
            ) : (
              <AvatarFallback className="text-black bg-">
                {user?.name?.[0]}
              </AvatarFallback>
            )}
          </Avatar>
        </>
      ) : (
        // AI message - left side
        <>
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src="/images/deepthink-logo.svg" alt="DeepThink" />
          </Avatar>

          <div className="flex-1 max-w-[70%] space-y-2">
            {isAiLoading ? (
              <Loader type="ai" position="left" />
            ) : (
              <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-md">
                <div className="prose prose-sm max-w-none">
                  <Markdown content={message.content} />
                </div>
              </div>
            )}
            
            {/* Action buttons for AI message */}
            {!isAiLoading && (
              <div className="flex gap-2 mt-2">
                <Copy
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => handleCopy(message.content)}
                />
                <ThumbsUp
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-green-600"
                  onClick={() => console.log("liked")}
                />
                <ThumbsDown
                  className="h-4 w-4 text-gray-500 cursor-pointer hover:text-red-600"
                  onClick={() => console.log("disliked")}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatMessage;

