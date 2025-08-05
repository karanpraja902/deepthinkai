"use client"
import { useState, useRef, useEffect } from "react";

interface VoiceSettingsProps {
  language?: string;
  onLanguageChange?: (language: string) => void;
  continuous?: boolean;
  onContinuousChange?: (continuous: boolean) => void;
  interimResults?: boolean;
  onInterimResultsChange?: (interimResults: boolean) => void;
}

const SUPPORTED_LANGUAGES = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
];

export default function VoiceSettings({
  language = 'en-US',
  onLanguageChange = () => {},
  continuous = false,
  onContinuousChange = () => {},
  interimResults = true,
  onInterimResultsChange = () => {}
}: VoiceSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Settings button clicked, current isOpen:', isOpen);
    setIsOpen(!isOpen);
    console.log('Setting isOpen to:', !isOpen);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); //prevents the default action of the key. Explain further with an example
      //e.preventDefault() is used to prevent the default action of the key. For example, if you press the Enter key, it will submit the form. 
      
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Calculate position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const panelHeight = 300; // Approximate panel height
      
      // If there's not enough space below, position above
      if (buttonRect.bottom + panelHeight > viewportHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen]);

  // Update panel position when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && buttonRef.current && panelRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const panelHeight = 300;
        
        if (buttonRect.bottom + panelHeight > viewportHeight) {
          setPosition('top');
        } else {
          setPosition('bottom');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && buttonRef.current && panelRef.current) {
        if (!buttonRef.current.contains(event.target as Node) && 
            !panelRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Settings Button */}
      {/* <button
        ref={buttonRef}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
          isOpen 
            ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' 
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
        }`}
        title="Voice settings"
        aria-label="Voice settings"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        ⚙️
        {isOpen && <span className="ml-1 text-xs">●</span>}
      </button> */}

      {/* Settings Panel */}
      {isOpen && (
        <div 
          ref={panelRef}
          className="fixed bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 min-w-64 z-[9999] max-h-96 overflow-y-auto"
          style={{ 
            border: '2px solid red', // Temporary visual indicator
            top: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().top - 320}px` : '50%',
            left: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().left}px` : '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Voice Settings {isOpen ? '(OPEN)' : '(CLOSED)'}
            </h3>
            
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Continuous Recognition */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Continuous Recognition
              </label>
              <button
                onClick={() => onContinuousChange(!continuous)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  continuous ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`${continuous ? 'Disable' : 'Enable'} continuous recognition`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    continuous ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Interim Results */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Interim Results
              </label>
              <button
                onClick={() => onInterimResultsChange(!interimResults)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                  interimResults ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`${interimResults ? 'Disable' : 'Enable'} interim results`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    interimResults ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Help Text */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p><strong>Continuous:</strong> Keep listening after each phrase</p>
              <p><strong>Interim Results:</strong> Show real-time transcription</p>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black bg-opacity-25"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
    </div>
  );
} 