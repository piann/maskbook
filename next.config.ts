import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // styled-components용 SWC 트랜스폼 활성화
    styledComponents: true,
    // 필요하면 추가 세부 옵션
    // ssr: true,          // 기본값 true
    // displayName: true,  // 기본값 true
    // minify: false,      // 기본값 false
  },
};

export default nextConfig;