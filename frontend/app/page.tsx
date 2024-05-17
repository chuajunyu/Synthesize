import "./globals.css";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Synthesize</h1>
      <p>This is a basic template for a landing page.</p>
      
      <Link href="/auth/login">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
