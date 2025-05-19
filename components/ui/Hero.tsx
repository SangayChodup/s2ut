"use client";

import React, { useState, useEffect } from "react";
import ModelSelector from "./ModelSelector";
import LanguageSelector from "./LanguageSelector";
import AudioPanel from "./AudioPanel";
import ActionButtons from "./ActionButtons";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useAudioRecording } from "@/hooks/useAudioRecording";
import { useAudioTranslation } from "@/hooks/useAudioTranslation";
import { formatTime } from "@/utils/formatTime";
import { SelectChangeEvent } from '@mui/material';

const HeroWithTranslation: React.FC = () => {
  const scrollPosition = useScrollPosition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    isRecording,
    sourceAudio,
    audioFile,
    recordingTime,
    toggleRecording,
    handleFileUpload,
    clearAudio,
    shouldProcess,
    setShouldProcess
  } = useAudioRecording();

  const {
    model,
    setModel,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    targetAudio,
    isTranslating,
    translateAudio,
    clearTranslation,
    modelOptions,
    languageOptions,
    swapLanguages,
    transcriptionText,
    translationText,
    error
  } = useAudioTranslation();

  // Display any error from the translation hook
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  // Automatic translation when audio is ready
  useEffect(() => {
    if (shouldProcess && audioFile) {
      // Reset the flag
      setShouldProcess(false);
      
      // Start translation process
      setErrorMessage(null);
      translateAudio(audioFile);
    }
  }, [shouldProcess, audioFile]);

  const handleClear = () => {
    clearAudio();
    clearTranslation();
    setErrorMessage(null);
  };

  const handleSourceLanguageChange = (event: SelectChangeEvent<string>) => {
    setSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event: SelectChangeEvent<string>) => {
    setTargetLanguage(event.target.value);
  };

  return (
    <div id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center py-4 px-2 sm:py-8 sm:px-4">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 pointer-events-none" />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto mt-16 sm:mt-14">
        <div 
          className="p-3 sm:p-4 md:p-6 backdrop-blur-sm rounded-lg shadow-lg"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/dragon-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {/* Language selector section */}
            <div className="flex flex-col gap-2">
              <div className="mt-2 sm:mt-4">
                <LanguageSelector
                  sourceLanguage={sourceLanguage}
                  targetLanguage={targetLanguage}
                  onSourceChange={handleSourceLanguageChange}
                  onTargetChange={handleTargetLanguageChange}
                  onSwapLanguages={swapLanguages}
                  languageOptions={languageOptions}
                />
              </div>
              
              {/* Audio panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
                <AudioPanel
                  title="Input Audio"
                  panelType="input"
                  audioUrl={sourceAudio}
                  isRecording={isRecording}
                  toggleRecording={toggleRecording}
                  onFileUpload={handleFileUpload}
                  recordingTime={isRecording ? formatTime(recordingTime) : undefined}
                />

                <AudioPanel
                  title="Output Audio"
                  panelType="output"
                  audioUrl={targetAudio}
                />
              </div>
              
              {/* Error Message Display */}
              {errorMessage && (
                <div className="p-2 sm:p-3 bg-transparent border border-red-200 text-red-600 rounded-md text-sm sm:text-base">
                  {errorMessage}
                </div>
              )}
              
              {/* Processing Indicator */}
              {isTranslating && (
                <div className="flex items-center justify-center p-2 sm:p-3 bg-transparent text-white rounded-md text-sm sm:text-base">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  translating audio...
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <ActionButtons
              onTranslate={() => {}}
              onClear={handleClear}
              isTranslating={isTranslating}
              isTranslateDisabled={true}
              isAudioPresent={!!sourceAudio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithTranslation;