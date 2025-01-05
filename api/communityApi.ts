import { supabase } from "@/supabase/client";

/**
 * 커뮤니티 글 전부 가져오기
 */
const getCommunityPosts = async () => {
  const response = await supabase.from("community").select("*");
  const data = response.data;

  return data;
};

/**
 * 내가 작성한 글 삭제하기
 * @param userId 내 아이디
 * @returns
 */
const deleteCommunityPost = async (userId: string) => {
  const response = await supabase
    .from("community")
    .delete()
    .eq("userId", userId);

  const data = response.data;

  return data;
};

/**
 * 내가 작성한 글 수정하기
 * @param id 글 id
 * @param content 수정할 내용
 * @returns
 */
const updateCommunityPost = async (id: string, content: string) => {
  const response = await supabase
    .from("community")
    .update({ content })
    .eq("id", id);

  if (response.error) {
    console.error("에러", response.error.message);
    return null;
  }

  return response.data;
};

/**
 * 내가 글 작성하기
 * @param data userId: string, title: string, content: string
 * @returns
 */
const createCommunityPost = async (data: {
  userId: string;
  title: string;
  content: string;
}) => {
  const response = await supabase.from("community").insert(data);

  return response.data;
};

const communityApi = {
  getCommunityPosts,
  deleteCommunityPost,
  updateCommunityPost,
  createCommunityPost,
};

export default communityApi;
