"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { supabase } from "@/supabase/client";
import { useAuthStore } from "@/zustand/authStore";
import { useModalStore } from "@/zustand/modalStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, useState } from "react";
import { toast } from "react-toastify";

function LogInModal() {
  // 홈으로 이동
  const router = useRouter();

  // 로그인용 State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 상태 불러오기
  const closeModal = useModalStore((state) => state.closeModal);
  const logIn = useAuthStore((state) => state.logIn);

  // 바깥영역 클릭시 나가짐
  const handleToggleModal = () => {
    closeModal();
  };

  // const toastComment = <div>로그인에 성공하셨습니다.</div>;

  // const notify = () =>
  //   toast.info(toastComment, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //   });

  // 로그인 버튼
  const handleSubmitSignUpButton: ComponentProps<"form">["onSubmit"] = async (
    e
  ) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    const result = await supabase.auth.signInWithPassword(data);

    if (!result.data.user) return toast.error("회원 정보가 없습니다");

    // 프로필 테이블 정보
    const myProfile = await unifiedAPI.getUserApi.getLoggedInUserData();

    const userName = myProfile?.userName;

    toast.success(`${userName}님 로그인에 성공하셨습니다.`);

    logIn();

    closeModal();

    router.push("/");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={handleToggleModal}
    >
      <div
        className="absolute top-1/2 left-[700px] transform -translate-x-1/2 -translate-y-1/2 w-[450px] bg-zinc-900/95 rounded-2xl text-white shadow-2xl p-8 border border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center font-semibold text-3xl mb-8">로그인</h2>
        <form
          onSubmit={handleSubmitSignUpButton}
          className="flex flex-col gap-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 outline-none transition"
            />
          </div>

          <button className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium">
            로그인하기
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-6 text-sm text-gray-400">
          <Link
            href={"/sign-up"}
            onClick={handleToggleModal}
            className="hover:text-blue-500 transition-colors duration-200"
          >
            회원가입
          </Link>
          <button className="hover:text-blue-500 transition-colors duration-200">
            비밀번호 찾기
          </button>
          <button className="hover:text-blue-500 transition-colors duration-200">
            아이디 찾기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogInModal;
