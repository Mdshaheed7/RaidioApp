<<<<<<< HEAD

=======
import React from 'react';

interface VisualizerProps {
  isPlaying: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="flex items-end justify-center space-x-1 h-16">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-blue-500 rounded-t"
          style={{
            height: isPlaying ? `${Math.random() * 100}%` : '10%',
            transition: 'height 0.2s ease'
          }}
        />
      ))}
    </div>
  );
};
>>>>>>> d1b7c5d (Your commit message here)
