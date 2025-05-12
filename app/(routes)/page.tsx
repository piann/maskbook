'use client'

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../_components/layout';
import useSWR from 'swr';
import { Post } from '@/lib/generated/prisma'; 
import { formatDate } from '@/lib/utils';

interface PostResponse{
  ok:boolean;
  postList: Post[];
}

export default function Home() {

  const { data, error, isLoading } = useSWR<PostResponse>('/api/post')

  return (
    <Layout>
          {/* ------- 좌측 영역 ------- */}
          <LeftPanel>
          <SearchBox placeholder="Search…" />

          <PopularArea>
            <PopularHeading>
              <span role="img">
                🎵
              </span>
              <div>
                {"Popular"}
              </div>
            </PopularHeading>

            <Separator />

            <List>
              {!isLoading && !error && data?.ok && data?.postList.map(({ id, title, createdAt }) => (
                <SLink href={`/post/${id}`} key={id}>
                  <ListRow>
                    <span>{title}</span>
                    <span>{formatDate(createdAt)}</span>
                  </ListRow>
                </SLink>
              ))}
            </List>
          </PopularArea>
        </LeftPanel>

        {/* ------- 우측 영역 ------- */}
        <RightPanel>
          {/* 광고 */}
          <Image
          src="/ad.png"
          alt="광고"
          fill
        />
        </RightPanel>

    </Layout>
  );
}

/* ---------------- styled-components ---------------- */

const MainBody = styled.div`
  display: flex;
  justify-content:center;
  gap: 3rem;
  margin: 3rem auto;
`;

/* ---------- 좌측 ---------- */

const LeftPanel = styled.section`
  width:100%;
  display: flex;
  flex-direction: column;
  margin-right:2rem;
`;

const SearchBox = styled.input`
  height: 48px;
  border: 2px solid #000;
  border-radius: 999px;
  padding: 0 1.2rem;
  font-size: 1rem;
  &::placeholder {
    color: #666;
  }
`;

const PopularArea = styled.div`
  margin-top: 2.5rem;
`;

const PopularHeading = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.8rem 0;
`;

const Separator = styled.div`
  height: 2px;
  background: #a06a1d;
  width: 100%;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListRow = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.9rem 0.1rem;
  font-size: 0.9rem;
  border-bottom: 1px solid #e4e4e4;
`;

/* ---------- 우측 ---------- */

const RightPanel = styled.aside`
  aspect-ratio:1/2;
  position: relative;    /* <Image fill> 필수 */
  border: 1px solid rgba(0, 0, 0, 0.2);  /* 얕은 검은색 경계선 */
  border-radius: 4px;                     /* 라운드 모서리 */
  cursor: pointer;
  width:370px;
`;

const SLink = styled(Link)`
  color: inherit;        /* 부모 글자색 물려받기 */
  text-decoration: none; /* 밑줄 제거 */
`;