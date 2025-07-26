'use client';

import { Spinner, TextInput, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Concert, useConcertListQuery } from '../src/__generated__/graphql';
import { DEFAULT_LIMIT, DEFAULT_ORDER_BY_CREATED_AT, DEFAULT_PAGE } from '../utils/constants';

const columnHelper = createColumnHelper<Concert>();

export function RootPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams?.get('page');
  const limitParam = searchParams?.get('limit');
  const [page, setPage] = useState<number>(pageParam ? +pageParam : DEFAULT_PAGE);
  const [limit, setLimit] = useState<number>(limitParam ? +limitParam : DEFAULT_LIMIT);
  const [orderBy, setOrderBy] = useState<{
    createdAt: 'asc' | 'desc';
  }>({
    createdAt: DEFAULT_ORDER_BY_CREATED_AT,
  });
  const { data, loading: loadingConcertList } = useConcertListQuery({
    variables: {
      page,
      limit,
      orderBy,
    },
  });
  const [jumpPage, setJumpPage] = useState<string>('');

  useEffect(() => {
    setPage(pageParam ? +pageParam : DEFAULT_PAGE);
    setLimit(limitParam ? +limitParam : DEFAULT_LIMIT);
  }, [pageParam, limitParam]);

  const columns = useMemo(
    () => [
      // columnHelper.display({
      //   id: 'actions',
      //   header: () => <input type="checkbox" />,
      //   cell: (props) => <input type="checkbox" />,
      // }),
      columnHelper.accessor((row) => row.id, {
        id: 'id',
        header: () => (
          <span>
            id
            {/* <span
              onClick={() => {
                setOrderBy((prev) => ({
                  ...prev,
                  createdAt: prev.createdAt === 'asc' ? 'desc' : 'asc',
                }))
              }}
              style={{ cursor: 'pointer' }}
            >
              ⬆️⬇️
            </span> */}
          </span>
        ),
        cell: (info) => info.getValue(),
        // footer: (info) => info.column.id,
      }),
      // columnHelper.accessor((row) => row.concertCategory, {
      //   id: 'concertCategory',
      //   header: () => <span>카테고리</span>,
      //   cell: (info) => info.getValue().title,
      //   // footer: (info) => info.column.id,
      // }),
      columnHelper.accessor((row) => row.createdAt, {
        id: 'createdAt',
        header: () => (
          <span>
            등록일{' '}
            <span
              onKeyUp={() => {}}
              onClick={() => {
                setOrderBy((prev) => ({
                  ...prev,
                  createdAt: prev.createdAt === 'asc' ? 'desc' : 'asc',
                }));
              }}
              style={{ cursor: 'pointer' }}
            >
              ⬆️⬇️
            </span>
          </span>
        ),
        cell: (info) => format(new Date(info.getValue()), 'yyyy-MM-dd hh:mm a'),
        footer: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.title, {
        id: 'title',
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>공연 제목</span>,
        footer: (info) => info.column.id,
      }),
      // columnHelper.accessor((row) => row.artist, {
      //   id: 'artist',
      //   header: () => <span>아티스트</span>,
      //   cell: (info) => info.renderValue(),
      //   footer: (info) => info.column.id,
      // }),
      columnHelper.accessor((row) => row.date, {
        id: 'date',
        header: () => <span>공연 일정</span>,
        cell: (info) => {
          const value = info.getValue();
          return value
            ? format(new Date(value), 'yyyy-MM-dd hh:mm a')
            : '등록된 공연일정이 없습니다.';
        },
        footer: (info) => info.column.id,
      }),
    ],
    []
  );

  const tableData = useMemo(() => {
    if (!data?.concertList) return [] as Concert[];
    switch (data.concertList.__typename) {
      case 'HttpError':
        return [] as Concert[];
      case 'ConcertListWithPagination':
        return data.concertList.list?.list ?? [];
      default:
        return [] as Concert[];
    }
  }, [data]);

  const pageCount = useMemo(() => {
    if (!data || data.concertList?.__typename !== 'ConcertListWithPagination') {
      return 0;
    }
    return data.concertList.pagination?.count ?? 0;
  }, [data]);

  const pagination = useMemo(
    () => ({
      pageIndex: page,
      pageSize: limit,
    }),
    [limit, page]
  );

  const table = useReactTable<Concert>({
    data: tableData.filter((value) => value !== null) as Concert[],
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: {
      pagination,
    },
    debugTable: process.env.NODE_ENV === 'development',
  });

  const onClickNavigatePage = useCallback(
    (targetPage: number) => {
      router.push(`/?page=${targetPage}&limit=${limit}`);
    },
    [router, limit]
  );

  return (
    <Wrapper>
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  <Link href={`/concert/${tableData.at(index)?.id}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Link>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <TableBottom>
        <PaginationWrapper>
          <PaginationButton
            onClick={() => {
              if (page - 1 < 1) {
                return;
              }
              onClickNavigatePage(page - 1);
            }}
          >
            👈
          </PaginationButton>
          <PageInfo>
            {page} / {table.getPageCount()}
          </PageInfo>
          <PaginationButton
            onClick={() => {
              if (page + 1 > pageCount) {
                return;
              }
              onClickNavigatePage(page + 1);
            }}
          >
            👉
          </PaginationButton>
        </PaginationWrapper>
        <TextInput
          placeholder="페이지로 이동하기"
          value={jumpPage}
          onChange={(event) => setJumpPage(event.target.value)}
          onKeyPress={(e) => {
            if (e.key !== 'Enter') {
              return;
            }
            const numberJumpPage = +jumpPage;
            if (Number.isNaN(numberJumpPage)) {
              alert('숫자를 입력해주세요');
              return;
            }
            onClickNavigatePage(numberJumpPage);
          }}
        />
      </TableBottom>
      {loadingConcertList && <Spinner variant="page-overlay" />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Table = styled.table`
  margin-top: 60px;
  background-color: ${semantics.color.background[3]};
  width: 90vw;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 3px;
`;
const Thead = styled.thead``;
const Tr = styled.tr`
  & + & {
    border-top: 1px solid ${semantics.color.border[1]};
  }
`;
const Th = styled.th`
  height: 50px;
  padding-left: 8px;
  padding-right: 8px;
  border-bottom: 1px solid ${semantics.color.border[1]};

  & + & {
    border-left: 1px solid ${semantics.color.border[1]};
  }
`;
const Tbody = styled.tbody``;
const Td = styled.td`
  height: 52px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: ${semantics.color.background[3]};
  &:hover {
  }
  & + & {
    border-left: 1px solid ${semantics.color.border[1]};
  }
  cursor: pointer;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const PaginationButton = styled.span`
  font-size: 30px;
  cursor: pointer;
`;

const PageInfo = styled.span`
  margin-left: 8px;
  margin-right: 8px;
  font-size: 20px;
`;

const TableBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  width: 90vw;
`;
