<<<<<<< HEAD

=======
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { Volume2, VolumeX, Play, Pause, Radio, Heart, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Unknown Track');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const router = useRouter();

  const streamUrl = "https://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8";

  useEffect(() => {
    const interval = setInterval(() => {
      const tracks = [
        "The Weekend - Blinding Lights"
      ];
      setCurrentTrack(tracks[Math.floor(Math.random() * tracks.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(audioRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audioRef.current?.play();
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
              // Explicitly check the fatal error type
              switch (data.fatal) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                      console.error('A network error occurred:', data);
                      // Handle network error, possibly retry
                      break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                      console.error('A media error occurred:', data);
                      // Handle media error
                      break;
                  case Hls.ErrorTypes.OTHER_ERROR:
                      console.error('An unexpected error occurred:', data);
                      // Handle other types of errors
                      break;
                  default:
                      console.error('An unknown error occurred:', data);
                      break;
              }
          }
      });
        hlsRef.current = hls;
      } else if (audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        audioRef.current.src = streamUrl;
        audioRef.current.addEventListener('loadedmetadata', () => {
          audioRef.current?.play();
        });
      } else {
        console.error('HLS is not supported in this browser.');
      }
    }
  }, [streamUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newValue: number[]) => {
    const volumeValue = newValue[0];
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue / 100;
    }
    setIsMuted(volumeValue === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      if (audioRef.current) {
        audioRef.current.volume = volume / 100;
      }
      setIsMuted(false);
    } else {
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
      setIsMuted(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Listen to 90.8 MHz Radio Station',
        text: `Now playing: ${currentTrack}`,
        url: window.location.href,
      });
    }
  };

  // const handleScheduleClick = () => {
  //   router.push('/workspaces/radio-station/src/components/radio-player/SchedulePage');
  // };

  const VisualizerBars = () => (
    <div className="flex items-end justify-center space-x-1 h-16">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-blue-500 rounded-t"
          style={{
            height: isPlaying ? `${Math.random() * 100}%` : '10%',
            transition: 'height 0.2s ease',
          }}
        />
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-navy-600">ಜನಧ್ವನಿ 90.8</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white opacity-50 rounded-lg" />
          <div className="relative p-6">
            <VisualizerBars />
          </div>
        </div>

        <Alert className="bg-blue-50">
          <Radio className="h-4 w-4 inline-block" />
            <div className="scrolling-container">
              <AlertDescription className="scrolling-text">
                Now Playing: {currentTrack}
              </AlertDescription>
            </div>
        </Alert>


        <div className="flex justify-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          {/* <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-4 rounded-full transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Heart size={24} />
          </button> */}

          <button
            onClick={handleShare}
            className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <Share2 size={24} />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMute}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <div className="flex-grow">
            <Slider
              value={[isMuted ? 0 : volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="bg-gray-300"
              // thumbClassName="bg-white rounded-full border border-gray-400"
            />
          </div>
        </div>

        {/* <button
          onClick={handleScheduleClick}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Schedule
        </button> */}

        <audio ref={audioRef} />
      </CardContent>
    </Card>
  );
};

export default RadioPlayer;
>>>>>>> d1b7c5d (Your commit message here)
