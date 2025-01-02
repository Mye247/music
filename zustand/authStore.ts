import { create } from "zustand";

// 유저 정보 타입
type CurrentUser = {
  id?: string;
  userId: string;
  userName?: string | undefined;
  userEmail?: string;
  userIntroduction?: string | null;
  userProfileImage?: string | null;
} | null;

type AuthStoreState = {
  // 로그인 상태
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;

  // 로딩 상태
  isAuthInitialized: boolean;
  setAuthInitialized: () => void;

  // 현재 로그인한 유저 정보
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,
  logIn: () => set({ isLoggedIn: true }),
  logOut: () => set({ isLoggedIn: false, currentUser: null }),

  isAuthInitialized: false,
  setAuthInitialized: () => set({ isAuthInitialized: true }),

  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
