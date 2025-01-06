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
    <Page title="main page">
      {/* 최신글과 인기글 등등이 들어갈 예정입니다. */}

      <main className="w-full h-full grid grid-cols-2">
        <article className="w-[60%] h-[300px] ">
          {/* 전체 글 보는 페이지 링크 */}
          <Link href={"/community/posts"}>
            <p className="font-bold text-xl">최신 글</p>
          </Link>

          {/* supabase 연동위치 */}
          <button
            className="absolute bottom-[130px] bg-blue-950 w-[130px] h-[30px] rounded-lg"
            onClick={handleClickCreatePostButton}
          >
            글 작성하기
          </button>
        </article>
        <article className="w-[60%] h-[300px] ">
          <p className="font-bold text-xl">인기 글</p>
          {/* supabase 연동위치 */}
          <button className="absolute bottom-[130px] bg-blue-950 w-[130px] h-[30px] rounded-lg">
            글 더보기
          </button>
        </article>
      </main>
    </Page>
  );
}
