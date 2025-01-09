"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchBar() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");

  // 검색 버튼 클릭 검색 페이지로 이동
  const handleClickSearchButton = async () => {
    if (searchText.trim() === "") {
      console.error("검색어를 입력해주세요.");
      return;
    }

    if (!searchText) {
      console.error("post가 없어요");
      return [];
    } else if (searchText) {
      router.push(`/search/${searchText}`);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto ml-80">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full p-3 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
        onClick={handleClickSearchButton}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.35-4.35M18 10a8 8 0 11-16 0 8 8 0 0116 0z"
        />
      </svg>
    </div>
  );
}

export default SearchBar;
