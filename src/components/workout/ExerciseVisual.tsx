import React from 'react';

interface ExerciseVisualProps {
  animationType:
    | 'jumping_jacks'
    | 'pushups'
    | 'squats'
    | 'plank'
    | 'crunches'
    | 'leg_raises'
    | 'wall_sit'
    | 'lunges'
    | 'cobra_stretch'
    | 'mountain_climbers';
  isPlaying?: boolean;
}

export const ExerciseVisual: React.FC<ExerciseVisualProps> = ({ animationType, isPlaying = true }) => {
  const playClass = isPlaying ? '' : '[animation-play-state:paused]';

  // Neon Glow Filter to make lines stand out
  const glowFilter = (
    <defs>
      <filter id="neon-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="neon-glow-lime" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  const renderSVGContent = () => {
    switch (animationType) {
      case 'jumping_jacks':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="185" x2="180" y2="185" stroke="#334155" strokeWidth="3" strokeDasharray="5,5" />
            
            {/* Torso & Head */}
            <circle cx="100" cy="70" r="12" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
            <line x1="100" y1="82" x2="100" y2="135" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />

            {/* Left Arm */}
            <line 
              x1="100" y1="90" x2="60" y2="60" 
              stroke="#a3e635" strokeWidth="7" strokeLinecap="round" 
              className={`anim-jack-arm-l ${playClass}`}
              filter="url(#neon-glow-lime)"
            />
            {/* Right Arm */}
            <line 
              x1="100" y1="90" x2="140" y2="60" 
              stroke="#a3e635" strokeWidth="7" strokeLinecap="round" 
              className={`anim-jack-arm-r ${playClass}`}
              filter="url(#neon-glow-lime)"
            />

            {/* Left Leg */}
            <line 
              x1="100" y1="135" x2="70" y2="185" 
              stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" 
              className={`anim-jack-leg-l ${playClass}`}
              filter="url(#neon-glow-cyan)"
            />
            {/* Right Leg */}
            <line 
              x1="100" y1="135" x2="130" y2="185" 
              stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" 
              className={`anim-jack-leg-r ${playClass}`}
              filter="url(#neon-glow-cyan)"
            />
          </>
        );

      case 'pushups':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="150" x2="180" y2="150" stroke="#334155" strokeWidth="3" />
            
            {/* Pushup Body Group */}
            <g className={`anim-pushup-body ${playClass}`} style={{ transformOrigin: '165px 142px' }}>
              {/* Head */}
              <circle cx="55" cy="85" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
              {/* Spine/Body */}
              <line x1="65" y1="92" x2="165" y2="142" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
              {/* Hips/Legs joint (represented in body line) */}
              
              {/* Upper Arms (shoulders to elbows) */}
              <line x1="85" y1="102" x2="75" y2="128" stroke="#a3e635" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            </g>

            {/* Forearm / Support (staying anchored to ground) */}
            <line x1="75" y1="128" x2="75" y2="150" stroke="#a3e635" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-lime)" className={`anim-pushup-arm-anchor ${playClass}`} />
            {/* Foot Anchor Point */}
            <circle cx="165" cy="142" r="5" fill="#475569" />
          </>
        );

      case 'squats':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="180" x2="180" y2="180" stroke="#334155" strokeWidth="3" />

            {/* Squat Group */}
            <g className={`anim-squat-torso ${playClass}`}>
              {/* Head */}
              <circle cx="85" cy="65" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
              {/* Torso */}
              <line x1="85" y1="76" x2="85" y2="125" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
              {/* Arms extended forward */}
              <line x1="85" y1="85" x2="125" y2="85" stroke="#a3e635" strokeWidth="6" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            </g>

            {/* Thigh (Hips to Knee) */}
            <line 
              x1="85" y1="125" x2="120" y2="145" 
              stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" 
              className={`anim-squat-thigh-l ${playClass}`}
              filter="url(#neon-glow-cyan)"
            />

            {/* Shin (Knee to Foot) */}
            <line 
              x1="120" y1="145" x2="110" y2="180" 
              stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" 
              className={`anim-squat-shin-l ${playClass}`}
              filter="url(#neon-glow-cyan)"
            />
          </>
        );

      case 'plank':
        return (
          <g className={`anim-plank-shake ${playClass}`}>
            {/* Ground Line */}
            <line x1="20" y1="150" x2="180" y2="150" stroke="#334155" strokeWidth="3" />

            {/* Head */}
            <circle cx="50" cy="110" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
            {/* Flat Body */}
            <line x1="60" y1="116" x2="165" y2="128" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            
            {/* Elbow / Support */}
            <line x1="80" y1="118" x2="80" y2="150" stroke="#a3e635" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            <line x1="80" y1="150" x2="105" y2="150" stroke="#a3e635" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            
            {/* Back Feet */}
            <line x1="165" y1="128" x2="170" y2="150" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
          </g>
        );

      case 'crunches':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="160" x2="180" y2="160" stroke="#334155" strokeWidth="3" />

            {/* Lower Body (Static) */}
            {/* Hips to Knee */}
            <line x1="110" y1="150" x2="135" y2="115" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            {/* Knee to Foot */}
            <line x1="135" y1="115" x2="150" y2="160" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />

            {/* Upper Body (Animated group) */}
            <g className={`anim-crunch-upper ${playClass}`} style={{ transformOrigin: '110px 150px' }}>
              {/* Spine */}
              <line x1="110" y1="150" x2="60" y2="150" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-lime)" />
              {/* Head */}
              <circle cx="45" cy="150" r="11" fill="#a3e635" filter="url(#neon-glow-lime)" />
              {/* Hands behind head */}
              <path d="M 45 150 Q 32 142 45 135" fill="none" stroke="#a3e635" strokeWidth="4" strokeLinecap="round" />
            </g>
          </>
        );

      case 'leg_raises':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="160" x2="180" y2="160" stroke="#334155" strokeWidth="3" />

            {/* Flat Torso and Head */}
            <circle cx="45" cy="148" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
            <line x1="55" y1="150" x2="115" y2="150" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            {/* Arms at side */}
            <line x1="65" y1="154" x2="105" y2="154" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />

            {/* Legs (Rotating group) */}
            <g className={`anim-leg-raise-legs ${playClass}`} style={{ transformOrigin: '115px 150px' }}>
              <line x1="115" y1="150" x2="175" y2="150" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            </g>
          </>
        );

      case 'wall_sit':
        return (
          <g className={`anim-wall-sit ${playClass}`}>
            {/* Wall Line */}
            <line x1="80" y1="40" x2="80" y2="180" stroke="#475569" strokeWidth="4" />
            {/* Ground Line */}
            <line x1="40" y1="180" x2="180" y2="180" stroke="#334155" strokeWidth="3" />

            {/* Back to Wall, Hips Bent */}
            {/* Head */}
            <circle cx="92" cy="75" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
            {/* Torso against wall */}
            <line x1="92" y1="86" x2="92" y2="135" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            {/* Thigh (Horizontal) */}
            <line x1="92" y1="135" x2="135" y2="135" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            {/* Shin (Vertical) */}
            <line x1="135" y1="135" x2="135" y2="180" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            
            {/* Arms crossed on chest */}
            <path d="M 92 98 Q 110 98 105 108 Q 92 108 92 98" fill="none" stroke="#38bdf8" strokeWidth="4" />
          </g>
        );

      case 'lunges':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="180" x2="180" y2="180" stroke="#334155" strokeWidth="3" />

            {/* Torso & Head */}
            <g className={`anim-lunge-torso ${playClass}`}>
              <circle cx="85" cy="70" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
              <line x1="85" y1="81" x2="85" y2="130" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
              {/* Hands on waist */}
              <path d="M 85 95 L 73 105 L 85 110" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Front Leg (Stepping forward) */}
            <g className={`anim-lunge-front-leg ${playClass}`} style={{ transformOrigin: '85px 130px' }}>
              <line x1="85" y1="130" x2="125" y2="130" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-lime)" />
              <line x1="125" y1="130" x2="125" y2="180" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            </g>

            {/* Back Leg */}
            <g className={`anim-lunge-back-leg ${playClass}`} style={{ transformOrigin: '85px 130px' }}>
              <line x1="85" y1="130" x2="55" y2="155" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
              <line x1="55" y1="155" x2="70" y2="180" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            </g>
          </>
        );

      case 'cobra_stretch':
        return (
          <g className={`anim-cobra ${playClass}`}>
            {/* Ground Line */}
            <line x1="20" y1="160" x2="180" y2="160" stroke="#334155" strokeWidth="3" />

            {/* Lower body (flat) */}
            <line x1="170" y1="158" x2="115" y2="155" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />

            {/* Torso (Arched up) */}
            <path 
              d="M 115 155 Q 95 140 85 105" 
              fill="none" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" 
              filter="url(#neon-glow-lime)"
            />
            {/* Head looking slightly up */}
            <circle cx="88" cy="88" r="11" fill="#a3e635" filter="url(#neon-glow-lime)" />

            {/* Arm supporting (Straight) */}
            <line x1="92" y1="110" x2="95" y2="160" stroke="#a3e635" strokeWidth="6" strokeLinecap="round" filter="url(#neon-glow-lime)" />
          </g>
        );

      case 'mountain_climbers':
        return (
          <>
            {/* Ground Line */}
            <line x1="20" y1="150" x2="180" y2="150" stroke="#334155" strokeWidth="3" />

            {/* Static Arms & Torso */}
            <circle cx="65" cy="100" r="11" fill="#38bdf8" filter="url(#neon-glow-cyan)" />
            {/* Straight arms */}
            <line x1="75" y1="108" x2="75" y2="150" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            {/* Torso */}
            <line x1="75" y1="108" x2="140" y2="120" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" filter="url(#neon-glow-cyan)" />

            {/* Left Leg (Climbing) */}
            <g className={`anim-climber-l ${playClass}`} style={{ transformOrigin: '140px 120px' }}>
              <line x1="140" y1="120" x2="105" y2="128" stroke="#a3e635" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-lime)" />
              <line x1="105" y1="128" x2="100" y2="149" stroke="#a3e635" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-lime)" />
            </g>

            {/* Right Leg */}
            <g className={`anim-climber-r ${playClass}`} style={{ transformOrigin: '140px 120px' }}>
              <line x1="140" y1="120" x2="165" y2="125" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
              <line x1="165" y1="125" x2="175" y2="148" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" filter="url(#neon-glow-cyan)" />
            </g>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-slate-950/60 rounded-3xl border border-slate-800 p-6 shadow-inner relative overflow-hidden aspect-video">
      {/* Visual background details */}
      <div className="absolute top-4 left-4 flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 animate-pulse" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
      </div>
      <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
        Active Graphic
      </div>

      <svg 
        viewBox="0 0 200 200" 
        className="w-48 h-48 select-none"
      >
        {glowFilter}
        {renderSVGContent()}
      </svg>
    </div>
  );
};
