// "use client"
// import { useState, useEffect, useRef } from "react";

// export default function SmoothTimerExample() {
//   const [timeLeft, setTimeLeft] = useState(5);
//   const [isRunning, setIsRunning] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   const startTimer = () => {
//     setIsRunning(true);
//     setTimeLeft(5);
//     setProgress(0);
    
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
    
//     intervalRef.current = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           setIsRunning(false);
//           if (intervalRef.current) {
//             clearInterval(intervalRef.current);
//             intervalRef.current = null;
//           }
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const resetTimer = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//     setTimeLeft(5);
//     setProgress(0);
//     setIsRunning(false);
//   };

//   // Update progress bar smoothly
//   useEffect(() => {
//     const newProgress = timeLeft === 0 ? 100 : ((5 - timeLeft) / 5) * 100;
//     setProgress(newProgress);
//   }, [timeLeft]);

//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Smooth Timer Animation Test
//       </h2>
      
//       <div className="space-y-4">
//         {/* Timer Display */}
//         <div className="text-center">
//           <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             {timeLeft}s
//           </div>
//           <div className="text-sm text-gray-600 dark:text-gray-400">
//             {isRunning ? 'Timer Running' : 'Timer Stopped'}
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="space-y-2">
//           <div className="text-sm text-gray-600 dark:text-gray-400">
//             Progress: {progress.toFixed(1)}%
//           </div>
//           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
//             <div 
//               className={`h-3 rounded-full transition-all duration-1000 ease-out ${
//                 timeLeft <= 2 ? 'bg-red-500' : 'bg-blue-600'
//               }`}
//               style={{ 
//                 width: `${progress}%`,
//                 transition: 'width 1s ease-out, background-color 0.3s ease-in-out'
//               }}
//             />
//           </div>
//         </div>

//         {/* Controls */}
//         <div className="flex space-x-2">
//           <button
//             onClick={startTimer}
//             disabled={isRunning}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Start Timer
//           </button>
//           <button
//             onClick={resetTimer}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//           >
//             Reset
//           </button>
//         </div>

//         {/* Instructions */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Animation Features:</strong></p>
//           <p>✅ Smooth progress bar animation</p>
//           <p>✅ Color changes at 2 seconds remaining</p>
//           <p>✅ Ease-out transition for natural feel</p>
//           <p>✅ Real-time progress percentage</p>
//           <p>✅ Proper cleanup on reset</p>
//         </div>

//         {/* Visual Indicators */}
//         <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
//           <p><strong>Visual Feedback:</strong></p>
//           <p>🔵 <span className="text-blue-600">Blue bar</span>: Normal countdown (5s → 3s)</p>
//           <p>🔴 <span className="text-red-600">Red bar</span>: Warning (2s → 0s)</p>
//           <p>📊 <span className="text-gray-600">Progress %</span>: Real-time completion</p>
//         </div>
//       </div>
//     </div>
//   );
// } 