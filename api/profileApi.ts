import { Database } from "@/database.types";
import { supabase } from "@/supabase/client";
import { nanoid } from "nanoid";

/**
 * 유저 프로필 페이지 정보 가져오기
 * @param userId 클릭한 이름의 유저 아이디
 */
const getUserProfile = async (userId: string) => {
  const response = await supabase
    .from("users")
    .select("*")
    .eq("userId", userId)
    .single();

  const data = response.data;

  return data;
};

/**
 * 프로필 유저가 작성한 post 전부 불러오기
 * @param userId 프로필 유저 아이디
 * @returns
 */
const getUserPosts = async (userId: string, typeBoolean: boolean) => {
  const response = await supabase
    .from("community")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: typeBoolean });

  const data = response.data;

  return data;
};

/**
 * 프로필 정보 수정하기
 * @param userName
 * @param introduction
 */
const editUserProfile = async (
  image: File | null,
  userId: string,
  userProfileImage: string,
  userName: string,
  userIntroduction: string
) => {
  let imageUrl = userProfileImage;

  if (image) {
    const uploadImage = await supabase.storage
      .from("userProfiles")
      .upload(nanoid(), image, { upsert: true });

    imageUrl = String(uploadImage.data?.fullPath);
  }

  const data: Database["public"]["Tables"]["users"]["Update"] = {
    userName,
    userIntroduction,
    userProfileImage: imageUrl,
  };

  // 유저 테이블 업데이트
  const [response1, response2, response3] = await Promise.all([
    supabase.from("users").update(data).eq("userId", userId),
    supabase.from("comment").update({ userName }).eq("userId", userId),
    supabase.from("community").update({ userName }).eq("userId", userId),
  ]);

  return true;
};

const profileApi = {
  getUserProfile,
  getUserPosts,
  editUserProfile,
};

export default profileApi;
