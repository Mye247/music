"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function PointStorePage() {
  const storeItemss = [
    {
      id: 1,
      name: "프로필 배경 변경",
      price: 1000,
      description: "프로필 배경을 커스텀할 수 있습니다.",
    },
    {
      id: 2,
      name: "특별 이모티콘 세트",
      price: 500,
      description: "채팅에서 사용 가능한 특별 이모티콘",
    },
    {
      id: 3,
      name: "닉네임 색상 변경",
      price: 800,
      description: "닉네임 색상을 원하는 색으로 변경",
    },
  ];

  // 상점 페이지 정보 가져오기
  const { data: storeItems } = useQuery({
    queryKey: ["storeItems"],
    queryFn: async () => {
      const result = await unifiedAPI.storeApi.getStoreItems();

      return result;
    },
  });

  console.log(storeItems);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 ml-7">포인트 상점</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeItemss.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 backdrop-blur-sm rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {item.name}
                </h2>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-400">
                    {item.price} P
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
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
