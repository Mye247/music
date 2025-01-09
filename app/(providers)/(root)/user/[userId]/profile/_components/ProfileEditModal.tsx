"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useModalStore } from "@/zustand/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { ComponentProps, useState } from "react";
import { toast } from "react-toastify";

interface ProfileEditModalProps {
  userProfile: userProfileType;
}

interface userProfileType {
  createdAt: string;
  id: number;
  userEmail: string;
  userId: string;
  userIntroduction: string;
  userName: string;
  userProfileImage: string;
}

function ProfileEditModal({ userProfile }: ProfileEditModalProps) {
  const queryClient = useQueryClient();

  // 수정용 State
  const [userName, setUserName] = useState(userProfile.userName);
  const [userIntroduction, setUserIntroduction] = useState(
    userProfile.userIntroduction
  );

  // 이미지 State
  const [image, setImage] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState<string | null>("");

  console.log(image, previewProfile);

  // 상태 불러오기
  const closeModal = useModalStore((state) => state.closeModal);

  // 바깥영역 클릭시 나가짐
  const handleToggleModal = () => {
    closeModal();
  };

  // 수정 버튼
  const { mutate } = useMutation({
    mutationFn: async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!userProfile) return;
      const result = await unifiedAPI.profileApi.editUserProfile(
        image,
        userProfile.userId,
        userProfile.userProfileImage,
        userName,
        userIntroduction
      );

      if (result) {
        toast.success("프로필 수정에 성공하셨습니다.");
        closeModal();
      } else {
        return result;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", { userId: userProfile.userId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["userPosts", { userId: userProfile.userId }],
      });
    },
  });

  const handleClickEditProfileButton = (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    mutate(e);
  };

  // 이미지 가져오기
  const handleChangeFileInput: ComponentProps<"input">["onChange"] = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setImage(null);
      return;
    }

    const file = files[0];
    const previewProfile = URL.createObjectURL(file);

    setImage(file);
    setPreviewProfile(previewProfile);

    // 이전 URL 정리
    return () => {
      URL.revokeObjectURL(previewProfile);
    };
  };

  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 w-[500px] h-[550px] bg-gradient-to-b from-gray-800 to-black -translate-x-1/2 -translate-y-1/2 rounded-2xl text-white shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center mt-4 font-semibold text-3xl">프로필 수정</h3>
        <form className="flex items-center justify-center flex-col gap-6 mt-6">
          <div className="relative w-full h-[100px] bg-gray-800 rounded-lg">
            <input
              className="w-full h-full opacity-0 absolute top-0 left-0 z-10"
              type="file"
              id="profileImg"
              onChange={(e) => handleChangeFileInput(e)}
            />
            {/* 이미지 미리보기 */}
            {previewProfile && (
              <img
                alt="프리뷰 이미지"
                src={previewProfile}
                className="z-0 w-full h-full absolute top-0 rounded-full object-cover group-hover:brightness-50"
              />
            )}
          </div>

          <div className="grid w-full text-white">
            <label htmlFor="userName" className="mb-1 text-lg">
              이름
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border w-full px-6 py-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 border-slate-500 text-white bg-gray-800"
            />
          </div>

          <div className="grid w-full text-white">
            <label htmlFor="introduction" className="mb-1 text-lg">
              소개글
            </label>
            <input
              type="text"
              id="introduction"
              value={userIntroduction}
              onChange={(e) => setUserIntroduction(e.target.value)}
              className="border w-full px-6 py-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 border-slate-500 text-white bg-gray-800"
            />
          </div>

          <button
            onClick={(e) => handleClickEditProfileButton(e)}
            className="border border-white bg-blue-700 text-white w-full h-[60px] mt-10 hover:scale-105 transition-all rounded-lg shadow-md"
          >
            수정하기
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileEditModal;
