'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay with sound was blocked. Defaulting to muted autoplay.', err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative group">
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
        <video
          ref={videoRef}
          autoPlay
          loop
          playsInline
          className="w-full h-auto aspect-video object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-black/80 transition-all border border-white/10"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Unmute</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Mute</span>
          </>
        )}
      </button>

      {/* Decorative glow behind video */}
      <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl -z-10" />
    </div>
  );
}
