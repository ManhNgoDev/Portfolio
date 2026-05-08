"use client";

import { useEffect, useRef, useState } from "react";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Music2
} from "lucide-react";

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

    const current = playList[index];

    const togglePlay = () => {
        if (!audioRef.current) return;
        playing ? audioRef.current.pause() : audioRef.current.play();
        setPlaying(!playing);
    };

    const next = () => setIndex(i => (i + 1) % playList.length);
    const prev = () => setIndex(i => (i - 1 + playList.length) % playList.length);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.src = current.src;
        if (playing) audioRef.current.play();
    }, [index]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const startMusic = async () => {
            try {
                // bắt đầu với volume = 0 (browser cho phép autoplay)
                audio.volume = 0;
                await audio.play();

                // fade volume từ 0 → 1 (rất mượt)
                let vol = 0;
                const fade = setInterval(() => {
                    vol += 0.05;
                    if (audio) audio.volume = vol;

                    if (vol >= 1) clearInterval(fade);
                }, 120);

            } catch (err) {
                console.log("Autoplay bị chặn -> cần user click lần đầu");
            }
        };

        startMusic();
    }, []);

    const updateProgress = () => {
        if (!audioRef.current) return;
        const percent =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent || 0);
    };

    const seek = (e: any) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime =
            (e.target.value / 100) * audioRef.current.duration;
    };

    return (
        <>
            {/* FLOAT DISC */}
            <div
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full
        bg-gradient-to-br from-neutral-800 to-black
        border border-white/20 flex items-center justify-center
        cursor-pointer shadow-2xl z-50 hover:scale-110 transition"
            >
                <div className={playing ? "animate-spin-slow" : ""}>
                    <img src="/icons/vinyl-record.png" alt="" />
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

                    {/* TITLE */}
                    <h3 className="text-xl font-semibold">Now Playing</h3>
                    <p className="text-sm text-white/70 mt-1">{current.name}</p>

                    {/* PROGRESS BAR GLASS */}
                    <div className="mt-5">
                        <input
                            type="range"
                            value={progress}
                            onChange={seek}
                            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
              accent-white"
                        />
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center justify-center gap-6 mt-6">

                        <button
                            onClick={prev}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <SkipBack size={20} />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="p-4 rounded-full bg-white text-black
              hover:scale-110 transition shadow-xl"
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

                    {/* PLAYLIST */}
                    <div className="mt-6 space-y-2 max-h-32 overflow-y-auto">
                        {playList.map((track, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`p-3 rounded-xl cursor-pointer text-sm transition
                ${i === index
                                        ? "bg-white/25"
                                        : "hover:bg-white/10"}`}
                            >
                                {track.name}
                            </div>
                        ))}
                    </div>

                    <audio
                        ref={audioRef}
                        src={current.src}
                        autoPlay
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onTimeUpdate={updateProgress}
                        onEnded={next}
                    />
                </div>
            )}
        </>
    );
}