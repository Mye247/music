"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import Page from "../../../_components/Page";

function ViewCommunityPosts() {
  const queryClient = useQueryClient();

  const [typeBoolean, setTypeBoolean] = useState(false);

  const { data: getPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const getPosts = await unifiedAPI.communityApi.getCommunityPosts(
        typeBoolean
      );

      return getPosts;
    },
  });

  const handleClickSelectButton = (typeBoolean: boolean) => {
    mutate(typeBoolean);
  };

  const { mutate } = useMutation({
    mutationFn: async (typeBoolean: boolean) => {
      setTypeBoolean(typeBoolean);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <Page title="Posts">
      <div className="bg-gray-900 text-gray-200 p-6 rounded-lg">
        <div className="flex gap-3 justify-end mb-4">
          <p onClick={() => handleClickSelectButton(true)}>OLD</p>
          <p onClick={() => handleClickSelectButton(false)}>NEW</p>
        </div>
        <ul className="space-y-4">
          {getPosts?.map((posts) => (
            <li
              key={posts.postId}
              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Link href={`/community/post/${posts?.postId}`}>
                <p className="text-xl font-semibold text-white">
                  {posts.title}
                </p>
                <p className="text-base text-gray-400">{posts.content}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  );
}

export default ViewCommunityPosts;
