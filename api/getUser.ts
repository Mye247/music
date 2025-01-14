import { supabase } from "@/supabase/client";

/**
 * 현재 로그인한 유저의 정보
 * @returns
 */
const getUser = async () => {
  const response = await supabase.auth.getUser();
  const data = response.data.user;
  return data;
};

/**
 * 현재 로그인한 사용자의 테이블 정보
 * @returns
 */
const getLoggedInUserData = async () => {
  const user = await getUser();

  if (!user) return;

  const userId = user?.id;

  const response = await supabase
    .from("users")
    .select("*")
    .eq("userId", userId)
    .single();

  const data = response.data;

  return data;
};

const getUserApi = {
  getUser,
  getLoggedInUserData,
};

export default getUserApi;
