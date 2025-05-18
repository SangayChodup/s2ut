// import React from 'react';
// import { Mic, Upload, Square } from 'lucide-react';

// interface RecordingControlsProps {
//   isRecording: boolean;
//   toggleRecording: () => void;
//   onFileUpload: (file: File) => void;
// }

// const RecordingControls: React.FC<RecordingControlsProps> = ({ 
//   isRecording, 
//   toggleRecording, 
//   onFileUpload 
// }) => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       onFileUpload(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="flex items-center justify-between mb-4">
//       <button
//         onClick={toggleRecording}
//         className={`flex items-center justify-center p-3 rounded-full transition duration-200 ${
//           isRecording 
//             ? 'bg-red-100 text-red-500' 
//             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//         }`}
//       >
//         {isRecording ? (
//           <Square size={20} className="animate-pulse" />
//         ) : (
//           <Mic size={20} />
//         )}
//       </button>
      
//       <div className="relative">
//         <input
//           type="file"
//           id="audio-upload"
//           onChange={handleFileChange}
//           accept="audio/*"
//           className="hidden"
//         />
//         <label 
//           htmlFor="audio-upload"
//           className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-200"
//         >
//           <Upload size={16} className="mr-2" />
//           Choose file
//         </label>
//       </div>
//     </div>
//   );
// };

// export default RecordingControls;



import React, { useRef, useState } from 'react';
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
  const [isHolding, setIsHolding] = useState(false);
  
  const handleRecordStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isRecording) {
      setIsHolding(true);
      toggleRecording(); // Start recording
    }
  };
  
  const handleRecordEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isRecording && isHolding) {
      setIsHolding(false);
      toggleRecording(); // Stop recording which will automatically process the audio
    }
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
        onMouseDown={handleRecordStart}
        onMouseUp={handleRecordEnd}
        onMouseLeave={isRecording && isHolding ? handleRecordEnd : undefined}
        onTouchStart={handleRecordStart}
        onTouchEnd={handleRecordEnd}
        className={`flex items-center justify-center p-3 rounded-full transition duration-200 ${
          isRecording 
            ? 'bg-red-100 text-red-500' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-label={isRecording ? "Stop recording" : "Press and hold to record"}
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