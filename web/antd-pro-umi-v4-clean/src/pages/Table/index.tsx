import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

interface RowData {
  name: string;
  nickName: string;
  gender: 0 | 1 | 2;
}

function getRandomNumber(): 0 | 1 | 2 {
  return Math.floor(Math.random() * 3) as 0 | 1 | 2;
}

const mockGetUsers = (amount: number): RowData[] => {
  const users: RowData[] = [];
  for (let index = 0; index < amount; index++) {
    users.push({ name: index.toString(), nickName: `${index.toString()}a`, gender: getRandomNumber() });
  }
  return users;
}

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<RowData>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      tip: '名称是唯一的 key',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInForm: true,
      valueEnum: {
        0: { text: 'male', status: 'MALE' },
        1: { text: 'female', status: 'FEMALE' },
        2: { text: 'other', status: 'OTHER' },
      },
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'CRUD 示例',
      }}
    >
      <ProTable<RowData>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sorter, filter) => {
          const data = mockGetUsers(20);
          return {
            data: data || [],
            success: true,
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
