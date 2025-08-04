// "use client"
// import { useState } from "react";
// import EnhancedVoiceInput from "./EnhancedVoiceInput";

// export default function VoiceTimeoutExample() {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [timeoutEvents, setTimeoutEvents] = useState<string[]>([]);

//   const handleTranscript = (text: string) => {
//     setTranscript(text);
//     console.log("Voice transcript:", text);
//   };

//   const handleTimeout = () => {
//     const timestamp = new Date().toLocaleTimeString();
//     setTimeoutEvents(prev => [...prev, `Auto-stopped at ${timestamp} (no speech for 5s)`]);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Voice Input with 5s Timeout
//       </h2>
      
//       <div className="space-y-4">
//         {/* Voice Input */}
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             Voice Input:
//           </span>
//           <EnhancedVoiceInput
//             onTranscript={handleTranscript}
//             isListening={isListening}
//             onListeningChange={setIsListening}
//           />
//         </div>

//         {/* Transcript Display */}
//         {transcript && (
//           <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//             <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
//               Last Transcript:
//             </h3>
//             <p className="text-sm text-gray-700 dark:text-gray-300">
//               "{transcript}"
//             </p>
//           </div>
//         )}

//         {/* Timeout Events */}
//         {timeoutEvents.length > 0 && (
//           <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
//             <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
//               Timeout Events:
//             </h3>
//             <div className="space-y-1">
//               {timeoutEvents.map((event, index) => (
//                 <p key={index} className="text-xs text-yellow-700 dark:text-yellow-300">
//                   {event}
//                 </p>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Instructions */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>How it works:</strong></p>
//           <p>1. Click the microphone button to start listening</p>
//           <p>2. Speak within 5 seconds or it will auto-stop</p>
//           <p>3. Each time you speak, the 5-second timer resets</p>
//           <p>4. If no speech is detected for 5 seconds, it stops automatically</p>
//         </div>

//         {/* Features */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Features:</strong></p>
//           <p>✅ 5-second auto-timeout</p>
//           <p>✅ Timer resets on speech detection</p>
//           <p>✅ Visual countdown timer</p>
//           <p>✅ Progress bar showing time remaining</p>
//           <p>✅ Automatic cleanup on timeout</p>
//         </div>

//         {/* Browser Support Info */}
//         <div className="text-xs text-gray-500 dark:text-gray-400">
//           <p><strong>Note:</strong> Voice recognition requires HTTPS and microphone permissions</p>
//         </div>
//       </div>
//     </div>
//   );
// } 