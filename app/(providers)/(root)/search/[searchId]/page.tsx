"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { supabase } from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchResultPageProps {
  params: Promise<{
    searchId: string;
    searchText: string;
  }>;
}

interface searchType {
  bed: number | null;
  content: string;
  createdAt: string;
  good: number;
  postId: number;
  title: string;
  userId: string | null;
  userName: string;
  viewCounter: number;
}

interface decodedSearchTextType {
  searchId: string;
}

function SearchResultPage(props: SearchResultPageProps) {
  const router = useRouter();

  const [decodedSearchText, setDecodedSearchText] =
    useState<decodedSearchTextType>({ searchId: "" });

  const searchText = decodeURIComponent(decodedSearchText.searchId);

  // 검색 결과 가져오기
  const { data: searchData } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      // 검색어 가져오기
      const searchText = await props.params;
      const decodedSearchText = decodeURIComponent(
        typeof searchText === "string" ? searchText : ""
      );
      setDecodedSearchText({ searchId: searchText.searchId });

      // 데이터 추출하기
      const { data: searchData } = await supabase
        .from("community")
        .select("*")
        .ilike("title", `%${decodedSearchText}%`);

      return searchData;
    },
  });

  // 자세히 보기 버튼
  const handleNavigateToPost = async (search: searchType) => {
    const result = await unifiedAPI.communityApi.updateCommunityViewCounter(
      String(search.postId)
    );
    router.push(`/community/post/${search.postId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">({searchText}) 의 검색 결과</h2>
        {searchData && searchData.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchData.map((search) => (
              <li
                key={search.postId}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition"
              >
                <h2 className="text-xl font-semibold mb-2">{search.title}</h2>
                <p className="text-sm text-gray-400">
                  작성자: {search.userName || "익명"}
                </p>
                <p className="mt-2 text-gray-300 line-clamp-3">
                  {search.content || "내용이 없습니다."}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                  onClick={() => handleNavigateToPost(search)}
                >
                  자세히 보기
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold mb-4">검색 결과가 없습니다</h3>
            <p className="text-gray-400">다른 키워드로 다시 검색해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultPage;
