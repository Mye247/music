import { supabase } from "@/supabase/client";

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

const profileApi = {
  getUserProfile,
  getUserPosts,
};

export default profileApi;
