'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/user-store';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setLoading, recordLogin, clearUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 获取初始会话
    const getInitialSession = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.log('❌ Error getting initial session:', error);
        } else if (session?.user) {
          console.log('✅ Initial session found:', { 
            email: session.user.email, 
            timestamp: new Date().toISOString() 
          });
          setUser(session.user);
          recordLogin();
        }
      } catch (error) {
        console.log('❌ Unexpected error getting initial session:', error);
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    getInitialSession();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', { 
          event, 
          hasUser: !!session?.user,
          email: session?.user?.email,
          timestamp: new Date().toISOString()
        });

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          recordLogin();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        setLoading(false);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setLoading, recordLogin, clearUser]);

  const signOut = async () => {
    try {
      console.log('🚪 Signing out user:', { 
        email: user?.email, 
        timestamp: new Date().toISOString() 
      });
      
      // Sign out from Supabase first
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('❌ Error signing out:', error);
        throw error;
      }
      
      // Clear user from store
      setUser(null);
      clearUser();
      
      console.log('✅ Sign out successful');
      
      // Stay on current page, no redirect needed
    } catch (error) {
      console.log('❌ Unexpected error during sign out:', error);
      // Even if there's an error, clear the local state
      setUser(null);
      clearUser();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}