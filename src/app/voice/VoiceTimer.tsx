"use client"
import { useState, useEffect } from "react";

interface VoiceTimerProps {
  isListening: boolean;
  duration: number; // in seconds
  onTimeout: () => void;
}

export default function VoiceTimer({ isListening, duration, onTimeout }: VoiceTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isListening) {
      setTimeLeft(duration);
      return;
    }

    // Reset timer when listening starts
    setTimeLeft(duration);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeout();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isListening, duration, onTimeout]);

  // Reset timer when speech is detected (this will be called from parent)
  const resetTimer = () => {
    if (isListening) {
      setTimeLeft(duration);
    }
  };

  // Expose reset function to parent
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).resetVoiceTimer = resetTimer;
    }
  }, [isListening, duration]);

  if (!isListening) return null;

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="absolute bottom-full mb-2 left-0 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg z-10">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span>Listening... {timeLeft}s</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1 mt-1">
        <div 
          className="bg-blue-600 h-1 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 