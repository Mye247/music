import { supabase } from "@/supabase/client";
import unifiedAPI from "./unifiedAPI";
import { toast } from "react-toastify";

/**
 * 상점 페이지 정보 가져오기
 * @returns
 */
const getStoreItems = async () => {
  const response = await supabase.from("store").select("*");

  const data = response.data;

  return data;
};

/**
 * 상점 페이지 목록 구매하기
 */
const buyStoreItem = async (itemId: number, price: number) => {
  const user = await unifiedAPI.getUserApi.getLoggedInUserData();

  if (!user) return toast.error("로그인 후 이용하실 수 있는 서비스입니다.");

  const userId = user.userId;

  // 스토어에서 내가 사려는 아이템 정보 가져오기
  const response = await supabase
    .from("store")
    .select("*")
    .eq("itemId", itemId)
    .single();

  const store = response.data;

  if (!store) return console.error("store 정보가 없습니다");

  // 유저 보유 포인트가 가격보다 많다면 구매
  if (store?.price <= user.userActivityPoints) {
    const result = await supabase.from("userItems").insert({ itemId, userId });

    if (!result) return console.error("에러입니다.");

    // 현재 유저가 보유한 포인트 - 상품 가격
    const updatedPoints = user.userActivityPoints - price;

    // 유저 보유 포인트 업데이트
    await supabase
      .from("users")
      .update({ userActivityPoints: updatedPoints })
      .eq("userId", userId);
  } else {
    // 유저 보유 포인트가 가격보다 적다면 실패
    return toast.error("보유중인 포인트가 부족합니다.");
  }

  return toast.success("상품 구매에 성공하셨습니다.");
};

const storeApi = {
  getStoreItems,
  buyStoreItem,
};

export default storeApi;
