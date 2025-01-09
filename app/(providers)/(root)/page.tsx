"use client";

import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Page from "./_components/Page";

export default function HomePage() {
  const router = useRouter();

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  /**
   * 글 작성하기 버튼
   */
  const handleClickCreatePostButton = () => {
    if (isLoggedIn === false) {
      toast.info("로그인/회원가입 후 이용하실 수 있는 서비스 입니다.");
    } else if (isLoggedIn === true) {
      router.push("/community/post/new");
    }
  };

  return (
    <Page title="Main page">
      <main className="w-[1000px] h-full grid grid-cols-2 gap-6 p-6 bg-gray-900">
        {/* 최신 글 섹션 */}
        <article className="relative w-full h-[300px] bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <Link href={"/community/posts"}>
            <p className="text-white font-bold text-xl mb-4">최신 글</p>
          </Link>

          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-950 text-white w-[130px] h-[40px] rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleClickCreatePostButton}
          >
            글 작성하기
          </button>
        </article>

        {/* 인기 글 섹션 */}
        <article className="relative w-full h-[300px] bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
          <p className="text-white font-bold text-xl mb-4">인기 글</p>

          <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-950 text-white w-[130px] h-[40px] rounded-lg hover:bg-blue-700 transition-colors">
            글 더보기
          </button>
        </article>
      </main>
    </Page>
  );
}
