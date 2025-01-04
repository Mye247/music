"use client";

import { Database } from "@/database.types";
import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Page from "../../_components/Page";

function SignUpPage() {
  const router = useRouter();

  // 입력 내용 저장
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [checkUserPassword, setCheckUserPassword] = useState("");

  // 회원가입 로직
  const handleClickSignUpButton = async (e: any) => {
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

  return (
    <Page title="회원가입 페이지">
      <form
        className="w-[500px] p-8 bg-black text-gray-200 rounded-lg shadow-lg space-y-6 mx-[213px] font-bold"
        onSubmit={handleClickSignUpButton}
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-300"
          >
            닉네임
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="userEmail"
            className="text-sm font-medium text-gray-300"
          >
            이메일
          </label>
          <input
            type="text"
            id="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="userPassword"
            className="text-sm font-medium text-gray-300"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="checkUserPassword"
            className="text-sm font-medium text-gray-300"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="checkUserPassword"
            value={checkUserPassword}
            onChange={(e) => setCheckUserPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-900 text-white rounded-md text-sm font-medium hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          회원가입
        </button>
      </form>
    </Page>
  );
}

export default SignUpPage;
