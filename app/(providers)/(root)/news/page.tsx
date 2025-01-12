"use client";

import unifiedAPI from "@/api/unifiedAPI";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function NewsPage() {
  const { data: getUltraSrtNcst } = useQuery({
    queryKey: ["getUltraSrtNcst"],
    queryFn: async () => {
      const result = await unifiedAPI.publicApi.getUltraSrtNcst();

      return result || [];
    },
  });

  console.log(getUltraSrtNcst);

  return <div></div>;
}

export default NewsPage;
