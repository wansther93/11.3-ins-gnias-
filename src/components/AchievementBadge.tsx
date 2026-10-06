import React from 'react';
import { Lock, Star } from 'lucide-react';
import type { Achievement } from '../services/achievementService';
import { BADGE_IMAGE_MAP, getBadgeImageUrl } from '../assets/achievementAssets';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showProgressRing?: boolean;
  onClick?: () => void;
  isEquipped?: boolean;
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showProgressRing = true,
  onClick,
  isEquipped = false,
  className = '',
}) => {
  const { tier, isUnlocked, icon, progress } = achievement;

  // Imagem oficial da insígnia WebP com alpha transparente
  const badgeImageUrl = BADGE_IMAGE_MAP[achievement.id] ? getBadgeImageUrl(achievement.id) : null;

  // Dimensões dinâmicas
  const sizeMap = {
    sm: {
      outer: 'w-12 h-12',
      inner: 'w-11 h-11',
      icon: 'text-base',
      lock: 'w-3.5 h-3.5',
      equippedDot: 'w-2 h-2',
    },
    md: {
      outer: 'w-16 h-16 sm:w-20 sm:h-20',
      inner: 'w-14 h-14 sm:w-18 sm:h-18',
      icon: 'text-xl sm:text-2xl',
      lock: 'w-5 h-5',
      equippedDot: 'w-2.5 h-2.5',
    },
    lg: {
      outer: 'w-24 h-24 sm:w-28 sm:h-28',
      inner: 'w-20 h-20 sm:w-24 sm:h-24',
      icon: 'text-3xl sm:text-4xl',
      lock: 'w-6 h-6',
      equippedDot: 'w-3 h-3',
    },
    xl: {
      outer: 'w-32 h-32 sm:w-40 sm:h-40',
      inner: 'w-28 h-28 sm:w-36 sm:h-36',
      icon: 'text-4xl sm:text-6xl',
      lock: 'w-8 h-8',
      equippedDot: 'w-4 h-4',
    },
  };

  const dim = sizeMap[size];

  // Paleta temática por Tier
  const tierStyles = {
    bronze: {
      border: 'border-amber-700/80 group-hover:border-amber-500',
      glow: 'shadow-[0_0_15px_rgba(180,83,9,0.4)]',
      ring: '#d97706',
      textAccent: 'text-amber-400',
      haloColor: 'rgba(217, 119, 6, 0.35)',
    },
    silver: {
      border: 'border-slate-400/80 group-hover:border-cyan-300',
      glow: 'shadow-[0_0_18px_rgba(203,213,225,0.45)]',
      ring: '#94a3b8',
      textAccent: 'text-slate-200',
      haloColor: 'rgba(148, 163, 184, 0.35)',
    },
    gold: {
      border: 'border-amber-400/90 group-hover:border-yellow-300',
      glow: 'shadow-[0_0_22px_rgba(245,158,11,0.6)]',
      ring: '#fbbf24',
      textAccent: 'text-yellow-300',
      haloColor: 'rgba(245, 158, 11, 0.45)',
    },
    platinum: {
      border: 'border-cyan-400/90 group-hover:border-indigo-300',
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.65)]',
      ring: '#22d3ee',
      textAccent: 'text-cyan-300',
      haloColor: 'rgba(34, 211, 238, 0.45)',
    },
    diamond: {
      border: 'border-fuchsia-400/90 group-hover:border-purple-300',
      glow: 'shadow-[0_0_30px_rgba(217,70,239,0.75)]',
      ring: '#e879f9',
      textAccent: 'text-fuchsia-300',
      haloColor: 'rgba(217, 70, 239, 0.5)',
    },
  };

  const currentTierStyle = tierStyles[tier];

  return (
    <div
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center select-none cursor-pointer transition-all duration-300 active:scale-95 ${dim.outer} ${className}`}
    >
      {/* Halo de Brilho Dinâmico quando Desbloqueado */}
      {isUnlocked && (
        <div
          className="absolute inset-1 rounded-full transition-opacity duration-300 opacity-60 group-hover:opacity-100 pointer-events-none filter blur-md"
          style={{ backgroundColor: currentTierStyle.haloColor }}
        />
      )}

      {/* SVG Anel de Progresso quando Bloqueado ou Parcial */}
      {showProgressRing && !isUnlocked && (
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10">
          <circle
            cx="50%"
            cy="50%"
            r="46%"
            fill="none"
            stroke="rgba(51, 65, 85, 0.35)"
            strokeWidth="3"
          />
          {progress > 0 && (
            <circle
              cx="50%"
              cy="50%"
              r="46%"
              fill="none"
              stroke={currentTierStyle.ring}
              strokeWidth="3.5"
              strokeDasharray="280"
              strokeDashoffset={`${280 - (280 * Math.min(100, progress)) / 100}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          )}
        </svg>
      )}

      {/* Corpo Central da Insígnia / Medalhão */}
      <div
        className={`relative ${dim.inner} flex items-center justify-center transition-all duration-300 z-10`}
      >
        {badgeImageUrl ? (
          <>
            <img
              src={badgeImageUrl}
              alt={achievement.title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] transition-all duration-300 ${
                isUnlocked
                  ? 'group-hover:scale-105'
                  : 'grayscale brightness-40 opacity-40 group-hover:opacity-60'
              }`}
            />
            {/* Cadeado de Bloqueio Sobreposto */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="p-1.5 rounded-full bg-black/80 border border-white/20 shadow-xl backdrop-blur-sm">
                  <Lock className={`${dim.lock} text-white/90`} />
                </div>
              </div>
            )}
          </>
        ) : (
          /* Fallback Clássico */
          <div className="flex items-center justify-center text-center">
            {isUnlocked ? (
              <span className={`${dim.icon} select-none`}>{icon}</span>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500">
                <Lock className={`${dim.lock} mb-0.5 text-slate-400`} />
                <span className={`${dim.icon} opacity-30 select-none`}>{icon}</span>
              </div>
            )}
          </div>
        )}

        {/* Destaque visual de Conquista Rara */}
        {isUnlocked && (tier === 'gold' || tier === 'platinum' || tier === 'diamond') && (
          <div className="absolute top-1 right-1 z-20 pointer-events-none">
            <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-200/90 fill-amber-200/50" />
          </div>
        )}
      </div>

      {/* Marcador de Insígnia Equipada no Perfil */}
      {isEquipped && (
        <div className="absolute -top-1 -right-1 z-30 flex items-center justify-center p-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 border border-amber-200 shadow-md shadow-amber-950/80">
          <Star className={`${dim.equippedDot} fill-amber-950 text-amber-950`} />
        </div>
      )}

      {/* Badge de Tier em miniatura na base (para tamanhos md, lg, xl) */}
      {(size === 'lg' || size === 'xl') && (
        <div
          className={`absolute -bottom-2 z-20 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border shadow-md ${
            isUnlocked
              ? `${currentTierStyle.border} bg-slate-950/90 ${currentTierStyle.textAccent}`
              : 'border-slate-800 bg-slate-950/80 text-slate-500'
          }`}
        >
          {tier}
        </div>
      )}
    </div>
  );
};

