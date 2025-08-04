// "use client"
// import { useState, useEffect } from "react";

// export default function ProgressTest() {
//   const [progress, setProgress] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   const startProgress = () => {
//     setIsRunning(true);
//     setProgress(0);
    
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           setIsRunning(false);
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 20; // Increment by 20% every second (5 seconds total)
//       });
//     }, 1000);
//   };

//   const resetProgress = () => {
//     setIsRunning(false);
//     setProgress(0);
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Progress Bar Test
//       </h2>
      
//       <div className="space-y-4">
//         {/* Progress Display */}
//         <div className="text-center">
//           <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//             {progress.toFixed(0)}%
//           </div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">
//             {isRunning ? 'Progressing...' : 'Stopped'}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="space-y-2">
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
//             <div 
//               className="h-3 bg-blue-600 rounded-full transition-all duration-1000 ease-out"
//               style={{ 
//                 width: `${progress}%`,
//                 transition: 'width 1s ease-out'
//               }}
//             />
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex space-x-2">
//           <button
//             onClick={startProgress}
//             disabled={isRunning}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Start Progress
//           </button>
//           <button
//             onClick={resetProgress}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//           >
//             Reset
//           </button>
//         </div>

//         {/* Instructions */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Test Instructions:</strong></p>
//           <p>1. Click "Start Progress" to begin animation</p>
//           <p>2. Watch the progress bar fill from 0% to 100%</p>
//           <p>3. Animation should be smooth with 1-second transitions</p>
//           <p>4. Progress increments by 20% every second</p>
//           <p>5. Total duration: 5 seconds</p>
//         </div>

//         {/* Expected Behavior */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Expected Behavior:</strong></p>
//           <p>✅ Progress bar should fill smoothly</p>
//           <p>✅ No jumps or stutters in animation</p>
//           <p>✅ Transitions should be smooth</p>
//           <p>✅ Should complete in exactly 5 seconds</p>
//         </div>
//       </div>
//     </div>
//   );
// } 