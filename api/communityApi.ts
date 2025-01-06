import { supabase } from "@/supabase/client";

/**
 * 커뮤니티 글 전부 가져오기
 *
 * createdAt = 시간순, good = 인기순,
 *
 * false = 최신순, true = 예전순
 */
const getCommunityPosts = async (typeBoolean: boolean, typeColumn: string) => {
  const response = await supabase
    .from("community")
    .select("*")
    .order(typeColumn, { ascending: typeBoolean });
  const data = response.data;

  return data;
};

/**
 * 커뮤니티 상세 페이지
 * @param postId
 */
const getCommunityPost = async (postId: string) => {
  const response = await supabase
    .from("community")
    .select("*")
    .eq("postId", postId);

  const data = response.data;

  return data;
};

/**
 * 내가 작성한 글 삭제하기
 * @param postId 글 아이디
 * @returns
 */
const deleteCommunityPost = async (postId: string) => {
  const response = await supabase
    .from("community")
    .delete()
    .eq("postId", postId);

  const data = response.data;

  return data;
};

/**
 * 내가 작성한 글 수정하기
 * @param id 글 id
 * @param content 수정할 내용
 * @returns
 */
const updateCommunityPost = async (
  postId: string,
  title: string,
  content: string
) => {
  const response = await supabase
    .from("community")
    .update({ title, content })
    .eq("postId", postId);

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
  userName: string;
  title: string;
  content: string;
}) => {
  const response = await supabase.from("community").insert(data);

  return response.data;
};

/**
 * 해당 post의 댓글 리스트 가져오기
 * @param postId
 * @returns
 */
const getPostComments = async (postId: number) => {
  const response = await supabase
    .from("comment")
    .select("*")
    .eq("postId", postId);

  const data = response.data;

  return data;
};

/**
 * 글에 댓글 작성/수정하기
 * 댓글 작성은 postId 기준
 * 댓글 수정은 commentId 기준
 * 1 = 작성, 2 = 수정
 */
const createPostComment = async (
  postId: number,
  userId: string,
  content: string,
  commentId: string,
  typeNumber: number
) => {
  // 유저 이름 가져오기
  const response1 = await supabase
    .from("users")
    .select("*")
    .eq("userId", userId);
  const data1 = response1.data;

  if (!data1 || data1.length === 0) {
    console.error("유저를 찾을 수 없습니다.");
    return;
  }

  const userName = data1[0].userName;

  const data = {
    postId,
    userId,
    content,
    userName,
    commentId,
  };

  // 댓글 작성하기
  if (typeNumber === 2) {
    // 수정
    const response = await supabase
      .from("comment")
      .update(data)
      .eq("commentId", commentId);
    return response.data;
  } else if (typeNumber === 1) {
    // 작성
    const response = await supabase.from("comment").insert(data);
    return response.data;
  }
};

/**
 * 유저 이름 바꿀시 댓글 이름 갱신 (사용예정)
 * @param userId
 * @param newUserName
 */
const updateUserNameInComments = async (
  userId: string,
  newUserName: string
) => {
  const { error } = await supabase
    .from("comment")
    .update({ userName: newUserName })
    .eq("userId", userId);

  if (error) {
    console.error("Failed to update user name in comments:", error.message);
  }
};

/**
 * 추천/비추천 올리기
 * @param postId
 * @param good good은 1만큼만 올림
 * @param bed bed도 마찬가지
 * @returns
 */
const toggleVote = async (postId: string, vote: number) => {
  const response = await supabase
    .from("community")
    .select("good, bed")
    .eq("postId", postId)
    .single();

  const good = response.data?.good;
  const bed = response.data?.bed;

  if (vote === 1) {
    const response = await supabase
      .from("community")
      .update({ good: good! + 1 })
      .eq("postId", postId);

    const data = response.data;

    return data;
  } else if (vote === 2) {
    const response = await supabase
      .from("community")
      .update({ bed: bed! + 1 })
      .eq("postId", postId);

    const data = response.data;

    return data;
  } else {
    console.log("에러");
  }
};

const communityApi = {
  getCommunityPosts,
  getCommunityPost,
  createCommunityPost,
  deleteCommunityPost,
  updateCommunityPost,

  createPostComment,
  getPostComments,
  updateUserNameInComments,

  toggleVote,
};

export default communityApi;
