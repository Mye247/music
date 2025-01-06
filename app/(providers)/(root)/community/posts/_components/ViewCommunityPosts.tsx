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

  const { data: getPosts } = useQuery({
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
    mutate({ typeBoolean, columnString });
  };

  const { mutate } = useMutation({
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

  return (
    <Page title="Posts">
      <div className="bg-gray-900 text-gray-200 p-6 rounded-lg mr-24 h-[550px]">
        <div className="flex gap-3 justify-end mb-4">
          {/* 정렬 옵션 */}
          <p onClick={() => handleClickSelectButton(true, "createdAt")}>OLD</p>
          <p onClick={() => handleClickSelectButton(false, "createdAt")}>NEW</p>
          <p onClick={() => handleClickSelectButton(false, "good")}>TOP</p>
        </div>

        {/* 스크롤이 가능한 리스트 */}
        <ul className="space-y-4 max-h-[450px] overflow-y-auto">
          {/* 리스트 출력 */}
          {getPosts?.map((posts) => (
            <li
              key={posts.postId}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between"
            >
              <Link href={`/community/post/${posts?.postId}`}>
                <p className="text-xl font-semibold text-white">
                  {posts.title}
                </p>
                <p className="text-base text-gray-400">{posts.content}</p>
              </Link>

              <div className="text-center">
                <p className="mb-3">글 작성자: {posts.userName}</p>
                {/* 작성한 사람만 수정가능, 버튼 클릭시 수정 페이지로 이동 */}
                {userId === posts.userId ? (
                  <button
                    className="bg-blue-950 w-[100px] h-[30px] rounded-lg"
                    onClick={() =>
                      router.push(`/community/post/edit/${posts.postId}`)
                    }
                  >
                    수정
                  </button>
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
