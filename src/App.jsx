import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, ArrowLeft, Star, Cloud, Music } from 'lucide-react';

// ==========================================
// ⚙️ 1. CONFIGURATION & DATA (Chỉnh Text & Ảnh ở đây)
// ==========================================
const CONFIG = {
  BGM_URL: "https://cdn.pixabay.com/audio/2026/03/09/audio_4e7712178b.mp3",
  DATA: {
    "e": {
      "eventTitle": "Thiệp mời 8/3",
      "hostMessage": "Chào đằng ấy! Rất vui vì có bạn trong buổi gặp mặt này. Hy vọng chúng ta sẽ có thật nhiều kỷ niệm siêu cấp đáng yêu cùng nhau nhé! 🐹💖"
    },
    "g": [
    {"id":"999","name":"Nguyễn Thị Thanh Tâm","imageUrl":"https://i.ibb.co/8gJGkCcs/IMG-0528.jpg","wishes":"Chúc cô Tâm và gia đình nhiều sức khoẻ, gặp may mắn trong công việc và có nhiều học sinh đạt kết quả cao."},
    {"id":"3","name":"Trần Thị Nguyệt Anh","imageUrl":"https://i.ibb.co/VpjzjzZF/Nguy-t-Anh-17-07-2008.jpg","wishes":"Chúc Nguyệt Anh luôn giữ nụ cười rạng rỡ và gặp thật nhiều điều may mắn trong chặng đường phía trước."},
    {"id":"4","name":"Tạ Trần Ánh","imageUrl":"https://i.ibb.co/rRtHqtx6/Tr-n-nh-15-07-2008.jpg","wishes":"Chúc Ánh luôn tỏa sáng theo cách riêng của mình và có thật nhiều trải nghiệm đáng nhớ."},
    {"id":"7","name":"Nguyễn Dương Ngọc Bích","imageUrl":"https://i.ibb.co/B24j37ht/Duong-Bich-13-11-2008.jpg","wishes":"Chúc Ngọc Bích luôn tràn đầy năng lượng tích cực và đạt được những mục tiêu mà bạn mong muốn."},
    {"id":"8","name":"Nguyễn Thị Ngọc Bích","imageUrl":"https://i.ibb.co/RGqtNpHG/Ng-c-B-ch-12-02-2008.png","wishes":"Chúc Ngọc Bích có thật nhiều niềm vui, nhiều khoảnh khắc đáng nhớ và luôn được mọi người yêu quý."},
    {"id":"17","name":"Nguyễn Ngọc Hân","imageUrl":"https://i.ibb.co/7td1wJkc/Ng-c-H-n-18-12-2008.jpg","wishes":"Chúc Ngọc Hân luôn tự tin, mạnh mẽ và đạt được những điều tuyệt vời trong cuộc sống."},
    {"id":"19","name":"Trần Thị Lan Hương","imageUrl":"https://i.ibb.co/qLQ15pmh/H-ng-10-02-2008.jpg","wishes":"Chúc Lan Hương luôn dịu dàng, hạnh phúc và gặp nhiều may mắn trên mọi hành trình."},
    {"id":"21","name":"Lê Khanh","imageUrl":"https://i.ibb.co/kVqFWR9y/L-Khanh-26-08-2008.jpg","wishes":"Chúc Khanh luôn giữ được tinh thần lạc quan và có thêm nhiều cơ hội thú vị phía trước."},
    {"id":"24","name":"Lê Thùy Linh","imageUrl":"https://i.ibb.co/HTgxPqQy/605174454-889209313602364-2277133441736652076-n.jpg","wishes":"Chúc Thùy Linh luôn tỏa sáng với cá tính riêng và có thật nhiều niềm vui mỗi ngày."},
    {"id":"27","name":"Mai Khánh Ly","imageUrl":"https://i.ibb.co/Qq72RrB/Kh-nh-Ly-12-10-2008.jpg","wishes":"Chúc Khánh Ly luôn vui vẻ, học tốt và gặp nhiều điều tốt đẹp trong thời gian tới."},
    {"id":"28","name":"Lê Thị Mai","imageUrl":"https://i.ibb.co/qYgxhtSR/maile-25-10-2008.jpg","wishes":"Chúc Mai luôn giữ được sự ấm áp và có thêm nhiều kỷ niệm đáng nhớ với mọi người."},
    {"id":"29","name":"Trần Hoàng Mai","imageUrl":"https://i.ibb.co/9kbpmZyG/Hoang-Mai-16-03-2008.jpg","wishes":"Chúc Hoàng Mai luôn mạnh mẽ theo đuổi ước mơ và có thật nhiều niềm vui trong cuộc sống."},
    {"id":"31","name":"Nguyễn Đức Minh","imageUrl":"https://i.ibb.co/gMszzG4j/c-Minh-3-7-2008.jpg","wishes":"Chúc Đức Minh luôn bản lĩnh, thành công trong những dự định và giữ được tinh thần tích cực."},
    {"id":"32","name":"Lê Nguyễn Trà My","imageUrl":"https://i.ibb.co/996PqnLZ/Lee-My-14-01-2008.jpg","wishes":"Chúc Trà My luôn rạng rỡ, hạnh phúc và có thật nhiều khoảnh khắc đáng nhớ."},
    {"id":"33","name":"Nguyễn Thị Trà My","imageUrl":"https://i.ibb.co/1fcMTvjC/Tr-My-09-02-2008.jpg","wishes":"Chúc Trà My luôn giữ được sự dễ thương và đạt được nhiều thành công trong học tập."},
    {"id":"34","name":"Nguyễn Thị Trà My","imageUrl":"https://i.ibb.co/3mx2RHYL/Tr-My-12-02-2008.jpg","wishes":"Chúc Trà My luôn tự tin, vui vẻ và gặp thật nhiều điều may mắn phía trước."},
    {"id":"35","name":"Chu Việt Nga","imageUrl":"https://i.ibb.co/PGYhD4Xz/T-i-l-Nga-26-02-2008.jpg","wishes":"Chúc Việt Nga luôn tỏa sáng với sự thông minh và có nhiều niềm vui trong mọi hành trình."},
    {"id":"39","name":"Đỗ Thị Khánh Nhi","imageUrl":"https://i.ibb.co/20MGBzBV/IMG-8564.jpg","wishes":"Chúc Khánh Nhi luôn vui vẻ, gặp nhiều may mắn, thành công với con đường mình chọn"},
    {"id":"44","name":"Võ Thị Phương Thảo","imageUrl":"https://i.ibb.co/C5YcL5bW/Ph-ng-Th-o-18-11-2008.jpg","wishes":"Chúc Phương Thảo luôn mạnh mẽ, tự tin và có thật nhiều kỷ niệm đẹp phía trước."}
    ]
  }
};

// ==========================================
// 🎛️ 2. AUDIO & BEAT CONFIG
// ==========================================
const AUDIO_CONFIG = {
  BASS_THRESHOLD: 0.85,    
  BASS_POWER_CURVE: 2.5,   
  LED_BASE_SPEED: 0.4,    
  LED_BEAT_BOOST: 2.7,     
  SMOOTH_ATTACK: 0.35,     
  SMOOTH_DECAY: 0.05,      
  MAX_FRAME_SCALE: 0.08,   // Vừa đủ nhẹ
  MAX_IMAGE_SCALE: 0.1,    
  MAX_BG_PULSE: 0.15       
};

// ==========================================
// COMPONENT PHỤ (Effects, Background, Visualizers)
// ==========================================
const CapCutStyleText = ({ text, delay = 120 }) => {
  const words = text.split(' ');
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= words.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <div className="flex flex-wrap justify-center gap-x-[5px] gap-y-1 relative z-20">
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block font-bold transition-all duration-400 ${
            i < visibleCount 
              ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
              : 'opacity-0 scale-50 translate-y-4 -rotate-6'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

const SakuraRain = () => {
  const petals = Array.from({ length: 7 }); // Tối ưu: 7 cánh
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((_, i) => (
        <div
          key={i}
          className="absolute bg-gradient-to-br from-pink-200 to-pink-100 rounded-[100%_0_100%_100%] animate-sakura-fall opacity-80"
          style={{
            width: `${Math.random() * 8 + 6}px`,
            height: `${Math.random() * 8 + 6}px`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 6}s`,
            animationDelay: `-${Math.random() * 6}s`
          }}
        />
      ))}
    </div>
  );
};

const AnimatedSkyBackground = () => {
  const floatingItems = Array.from({ length: 10 }); // Tối ưu: 10 items
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden aurora-bg z-0 dynamic-bg">
      <div className="absolute inset-0 polka-dot-bg opacity-50"></div>
      
      <div className="light-leak bg-pink-400/20 w-[150vw] h-[20vh] top-[20%] -rotate-45"></div>
      <div className="light-leak bg-rose-300/15 w-[150vw] h-[15vh] top-[60%] rotate-45 delay-1000"></div>

      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(249,168,212,0.4)_0%,transparent_70%)] animate-blob bg-beat-sync"></div>
      <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(253,230,138,0.4)_0%,transparent_70%)] animate-blob animation-delay-2000 bg-beat-sync"></div>

      {floatingItems.map((_, i) => {
        const type = i % 4;
        return (
          <div
            key={i}
            className={`absolute animate-float-sky ${type === 0 ? 'opacity-40' : type === 1 ? 'opacity-80' : 'opacity-80 text-2xl drop-shadow-sm'}`}
            style={{
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 120}vh`,
              animationDuration: `${Math.random() * 12 + 15}s`,
              animationDelay: `-${Math.random() * 15}s`,
              transform: `scale(${Math.random() * 0.8 + 0.5})`
            }}
          >
            {/* Giữ nguyên bg-beat-sync và beat-star cho visual đã mắt */}
            <div className="bg-beat-sync">
              {type === 0 && <Cloud className="text-white fill-white w-12 h-12" />}
              {type === 1 && <Star className="text-yellow-100 fill-yellow-100 w-4 h-4 beat-star" />}
              {type === 2 && (['🐹', '🌻', '🌸', '✨'][Math.floor(Math.random() * 4)])}
              {type === 3 && <Sparkles className="text-pink-300 w-6 h-6 opacity-60" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ClickRippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleInteraction = (e) => {
      if(e.target.closest('button') || e.target.closest('input')) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const newRipple = {
        id: Date.now(),
        x: clientX, y: clientY,
        emoji: ['💖', '✨', '🌸', '🐹', '🎀'][Math.floor(Math.random() * 5)]
      };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 1000);
    };

    window.addEventListener('touchstart', handleInteraction, {passive: true});
    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {ripples.map(r => (
        <div 
          key={r.id} 
          className="absolute text-[1.8rem] animate-ripple-pop drop-shadow-md"
          style={{ left: r.x - 15, top: r.y - 15, willChange: 'transform, opacity' }}
        >
          {r.emoji}
        </div>
      ))}
    </div>
  );
};

const BigAudioWave = ({ isPlaying }) => {
  const bars = [7, 6, 5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className={`absolute bottom-0 left-0 w-full h-[50px] flex items-end justify-center gap-[4px] px-6 pointer-events-none z-0 transition-opacity duration-700 ${isPlaying ? 'opacity-40' : 'opacity-0'}`}>
      {bars.map((binIndex, i) => (
        <div 
          key={i} 
          className="w-[10px] bg-gradient-to-t from-[#ff0844] to-[#ffb199] rounded-t-full shadow-[0_0_8px_rgba(255,8,68,0.6)] origin-bottom vis-bar-fallback"
          style={{ 
            height: '100%',
            transform: `scaleY(calc(0.05 + var(--bar-${binIndex}, 0) * 0.95))`,
            willChange: 'transform'
          }}
        ></div>
      ))}
    </div>
  );
};

// ==========================================
// CHƯƠNG TRÌNH CHÍNH (MAIN APP)
// ==========================================
export default function App() {
  const [step, setStep] = useState(1);
  const [guestId, setGuestId] = useState('');
  const [guestInfo, setGuestInfo] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [mascotState, setMascotState] = useState('normal'); 
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioContextRef = useRef(null);
  const audioRef = useRef(null);
  const analyzerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous"; 
    audio.src = CONFIG.BGM_URL;
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, []);

  const initAudioAnalyzer = async () => {
    if (analyzerRef.current) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
      const ctx = audioContextRef.current;
      
      // Fix iOS Safari triệt để: Await resume()
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const source = ctx.createMediaElementSource(audioRef.current);
      const analyzer = ctx.createAnalyser();
      
      analyzer.fftSize = 64; 
      source.connect(analyzer);
      analyzer.connect(ctx.destination);
      
      analyzerRef.current = analyzer;
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      const freqBins = [0, 1, 2, 4, 6, 9, 12, 16];

      let currentLedAngle = 0;
      let currentLedSpeed = AUDIO_CONFIG.LED_BASE_SPEED; 
      let smoothedGlow = 0;

      const analyzeLoop = () => {
        rafRef.current = requestAnimationFrame(analyzeLoop);
        analyzer.getByteFrequencyData(dataArray);
        
        let bassSum = 0;
        for(let i = 0; i < 3; i++) bassSum += dataArray[i];
        let rawBass = (bassSum / 3) / 255; 
        
        let cleanBass = Math.max(0, rawBass - AUDIO_CONFIG.BASS_THRESHOLD); 
        cleanBass = cleanBass * (1 / (1 - AUDIO_CONFIG.BASS_THRESHOLD)); 
        let sharpIntensity = Math.pow(cleanBass, AUDIO_CONFIG.BASS_POWER_CURVE); 
        
        if (sharpIntensity > smoothedGlow) {
            smoothedGlow += (sharpIntensity - smoothedGlow) * AUDIO_CONFIG.SMOOTH_ATTACK; 
        } else {
            smoothedGlow += (sharpIntensity - smoothedGlow) * AUDIO_CONFIG.SMOOTH_DECAY; 
        }

        let targetSpeed = AUDIO_CONFIG.LED_BASE_SPEED + (sharpIntensity * AUDIO_CONFIG.LED_BEAT_BOOST);
        currentLedSpeed += (targetSpeed - currentLedSpeed) * 0.15; 
        currentLedAngle = (currentLedAngle + currentLedSpeed) % 360;

        // KIẾN TRÚC HYBRID: Dùng lại CSS Variable như bản gốc (Sạch, dễ maintain)
        document.documentElement.style.setProperty('--beat-glow', sharpIntensity);
        document.documentElement.style.setProperty('--beat-smooth', smoothedGlow);
        document.documentElement.style.setProperty('--led-angle', `${currentLedAngle}deg`);
        
        for(let i = 0; i < 8; i++) {
          document.documentElement.style.setProperty(`--bar-${i}`, dataArray[freqBins[i]] / 255);
        }
      };
      analyzeLoop();
      
    } catch (err) {
      console.log("Audio analyzer fallback:", err);
      document.documentElement.classList.add('audio-fallback');
    }
  };

  const handleOpen = async () => {
    if (isLoading) return;
    const trimmedId = guestId.trim();
    const normalizedId = trimmedId.replace(/^0+/, ''); 
    const guest = CONFIG.DATA.g.find((item) => item.id === trimmedId || item.id === normalizedId);

    // Xử lý Audio chuẩn Safari (Await play & analyzer)
    if (audioRef.current && audioRef.current.paused) {
      try {
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContext();
        }
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        await initAudioAnalyzer();
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.log("Audio play prevented/Error:", e);
      }
    }

    if (guest) {
      setIsError(false);
      setIsLoading(true);
      setMascotState('happy');

      const img = new Image();
      img.src = guest.imageUrl;
      
      img.onload = () => {
        setIsLoading(false);
        setGuestInfo(guest);
        setStep(2);
      };
      img.onerror = () => {
        setIsLoading(false);
        setGuestInfo(guest);
        setStep(2);
      };

    } else {
      setIsError(true);
      setMascotState('surprised');
      if (navigator.vibrate) navigator.vibrate(200); // Giữ haptic feedback
      setTimeout(() => {
        setIsError(false);
        setMascotState('normal');
      }, 1000);
    }
  };

  const handleBack = () => {
    setStep(1);
    setGuestId('');
    setGuestInfo(null);
    setMascotState('normal');
  };

  const pokeMascot = () => {
    setMascotState('happy');
    if (navigator.vibrate) navigator.vibrate(50); // Giữ haptic feedback cute
    setTimeout(() => setMascotState('normal'), 800);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&family=Pangolin&display=swap');
        
        :root { 
          --beat-glow: 0;
          --beat-smooth: 0;
          --led-angle: 0deg;
        }

        body {
          margin: 0;
          font-family: 'Nunito', sans-serif;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-y; 
          -webkit-font-smoothing: antialiased;
        }

        .font-handwriting { font-family: 'Pangolin', cursive; }
        
        .aurora-bg {
          background: linear-gradient(135deg, #ffd1dc 0%, #fff0f5 30%, #e0f7fa 60%, #ffecd2 100%);
          background-size: 200% 200%;
          animation: auroraFlow 15s ease infinite;
        }
        
        /* Trả lại hiệu ứng nền thở theo beat */
        .dynamic-bg {
          transform: scale(calc(1 + var(--beat-smooth) * 0.05)) translateY(calc(var(--beat-smooth) * -15px));
          will-change: transform;
        }

        .bg-beat-sync {
          transform: scale(calc(1 + var(--beat-smooth) * ${AUDIO_CONFIG.MAX_BG_PULSE}));
          will-change: transform;
        }

        .polka-dot-bg {
          background-image: radial-gradient(rgba(255, 182, 193, 0.4) 2px, transparent 2px);
          background-size: 24px 24px;
        }

        @keyframes auroraFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .breathing-wrapper {
          animation: cardBreathing 4s ease-in-out infinite;
          width: 100%;
          display: flex;
          justify-content: center;
          transform: scale(0.8);
          transform-origin: center center;
        }
        @keyframes cardBreathing {
          0%, 100% { transform: scale(0.75) translateY(0); }
          50% { transform: scale(0.75) translateY(-12px); }
        }

        .card-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 355px; 
        }

        /* LED MƯỢT: Không animate conic-gradient, dùng transform: rotate thay thế */
        .led-mask {
          position: absolute;
          inset: -4px; 
          border-radius: 48px;
          overflow: hidden;
          z-index: -1;
          box-shadow: 0 0 calc(15px + var(--beat-glow) * 20px) rgba(255, 8, 68, calc(0.3 + var(--beat-glow)*0.4));
          will-change: box-shadow;
        }

        .cute-halo {
          position: absolute;
          inset: -50%;
          border-radius: 50%;
          background: conic-gradient(from 0deg, 
             transparent 0%, 
             rgba(255,8,68,1) 15%, rgba(255,8,68,1) 25%, 
             transparent 40%, transparent 50%, 
             rgba(188,42,255,1) 65%, rgba(0,242,254,1) 75%, 
             transparent 90%);
          transform: rotate(var(--led-angle));
          filter: blur(8px) brightness(calc(1 + var(--beat-glow) * 1.5));
          opacity: calc(0.7 + var(--beat-glow) * 0.3);
          will-change: transform, filter, opacity;
        }

        /* Fallback đầy đủ, xịn như cũ */
        .audio-fallback .cute-halo {
          animation: fallbackSpin 3s linear infinite, fallbackPulse 0.5s alternate infinite !important;
        }
        @keyframes fallbackSpin { 100% { transform: rotate(360deg); } }
        @keyframes fallbackPulse {
          0% { filter: blur(8px) brightness(1); opacity: 0.6; }
          100% { filter: blur(8px) brightness(1.5); opacity: 1; }
        }
        
        .audio-fallback .vis-bar-fallback { animation: fallbackWave 0.8s ease-in-out infinite alternate; }
        .audio-fallback .vis-bar-fallback:nth-child(2n) { animation-delay: 0.2s; }
        .audio-fallback .vis-bar-fallback:nth-child(3n) { animation-delay: 0.4s; }
        .audio-fallback .vis-bar-fallback:nth-child(4n) { animation-delay: 0.6s; }
        @keyframes fallbackWave {
          0% { transform: scaleY(0.1); }
          100% { transform: scaleY(1); }
        }

        /* Trả lại panel blur và glow xịn xò */
        .pillow-panel {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          border-radius: 45px;
          border: 4px solid #fff;
          box-shadow: inset 0 0 calc(20px + var(--beat-smooth) * 20px) rgba(255, 8, 68, calc(0.05 + var(--beat-smooth) * 0.15));
          overflow: hidden;
          position: relative;
        }

        /* Khung ảnh nghiêng & phồng cực nghệ */
        .frame-beat {
          transform: scale(calc(1 + var(--beat-smooth) * ${AUDIO_CONFIG.MAX_FRAME_SCALE})) rotate(-2deg);
          will-change: transform;
        }
        
        .frame-beat img {
          transform: scale(calc(1 + var(--beat-smooth) * ${AUDIO_CONFIG.MAX_IMAGE_SCALE}));
          will-change: transform;
          transition: transform 0.05s ease-out; 
        }

        .name-beat {
          text-shadow: 0 0 calc(var(--beat-smooth) * 15px) rgba(255, 8, 68, 0.6);
          will-change: text-shadow;
        }

        /* Trả lại hiệu ứng nhấp nháy sao */
        .beat-star {
          opacity: calc(0.4 + var(--beat-smooth) * 0.6);
        }

        .mascot-bop {
          transform: translateX(-50%) translateY(calc(var(--beat-glow) * -12px)) scale(calc(1 + var(--beat-glow) * 0.08));
          will-change: transform;
        }

        .light-leak {
          position: absolute;
          left: -200%;
          filter: blur(40px);
          animation: leakSweep 6s linear infinite;
          mix-blend-mode: overlay;
          z-index: 1;
        }
        @keyframes leakSweep {
          0%, 10% { left: -200%; opacity: 0; }
          20% { opacity: 0.6; }
          30%, 100% { left: 200%; opacity: 0; }
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 0;
        }

        .glass-glare {
          position: absolute;
          top: 0; left: -150%;
          width: 60%; height: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
          transform: skewX(-25deg);
          animation: glareSweep 4.5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          z-index: 5;
          pointer-events: none;
        }
        @keyframes glareSweep {
          0% { left: -150%; }
          40%, 100% { left: 200%; }
        }

        @keyframes sakuraFall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate3d(30vw, 110vh, 0) rotate(360deg) scale(0.6); opacity: 0; }
        }
        .animate-sakura-fall { animation: sakuraFall linear infinite forwards; }

        .bubbly-input {
          border-radius: 40px;
          background: #fff5f8;
          box-shadow: inset 0 6px 15px rgba(255, 182, 193, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 10;
        }
        .bubbly-input:focus {
          transform: scale(1.05);
          box-shadow: inset 0 6px 15px rgba(255, 182, 193, 0.1), 0 0 0 4px rgba(255, 182, 193, 0.4);
        }

        .polaroid-float-wrapper {
          animation: floatImage 4s ease-in-out infinite;
          position: relative;
          overflow: visible;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }
        @keyframes floatImage {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes floatSky {
          0% { transform: translateY(0) scale(var(--tw-scale-x, 1)) rotate(0deg); opacity: 0; }
          10% { opacity: var(--tw-opacity, 0.8); }
          90% { opacity: var(--tw-opacity, 0.8); }
          100% { transform: translateY(-120vh) scale(var(--tw-scale-x, 1)) rotate(20deg); opacity: 0; }
        }
        .animate-float-sky { animation: floatSky linear infinite forwards; }

        @keyframes ripplePop {
          0% { transform: scale(0.3) translateY(0) rotate(-10deg); opacity: 1; }
          40% { transform: scale(1.8) translateY(-30px) rotate(10deg); opacity: 1; }
          100% { transform: scale(2.5) translateY(-60px) rotate(20deg); opacity: 0; }
        }
        .animate-ripple-pop { animation: ripplePop 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-3px, 0, 0) rotate(-2deg); }
          20%, 80% { transform: translate3d(5px, 0, 0) rotate(2deg); }
          30%, 50%, 70% { transform: translate3d(-8px, 0, 0) rotate(-4deg); }
          40%, 60% { transform: translate3d(8px, 0, 0) rotate(4deg); }
        }

        .bounce-mascot { animation: bounceMascot 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes bounceMascot {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.15); }
        }

        .btn-pulse { animation: btnPulse 2s infinite; }
        @keyframes btnPulse {
          0%, 100% { box-shadow: 0 8px 0 #d81b60, 0 15px 25px rgba(255,105,180,0.4), 0 0 0 rgba(255,105,180,0); }
          50% { box-shadow: 0 8px 0 #d81b60, 0 15px 25px rgba(255,105,180,0.4), 0 0 20px rgba(255,105,180,0.6); }
        }

        .cute-scrollbar::-webkit-scrollbar { width: 5px; }
        .cute-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .cute-scrollbar::-webkit-scrollbar-thumb { background: #ffb6c1; border-radius: 10px; }
        
        .delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        
        .panel-enter { opacity: 1; pointer-events: auto; }
        .panel-hidden { opacity: 0; pointer-events: none; }
      `}} />

      <main className="relative w-screen h-screen overflow-hidden flex items-center justify-center p-4">
        <AnimatedSkyBackground />
        <SakuraRain />
        <ClickRippleEffect />

        {/* MÀN HÌNH 1: NHẬP ID */}
        <div 
          className={`absolute transition-all duration-[600ms] ease-in-out z-10 w-full flex justify-center ${
            step === 1 ? 'panel-enter' : 'panel-hidden'
          }`}
        >
          <div className="breathing-wrapper">
            <div className={`card-wrapper ${isError ? 'shake' : ''}`}>
              <div className="led-mask">
                <div className="cute-halo"></div>
              </div>
              
              <div 
                onClick={pokeMascot}
                className={`mascot-bop absolute -top-14 left-1/2 bg-white/95 p-3 rounded-full shadow-[0_15px_30px_rgba(255,182,193,0.6)] border-[5px] border-pink-100 cursor-pointer active:scale-90 z-30 ${mascotState === 'happy' ? 'bounce-mascot' : ''}`}
              >
                <div className="text-[3.2rem] leading-none drop-shadow-md flex items-center justify-center w-[55px] h-[55px]">
                  {mascotState === 'normal' ? '🐹' : mascotState === 'happy' ? '🐹✨' : '🐭💧'}
                </div>
              </div>
              
              <div className="pillow-panel p-7 pt-12 pb-14 flex flex-col items-center text-center">
                <div className="noise-overlay"></div>
                <div className="glass-glare"></div>
                
                <h1 className="font-handwriting text-[2.6rem] text-[#d81b60] font-bold mb-4 mt-3 drop-shadow-sm leading-tight relative z-10 flex items-center justify-center gap-1 name-beat">
                  {CONFIG.DATA.e.eventTitle}
                </h1>
                
                <div className="bg-pink-50/95 rounded-[1.5rem] p-4 mb-6 border-2 border-pink-100 relative shadow-inner z-10 w-full frame-beat">
                  <Sparkles className="absolute -top-3 -left-3 text-yellow-400 fill-yellow-400 w-6 h-6 animate-pulse drop-shadow-sm" />
                  <p className="text-rose-600 font-bold text-[15px] leading-relaxed tracking-wide">
                    {CONFIG.DATA.e.hostMessage}
                  </p>
                </div>

                <div className="w-full relative mb-7 z-10">
                  <input
                    type="text"
                    value={guestId}
                    onChange={(e) => setGuestId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
                    placeholder="Nhập số thứ tự của bạn"
                    disabled={isLoading}
                    className="bubbly-input w-full px-5 py-[16px] border-2 border-transparent text-center text-rose-600 font-extrabold text-[1rem] placeholder-pink-300 focus:outline-none"
                  />
                  {isError && (
                    <div className="absolute -bottom-8 left-0 w-full flex justify-center items-center gap-1 text-red-500 font-extrabold text-[14px] animate-pulse">
                      <span>❌ Ụa mã sai gòi, nhập lại nha!</span>
                    </div>
                  )}
                </div>

                <div className="text-[#d81b60] text-[0.85rem] font-bold mb-4 animate-pulse flex items-center justify-center gap-2 opacity-90 z-10 relative">
                  <span>🎧</span> Bật nhạc max ping để quẩy nhé! <span>🎶</span>
                </div>

                <button
                  onClick={handleOpen}
                  disabled={isLoading}
                  className="group relative flex items-center justify-center gap-3 px-6 py-[16px] bg-gradient-to-r from-[#ff0844] to-[#ff8da1] text-white font-bold text-[1.1rem] rounded-full btn-pulse hover:-translate-y-1 active:translate-y-2 active:shadow-[0_0px_0_#d81b60,0_5px_10px_rgba(255,105,180,0.5)] transition-all w-full disabled:opacity-80 disabled:transform-none z-10"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2 font-handwriting text-[1.3rem]">
                      Đợi xíu nha... 🏃💨
                    </span>
                  ) : (
                    <>
                      <Music size={20} className={`fill-white ${isPlaying ? 'animate-bounce' : ''}`} />
                      <span className="font-handwriting text-[1.4rem] mt-1 tracking-wide">Mở thiệp thui</span>
                      <Music size={20} className={`fill-white ${isPlaying ? 'animate-bounce' : ''}`} />
                    </>
                  )}
                </button>

                <BigAudioWave isPlaying={isPlaying} />
              </div>
            </div>
          </div>
        </div>

        {/* MÀN HÌNH 2: KẾT QUẢ */}
        <div 
          className={`absolute transition-all duration-[600ms] ease-out z-20 w-full flex justify-center ${
            step === 2 ? 'panel-enter' : 'panel-hidden'
          }`}
        >
          <div className="breathing-wrapper">
            <div className="card-wrapper">
              
              <div className="led-mask">
                <div className="cute-halo"></div>
              </div>
              
              <div className="pillow-panel p-6 pt-10 pb-12 flex flex-col items-center relative overflow-hidden">
                <div className="noise-overlay"></div>
                
                <button 
                  onClick={handleBack}
                  className="absolute top-4 left-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center text-[#ff69b4] shadow-[0_4px_10px_rgba(255,182,193,0.4)] border-2 border-pink-50 hover:bg-pink-50 active:scale-90 transition-all z-20"
                >
                  <ArrowLeft size={22} strokeWidth={4} />
                </button>

                <div className="polaroid-float-wrapper z-10 animate-[popIn_0.5s_0.1s_both]">
                  <div className="relative bg-white p-3 pb-8 rounded-2xl shadow-[0_15px_35px_rgba(255,105,180,0.3)] cursor-pointer group frame-beat">
                    <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[80px] h-[30px] bg-[rgba(255,182,193,0.85)] rounded-[4px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] z-10 -rotate-3 bg-[radial-gradient(rgba(255,255,255,0.6)_2px,transparent_2px)] bg-[length:10px_10px]"></div>
                    <div className="glass-glare"></div>
                    <div className="w-[180px] h-[200px] rounded-xl overflow-hidden bg-pink-50 border-2 border-dashed border-pink-200 flex items-center justify-center group-active:scale-95 transition-transform">
                      <img src={guestInfo?.imageUrl} alt="Guest" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-2 right-3 text-2xl rotate-12 group-hover:animate-spin">🎀</div>
                  </div>
                </div>

                <h2 className="font-handwriting text-[2.2rem] text-[#d81b60] font-bold mb-3 text-center leading-tight drop-shadow-sm relative z-10 animate-[popIn_0.5s_0.3s_both] flex items-center justify-center gap-2 name-beat">
                  {guestInfo?.name || "Bạn dễ thương"}
                </h2>
                
                <div className="w-full bg-[#fff5f8]/95 rounded-[1.5rem] p-5 border-2 border-white shadow-inner flex flex-col items-center relative h-auto min-h-[120px] max-h-[25vh] overflow-y-auto cute-scrollbar z-10 animate-[popIn_0.5s_0.5s_both] frame-beat">
                  <div className="text-[#c2185b] font-bold text-[1.1rem] leading-[1.6] text-center w-full">
                    {step === 2 && guestInfo && (
                      <CapCutStyleText text={guestInfo.wishes} delay={100} />
                    )}
                  </div>
                </div>
                
                <div className="mt-5 mb-2 flex gap-4 relative z-10 animate-[popIn_0.5s_0.6s_both] frame-beat">
                   <div className="w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center text-xl shadow-inner animate-bounce hover:scale-125 cursor-pointer transition-transform" style={{animationDelay: '0s'}}>🌸</div>
                   <div className="w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center text-xl shadow-inner animate-bounce hover:scale-125 cursor-pointer transition-transform" style={{animationDelay: '0.15s'}}>🐹</div>
                   <div className="w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center text-xl shadow-inner animate-bounce hover:scale-125 cursor-pointer transition-transform" style={{animationDelay: '0.3s'}}>🌻</div>
                </div>

                <BigAudioWave isPlaying={isPlaying} />
              </div>
            </div>
          </div>
        </div>
        
        {/* CREDIT FOOTER */}
        <div className="fixed bottom-3 left-0 w-full text-center text-[10px] text-[#ff69b4]/50 font-bold tracking-widest pointer-events-none z-50 mix-blend-multiply uppercase">
          © 2026 Hoang Long. All Rights Reserved.
        </div>
      </main>
    </>
  );
}