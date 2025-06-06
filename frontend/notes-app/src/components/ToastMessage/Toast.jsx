import React, { useEffect } from 'react';
import { LuCheck } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';

const Toast = ({ isShown, message, type = 'success', onClose }) => {
  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isShown, onClose]);

  if (!isShown) return null;

  return (
    <div className="absolute top-20 right-6 transition-opacity duration-300 opacity-100 z-50">
      <div
        className={`relative min-w-52 bg-white border shadow-2xl rounded-md pl-2 pr-4 py-2 flex items-center gap-3
          after:content-[''] after:w-[5px] after:h-full after:absolute after:left-0 after:top-0 after:rounded-l-lg
          ${type === 'delete' ? 'after:bg-red-500' : 'after:bg-green-500'}`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full
            ${type === 'delete' ? 'bg-red-50' : 'bg-green-50'}`}
        >
          {type === 'delete' ? (
            <MdDeleteOutline className="text-xl text-red-500" />
          ) : (
            <LuCheck className="text-xl text-green-500" />
          )}
        </div>
        <p className="text-sm text-slate-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
