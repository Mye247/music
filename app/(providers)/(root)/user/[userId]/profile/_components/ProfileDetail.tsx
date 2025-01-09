"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { configs } from "@/config/config";
import { useModalStore } from "@/zustand/modalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";

interface ProfileDetailProps {
  userId: string;
}

interface userPosts {
  bed: number | null;
  content: string;
  createdAt: string;
  good: number;
  postId: number;
  title: string;
  userId: string | null;
  userName: string;
}

function ProfileDetail({ userId }: ProfileDetailProps) {
  const queryClient = useQueryClient();

  const openModal = useModalStore((state) => state.openModal);

  const [userPosts, setUserPosts] = useState<userPosts[] | null>(null);

  const [typeBoolean, setTypeBoolean] = useState(false);

  const { data: loginUser } = useQuery({
    queryKey: ["loginUser"],
    queryFn: async () => {
      const result = await unifiedAPI.getUserApi.getUser();

      return result;
    },
  });

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", { userId: userId }],
    queryFn: async () => {
      const response = await unifiedAPI.profileApi.getUserProfile(userId);
      return response;
    },
  });

  const { data } = useQuery({
    queryKey: ["userPosts", { userId: userId }],
    queryFn: async () => {
      const response = await unifiedAPI.profileApi.getUserPosts(
        userId,
        typeBoolean
      );

      setUserPosts(response);
      return response;
    },
  });

  // post 정렬 버튼
  const handleClickSelectedButton = (typeBoolean: boolean) => {
    selectPost(typeBoolean);
  };

  const { mutate: selectPost } = useMutation({
    mutationFn: async (typeBoolean: boolean) => {
      setTypeBoolean(typeBoolean);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userPosts", { userId: userId }],
      });
    },
  });

  // 수정 모달 열기
  const handleClickOpenEditModal = () => {
    if (!userProfile) return;
    else {
      openModal({
        element: <ProfileEditModal userProfile={userProfile} />,
        backdrop: true,
      });
    }
  };

  return userProfile ? (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      {/* 헤더 */}
      <header className="bg-gray-800 py-4 px-6 shadow-md">
        <h2 className="text-2xl font-semibold">
          {userProfile.userName}님의 프로필
        </h2>
      </header>

      {/* 메인 컨테이너 */}
      <div className="container mx-auto mt-8 px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 유저 정보 카드 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={`${configs.baseURL + userProfile.userProfileImage}`}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {userProfile?.userName} 님
                  </h2>
                  <p className="text-gray-400">@{userProfile?.userName}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <p>
                  <span>소개: {userProfile.userIntroduction}</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">가입일: </span>
                  {new Date(userProfile!.createdAt).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">레벨:</span> 15
                </p>
                <p>
                  <span className="font-semibold text-gray-300">
                    활동 포인트:
                  </span>
                  1,234P
                </p>
              </div>
            </div>
            {/* 로그인한 유저와 프로필 유저 아이디가 같다면 표시 */}
            {loginUser?.id === userProfile.userId ? (
              <button
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                onClick={handleClickOpenEditModal}
              >
                프로필 수정
              </button>
            ) : null}
          </div>

          {/* 활동 탭 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
            <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
              <h3 className="text-xl font-semibold ">My Posts</h3>
              <div className="flex gap-3 text-sm">
                <p onClick={() => handleClickSelectedButton(true)}>OLD</p>
                <p onClick={() => handleClickSelectedButton(false)}>NEW</p>
              </div>
            </div>

            <ul className="space-y-4 overflow-y-scroll max-h-[400px]">
              {userPosts?.map((post) => (
                <li
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
                  key={post.postId}
                >
                  <Link href={`/community/post/${post.postId}`}>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-sm text-gray-400">{post.content}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>유저 정보가 존재하지 않습니다</div>
  );
}

export default ProfileDetail;
