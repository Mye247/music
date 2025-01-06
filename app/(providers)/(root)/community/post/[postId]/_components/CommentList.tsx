"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { configs } from "@/config/config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useState } from "react";

interface CommentListProps {
  postId: string;
}

function CommentList(props: CommentListProps) {
  const postId = props.postId;
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  const { data: comments } = useQuery({
    queryKey: ["comment", { postId: postId }],
    queryFn: async () => {
      const response = await unifiedAPI.communityApi.getPostComments(
        Number(postId)
      );

      return response;
    },
  });

  // 프로필 테이블 정보
  const { data: myProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await unifiedAPI.getUserApi.getMyProfile();

      return response?.[0];
    },
  });

  // 댓글 등록
  // 1 = 작성, 2 = 수정
  const handleClickAddCommentButton = async (typeNumber: number) => {
    mutate(typeNumber);
  };

  const { mutate } = useMutation({
    mutationFn: async (typeNumber: number) => {
      const user = await unifiedAPI.getUserApi.getUser();
      if (!user) return;
      const userId = user?.id;

      const createPostComment = await unifiedAPI.communityApi.createPostComment(
        Number(postId),
        userId,
        content,
        nanoid(),
        typeNumber
      );

      console.log(createPostComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", { postId: postId }],
      });
    },
  });

  return (
    <main>
      {/* 댓글 수 표시 영역 */}
      <div className="mt-8 border-b-2 border-blue-500 pb-2">
        <span className="text-blue-400 font-bold">전체 댓글</span>
        <span className="text-gray-400 ml-2">{comments?.length}개</span>
      </div>

      <section className="mt-4 ">
        <div className="mb-4 border-t border-gray-700 p-4 bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center gap-3">
            {/* 프로필 이미지 또는 아이콘 */}
            <img
              alt="프로필 이미지"
              src={configs.baseURL + myProfile?.userProfileImage}
              className="w-10 h-10 rounded-full bg-gray-600 flex justify-center items-center text-white text-sm"
            ></img>
            {/* 댓글 입력 */}
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="댓글을 입력하세요."
              className="flex-grow text-sm bg-gray-700 text-gray-200 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* 등록 버튼 */}
            <button
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => handleClickAddCommentButton(1)}
            >
              등록
            </button>
          </div>
        </div>

        {/* 댓글 리스트 */}
        <ul className="mb-5">
          {comments?.map((comment) => (
            <li
              key={comment.id}
              className="flex gap-x-16 border-gray-500 border-b pb-2 mb-2"
            >
              <p className="ml-2 w-[100px]">{comment.userName}님</p>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default CommentList;
