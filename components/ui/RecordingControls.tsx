import React, { useRef } from 'react';
import { Mic, Upload, Square } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  toggleRecording: () => void;
  onFileUpload: (file: File) => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  toggleRecording,
  onFileUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleRecordClick = () => {
    toggleRecording(); // Toggle recording state (start/stop)
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
      // Reset input value to allow uploading the same file again
      e.target.value = '';
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={handleRecordClick}
        className={`flex items-center justify-center p-3 rounded-full transition duration-200 ${
          isRecording 
            ? 'bg-red-100 text-red-500' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        type="button"
      >
        {isRecording ? (
          <Square size={20} className="animate-pulse" />
        ) : (
          <Mic size={20} />
        )}
      </button>
      
      <div className="relative">
        <input
          type="file"
          id="audio-upload"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
        />
        <label 
          htmlFor="audio-upload"
          className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
        >
          <Upload size={16} className="mr-2" />
          Choose file
        </label>
      </div>
    </div>
  );
};

export default RecordingControls;