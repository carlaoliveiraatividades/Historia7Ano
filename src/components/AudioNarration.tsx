import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

interface AudioNarrationProps {
  textToSpeak: string;
}

export default function AudioNarration({ textToSpeak }: AudioNarrationProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const toggleSpeak = () => {
    if (!supported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // Stop any other speak
      
      const cleanText = textToSpeak
        .replace(/<[^>]*>/g, '') // remove HTML tags
        .substring(0, 1500); // safety cap limit

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'pt-PT'; // Portugal Portuguese
      
      // Look for a pt-PT voice specifically, if available
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(voice => voice.lang.includes('pt-PT') || voice.lang.includes('pt_PT'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      }
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Turn off speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!supported) return null;

  return (
    <button
      onClick={toggleSpeak}
      title={isSpeaking ? "Parar leitura por voz" : "Ouvir texto narrado"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 ${
        isSpeaking
          ? 'bg-emerald-500 text-white shadow-emerald-500/10 animate-pulse'
          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
      }`}
    >
      {isSpeaking ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>A ler texto (pausar)...</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5" />
          <span>Ouvir Texto</span>
        </>
      )}
    </button>
  );
}
