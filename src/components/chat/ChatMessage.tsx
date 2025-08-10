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
    toast.success("copied");
  };

  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 p-4 rounded-lg mb-4 relative",
        isUser 
          ? "justify-start bg-blue-50" 
          : "justify-end bg-muted/50"
      )}
    >
      {isUser ? (
        // User message - left side
        <>
          <Avatar className="h-8 w-8">
            {user?.profilePicture ? (
              <AvatarImage
                src={user?.profilePicture}
                alt={user?.name}
              />
            ) : (
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 space-y-2 max-w-[70%]">
            {isUserLoading ? (
              <Loader type="user" position="left" className="mr-2" />
            ) : (
              <div className="prose prose-sm max-w-none">
                <Markdown content={message.content} />
              </div>
            )}
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Copy
              className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => handleCopy(message.content)}
            />
          </div>
        </>
      ) : (
        // AI message - right side
        <>
          <div className="flex-1 space-y-2 max-w-[70%] text-right">
            {isAiLoading ? (
              <Loader type="ai" />
            ) : (
              <div className="prose prose-sm max-w-none">
                <Markdown content={message.content} />
              </div>
            )}
          </div>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/deepthink-logo.svg" alt="DeepThink" />
          </Avatar>

          <div className="absolute left-4 -bottom-10 transform -translate-y-1/2 flex gap-3">
            <Copy
              className="h-5 w-5 text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => handleCopy(message.content)}
            />
            <ThumbsUp
              className="h-5 w-5 text-green-600 cursor-pointer hover:text-green-700"
              onClick={() => console.log("liked")}
            />
            <ThumbsDown
              className="h-5 w-5 text-red-600 cursor-pointer hover:text-red-700"
              onClick={() => console.log("unliked")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatMessage;

