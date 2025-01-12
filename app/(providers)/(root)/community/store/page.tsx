"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function PointStorePage() {
  // 상점 페이지 정보 가져오기
  const { data: storeItems } = useQuery({
    queryKey: ["storeItems"],
    queryFn: async () => {
      const result = await unifiedAPI.storeApi.getStoreItems();

      return result || [];
    },
  });

  const handleClickBuyItemButton = async (itemId: number, price: number) => {
    const response = await unifiedAPI.storeApi.buyStoreItem(itemId, price);
    if (!response) return console.error("실패");
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 ml-7">포인트 상점</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeItems?.map((item) => (
            <div
              key={item.itemId}
              className="bg-gray-800 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {item.itemName}
                </h2>
                <p className="text-gray-400 mb-4">{item.itemDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-400">
                    {item.price} pt
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                    onClick={() =>
                      handleClickBuyItemButton(item.itemId, item.price)
                    }
                  >
                    구매하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PointStorePage;
