"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { User as FirebaseUser } from 'firebase/auth';

type UserRole = 'admin' | 'candidate' | null;

interface AuthContextType {
  user: FirebaseUser | null | undefined;
  loading: boolean;
  role: UserRole;
  roleLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  role: null,
  roleLoading: true,
  error: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth);
  const [role, setRole] = useState<UserRole>(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleError, setRoleError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserRole = async () => {
      if (!user) {
        if (isMounted) {
          setRole(null);
          setRoleLoading(false);
        }
        return;
      }

      try {
        setRoleLoading(true);
        setRoleError(null);
        
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (isMounted) {
          if (userDoc.exists()) {
            setRole(userDoc.data().role as UserRole);
          } else {
            // This case might happen if a user is created in Auth but not in Firestore.
            setRole(null);
            console.warn('User document not found in Firestore');
          }
          setRoleLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setRoleError(err as Error);
          setRole(null);
          setRoleLoading(false);
          console.error('Error fetching user role:', err);
        }
      }
    };

    fetchUserRole();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Combine errors from useAuthState and our role fetching
  const combinedError = error || roleError;

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      role, 
      roleLoading, 
      error: combinedError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// This is the key fix - make sure useAuth is exported
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context itself as well in case it's needed
export default AuthContext;