import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Music, Play, Pause, Download, Sparkles, Volume2, 
  Clock, Trash2, BookmarkCheck, AlertCircle, RefreshCw, Disc3 
} from 'lucide-react';
import { StoredSoundtrack, saveSoundtrackToFirestore, deleteSoundtrackFromFirestore } from '../lib/firebase';

interface LyriaMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null;
  savedSoundtracks?: StoredSoundtrack[];
}

const MUSIC_PRESETS = [
  {
    title: "Didsbury Victorian Afternoon",
    prompt: "A serene, peaceful acoustic guitar and warm cello instrumental evocative of a sunny afternoon in a leafy South Manchester garden with birds singing softly in the background.",
    model: "lyria-3-clip-preview" as const,
    vibe: "Leafy & Pastoral"
  },
  {
    title: "Ancoats Loft Downtempo",
    prompt: "Warm ambient lo-fi electronic downtempo beat with mellow electric piano, soft vinyl crackle, and modern European café undertones.",
    model: "lyria-3-clip-preview" as const,
    vibe: "Industrial & Modern"
  },
  {
    title: "Chorlton Green Morning Walk",
    prompt: "Gentle acoustic folk with fingerpicked acoustic guitar, subtle flute, and warm double bass reflecting a crisp morning stroll past independent artisan bakeries.",
    model: "lyria-3-clip-preview" as const,
    vibe: "Artisan & Bohemian"
  },
  {
    title: "Cheshire Manor Architectural Suite",
    prompt: "Grand cinematic classical orchestral movement with sweeping violin strings, concert harp, and refined grand piano conveying timeless British architectural elegance.",
    model: "lyria-3-pro-preview" as const,
    vibe: "Cinematic & Prestigious"
  }
];

export const LyriaMusicModal: React.FC<LyriaMusicModalProps> = ({
  isOpen,
  onClose,
  userId,
  savedSoundtracks = []
}) => {
  const [prompt, setPrompt] = useState(MUSIC_PRESETS[0].prompt);
  const [trackTitle, setTrackTitle] = useState(MUSIC_PRESETS[0].title);
  const [model, setModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Active track being played
  const [activeTrack, setActiveTrack] = useState<{
    id: string;
    title: string;
    audioUrl: string;
    audioBase64: string;
    mimeType: string;
    prompt: string;
    model: string;
    lyrics?: string;
  } | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async (customPrompt?: string, customTitle?: string, customModel?: 'lyria-3-clip-preview' | 'lyria-3-pro-preview') => {
    const finalPrompt = customPrompt || prompt;
    const finalTitle = customTitle || trackTitle;
    const finalModel = customModel || model;

    if (!finalPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          model: finalModel,
          title: finalTitle
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      const mimeType = data.mimeType || 'audio/wav';

      // Decode base64 into Blob URL for playback
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      const audioUrl = URL.createObjectURL(blob);

      const newTrack = {
        id: data.id || `track-${Date.now()}`,
        title: finalTitle,
        audioUrl,
        audioBase64: data.audioBase64,
        mimeType,
        prompt: finalPrompt,
        model: finalModel,
        lyrics: data.lyrics
      };

      setActiveTrack(newTrack);

      // Automatically play
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }

      // If user is authenticated, persist into Firestore
      if (userId) {
        await saveSoundtrackToFirestore(userId, {
          id: newTrack.id,
          title: newTrack.title,
          prompt: newTrack.prompt,
          model: newTrack.model,
          audioData: newTrack.audioBase64,
          mimeType: newTrack.mimeType,
          lyrics: newTrack.lyrics,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err: any) {
      console.error('Music generation error:', err);
      setGenerationError(err.message || 'Unable to generate audio track. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePresetSelect = (preset: typeof MUSIC_PRESETS[0]) => {
    setTrackTitle(preset.title);
    setPrompt(preset.prompt);
    setModel(preset.model);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !activeTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const playSavedTrack = (track: StoredSoundtrack) => {
    try {
      const byteCharacters = atob(track.audioData);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: track.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      setActiveTrack({
        id: track.id,
        title: track.title,
        audioUrl,
        audioBase64: track.audioData,
        mimeType: track.mimeType || 'audio/wav',
        prompt: track.prompt,
        model: track.model,
        lyrics: track.lyrics
      });

      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } catch (e) {
      console.error('Failed to load saved track:', e);
    }
  };

  const handleDeleteSaved = async (trackId: string) => {
    if (!userId) return;
    try {
      await deleteSoundtrackFromFirestore(userId, trackId);
      if (activeTrack?.id === trackId) {
        if (audioRef.current) audioRef.current.pause();
        setActiveTrack(null);
        setIsPlaying(false);
      }
    } catch (e) {
      console.warn('Failed to delete track:', e);
    }
  };

  const handleDownload = () => {
    if (!activeTrack) return;
    const a = document.createElement('a');
    a.href = activeTrack.audioUrl;
    a.download = `${activeTrack.title.toLowerCase().replace(/\s+/g, '_')}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF9F5] border border-[#E6E3DC] w-full max-w-4xl h-[90vh] max-h-[860px] shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Hidden HTML Audio element */}
        <audio
          ref={audioRef}
          onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
          onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#E6E3DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1A1917] flex items-center justify-center text-white">
              <Disc3 className={`w-5 h-5 text-[#C25E3B] ${isPlaying ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-xl text-[#1A1917] font-medium leading-none">
                  Residential Soundtrack Studio
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#F1DBD2] text-[#8C3A1E] uppercase tracking-wider">
                  Lyria AI
                </span>
              </div>
              <p className="text-xs text-[#75716B] mt-1">
                Compose custom ambient property soundtracks via Google Lyria models
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#75716B] hover:text-[#1A1917] hover:bg-[#F3F1EC] transition-colors cursor-pointer rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Preset curation buttons */}
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-[#75716B] block mb-3">
              Manchester Curated Themes
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MUSIC_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`p-3.5 text-left border transition-all cursor-pointer ${
                    trackTitle === preset.title
                      ? 'bg-white border-[#C25E3B] shadow-sm'
                      : 'bg-[#F9F8F5] border-[#E6E3DC] hover:border-[#A8A29E]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-[#1A1917]">{preset.title}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#EBE7DF] text-[#57534E]">
                      {preset.vibe}
                    </span>
                  </div>
                  <p className="text-xs text-[#75716B] line-clamp-2 leading-relaxed">
                    {preset.prompt}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Generator Controls */}
          <div className="bg-white border border-[#E6E3DC] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#75716B] block">
                  Track Title
                </label>
                <input
                  type="text"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  className="mt-1 px-3 py-2 text-sm bg-[#FAF9F5] border border-[#E6E3DC] text-[#1A1917] w-full sm:w-80 focus:outline-none focus:border-[#1A1917]"
                  placeholder="e.g. Lapwing Lane Morning Calm"
                />
              </div>

              {/* Model Choice: lyria-3-clip-preview vs lyria-3-pro-preview */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-[#75716B] block">
                  Generation Format & Model
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setModel('lyria-3-clip-preview')}
                    className={`px-3 py-2 text-xs font-medium border cursor-pointer transition-colors ${
                      model === 'lyria-3-clip-preview'
                        ? 'bg-[#1A1917] text-white border-[#1A1917]'
                        : 'bg-[#FAF9F5] text-[#57534E] border-[#E6E3DC] hover:border-[#1A1917]'
                    }`}
                  >
                    30s Clip (lyria-3-clip-preview)
                  </button>
                  <button
                    type="button"
                    onClick={() => setModel('lyria-3-pro-preview')}
                    className={`px-3 py-2 text-xs font-medium border cursor-pointer transition-colors ${
                      model === 'lyria-3-pro-preview'
                        ? 'bg-[#1A1917] text-white border-[#1A1917]'
                        : 'bg-[#FAF9F5] text-[#57534E] border-[#E6E3DC] hover:border-[#1A1917]'
                    }`}
                  >
                    Full Track (lyria-3-pro-preview)
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider font-semibold text-[#75716B] block mb-1">
                Audio Prompt & Instrumentation
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full p-3 text-sm bg-[#FAF9F5] border border-[#E6E3DC] text-[#1A1917] focus:outline-none focus:border-[#1A1917]"
                placeholder="Describe instruments, mood, acoustic environment, tempo..."
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-[#A8A29E] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C25E3B]" />
                Powered by Google Lyria Native Audio Streaming
              </span>

              <button
                type="button"
                onClick={() => handleGenerate()}
                disabled={isGenerating || !prompt.trim()}
                className="px-6 py-2.5 bg-[#1A1917] hover:bg-[#C25E3B] text-white text-sm font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Audio via {model}...</span>
                  </>
                ) : (
                  <>
                    <Music className="w-4 h-4" />
                    <span>Generate Soundtrack</span>
                  </>
                )}
              </button>
            </div>

            {generationError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{generationError}</span>
              </div>
            )}
          </div>

          {/* Active Audio Player Deck */}
          {activeTrack && (
            <div className="bg-[#1A1917] text-white p-5 space-y-4 shadow-lg border border-stone-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-full bg-[#C25E3B] hover:bg-[#A84F30] flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 shadow-md"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div>
                    <h4 className="font-editorial text-lg text-white font-medium">
                      {activeTrack.title}
                    </h4>
                    <p className="text-xs text-stone-400 font-mono">
                      Engine: {activeTrack.model} · Format: {activeTrack.mimeType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {userId && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                      <BookmarkCheck className="w-3.5 h-3.5" /> Synced to Firestore
                    </span>
                  )}
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download WAV</span>
                  </button>
                </div>
              </div>

              {/* Scrubber Progress Bar */}
              <div className="space-y-1">
                <div 
                  className="w-full bg-stone-800 h-2 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    if (audioRef.current && duration > 0) {
                      audioRef.current.currentTime = ratio * duration;
                    }
                  }}
                >
                  <div 
                    className="bg-[#C25E3B] h-full transition-all"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>{Math.floor(currentTime)}s</span>
                  <span>{Math.floor(duration)}s</span>
                </div>
              </div>

              {activeTrack.lyrics && (
                <div className="p-3 bg-stone-900 border border-stone-800 text-xs text-stone-300 italic">
                  "{activeTrack.lyrics}"
                </div>
              )}
            </div>
          )}

          {/* User's Synced Soundtracks in Firestore */}
          {savedSoundtracks.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#75716B] block mb-3 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                My Synced Soundtracks ({savedSoundtracks.length})
              </span>
              <div className="space-y-2">
                {savedSoundtracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-3 bg-white border border-[#E6E3DC] flex items-center justify-between gap-3 hover:border-[#1A1917] transition-colors"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <button
                        onClick={() => playSavedTrack(track)}
                        className="w-8 h-8 rounded-full bg-[#1A1917] hover:bg-[#C25E3B] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                      <div className="truncate">
                        <p className="text-sm font-medium text-[#1A1917] truncate">{track.title}</p>
                        <p className="text-[11px] text-[#75716B] truncate">{track.prompt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-[#A8A29E] font-mono">
                        {track.model === 'lyria-3-pro-preview' ? 'Pro Track' : 'Clip (30s)'}
                      </span>
                      {userId && (
                        <button
                          onClick={() => handleDeleteSaved(track.id)}
                          className="p-1.5 text-[#A8A29E] hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete from Firestore"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
