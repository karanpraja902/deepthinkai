"use client"
import { useState, useEffect, useRef } from "react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export default function VoiceInput({ 
  onTranscript, 
  isListening, 
  onListeningChange,
  language = 'en-US',
  continuous = false,
  interimResults = true
}: VoiceInputProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if Web Speech Recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      
             // Initialize speech recognition
       const recognition = new SpeechRecognition();
       recognition.continuous = continuous; // Use prop instead of hardcoded false
       recognition.interimResults = interimResults;
       recognition.lang = language;
      
             recognition.onstart = () => {
         console.log('Voice recognition started');
         onListeningChange(true);
         setError(null);
         
         // Start 5-second timeout for no speech
         timeoutRef.current = setTimeout(() => {
           if (recognitionRef.current) {
             console.log('No speech detected for 5 seconds, stopping recognition');
             recognitionRef.current.stop();
           }
         }, 5000);
       };
      
             recognition.onresult = (event) => {
         let finalTranscript = '';
         let interimTranscript = '';
         let hasSpeech = false;
         
         for (let i = event.resultIndex; i < event.results.length; i++) {
           const transcript = event.results[i][0].transcript;
           if (event.results[i].isFinal) {
             finalTranscript += transcript;
             hasSpeech = true;
           } else {
             interimTranscript += transcript;
             hasSpeech = true;
           }
         }
         
         // Reset timeout immediately when ANY speech is detected (interim or final)
         if (hasSpeech && timeoutRef.current) {
           clearTimeout(timeoutRef.current);
           console.log('Speech detected, resetting 5-second timer');
         }
         
         // Start new timeout immediately after speech detection
         if (hasSpeech) {
           timeoutRef.current = setTimeout(() => {
             if (recognitionRef.current) {
               console.log('No speech detected for 5 seconds, stopping recognition');
               recognitionRef.current.stop();
             }
           }, 5000);
         }
         
         // Send final transcript to parent
         if (finalTranscript) {
           onTranscript(finalTranscript.trim());
         }
       };
      
             recognition.onerror = (event) => {
         console.error('Speech recognition error:', event.error);
         
         // Handle specific error types
         if (event.error === 'no-speech') {
           // This is expected when no speech is detected - don't show as error
           console.log('No speech detected - this is normal behavior');
           setError(null);
           onListeningChange(false);
         } else if (event.error === 'audio-capture') {
           setError('Microphone not found or access denied');
           onListeningChange(false);
         } else if (event.error === 'not-allowed') {
           setError('Microphone permission denied');
           onListeningChange(false);
         } else if (event.error === 'network') {
           setError('Network error occurred');
           onListeningChange(false);
         } else {
           setError(`Voice recognition error: ${event.error}`);
           onListeningChange(false);
         }
         
         // Clear timeout on error
         if (timeoutRef.current) {
           clearTimeout(timeoutRef.current);
           timeoutRef.current = null;
         }
       };
       
       recognition.onend = () => {
         console.log('Voice recognition ended');
         onListeningChange(false);
         
         // Clear timeout when recognition ends
         if (timeoutRef.current) {
           clearTimeout(timeoutRef.current);
           timeoutRef.current = null;
         }
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
       if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
       }
     };
  }, [onTranscript, onListeningChange, language, continuous, interimResults]);

     const toggleListening = () => {
     if (!recognitionRef.current) return;
     
     if (isListening) {
       recognitionRef.current.stop();
     } else {
       try {
         // Clear any previous errors when starting
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
        className="p-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed"
        title="Voice recognition not supported"
      >
        <img src="/voice-waveform.svg" alt="Voice" className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        disabled={!!error}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
        } ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          <img src="/voice-waveform.svg" alt="Voice" className="w-5 h-5" />
        ) : (
          <img src="/voice-waveform.svg" alt="Voice" className="w-5 h-5" />
        )}
      </button>
      
      {error && (
        <div className="absolute bottom-full mb-2 left-0 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs whitespace-nowrap">
          {error}
        </div>
      )}
      
      {isListening && (
        <div className="absolute bottom-full mb-2 left-0 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs whitespace-nowrap">
          Listening...
        </div>
      )}
    </div>
  );
} 