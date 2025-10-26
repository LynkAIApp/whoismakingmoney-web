'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Extend the Window interface to include the clarity property
declare global {
  interface Window {
    clarity: (action: string, ...args: unknown[]) => void;
  }
}

const ClarityProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'tw4bytd6cq';

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user && window.clarity) {
      window.clarity('identify', user.id);
    }
  }, [user]);

  // Only load Clarity in production
  const shouldLoadClarity = process.env.NODE_ENV === 'production';

  if (!shouldLoadClarity) {
    return null;
  }

  return (
    <Script
      id="clarity-script"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityProjectId}");
        `,
      }}
    />
  );
};

export default ClarityProvider;

