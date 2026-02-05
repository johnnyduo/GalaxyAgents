import React from 'react';
import Lottie from 'lottie-react';

// Module-level cache: prevents duplicate fetches across all LottieAvatar instances
const lottieCache = new Map<string, any>();
const pendingFetches = new Map<string, Promise<any>>();

interface LottieAvatarProps {
  animationPath: string;
  width?: number;
  height?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAvatar: React.FC<LottieAvatarProps> = ({
  animationPath,
  width = 80,
  height = 80,
  className = '',
  loop = true,
  autoplay = true
}) => {
  const [animationData, setAnimationData] = React.useState<any>(() => lottieCache.get(animationPath) || null);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Already cached in memory
    if (lottieCache.has(animationPath)) {
      setAnimationData(lottieCache.get(animationPath));
      return;
    }

    // Deduplicate in-flight fetches for the same path
    let fetchPromise = pendingFetches.get(animationPath);
    if (!fetchPromise) {
      fetchPromise = fetch(animationPath).then(r => r.json());
      pendingFetches.set(animationPath, fetchPromise);
    }

    fetchPromise
      .then(data => {
        lottieCache.set(animationPath, data);
        pendingFetches.delete(animationPath);
        setAnimationData(data);
      })
      .catch(err => {
        pendingFetches.delete(animationPath);
        console.error('Failed to load Lottie animation:', err);
        setError(true);
      });
  }, [animationPath]);

  if (error || !animationData) {
    // Fallback to a placeholder or return null
    return (
      <div 
        className={`${className} flex items-center justify-center bg-neon-green/10 rounded-full`}
        style={{ width, height }}
      >
        <span className="text-neon-green text-xs">⚡</span>
      </div>
    );
  }

  return (
    <div className={className} style={{ width, height }}>
      <Lottie 
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAvatar;
