"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import Link from "next/link";
import { toast } from "react-toastify";
import LogInModal from "../Modals/LogInModal";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import { IoIosMusicalNotes } from "react-icons/io";

function Header() {
  // state
  const openModal = useModalStore((state) => state.openModal);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logOut = useAuthStore((state) => state.logOut);

  // 현재 로그인한 사용자의 데이터
  const { data: loginUserData } = useQuery({
    queryKey: ["loginUserData"],
    queryFn: async () => {
      const result = await unifiedAPI.getUserApi.getLoggedInUserData();

      return result || null;
    },
  });

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

    // 로그아웃시 해당 페이지 정보 리렌더링
    window.location.reload();
  };

  return (
    <header className="min-w-full bg-cyan-700 min-h-[65px] flex items-center justify-between">
      <Link href={"/"}>
        <h1 className="pl-5 font-bold text-xl whitespace-nowrap flex items-center gap-x-1">
          music <IoIosMusicalNotes /> 서비스 (커뮤니티)
        </h1>
      </Link>

      {/* 검색바 */}
      <SearchBar />

      {isLoggedIn ? (
        <div className="flex gap-x-3 pr-5">
          <Link
            href={`/user/${loginUserData?.userId}/profile`}
            className="cursor-pointer"
          >
            <p>{loginUserData?.userName}</p>
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
