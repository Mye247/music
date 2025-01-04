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

const getUserApi = {
  getUser,
};

export default getUserApi;
