import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, Button, Form, List, message, Divider, Select} from 'antd';
// import {addColumn, IAddColumn, IColumn} from '@/service/note';
import {useLoading} from '@/hooks/common/loading';
import {getUserList, IAccount} from '@/service/auth';
import {useEffectOnce} from '@/hooks/common';
import {IList} from '@/service/interface';
import {ColumnsType} from 'antd/lib/table/interface';
import {ERegisterType} from '@/enum/auth';
import {
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import {timeRender} from '@/util/time';

const UserList: React.FC = () => {
  const [selected, setSelected] = useState<IAccount | undefined>(undefined);
  const [users, setUsers] = useState<IAccount[]>([]);
  const [loadUsers, loading] = useLoading<IList<IAccount[]>>(getUserList);
  const getList = async () => {
    const res = await loadUsers({
      page: 1,
      pageSize: 10,
    });
    console.log(res);
    setUsers(res.data.list);
  };
  const enabledRender = (t: 0 | 1, record: IAccount) => {
    if (selected?.uid == record.uid && record.authority != 'ADMIN') {
      return <Select size='small' value={selected.enabled} onChange={(e) => setSelected({...selected, enabled: e})}>
        <Select.Option value={1}>是</Select.Option>
        <Select.Option value={0}>否</Select.Option>
      </Select>;
    }
    return t ? <Tag color='green'>是</Tag> : <Tag color='red'>否</Tag>;
  };
  const lockedRender = (t: 0 | 1, record: IAccount) => {
    if (selected?.uid == record.uid && record.authority != 'ADMIN') {
      return <Select size='small' value={selected.locked} onChange={(e) => setSelected({...selected, locked: e})}>
        <Select.Option value={1}>是</Select.Option>
        <Select.Option value={0}>否</Select.Option>
      </Select>;
    }
    return t ? <Tag color='red'>是</Tag> : <Tag color='green'>否</Tag>;
  };

  const isDeleteRender = (t: 1 | 0) => {
    return t ? <Tag color='red'>是</Tag> : <Tag color='green'>否</Tag>;
  };
  const authorityRender = (t: 'USER' | 'ADMIN', record: IAccount) => {
    if (selected?.uid == record.uid) {
      return <Select size='small' value={selected.authority}
        onChange={(e) => setSelected({...selected, authority: e})}>
        <Select.Option value={'ADMIN'}>admin</Select.Option>
        <Select.Option value={'USER'}>user</Select.Option>
      </Select>;
    }
    return <Tag color={t == 'ADMIN' ? '#2db7f5' : '#87d068'}>{t}</Tag>;
  };
  const onChange = () => {
    //
  };
  const operation = (_text: undefined, account: IAccount) => {
    if (selected != undefined && selected.uid == account.uid) {
      return <>
        <Button size='small' type='primary' onClick={onChange}>保存</Button>
        <Divider type='vertical'/>
        <Button size='small' onClick={() => setSelected(undefined)}>取消</Button>
      </>;
    }
    return <><EditTwoTone onClick={() => setSelected(account)}/>{account.authority != 'ADMIN' && <><Divider
      type='vertical'/><DeleteTwoTone/></>}</>;
  };
  const columns: ColumnsType<IAccount> = [
    {
      title: '账号',
      align: 'center',
      dataIndex: 'account',
      key: 'account',
      width: 200,
      fixed: 'left',
    },
    {
      title: '昵称',
      align: 'center',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      fixed: 'left',
    },

    {
      title: '是否可用',
      align: 'center',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 80,
      render: enabledRender,
    },
    {
      title: '是否锁定',
      align: 'center',
      dataIndex: 'locked',
      key: 'locked',
      width: 80,
      render: lockedRender,
    },
    {
      title: '是否删除',
      align: 'center',
      dataIndex: 'is_delete',
      key: 'is_delete',
      width: 80,
      render: isDeleteRender,
    },

    {
      title: '注册方式',
      align: 'center',
      dataIndex: 'register_type',
      key: 'register_type',
      width: 80,
      render: (t) => ERegisterType[t],
    },
    {
      title: '创建时间',
      align: 'center',
      dataIndex: 'create_time',
      key: 'create_time',
      render: timeRender,
      width: 200,
    },
    {
      title: '更新人',
      align: 'center',
      dataIndex: 'update_by',
      key: 'update_by',
      width: 200,
    },
    {
      title: '更新时间',
      align: 'center',
      dataIndex: 'update_time',
      key: 'update_time',
      render: timeRender,
      width: 200,
    },
    {
      title: '权限',
      align: 'center',
      dataIndex: 'authority',
      key: 'authority',
      width: 200,
      render: authorityRender,
    },
    {
      title: '删除人',
      align: 'center',
      dataIndex: 'delete_by',
      key: 'delete_by',
      width: 160,
    },
    {
      title: '删除时间',
      align: 'center',
      dataIndex: 'delete_time',
      key: 'delete_time',
      width: 160,
      render: timeRender,
    },
    {
      title: '修改',
      align: 'center',
      dataIndex: 'operation',
      key: 'operation',
      width: 160,
      fixed: 'right',
      render: operation,
    },
  ];
  useEffectOnce(() => {
    getList().then();
  });
  // useEffect(() => {
  //   getList();
  // }, []);
  return <div>
    {/* <List*/}
    {/*  loading={loading}*/}
    {/*  itemLayout="vertical"*/}
    {/*  size="large"*/}
    {/*  // className={styles.list}*/}
    {/*  pagination={false}*/}
    {/*  dataSource={users}*/}
    {/*  renderItem={(item) => (*/}
    {/*    // <div>{JSON.stringify(item)}</div>*/}
    {/*    <ListItem item={item} onSelected={setSelected} selected={selected || ''}/>*/}
    {/*  )}*/}
    {/* />*/}
    <Table
      size='small'
      rowKey='uid'
      loading={loading}
      bordered={true}
      columns={columns}
      dataSource={users}
      scroll={{x: 2200}}
    />
  </div>;
};
export default UserList;
