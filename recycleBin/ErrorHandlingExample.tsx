// "use client"
// import { useState } from "react";
// import EnhancedVoiceInput from "./EnhancedVoiceInput";

// export default function ErrorHandlingExample() {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [errorLog, setErrorLog] = useState<string[]>([]);

//   const handleTranscript = (text: string) => {
//     setTranscript(text);
//     console.log("Voice transcript:", text);
//   };

//   const handleError = (error: string | null) => {
//     if (error) {
//       const timestamp = new Date().toLocaleTimeString();
//       setErrorLog(prev => [...prev, `${timestamp}: ${error}`]);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Voice Input with Error Handling
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

//         {/* Error Log */}
//         {errorLog.length > 0 && (
//           <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
//             <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
//               Error Log:
//             </h3>
//             <div className="space-y-1 max-h-32 overflow-y-auto">
//               {errorLog.slice(-5).map((error, index) => (
//                 <p key={index} className="text-xs text-red-700 dark:text-red-300">
//                   {error}
//                 </p>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Instructions */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Error Handling Features:</strong></p>
//           <p>✅ "no-speech" errors are handled silently</p>
//           <p>✅ Clear error messages for different error types</p>
//           <p>✅ Errors are cleared when starting new recognition</p>
//           <p>✅ Proper cleanup on all error scenarios</p>
//         </div>

//         {/* Error Types */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Handled Error Types:</strong></p>
//           <p>• <strong>no-speech</strong>: Silently handled (normal behavior)</p>
//           <p>• <strong>audio-capture</strong>: "Microphone not found"</p>
//           <p>• <strong>not-allowed</strong>: "Permission denied"</p>
//           <p>• <strong>network</strong>: "Network error"</p>
//           <p>• <strong>others</strong>: Generic error message</p>
//         </div>

//         {/* Browser Support Info */}
//         <div className="text-xs text-gray-500 dark:text-gray-400">
//           <p><strong>Note:</strong> Voice recognition requires HTTPS and microphone permissions</p>
//         </div>
//       </div>
//     </div>
//   );
// } 