"use client";
export const dynamic = 'force-dynamic';

import React, { Suspense } from "react";
import SearchResultContent from "./SearchResultContent";

export default function SearchResult() {
  return (
    <Suspense fallback={<p className="text-white">Loading...</p>}>
      <SearchResultContent />
    </Suspense>
  );
}
