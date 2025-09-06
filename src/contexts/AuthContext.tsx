
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
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loading: true,
  role: null,
  roleLoading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState<UserRole>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        setRoleLoading(true);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role as UserRole);
        } else {
          setRole(null);
        }
        setRoleLoading(false);
      } else {
        setRole(null);
        setRoleLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, role, roleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
