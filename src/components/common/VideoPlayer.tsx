import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface KeyMoment {
  time: number; // in seconds
  label: string;
}

interface VideoPlayerProps {
  src?: string;
  title: string;
  durationMinutes?: number;
  transcript?: string;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  durationMinutes = 15,
  transcript,
  onComplete,
  isCompleted = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback high-reliability educational video stream if custom url not provided
  const videoSource =
    src && src.trim()
      ? src.trim()
      : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const isYouTube =
    videoSource.includes('youtube.com') || videoSource.includes('youtu.be');

  // Convert youtube URL to embed URL if needed
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
    } else if (url.includes('embed/')) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : url;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationMinutes * 60);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(isCompleted);

  // Key chapters / timestamps
  const keyMoments: KeyMoment[] = [
    { time: 0, label: '00:00 - Lecture Introduction & Syllabus Context' },
    { time: 90, label: '01:30 - Core Theoretical Foundations' },
    { time: 240, label: '04:00 - Architectural Principles & State Models' },
    { time: 420, label: '07:00 - Implementation & Hands-on Synthesis' },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        // Autoplay policy or format error
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }

    // Auto mark completed at 85% progress
    if (
      !hasCompleted &&
      videoRef.current.duration > 0 &&
      videoRef.current.currentTime / videoRef.current.duration >= 0.85
    ) {
      setHasCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const jumpToTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
    setCurrentTime(seconds);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Frame */}
      <div
        ref={containerRef}
        className="relative bg-[#181F1A] rounded-2xl overflow-hidden border border-[#2B352E] shadow-sm group"
      >
        {isYouTube ? (
          <div className="aspect-video w-full">
            <iframe
              src={getYouTubeEmbedUrl(videoSource)}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video w-full flex items-center justify-center bg-black/90">
            <video
              ref={videoRef}
              src={videoSource}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
                setHasCompleted(true);
                if (onComplete) onComplete();
              }}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
              playsInline
            />

            {/* Centered Play Button Overlay when Paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#343F35]/90 hover:bg-[#4A5D4E] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer backdrop-blur-xs border border-white/20"
              >
                <Play className="w-7 h-7 fill-current ml-1" />
              </button>
            )}

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4 text-white opacity-95 transition-opacity space-y-2">
              {/* Progress Slider */}
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Video scrubber"
                  className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#A3B18A] hover:h-2 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-1 hover:text-[#DDE5B6] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => jumpToTime(Math.max(0, currentTime - 10))}
                    aria-label="Replay 10 seconds"
                    className="p-1 hover:text-[#DDE5B6] transition-colors cursor-pointer"
                    title="Rewind 10s"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                      className="p-1 hover:text-[#DDE5B6] cursor-pointer"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume slider"
                      className="w-14 h-1 bg-white/40 rounded-lg appearance-none cursor-pointer accent-[#A3B18A]"
                    />
                  </div>

                  <span className="text-[11px] font-mono text-white/80">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md text-[11px]">
                    {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleSpeedChange(rate)}
                        className={`px-1 rounded ${
                          playbackRate === rate ? 'bg-[#588157] text-white font-bold' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    aria-label="Toggle fullscreen"
                    className="p-1 hover:text-[#DDE5B6] transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Actions & Chapter Timestamps */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F4F1EA] dark:bg-[#1E2520] border border-[#E5E1D8] dark:border-[#2B352E]">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#E8EDEA] dark:bg-[#252E26] text-[#343F35] dark:text-[#DDE5B6]">
            <Clock className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-bold text-[#1F241F] dark:text-white">
              Interactive Video Lecture
            </div>
            <div className="text-[11px] text-[#6D756D] dark:text-[#B5BEB6]">
              {durationMinutes} min runtime • High-definition interactive player
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="px-3 py-1.5 rounded-lg border border-[#E5E1D8] dark:border-[#2B352E] hover:bg-white dark:hover:bg-[#252E26] text-xs font-semibold text-[#2D332D] dark:text-[#E8EDEA] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#588157]" />
            {showTranscript ? 'Hide Lecture Transcript' : 'View Lecture Transcript'}
          </button>

          <button
            onClick={() => {
              setHasCompleted(true);
              if (onComplete) onComplete();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              hasCompleted || isCompleted
                ? 'bg-[#E8EDEA] dark:bg-[#252E26] text-[#343F35] dark:text-[#DDE5B6] border border-[#A3B18A]/50'
                : 'bg-[#588157] hover:bg-[#476A46] text-white shadow-xs'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {hasCompleted || isCompleted ? 'Lesson Watched' : 'Mark as Watched'}
          </button>
        </div>
      </div>

      {/* Chapter Timestamps */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-[#1C231E] border border-[#E5E1D8] dark:border-[#2B352E] space-y-2">
        <div className="text-xs font-bold text-[#1F241F] dark:text-[#F2F5F3] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#588157]" />
          Key Topic Chapters & Quick Timestamps
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {keyMoments.map((m, idx) => (
            <button
              key={idx}
              onClick={() => jumpToTime(m.time)}
              className="text-left px-3 py-2 rounded-lg bg-[#F9F7F2] dark:bg-[#252E26] hover:bg-[#E8EDEA] dark:hover:bg-[#2F3A30] border border-[#E5E1D8] dark:border-[#38453A] text-xs text-[#2D332D] dark:text-[#E8EDEA] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="truncate">{m.label}</span>
              <span className="text-[10px] font-mono text-[#588157] font-semibold shrink-0 ml-2">
                Jump
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Transcript Drawer */}
      {showTranscript && (
        <div className="p-4 rounded-xl bg-white dark:bg-[#1C231E] border border-[#E5E1D8] dark:border-[#2B352E] space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0EDE6] dark:border-[#2B352E]">
            <div className="font-bold text-xs text-[#1F241F] dark:text-white flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#588157]" />
              Synchronized Lecture Transcript & Annotations
            </div>
            <button
              onClick={() => {
                if (transcript) {
                  navigator.clipboard?.writeText(transcript);
                }
              }}
              className="text-[11px] text-[#4A5D4E] dark:text-[#A3B18A] hover:underline cursor-pointer"
            >
              Copy Transcript
            </button>
          </div>
          <div className="text-xs text-[#2D332D] dark:text-[#B5BEB6] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-line font-sans">
            {transcript ||
              `[00:00] Welcome to this in-depth lecture session. In today's module, we analyze the core systemic foundations necessary to build resilient, distributed systems.
              
[01:30] Let's begin by understanding why classical linear workflows break down when network partitions occur. When nodes cannot communicate reliably, preserving strict serializability requires blocking writes or sacrificing partition tolerance.

[04:00] To resolve this, modern edge architectures utilize conflict-free replicated data types (CRDTs). A CRDT guarantees that independent updates converge deterministically across all replicas without centralized locks.

[07:00] During the hands-on lab portion of this chapter, you will implement client-side idempotency keys and state reconciliation vectors to ensure zero data loss during offline sync batches.`}
          </div>
        </div>
      )}
    </div>
  );
};
