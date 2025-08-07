"use client"
import { useState, useEffect, useRef } from "react";

interface EnhancedVoiceInputProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export default function EnhancedVoiceInput({
  onTranscript, 
  isListening, 
  onListeningChange,
  language = 'en-US',
  continuous = false,
  interimResults = true
}: EnhancedVoiceInputProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
      const recognition = new SpeechRecognition();
      recognition.continuous = continuous;
      recognition.interimResults = interimResults;
      recognition.lang = language;
      
      recognition.onstart = () => {
        console.log('Voice recognition started');
        onListeningChange(true);
        setError(null);
        setInterimTranscript("");
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interim = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interim += transcript;
          }
        }
        
        setInterimTranscript(interim);
        
        if (finalTranscript) {
          onTranscript(finalTranscript.trim());
          setInterimTranscript("");
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'no-speech') {
          console.log('No speech detected - this is normal behavior');
          setError(null);
          onListeningChange(false);
          setInterimTranscript("");
        } else if (event.error === 'audio-capture') {
          setError('Microphone not found or access denied');
          onListeningChange(false);
          setInterimTranscript("");
        } else if (event.error === 'not-allowed') {
          setError('Microphone permission denied');
          onListeningChange(false);
          setInterimTranscript("");
        } else if (event.error === 'network') {
          setError('Network error occurred');
          onListeningChange(false);
          setInterimTranscript("");
        } else {
          setError(`Voice recognition error: ${event.error}`);
          onListeningChange(false);
          setInterimTranscript("");
        }
      };
      
      recognition.onend = () => {
        console.log('Voice recognition ended');
        onListeningChange(false);
        setInterimTranscript("");
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange, language, continuous, interimResults]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        setError(null);
        recognitionRef.current.start();
      } catch (err) {
        setError('Failed to start voice recognition');
      }
    }
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className="p-3 rounded-xl bg-slate-300 text-slate-500 cursor-not-allowed"
        title="Voice recognition not supported"
      >
        <img src="/voice-waveform.svg" alt="Voice" className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="relative">
      {/* Voice Button */}
      <button
        onClick={toggleListening}
        disabled={!!error}
        className={`p-3 rounded-xl transition-all duration-300 focus-ring ${
          isListening
            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-110 shadow-red-500/25'
            : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 hover:scale-105'
        } ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          <img src="/voice-waveform-animated.svg" alt="Voice" className="w-5 h-5" />
        ) : (
          <img src="/voice-waveform.svg" alt="Voice" className="w-5 h-5" />
        )}
      </button>
      
      {/* Error Tooltip */}
      {error && (
        <div className="absolute bottom-full mb-3 left-0 bg-red-100 dark:bg-red-900/90 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-xl z-10 border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}
      
      {/* Interim Transcript Tooltip */}
      {interimTranscript && (
        <div className="absolute bottom-full mb-3 left-0 bg-green-100 dark:bg-green-900/90 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl text-sm max-w-xs shadow-xl z-10 border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="italic font-medium">{interimTranscript}</span>
          </div>
        </div>
      )}
    </div>
  );
} 