import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";

type ChatInputProps = {
  onSend: (message: string, files?: File[]) => void;
  isLoading: boolean;
};

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || files.length > 0) {
      onSend(message, files);
      setMessage("");
      setFiles([]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (<div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      {/* File previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              <span className="truncate max-w-xs">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* File upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
          aria-label="Attach file"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".pdf,.txt,.docx,.pptx"
          />
        </button>

        {/* Message input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          rows={1}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-32"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isLoading || (!message.trim() && files.length === 0)}
          className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}