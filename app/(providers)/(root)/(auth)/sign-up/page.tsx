"use client";

import { Database } from "@/database.types";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Page from "../../_components/Page";
import { useModalStore } from "@/zustand/modalStore";
import LogInModal from "../../_components/Modals/LogInModal";

function SignUpPage() {
  const router = useRouter();

  // 입력 내용 저장
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [checkUserPassword, setCheckUserPassword] = useState("");

  const openModal = useModalStore((state) => state.openModal);

  // 회원가입 로직
  const handleClickSignUpButton = async (e: React.FormEvent) => {
    e.preventDefault();
    // 에러 메세지
    let errorMessage = "";

    if (userName.trim() === "") errorMessage = "닉네임을 입력해주세요!";
    else if (userEmail.trim() === "") errorMessage = "이메일을 입력해주세요!";
    else if (!userEmail.includes("@"))
      errorMessage = "이메일에 @를 포함하여 작성해주세요!";
    else if (userPassword.trim() === "")
      errorMessage = "비밀번호를 입력해주세요!";
    else if (userPassword.length < 4)
      errorMessage = "비밀번호를 4자리 이상으로 작성해주세요!";
    else if (userPassword.length > 12)
      errorMessage = "비밀번호를 12자리 이하로 작성해주세요!";
    else if (userPassword !== checkUserPassword)
      errorMessage = "비밀번호를 똑같이 입력해주세요!";

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // 조건을 만족하면 db에 저장하기
    const signUp = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
      options: { data: { display_name: userName } },
    });

    const user = await supabase.auth.getUser();
    if (!user) return;

    const id = user.data.user!.id;

    const data: Database["public"]["Tables"]["users"]["Insert"] = {
      userId: id,
      userName,
      userEmail,
    };

    const { error } = await supabase.from("users").insert(data);
    console.log(error);
    toast.success("회원가입에 성공 하셨습니다.");

    if (!signUp.data.user) return toast.error("로그인에 실패 하였습니다.");
    router.push("/");
  };

  const handleClickOpenLoginModal = () => {
    openModal({ element: <LogInModal />, backdrop: true });
  };

  return (
    <Page title="Sign-up">
      <div className="flex items-center justify-center  px-4 sm:px-6 lg:px-8">
        <div className="max-w-[600px] w-full space-y-8 bg-white dark:bg-zinc-900 p-10 rounded-xl shadow-2xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              회원가입
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              이미 계정이 있으신가요?{" "}
              <button
                onClick={handleClickOpenLoginModal}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                로그인하기
              </button>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleClickSignUpButton}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="userName" className="sr-only">
                  닉네임
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="닉네임"
                  className="appearance-none relative block w-full px-3 py-3 border dark:border-gray-700 dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="userEmail" className="sr-only">
                  이메일
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="이메일"
                  className="appearance-none relative block w-full px-3 py-3 border dark:border-gray-700 dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="userPassword" className="sr-only">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="userPassword"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="비밀번호"
                  className="appearance-none relative block w-full px-3 py-3 border dark:border-gray-700 dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="checkUserPassword" className="sr-only">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="checkUserPassword"
                  value={checkUserPassword}
                  onChange={(e) => setCheckUserPassword(e.target.value)}
                  placeholder="비밀번호 확인"
                  className="appearance-none relative block w-full px-3 py-3 border dark:border-gray-700 dark:bg-zinc-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default SignUpPage;
