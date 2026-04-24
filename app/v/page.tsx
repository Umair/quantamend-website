'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function ShareContent() {
  const searchParams = useSearchParams();
  const video = searchParams.get('video');
  const name = searchParams.get('name') || 'there';
  const thumb = searchParams.get('thumb');

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#000000' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  const calLink = process.env.NEXT_PUBLIC_CAL_LINK?.replace('https://cal.com/', '') || 'uejaz/free-15-min-strategy-call';

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Side: Video & Message */}
        <div className="flex-1 max-w-3xl w-full flex flex-col gap-6">
          {/* Video Player */}
          <div className="relative aspect-video rounded-[12px] overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
            {video ? (
              <video 
                src={video}
                poster={thumb || undefined}
                className="w-full h-full object-cover"
                controls={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No video provided
              </div>
            )}
            
            {/* Play Button Overlay */}
            {!isPlaying && video && (
              <button 
                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/5 transition-colors hover:bg-black/10"
                onClick={(e) => {
                  const videoElement = e.currentTarget.previousElementSibling as HTMLVideoElement;
                  if (videoElement) {
                    videoElement.play();
                    setIsPlaying(true);
                  }
                }}
              >
                <div className="w-20 h-20 bg-[#665efd] rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Greeting & Message */}
          <div className="flex flex-col gap-4 mt-2">
            <h1 className="text-[22px] font-semibold text-[#061b31]">Hi {name}</h1>
            <div className="p-4 rounded-md border border-gray-200 bg-white text-[14px] text-gray-400 shadow-sm">
              Thanks for watching! just reply 'yes' to this email or book call with following link
            </div>
          </div>
        </div>

        {/* Right Side: Cal.com Embed */}
        <div className="w-full lg:w-[420px] flex-shrink-0">
          <div className="rounded-[12px] overflow-hidden shadow-lg border border-gray-800 bg-[#111111]">
            <Cal 
              calLink={calLink}
              style={{ width: '100%', height: '100%', minHeight: '600px' }}
              config={{ layout: 'month_view', theme: 'dark' }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center">Loading...</div>}>
      <ShareContent />
    </Suspense>
  );
}
