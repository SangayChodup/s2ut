// import { useState, useRef, useEffect } from 'react';

// export const useAudioRecording = () => {
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [sourceAudio, setSourceAudio] = useState<string | null>(null);
//   const [audioFile, setAudioFile] = useState<File | null>(null);
//   const [recordingTime, setRecordingTime] = useState<number>(0);
  
//   // Refs for recording
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const audioStreamRef = useRef<MediaStream | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const audioChunksRef = useRef<Blob[]>([]);
  
//   // Clean up resources when component unmounts
//   useEffect(() => {
//     return () => {
//       stopRecording();
//       if (sourceAudio) {
//         URL.revokeObjectURL(sourceAudio);
//       }
//     };
//   }, []);
  
//   // Helper function to create a safe filename
//   const createSafeFilename = () => {
//     const currentDate = new Date();
//     // Format the date without colons or other invalid Windows filename characters
//     const safeDate = currentDate.toISOString()
//       .replace(/:/g, '-')       // Replace colons with hyphens
//       .replace(/\./g, '-');     // Replace periods with hyphens
    
//     return `recording_${safeDate}.wav`; // Changed to .wav extension
//   };
  
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       audioStreamRef.current = stream;
      
//       // Initialize media recorder with specific MIME type for WAV
//       // Note: Some browsers may not support 'audio/wav' directly, so we'll use the closest supported format
//       // and convert it to WAV when processing
//       const options = { 
//         mimeType: 'audio/webm' // Most browsers support this format reliably
//       };
      
//       const mediaRecorder = new MediaRecorder(stream, options);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];
      
//       // Handle data available event
//       mediaRecorder.addEventListener('dataavailable', (event) => {
//         audioChunksRef.current.push(event.data);
//       });
      
//       // Handle recording stop event
//       mediaRecorder.addEventListener('stop', async () => {
//         // Combine all chunks into a single Blob (still in webm format)
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
//         try {
//           // Convert webm to wav format
//           const wavBlob = await convertToWav(audioBlob);
//           const audioUrl = URL.createObjectURL(wavBlob);
          
//           // Create a File object from the WAV Blob with a safe filename
//           const fileName = createSafeFilename();
//           const file = new File([wavBlob], fileName, { type: 'audio/wav' });
          
//           setSourceAudio(audioUrl);
//           setAudioFile(file);
//         } catch (error) {
//           console.error('Error converting to WAV:', error);
//           alert('Error processing audio. Please try again.');
//         }
        
//         // Clean up
//         if (audioStreamRef.current) {
//           audioStreamRef.current.getTracks().forEach(track => track.stop());
//         }
//       });
      
//       // Start recording
//       mediaRecorder.start(100); // Collect data every 100ms for better responsiveness
//       setIsRecording(true);
      
//       // Start timer
//       setRecordingTime(0);
//       timerRef.current = setInterval(() => {
//         setRecordingTime(prev => prev + 1);
//       }, 1000);
      
//     } catch (error) {
//       console.error('Error starting recording:', error);
//       alert('Unable to access microphone. Please check your permissions.');
//     }
//   };
  
//   // Function to convert webm blob to wav format
//   const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
//     return new Promise((resolve, reject) => {
//       // Create an audio context
//       const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
//       // Create a file reader
//       const fileReader = new FileReader();
      
//       fileReader.onload = async () => {
//         try {
//           // Decode the webm audio data
//           const audioBuffer = await audioContext.decodeAudioData(fileReader.result as ArrayBuffer);
          
//           // Convert to WAV format
//           const wavBlob = audioBufferToWav(audioBuffer);
//           resolve(wavBlob);
//         } catch (error) {
//           reject(error);
//         }
//       };
      
//       fileReader.onerror = () => {
//         reject(new Error('Failed to read the blob'));
//       };
      
//       fileReader.readAsArrayBuffer(webmBlob);
//     });
//   };
  
//   // Helper function to convert AudioBuffer to WAV Blob
//   const audioBufferToWav = (buffer: AudioBuffer): Blob => {
//     const numOfChan = buffer.numberOfChannels;
//     const length = buffer.length * numOfChan * 2 + 44;
//     const bufferArray = new ArrayBuffer(length);
//     const view = new DataView(bufferArray);
    
//     // WAV header
//     writeString(view, 0, 'RIFF');
//     view.setUint32(4, 36 + buffer.length * numOfChan * 2, true);
//     writeString(view, 8, 'WAVE');
//     writeString(view, 12, 'fmt ');
//     view.setUint32(16, 16, true);
//     view.setUint16(20, 1, true);
//     view.setUint16(22, numOfChan, true);
//     view.setUint32(24, buffer.sampleRate, true);
//     view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
//     view.setUint16(32, numOfChan * 2, true);
//     view.setUint16(34, 16, true);
//     writeString(view, 36, 'data');
//     view.setUint32(40, buffer.length * numOfChan * 2, true);
    
//     // Write the PCM samples
//     let offset = 44;
//     for (let i = 0; i < buffer.numberOfChannels; i++) {
//       const channel = buffer.getChannelData(i);
//       for (let j = 0; j < channel.length; j++) {
//         const sample = Math.max(-1, Math.min(1, channel[j])); // clamp
//         view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
//         offset += 2;
//       }
//     }
    
//     return new Blob([view], { type: 'audio/wav' });
//   };
  
//   // Helper to write string to DataView
//   const writeString = (view: DataView, offset: number, str: string) => {
//     for (let i = 0; i < str.length; i++) {
//       view.setUint8(offset + i, str.charCodeAt(i));
//     }
//   };
  
//   const stopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//       mediaRecorderRef.current.stop();
//     }
    
//     if (audioStreamRef.current) {
//       audioStreamRef.current.getTracks().forEach(track => track.stop());
//     }
    
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//     }
    
//     setIsRecording(false);
//   };
  
//   const toggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };
  
//   const handleFileUpload = (file: File) => {
//     if (file) {
//       // Check if the file is a WAV file
//       if (!file.type.includes('wav') && !file.name.toLowerCase().endsWith('.wav')) {
//         alert('Please upload a WAV format audio file');
//         return;
//       }
      
//       // Revoke previous URL to prevent memory leaks
//       if (sourceAudio) {
//         URL.revokeObjectURL(sourceAudio);
//       }
      
//       const url = URL.createObjectURL(file);
//       setSourceAudio(url);
//       setAudioFile(file);
//     }
//   };
  
//   const clearAudio = () => {
//     if (sourceAudio) {
//       URL.revokeObjectURL(sourceAudio);
//     }
//     setSourceAudio(null);
//     setAudioFile(null);
//     setRecordingTime(0);
//   };
  
//   return {
//     isRecording,
//     sourceAudio,
//     audioFile,
//     recordingTime,
//     toggleRecording,
//     handleFileUpload,
//     clearAudio
//   };
// };

import React, { useState, useEffect, useRef } from 'react';

export const useAudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [sourceAudio, setSourceAudio] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto-processing flag
  const [shouldProcess, setShouldProcess] = useState(false);
  
  // Effect to handle recording timer
  useEffect(() => {
    if (isRecording) {
      // Start timer for recording duration display
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      // Clear timer when not recording
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);
  
  // Clean up URLs when component unmounts
  useEffect(() => {
    return () => {
      if (sourceAudio) {
        URL.revokeObjectURL(sourceAudio);
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [sourceAudio]);
  
  // Helper function to create a safe filename
  const createSafeFilename = () => {
    const currentDate = new Date();
    // Format the date without colons or other invalid Windows filename characters
    const safeDate = currentDate.toISOString()
      .replace(/:/g, '-')       // Replace colons with hyphens
      .replace(/\./g, '-');     // Replace periods with hyphens
    
    return `recording_${safeDate}.wav`; // Use .wav extension
  };
  
  // Function to convert webm blob to wav format
  const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // Create an audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create a file reader
      const fileReader = new FileReader();
      
      fileReader.onload = async () => {
        try {
          // Decode the webm audio data
          const audioBuffer = await audioContext.decodeAudioData(fileReader.result as ArrayBuffer);
          
          // Convert to WAV format
          const wavBlob = audioBufferToWav(audioBuffer);
          resolve(wavBlob);
        } catch (error) {
          reject(error);
        }
      };
      
      fileReader.onerror = () => {
        reject(new Error('Failed to read the blob'));
      };
      
      fileReader.readAsArrayBuffer(webmBlob);
    });
  };
  
  // Helper function to convert AudioBuffer to WAV Blob
  const audioBufferToWav = (buffer: AudioBuffer): Blob => {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const bufferArray = new ArrayBuffer(length);
    const view = new DataView(bufferArray);
    
    // WAV header
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.length * numOfChan * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * 2 * numOfChan, true);
    view.setUint16(32, numOfChan * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.length * numOfChan * 2, true);
    
    // Write the PCM samples
    let offset = 44;
    for (let i = 0; i < buffer.numberOfChannels; i++) {
      const channel = buffer.getChannelData(i);
      for (let j = 0; j < channel.length; j++) {
        const sample = Math.max(-1, Math.min(1, channel[j])); // clamp
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return new Blob([view], { type: 'audio/wav' });
  };
  
  // Helper to write string to DataView
  const writeString = (view: DataView, offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };
  
  const toggleRecording = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        
        const options = { 
          mimeType: 'audio/webm' // Most browsers support this format reliably
        };
        
        const mediaRecorder = new MediaRecorder(stream, options);
        
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        setRecordingTime(0);
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        mediaRecorder.onstop = async () => {
          try {
            // Create the audio blob (initially in webm format)
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            
            // Convert webm to wav format
            const wavBlob = await convertToWav(audioBlob);
            
            // Create a File from the Blob with .wav extension
            const fileName = createSafeFilename();
            const file = new File([wavBlob], fileName, { 
              type: "audio/wav",
              lastModified: Date.now() 
            });
            
            // Create URL for preview
            if (sourceAudio) URL.revokeObjectURL(sourceAudio);
            const url = URL.createObjectURL(wavBlob);
            
            // Update state
            setSourceAudio(url);
            setAudioFile(file);
            
            // Signal that we should process this audio
            setShouldProcess(true);
          } catch (error) {
            console.error('Error converting to WAV:', error);
            alert('Error processing audio. Please try again.');
          }
          
          // Stop all tracks in the stream
          if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach(track => track.stop());
          }
        };
        
        mediaRecorder.start(100); // Collect data every 100ms for better responsiveness
        setIsRecording(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Unable to access your microphone. Please check your browser permissions.');
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };
  
  const handleFileUpload = (file: File) => {
    // Check if the file is a WAV file
    if (!file.type.includes('wav') && !file.name.toLowerCase().endsWith('.wav')) {
      alert('Please upload a WAV format audio file');
      return;
    }
    
    // Clean up previous audio
    if (sourceAudio) {
      URL.revokeObjectURL(sourceAudio);
    }
    
    // Create new URL for the file
    const url = URL.createObjectURL(file);
    
    // Update state
    setSourceAudio(url);
    setAudioFile(file);
    
    // Signal that we should process this audio
    setShouldProcess(true);
  };
  
  const clearAudio = () => {
    // Clean up URL
    if (sourceAudio) {
      URL.revokeObjectURL(sourceAudio);
    }
    
    // Reset state
    setSourceAudio(null);
    setAudioFile(null);
    setRecordingTime(0);
  };
  
  return {
    isRecording,
    sourceAudio,
    audioFile,
    recordingTime,
    toggleRecording,
    handleFileUpload,
    clearAudio,
    shouldProcess,
    setShouldProcess
  };
};