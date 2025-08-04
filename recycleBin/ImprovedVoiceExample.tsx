// "use client"
// import { useState } from "react";
// import EnhancedVoiceInput from "./EnhancedVoiceInput";

// export default function ImprovedVoiceExample() {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [speechEvents, setSpeechEvents] = useState<string[]>([]);

//   const handleTranscript = (text: string) => {
//     setTranscript(text);
//     const timestamp = new Date().toLocaleTimeString();
//     setSpeechEvents(prev => [...prev, `Speech detected at ${timestamp}: "${text}"`]);
//     console.log("Voice transcript:", text);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Improved Voice Input with 5s Timeout
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
//             timeoutDuration={5}
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

//         {/* Speech Events */}
//         {speechEvents.length > 0 && (
//           <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
//             <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
//               Speech Detection Events:
//             </h3>
//             <div className="space-y-1 max-h-32 overflow-y-auto">
//               {speechEvents.slice(-5).map((event, index) => (
//                 <p key={index} className="text-xs text-green-700 dark:text-green-300">
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
//           <p>2. Timer starts at 5 seconds and counts down</p>
//           <p>3. <strong>ANY speech detection resets timer to 5 seconds</strong></p>
//           <p>4. Timer resets immediately on interim or final results</p>
//           <p>5. If no speech for 5 seconds, it stops automatically</p>
//         </div>

//         {/* Features */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Improved Features:</strong></p>
//           <p>✅ Immediate timer reset on ANY speech detection</p>
//           <p>✅ Real-time countdown display</p>
//           <p>✅ Visual progress bar</p>
//           <p>✅ Works with interim and final results</p>
//           <p>✅ Automatic cleanup and error handling</p>
//         </div>

//         {/* Browser Support Info */}
//         <div className="text-xs text-gray-500 dark:text-gray-400">
//           <p><strong>Note:</strong> Voice recognition requires HTTPS and microphone permissions</p>
//         </div>
//       </div>
//     </div>
//   );
// } 