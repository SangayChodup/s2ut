// // import React from 'react';

// // interface ActionButtonsProps {
// //   onTranslate: () => void;
// //   onClear: () => void;
// //   isTranslating: boolean;
// //   isTranslateDisabled: boolean;
// //   isAudioPresent: boolean; // New prop to check if audio is uploaded/recorded
// // }

// // const ActionButtons: React.FC<ActionButtonsProps> = ({ 
// //   onTranslate, 
// //   onClear, 
// //   isTranslating,
// //   isTranslateDisabled,
// //   isAudioPresent
// // }) => {
// //   return (
// //     <div className="flex items-center justify-center gap-4">
// //       <button 
// //         onClick={onTranslate}
// //         disabled={isTranslateDisabled || isTranslating}
// //         className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
// //           isTranslateDisabled || isTranslating
// //             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //             : 'bg-green-500 text-white hover:bg-green-600'
// //         }`}
// //       >
// //         {isTranslating ? 'Translating...' : 'Translate'}
// //       </button>
      
// //       <button 
// //         onClick={onClear}
// //         disabled={!isAudioPresent}
// //         className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
// //           !isAudioPresent
// //             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //             : 'bg-red-500 text-white hover:bg-red-600'
// //         }`}
// //       >
// //         Clear
// //       </button>
// //     </div>
// //   );
// // };

// // export default ActionButtons;

// import React from 'react';

// interface ActionButtonsProps {
//   onClear: () => void;
//   isAudioPresent: boolean;
// }

// const ActionButtons: React.FC<ActionButtonsProps> = ({ 
//   onClear, 
//   isAudioPresent
// }) => {
//   return (
//     <div className="flex items-center justify-center">
//       <button 
//         onClick={onClear}
//         disabled={!isAudioPresent}
//         className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
//           !isAudioPresent
//             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             : 'bg-red-500 text-white hover:bg-red-600'
//         }`}
//       >
//         Clear
//       </button>
//     </div>
//   );
// };

// export default ActionButtons;

import React from 'react';

interface ActionButtonsProps {
  onTranslate: () => void;
  onClear: () => void;
  isTranslating: boolean;
  isTranslateDisabled: boolean;
  isAudioPresent: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onClear, 
  isTranslating,
  isAudioPresent
}) => {
  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={onClear}
        disabled={!isAudioPresent || isTranslating}
        className={`px-6 py-2 rounded-md transition duration-200 shadow-md ${
          !isAudioPresent || isTranslating
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        Clear
      </button>
    </div>
  );
};

export default ActionButtons;