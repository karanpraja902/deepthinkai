// "use client"
// import { useState } from "react";
// import EnhancedVoiceInput from "./EnhancedVoiceInput";

// export default function TimerTest() {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);

//   const handleTranscript = (text: string) => {
//     setTranscript(text);
//     console.log("Voice transcript:", text);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         5-Second Timer Test
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

//         {/* Instructions */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Timer Features:</strong></p>
//           <p>✅ 5-second countdown animation</p>
//           <p>✅ Progress bar fills from 0% to 100%</p>
//           <p>✅ Turns red in last 2 seconds</p>
//           <p>✅ Resets immediately on speech detection</p>
//           <p>✅ Stops at 0 seconds</p>
//         </div>

//         {/* Timer Behavior */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Timer Behavior:</strong></p>
//           <p>• Starts at 5 seconds (blue progress bar)</p>
//           <p>• Counts down: 5 → 4 → 3 → 2 → 1 → 0</p>
//           <p>• Last 2 seconds: Progress bar turns red</p>
//           <p>• Any speech detection: Timer resets to 5</p>
//           <p>• No speech for 5s: Recognition stops</p>
//         </div>

//         {/* Visual Indicators */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Visual Indicators:</strong></p>
//           <p>🎯 <span className="text-blue-600">Blue progress bar</span>: Normal countdown</p>
//           <p>⚠️ <span className="text-red-600">Red progress bar</span>: Last 2 seconds</p>
//           <p>🔴 <span className="text-red-600">Red text</span>: Time running out</p>
//           <p>🎤 <span className="text-green-600">Green tooltip</span>: Speech detected</p>
//         </div>
//       </div>
//     </div>
//   );
// } 