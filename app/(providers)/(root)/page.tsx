"use client";

import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            music 커뮤니티에 오신 것을 환영합니다
          </h2>
          <p className="text-gray-400 text-lg">
            다양한 의견을 나누고 소통해보세요
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 최신 글 섹션 */}
          <article className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="p-6">
              <Link href={"/community/posts"} className="group">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    최신 글
                  </h2>
                  <span className="text-blue-400">→</span>
                </div>
              </Link>

              {/* 여기에 최신 글 목록을 추가할 수 있습니다 */}
              <div className="space-y-4 mb-8">{/* 글 목록을 위한 공간 */}</div>

              <button
                onClick={handleClickCreatePostButton}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>글 작성하기</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </article>

          {/* 인기 글 섹션 */}
          <article className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">인기 글</h2>
                <span className="text-blue-400">→</span>
              </div>

              {/* 여기에 인기 글 목록을 추가할 수 있습니다 */}
              <div className="space-y-4 mb-8">{/* 글 목록을 위한 공간 */}</div>

              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <span>글 더보기</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </article>

          {/* 포인트 상점 섹션 */}
          <article className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="p-6">
              <Link href={"/community/store"} className="group">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    포인트 상점
                  </h2>
                  <span className="text-blue-400">→</span>
                </div>
              </Link>

              {/* 여기에 최신 글 목록을 추가할 수 있습니다 */}
              <div className="space-y-4 mb-8">{/* 글 목록을 위한 공간 */}</div>

              <button
                onClick={handleClickCreatePostButton}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>상품 구매하기</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
