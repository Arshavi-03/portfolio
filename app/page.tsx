// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from './components/LandingPage';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has already seen the landing page
    const hasSeenLanding = sessionStorage.getItem('hasSeenLanding');
    if (hasSeenLanding) {
      sessionStorage.removeItem('hasSeenLanding');
    }
  }, []);

  const handleStart = () => {
    // Set flag when user clicks start
    sessionStorage.setItem('hasSeenLanding', 'true');
    router.push('/portfolio');
  };

  return <LandingPage onStart={handleStart} />;
}