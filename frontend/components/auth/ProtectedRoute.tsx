"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/lib/firebase/AuthContext';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '@/redux/auth/selectors';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();

  if (isLoggedIn) {
    return children;
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [isLoggedIn, user, loading, router]);

  if (isLoggedIn) {
    return children;
  }

  if (loading || !user) {
    return <div>Loading...</div>; // or your loading spinner
  }

  return children;
}
