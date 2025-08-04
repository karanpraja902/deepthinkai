"use client"
import { useState } from "react";

interface VoiceSettingsProps {
  language: string;
  onLanguageChange: (language: string) => void;
  continuous: boolean;
  onContinuousChange: (continuous: boolean) => void;
  interimResults: boolean;
  onInterimResultsChange: (interimResults: boolean) => void;
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
  language,
  onLanguageChange,
  continuous,
  onContinuousChange,
  interimResults,
  onInterimResultsChange
}: VoiceSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
        title="Voice settings"
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-64 z-20">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Voice Settings</h3>
            
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
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
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  continuous ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
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
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  interimResults ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
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
          className="fixed inset-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 