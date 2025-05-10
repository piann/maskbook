'use client';  

import styled from "styled-components";

const Wrapper = styled.div`
  /* 전체 뷰포트를 덮는 파란색 배경 */
  min-height: 100vh;
  background-color: royalblue;
  color: white;

  /* 가운데 정렬을 위해 flex 사용 (선택 사항) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <Wrapper>
      <main>메인입니다</main>
      <footer>Footer 영역입니다</footer>
    </Wrapper>
  );
}