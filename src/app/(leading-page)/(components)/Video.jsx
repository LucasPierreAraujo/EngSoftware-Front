import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export function Video() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <div id="video" className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Veja o ConstruTech em ação</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Descubra como nossa plataforma pode transformar a gestão das suas
          obras
        </p>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer" onClick={togglePlay}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/homem-na-estrada.mp4"
          >
            Seu navegador não suporta o elemento de vídeo.
          </video>
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-black" />
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 bg-gray-200 rounded-full overflow-hidden transition-transform duration-300">
          <div
            className="h-2 bg-[#2A2567] cursor-pointer transition-transform duration-300"
            style={{ width: `${progress}%` }}
            onClick={handleSeek}
          ></div>
        </div>
      </div>
    </div>
  );
} 