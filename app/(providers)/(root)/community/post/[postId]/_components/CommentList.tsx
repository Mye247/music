"use client";

import unifiedAPI from "@/api/unifiedAPI";
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
        <span className="text-blue-400 font-bold">댓글</span>
        <span className="text-gray-400 ml-2">0</span>
      </div>

      <section className="mt-4 ">
        <div className="mb-4 border-b-2 border-blue-500 pb-2">
          <span className="ml-3 mr-5">댓글 작성하기</span>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-black"
          />
          <button
            className="bg-black ml-3"
            onClick={() => handleClickAddCommentButton(1)}
          >
            등록
          </button>
        </div>

        {/* 댓글 리스트 */}
        <ul className="mb-5">
          {comments?.map((comment) => (
            <li key={comment.id}>
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default CommentList;
