"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface EditPostDetailPageProps {
  postId: string;
}

interface communityPost {
  bed: number | null;
  content: string;
  createdAt: string;
  good: number;
  postId: number;
  title: string;
  userId: string | null;
  userName: string;
}

function EditPostDetailPage({ postId }: EditPostDetailPageProps) {
  const router = useRouter();

  const [post, setPost] = useState<communityPost | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 수정할 페이지 정보 가져오기
  useQuery({
    queryKey: ["post", { postId: postId }],
    queryFn: async () => {
      const communityPost = await unifiedAPI.communityApi.getCommunityPost(
        postId
      );
      setPost(communityPost?.[0] ?? null);

      return communityPost;
    },
  });

  const handleClickEditPostButton = async () => {
    if (!title || !content) {
      toast.error("제목 / 본문을 입력해주세요.");
    } else {
      await unifiedAPI.communityApi.updateCommunityPost(postId, title, content);

      toast.success("수정에 성공하셨습니다.");
      router.push("/community/posts");
    }
  };

  useEffect(() => {
    if (!post) return;
    setTitle(post?.title);
    setContent(post.content);
  }, [post]);
  console.log();
  return (
    <main>
      <div className="max-w-[1000px] h-[600px]  p-6 bg-gray-900 text-gray-100 shadow-lg rounded">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-50">
          글 수정하기
        </h2>
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
              onClick={handleClickEditPostButton}
            >
              수정하기
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
              onClick={() => router.push("/community/posts")}
            >
              수정 취소하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditPostDetailPage;
