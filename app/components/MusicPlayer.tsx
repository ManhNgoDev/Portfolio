"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

const playList = [
    { name: "Đông Miên", src: "/musics/Đông_Miên.mp3" },
    { name: "Tháp Rơi Tự Do", src: "/musics/Tháp_Rơi_Tự_Do.mp3" },
    { name: "Tiểu Nạp", src: "/musics/Tiểu_Nạp.mp3" }
];

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [open, setOpen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Use a ref to always have the latest `playing` value inside effects
    const playingRef = useRef(playing);
    useEffect(() => {
        playingRef.current = playing;
    }, [playing]);

    const current = playList[index];

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    };

    const next = () => setIndex(i => (i + 1) % playList.length);
    const prev = () => setIndex(i => (i - 1 + playList.length) % playList.length);

    // FIX 1: Handle track changes — reset progress and conditionally play
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.src = current.src;
        audio.load();
        setProgress(0); // FIX 3: Reset progress bar on track change

        if (playingRef.current) {
            audio.play().catch(() => { });
        }
    }, [index]); // FIX 2: `playing` intentionally excluded; read via ref to avoid stale closure

    // FIX 1: Mount effect — autoplay with fade-in, no `autoPlay` attr on <audio>
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const startMusic = async () => {
            try {
                audio.volume = 0;
                await audio.play();

                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.05, 1);
                    if (audio) audio.volume = vol;
                    if (vol >= 1) clearInterval(fade);
                }, 120);
            } catch {
                console.log("Autoplay blocked — waiting for user interaction.");
            }
        };

        startMusic();
    }, []); // runs once on mount only

    const updateProgress = () => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        setProgress((audio.currentTime / audio.duration) * 100);
    };

    // FIX 4: Cast value to Number before arithmetic
    const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        audio.currentTime = (Number(e.target.value) / 100) * audio.duration;
    };

    return (
        <>
            {/* FLOAT DISC */}
            {/* FIX 5: Use inline style for spin animation instead of non-existent Tailwind class */}
            <div
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full
                    bg-gradient-to-br from-neutral-800 to-black
                    border border-white/20 flex items-center justify-center
                    cursor-pointer shadow-2xl z-50 hover:scale-110 transition"
            >
                <div style={playing ? { animation: "spin 3s linear infinite" } : {}}>
                    <img src="/icons/vinyl-record.png" alt="vinyl" />
                </div>
            </div>

            {/* GLASS PANEL */}
            {open && (
                <div className="fixed bottom-24 right-6 w-80
                    bg-white/10 backdrop-blur-2xl
                    border border-white/20
                    rounded-3xl p-6 text-white
                    shadow-[0_0_40px_rgba(255,255,255,0.15)]
                    z-50">

                    <h3 className="text-xl font-semibold">Now Playing</h3>
                    <p className="text-sm text-white/70 mt-1">{current.name}</p>

                    <div className="mt-5">
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={progress}
                            onChange={seek}
                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                        />
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-6">
                        <button
                            onClick={prev}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <SkipBack size={20} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="p-4 rounded-full bg-white text-black hover:scale-110 transition shadow-xl"
                        >
                            {playing ? <Pause size={26} /> : <Play size={26} />}
                        </button>

                        <button
                            onClick={next}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <SkipForward size={20} />
                        </button>
                    </div>

                    <div className="mt-6 space-y-2 max-h-32 overflow-y-auto">
                        {playList.map((track, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`p-3 rounded-xl cursor-pointer text-sm transition
                                    ${i === index ? "bg-white/25" : "hover:bg-white/10"}`}
                            >
                                {track.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FIX 1: Removed `autoPlay` — handled entirely by useEffect */}
            <audio
                ref={audioRef}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={updateProgress}
                onEnded={next}
            />

            {/* FIX 5: Define spin keyframe globally */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}