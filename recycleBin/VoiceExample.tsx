// "use client"
// import { useState } from "react";
// import EnhancedVoiceInput from "./EnhancedVoiceInput";
// import VoiceSettings from "./VoiceSettings";

// export default function VoiceExample() {
//   const [transcript, setTranscript] = useState("");
//   const [isListening, setIsListening] = useState(false);
//   const [voiceSettings, setVoiceSettings] = useState({
//     language: 'en-US',
//     continuous: true,
//     interimResults: true
//   });

//   const handleTranscript = (text: string) => {
//     setTranscript(text);
//     console.log("Voice transcript:", text);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Voice Input Demo
//       </h2>
      
//       <div className="space-y-4">
//         {/* Voice Settings */}
//         <div className="flex items-center justify-between">
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             Voice Settings:
//           </span>
//           <VoiceSettings
//             language={voiceSettings.language}
//             onLanguageChange={(lang) => setVoiceSettings(prev => ({ ...prev, language: lang }))}
//             continuous={voiceSettings.continuous}
//             onContinuousChange={(cont) => setVoiceSettings(prev => ({ ...prev, continuous: cont }))}
//             interimResults={voiceSettings.interimResults}
//             onInterimResultsChange={(interim) => setVoiceSettings(prev => ({ ...prev, interimResults: interim }))}
//           />
//         </div>

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

//         {/* Instructions */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>How to use:</strong></p>
//           <p>1. Click the microphone button to start listening</p>
//           <p>2. Speak clearly into your microphone</p>
//           <p>3. Click again to stop listening</p>
//           <p>4. Your speech will be converted to text</p>
//         </div>

//         {/* Browser Support Info */}
//         <div className="text-xs text-gray-500 dark:text-gray-400">
//           <p><strong>Note:</strong> Voice recognition requires HTTPS and microphone permissions</p>
//         </div>
//       </div>
//     </div>
//   );
// } 