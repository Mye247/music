"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Page from "../../../_components/Page";

const AddNewPostPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // post 등록 버튼
  const handleClickAddPostButton = async () => {
    if (!title) {
      toast.error("제목을 작성해주세요.");
      return;
    } else if (!content) {
      toast.error("본문을 작성해주세요.");
      return;
    } else {
      // 글 추가하기
      const getUser = await unifiedAPI.getUserApi.getUser();
      if (!getUser) return;
      const userId = getUser.id;
      const userName = getUser.user_metadata.display_name as string;

      const data = {
        userId,
        userName,
        title,
        content,
      };

      await unifiedAPI.communityApi.createCommunityPost(data);
      router.push("/community/posts");
    }
  };

  return (
    <Page title="new post">
      <div className="max-w-[1000px] h-[600px]  p-6 bg-gray-900 text-gray-100 shadow-lg rounded">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-50">
          글 작성하기
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* 제목 */}
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-3 border border-gray-700 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 본문 */}
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            본문
          </label>
          <textarea
            id="content"
            className="w-full p-5 border border-gray-700 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-12"
            rows={10}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 버튼 */}
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              onClick={handleClickAddPostButton}
            >
              작성하기
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
              onClick={() => router.push("/")}
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default AddNewPostPage;
