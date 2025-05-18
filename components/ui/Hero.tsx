// // "use client";

// // import React from "react";
// // import ModelSelector from "@/components/ui/ModelSelector";
// // import LanguageSelector from "@/components/ui/LanguageSelector";
// // import AudioPanel from "@/components/ui/AudioPanel";
// // import ActionButtons from "@/components/ui/ActionButtons";
// // import { useScrollPosition } from "@/hooks/useScrollPosition";
// // import { useAudioRecording } from "@/hooks/useAudioRecording";
// // import { useAudioTranslation } from "@/hooks/useAudioTranslation";

// // const HeroWithTranslation: React.FC = () => {
// //   const scrollPosition = useScrollPosition();

// //   const {
// //     isRecording,
// //     sourceAudio,
// //     toggleRecording,
// //     handleFileUpload,
// //     clearAudio,
// //   } = useAudioRecording();

// //   const {
// //     model,
// //     setModel,
// //     sourceLanguage,
// //     setSourceLanguage,
// //     targetLanguage,
// //     setTargetLanguage,
// //     targetAudio,
// //     isTranslating,
// //     translateAudio,
// //     clearTranslation,
// //     modelOptions,
// //     languageOptions,
// //     swapLanguages,
// //   } = useAudioTranslation();

// //   const handleTranslate = () => {
// //     translateAudio(sourceAudio);
// //   };

// //   const handleClear = () => {
// //     clearAudio();
// //     clearTranslation();
// //   };

// //   const handleSourceLanguageChange = (
// //     event: React.ChangeEvent<{ value: unknown }>
// //   ) => {
// //     setSourceLanguage(event.target.value as string);
// //   };

// //   const handleTargetLanguageChange = (
// //     event: React.ChangeEvent<{ value: unknown }>
// //   ) => {
// //     setTargetLanguage(event.target.value as string);
// //   };

// //   return (
// //     <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
// //       <div
// //         className="absolute inset-0 bg-cover bg-center"
// //         style={{
// //           backgroundImage: `url('/dragon-background.jpg')`,
// //           backgroundAttachment: "fixed",
// //           backgroundSize: "cover",
// //         }}
// //       />
// //       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 pointer-events-none" />

// //       <div className="relative mt-14 z-10 w-full max-w-4xl mx-auto">
// //         <div className="p-6 bg-white backdrop-blur-sm rounded-lg shadow-lg">
// //           <div className="mb-8">
// //             <div className="flex flex-wrap justify-center items-center  mb-2">
// //               <ModelSelector
// //                 model={model}
// //                 setModel={setModel}
// //                 modelOptions={modelOptions}
// //               />
// //             </div>
// //           </div>

// //           <div className=" flex flex-col gap-5">
// //             <div>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
// //                 <AudioPanel
// //                   title="Input Audio"
// //                   panelType="input"
// //                   audioUrl={sourceAudio}
// //                   isRecording={isRecording}
// //                   toggleRecording={toggleRecording}
// //                   onFileUpload={handleFileUpload}
// //                 />

// //                 <AudioPanel
// //                   title="Output Audio"
// //                   panelType="output"
// //                   audioUrl={targetAudio}
// //                 />
// //               </div>
// //               <LanguageSelector
// //                 sourceLanguage={sourceLanguage}
// //                 targetLanguage={targetLanguage}
// //                 onSourceChange={handleSourceLanguageChange}
// //                 onTargetChange={handleTargetLanguageChange}
// //                 onSwapLanguages={swapLanguages}
// //                 languageOptions={languageOptions}
// //               />
// //             </div>
// //             <ActionButtons
// //               onTranslate={handleTranslate}
// //               onClear={handleClear}
// //               isTranslating={isTranslating}
// //               isTranslateDisabled={!sourceAudio}
// //               isAudioPresent={sourceAudio}

// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default HeroWithTranslation;
// "use client";

// import React, { useState, useEffect } from "react";
// import ModelSelector from "@/components/ui/ModelSelector";
// import LanguageSelector from "@/components/ui/LanguageSelector";
// import AudioPanel from "@/components/ui/AudioPanel";
// import ActionButtons from "@/components/ui/ActionButtons";
// // import TranscriptionDisplay from "@/components/ui/TranscriptionDisplay";
// import { useScrollPosition } from "@/hooks/useScrollPosition";
// import { useAudioRecording } from "@/hooks/useAudioRecording";
// import { useAudioTranslation } from "@/hooks/useAudioTranslation";
// import { formatTime } from "@/utils/formatTime";
// import About from "@/app/about/page"

// const HeroWithTranslation: React.FC = () => {
//   const scrollPosition = useScrollPosition();
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const {
//     isRecording,
//     sourceAudio,
//     audioFile,
//     recordingTime,
//     toggleRecording,
//     handleFileUpload,
//     clearAudio,
//   } = useAudioRecording();

  

//   const {
//     model,
//     setModel,
//     sourceLanguage,
//     setSourceLanguage,
//     targetLanguage,
//     setTargetLanguage,
//     targetAudio,
//     isTranslating,
//     translateAudio,
//     clearTranslation,
//     modelOptions,
//     languageOptions,
//     swapLanguages,
//     transcriptionText,
//     translationText,
//     error
//   } = useAudioTranslation();

//   // Display any error from the translation hook
//   useEffect(() => {
//     if (error) {
//       setErrorMessage(error);
//     }
//   }, [error]);

//   const handleTranslate = () => {
//     setErrorMessage(null);
//     if (audioFile) {
//       translateAudio(audioFile);
//     } else {
//       setErrorMessage("Please select or record audio first");
//     }
//   };

//   const handleClear = () => {
//     clearAudio();
//     clearTranslation();
//     setErrorMessage(null);
//   };

//   const handleSourceLanguageChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setSourceLanguage(event.target.value);
//   };

//   const handleTargetLanguageChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setTargetLanguage(event.target.value);
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url('/bg.jpg')`,
//           backgroundAttachment: "fixed",
//           backgroundSize: "cover",
//         }}
//       />
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 pointer-events-none" />

//       <div className="relative mt-14 z-10 w-full max-w-4xl mx-auto">
//         <div className="p-6 bg-white backdrop-blur-sm rounded-lg shadow-lg">
//           {/* <div className="mb-8">
//             <div className="flex flex-wrap justify-center items-center mb-2">
//               <ModelSelector
//                 model={model}
//                 setModel={setModel}
//                 modelOptions={modelOptions}
//               />
//             </div>
//           </div> */}

//           <div className="flex flex-col gap-5">
//             <div className="flex flex-col gap-5">
//               <div className="mt-4">
//                 <LanguageSelector
//                   sourceLanguage={sourceLanguage}
//                   targetLanguage={targetLanguage}
//                   onSourceChange={handleSourceLanguageChange}
//                   onTargetChange={handleTargetLanguageChange}
//                   onSwapLanguages={swapLanguages}
//                   languageOptions={languageOptions}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                 <AudioPanel
//                   title="Input Audio"
//                   panelType="input"
//                   audioUrl={sourceAudio}
//                   isRecording={isRecording}
//                   toggleRecording={toggleRecording}
//                   onFileUpload={handleFileUpload}
//                   recordingTime={isRecording ? formatTime(recordingTime) : undefined}
//                 />

//                 <AudioPanel
//                   title="Output Audio"
//                   panelType="output"
//                   audioUrl={targetAudio}
//                 />
//               </div>
              
//               {/* Transcription Display for Cascade Model
//               <TranscriptionDisplay 
//                 transcriptionText={transcriptionText}
//                 translationText={translationText}
//                 isVisible={model === 'Cascade' && (!!transcriptionText || !!translationText)}
//               /> */}
              
//               {/* Error Message Display */}
//               {errorMessage && (
//                 <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
//                   {errorMessage}
//                 </div>
//               )}
              
              
//             </div>
            
//             <ActionButtons
//               onTranslate={handleTranslate}
//               onClear={handleClear}
//               isTranslating={isTranslating}
//               isTranslateDisabled={!sourceAudio}
//               isAudioPresent={!!sourceAudio}
//             />
//           </div>
//         </div>
//       </div>
//       {/* <div>
//         <About/>
//       </div> */}
//     </div>
//   );
// };

// export default HeroWithTranslation;

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
import { url } from "node:inspector";
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

  // const handleSourceLanguageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setSourceLanguage(event.target.value);
  // };

  // const handleTargetLanguageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setTargetLanguage(event.target.value);
  // };
  const handleSourceLanguageChange = (event: SelectChangeEvent<string>) => {
  setSourceLanguage(event.target.value);
};

const handleTargetLanguageChange = (event: SelectChangeEvent<string>) => {
  setTargetLanguage(event.target.value);
};

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60 pointer-events-none" />

      <div className="relative mt-14 z-10 w-full max-w-4xl mx-auto" >
        <div className="p-6 bg-white backdrop-blur-sm rounded-lg shadow-lg"  style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/dragon-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
       }}>
          <div className="flex flex-col gap-5" >
            <div className="flex flex-col gap-2" >
              <div className="mt-4">
                <LanguageSelector
                  sourceLanguage={sourceLanguage}
                  targetLanguage={targetLanguage}
                  onSourceChange={handleSourceLanguageChange}
                  onTargetChange={handleTargetLanguageChange}
                  onSwapLanguages={swapLanguages}
                  languageOptions={languageOptions}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 ">
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
              
              {/* Transcription and Translation Display
              {(transcriptionText || translationText) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {transcriptionText && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium mb-1 text-sm text-gray-600">Transcription</h4>
                      <p className="text-gray-800">{transcriptionText}</p>
                    </div>
                  )}
                  {translationText && (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-medium mb-1 text-sm text-gray-600">Translation</h4>
                      <p className="text-gray-800">{translationText}</p>
                    </div>
                  )}
                </div>
              )} */}
              
              {/* Error Message Display */}
              {errorMessage && (
                <div className="p-3 bg-transparent border border-red-200 text-red-600 rounded-md">
                  {errorMessage}
                </div>
              )}
              
              {/* Processing Indicator */}
              {isTranslating && (
                <div className="flex items-center justify-center p-3 bg-transparent text-white rounded-md">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  translating audio...
                </div>
              )}
            </div>
            
            <ActionButtons
              onTranslate={() => {}} // Empty function as we no longer need this
              onClear={handleClear}
              isTranslating={isTranslating}
              isTranslateDisabled={true} // Always disabled as we auto-translate
              isAudioPresent={!!sourceAudio}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWithTranslation;