// src/components/Loading.tsx
"use client"
import { useState, useEffect } from 'react';

const Loading: React.FC = () => {
  const messages = ["Memuat data", "Mengambil informasi", "Mohon tunggu sebentar"];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 1000); // Change message every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Title Text */}
      <h1 className="text-2xl font-bold text-darkBlue1 mb-2">Lost It? Find It!</h1>
      <p className="text-sm text-gray-600">by Kelompok 5</p>
      
      {/* Spinner */}
      <div className="mt-4 animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-darkBlue1"></div>
      
      {/* Rotating Loading Messages */}
      <p className="mt-2 text-gray-500">{messages[currentMessage]}</p>
    </div>
  );
};

export default Loading;