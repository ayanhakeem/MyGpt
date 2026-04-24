import { useEffect, useRef, useState } from 'react';
import './TubesBackground.css';

const randomColors = (count) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

function TubesBackground({ children, enableClickInteraction = true }) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let cleanup = undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Dynamic import from CDN — no npm install required
        const module = await import(
          'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        const TubesCursor = module.default;

        if (!mounted) return;

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#a855f7", "#38bdf8", "#f472b6"],
            lights: {
              intensity: 200,
              colors: ["#7c3aed", "#0ea5e9", "#ec4899", "#8b5cf6"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        cleanup = () => {
          // nullify ref on unmount
          tubesRef.current = null;
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div className="tubes-bg-wrapper" onClick={handleClick}>
      <canvas ref={canvasRef} className="tubes-bg-canvas" />

      {/* Fade-in overlay on load */}
      <div className={`tubes-bg-fade ${isLoaded ? 'tubes-bg-fade--visible' : ''}`} />

      {/* Content layer */}
      <div className="tubes-bg-content">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
