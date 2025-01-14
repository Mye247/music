"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LogInModal from "../Modals/LogInModal";
import SearchBar from "./SearchBar";

interface loggedInUser {
  adminType: boolean;
  createdAt: string;
  id: number;
  userEmail: string;
  userId: string;
  userIntroduction: string;
  userName: string;
  userProfileImage: string | null;
}

function Header() {
  // state
  const openModal = useModalStore((state) => state.openModal);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logOut = useAuthStore((state) => state.logOut);
  const [loggedInUser, setLoggedInUser] = useState<loggedInUser | null>();

  // 핸들러

  // 로그인 모달 열기
  const handleClickOpenLogInModal = () => {
    openModal({ element: <LogInModal />, backdrop: true });
  };

  // 로그아웃
  const handleClickLogOutButton = async () => {
    toast.info("로그아웃 하셨습니다.");
    await supabase.auth.signOut();
    logOut();
  };

  // 유저 정보 갱신
  useEffect(() => {
    const loginUserData = async () => {
      const getUser = await unifiedAPI.getUserApi.getLoggedInUserData();
      setLoggedInUser(getUser);
    };
    loginUserData();
  }, [isLoggedIn]);

  return (
    <header className="min-w-full bg-cyan-700 min-h-[65px] flex items-center justify-between">
      <Link href={"/"}>
        <h1 className="pl-5 font-bold text-xl">music 서비스 (커뮤니티)</h1>
      </Link>

      {/* 검색바 */}
      <SearchBar />

      {isLoggedIn ? (
        <div className="flex gap-x-3 pr-5">
          <Link
            href={`/user/${loggedInUser?.userId}/profile`}
            className="cursor-pointer"
          >
            <p>{loggedInUser?.userName}</p>
          </Link>
          <button onClick={handleClickLogOutButton}>로그아웃</button>
        </div>
      ) : (
        <div className="flex gap-x-3 pr-5">
          <button onClick={handleClickOpenLogInModal}>로그인</button>
          <Link href={"/sign-up"}>회원가입</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
