"use client";

import { useState } from "react";
import Page from "../../_components/Page";

function SignUpPage() {
  // 입력 내용 저장
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [checkUserPassword, setCheckUserPassword] = useState("");

  // 회원가입 로직
  const handleClickSignUpButton = (e: any) => {
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

    // 모든 조건이 충족된 경우 회원가입 로직 실행
    console.log("회원가입 성공!");
  };

  return (
    <Page title="회원가입 페이지">
      <form
        className="w-[500px] h-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg space-y-6 mx-56 mt-12"
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
          className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          회원가입
        </button>
      </form>
    </Page>
  );
}

export default SignUpPage;
