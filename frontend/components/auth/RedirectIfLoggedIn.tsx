"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';

export default function RedirectIfLoggedIn({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/platform/homepage');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // or your loading spinner
  }

  return children;
}