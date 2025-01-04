"use client";

import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: PropsWithChildren) {
  // auth State
  const logIn = useAuthStore((state) => state.logIn);
  const logOut = useAuthStore((state) => state.logOut);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  // 로그인 정보 갱신
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        logIn();
      } else {
        logOut();
      }

      setAuthInitialized();
    });
  }, [setAuthInitialized]);
  return children;
}

export default AuthProvider;
