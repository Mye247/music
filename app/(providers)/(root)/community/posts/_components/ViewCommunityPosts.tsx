"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Page from "../../../_components/Page";

function ViewCommunityPosts() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [typeBoolean, setTypeBoolean] = useState(false);
  const [typeColumn, setTypeColumn] = useState("createdAt");

  const { data: userId } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await unifiedAPI.getUserApi.getUser();
      const userId = user?.id;

      return userId;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const getPosts = await unifiedAPI.communityApi.getCommunityPosts(
        typeBoolean,
        typeColumn
      );

      return getPosts;
    },
  });

  // 정렬방식 정하기 버튼
  const handleClickSelectButton = (
    typeBoolean: boolean,
    columnString: string
  ) => {
    selectPost({ typeBoolean, columnString });
  };

  const { mutate: selectPost } = useMutation({
    mutationFn: async ({
      typeBoolean,
      columnString,
    }: {
      typeBoolean: boolean;
      columnString: string;
    }) => {
      setTypeBoolean(typeBoolean);
      setTypeColumn(columnString);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // 내가 작성한 글 삭제하기
  const { mutate: deletePost } = useMutation({
    mutationFn: async (postId: string) => {
      await unifiedAPI.communityApi.deleteCommunityPost(postId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const handleClickDeletePostButton = (postId: string) => {
    deletePost(postId);
  };

  return (
    <Page title="Posts">
      <div className="bg-gray-900 text-gray-200 p-6 rounded-lg mr-24 h-[550px]">
        <div className="flex gap-3 justify-end mb-4">
          {/* 정렬 옵션 */}
          <p
            onClick={() => handleClickSelectButton(true, "createdAt")}
            className="cursor-pointer"
          >
            OLD
          </p>
          <p
            onClick={() => handleClickSelectButton(false, "createdAt")}
            className="cursor-pointer"
          >
            NEW
          </p>
          <p
            onClick={() => handleClickSelectButton(false, "good")}
            className="cursor-pointer"
          >
            TOP
          </p>
        </div>

        {/* 스크롤이 가능한 리스트 */}
        <ul className="space-y-4 max-h-[450px] overflow-y-auto">
          {/* 리스트 출력 */}
          {posts?.map((post) => (
            <li
              key={post.postId}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between"
            >
              <Link href={`/community/post/${post?.postId}`}>
                <p className="text-xl font-semibold text-white">{post.title}</p>
                <p className="text-base text-gray-400">{post.content}</p>
              </Link>

              <div className="text-center">
                <p className="mb-3">글 작성자: {post.userName}</p>
                {/* 작성한 사람만 수정가능, 버튼 클릭시 수정 페이지로 이동 */}
                {userId === post.userId ? (
                  <div className="flex gap-3">
                    <button
                      className="bg-blue-950 w-[100px] h-[30px] rounded-lg"
                      onClick={() =>
                        router.push(`/community/post/edit/${post.postId}`)
                      }
                    >
                      수정
                    </button>

                    <button
                      className="bg-blue-950 w-[70px] h-[30px] rounded-lg"
                      onClick={() =>
                        handleClickDeletePostButton(String(post.postId))
                      }
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

export default ViewCommunityPosts;
