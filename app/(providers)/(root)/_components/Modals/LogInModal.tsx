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
    <>
      <div
        className="absolute top-[50%] left-[50%] w-[500px] h-[530px] bg-black -translate-x-[50%] -translate-y-[50%] rounded-2xl text-white opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center mt-10 font-semibold text-3xl">로그인</h2>
        <form
          onSubmit={handleSubmitSignUpButton}
          className="flex items-center justify-center flex-col gap-y-5"
        >
          <div className="grid mt-10 text-white">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block border w-[400px] px-6 py-3 rounded focus:border-blue-500 outline-none transition border-slate-300 text-black"
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block border w-[400px] px-6 py-3 rounded focus:border-blue-500 outline-none transition border-slate-300 text-black"
            />
          </div>

          <button className="border border-white bg-blue-600 text-white w-[400px] h-[60px] mt-5 hover:-translate-y-2 transition-all">
            로그인하기
          </button>
        </form>
        <span className="flex gap-x-5 justify-center mt-5">
          <Link href={"/sign-up"} onClick={handleToggleModal}>
            <p>회원가입</p>
          </Link>
          <p>비밀번호 찾기</p>
          <p>아이디 찾기</p>
        </span>
      </div>
      <div
        className="absolute top-1/2 left-1/2 w-[500px] h-[530px] bg-black -translate-x-1/2 -translate-y-1/2 rounded-2xl text-white shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center mt-4 font-semibold text-3xl">로그인</h2>
        <form
          onSubmit={handleSubmitSignUpButton}
          className="flex items-center justify-center flex-col gap-6 mt-6"
        >
          <div className="grid w-full text-white">
            <label htmlFor="email" className="mb-1">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border w-full px-6 py-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition border-slate-300 text-black"
            />
          </div>

          <div className="grid w-full text-white">
            <label htmlFor="password" className="mb-1">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border w-full px-6 py-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition border-slate-300 text-black"
            />
          </div>

          <button className="border border-white bg-blue-600 text-white w-full h-[60px] mt-5 hover:translate-y-[-0.5rem] transition-all rounded">
            로그인하기
          </button>
        </form>
        <span className="flex gap-x-5 justify-center mt-6">
          <Link href={"/sign-up"} onClick={handleToggleModal}>
            <p className="cursor-pointer hover:text-blue-500 transition">
              회원가입
            </p>
          </Link>
          <p className="cursor-pointer hover:text-blue-500 transition">
            비밀번호 찾기
          </p>
          <p className="cursor-pointer hover:text-blue-500 transition">
            아이디 찾기
          </p>
        </span>
      </div>
    </>
  );
}

export default LogInModal;
