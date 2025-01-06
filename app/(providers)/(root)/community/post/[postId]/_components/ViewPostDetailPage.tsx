"use client";
import unifiedAPI from "@/api/unifiedAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";

interface CommunityPost {
  bed: number | null;
  content: string;
  createdAt: string;
  good: number;
  postId: number;
  title: string;
  userId: string | null;
  userName: string;
}

interface PostDetailPageProps {
  postId: string;
}

function ViewPostDetailPage(props: PostDetailPageProps) {
  const postId = props.postId;
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<CommunityPost | null>(null);

  // post 상세페이지 정보 가져오기
  const {
    data: getCommunityPost,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["post", { postId: postId }],
    queryFn: async () => {
      const response = await unifiedAPI.communityApi.getCommunityPost(postId);
      return response || [];
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (vote: number) => {
      if (vote === 1) {
        await unifiedAPI.communityApi.toggleVote(postId, vote);
      } else if (vote === 2) {
        await unifiedAPI.communityApi.toggleVote(postId, vote);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", { postId }] });
    },
  });

  // 데이터 받아 뿌려주기
  useEffect(() => {
    if (isSuccess && getCommunityPost && getCommunityPost.length > 0) {
      setPost(getCommunityPost[0]);
    }
    setLoading(false);
  }, [isSuccess, getCommunityPost]);

  // 추천, 비추천 버튼 1=추천 2=비추천
  const handleClickGoodButton = async (vote: number) => {
    mutate(vote);
  };

  // 로딩 상태
  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-xl text-gray-300">Loading...</div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="text-xl text-gray-300">Post not found.</div>
      </div>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen py-4 px-2 max-w-[1000px] rounded-lg">
      {/* 게시글 헤더 */}
      <div className="border-b-2 border-blue-500 pb-2 mb-4">
        <div className="text-2xl font-bold text-blue-400">커뮤니티</div>
      </div>

      {/* 게시글 제목 영역 */}
      <div className="border-t border-b border-gray-700 bg-gray-800 p-3">
        <h1 className="text-xl font-bold text-gray-100">{post.title}</h1>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span>작성자: {post.userName}</span>
            <span className="text-gray-600">|</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>조회 {0}</span>
            <span>추천 {post.good}</span>
          </div>
        </div>
      </div>

      {/* 게시글 내용 */}
      <div className="min-h-[300px] p-4 border-b border-gray-700 bg-gray-800 mt-[1px]">
        <div className="whitespace-pre-wrap text-gray-300">{post.content}</div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => handleClickGoodButton(1)}
        >
          추천 {post.good}
        </button>
        <button
          className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 text-gray-300"
          onClick={() => handleClickGoodButton(2)}
        >
          비추천 {post.bed}
        </button>
      </div>

      {/* 댓글 영역 */}
      <CommentList postId={postId} />
    </main>
  );
}

export default ViewPostDetailPage;
