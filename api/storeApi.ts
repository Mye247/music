import { supabase } from "@/supabase/client";

/**
 * 상점 페이지 정보 가져오기
 * @returns
 */
const getStoreItems = async () => {
  const response = await supabase.from("store").select("*");

  const data = response.data;

  return data;
};

const storeApi = {
  getStoreItems,
};

export default storeApi;
