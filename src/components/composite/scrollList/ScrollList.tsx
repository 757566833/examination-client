// import React, {useState} from 'react';
// import {List} from 'antd';
// import InfiniteScroll from 'react-infinite-scroller';
// import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
// import IconText from '../../extended/IconText';
// import {IResponse} from '@/http';
// import {IList} from '@/service/interface';
// import {useEffectOnce} from '@/hooks/common';
//
// interface IScrollListProps<T> {
//   getData: (params: { page: number, size: number }) => Promise<{ headers: Headers; text: IResponse<IList<T>> } | undefined> | undefined
// }
//
// /**
//  * 滚动列表
//  * @param {IScrollListProps} props
//  * @constructor
//  */
// const ScrollList = <T extends any>(props: IScrollListProps<T>) => {
//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [dataSource, setDataSource] = useState<T[]>([]);
//   const [page, setPage] = useState(1);
//   const handleInfiniteOnLoad = async () => {
//     setLoading(true);
//     const res = await props.getData({page: page + 1, size: 10});
//     setLoading(false);
//     if (res) {
//       const nextDataSource = [...dataSource, ...res.text.data.list];
//       setDataSource(nextDataSource);
//       if (nextDataSource.length == res.text.data.count) {
//         setHasMore(true);
//       }
//     }
//     setPage(page + 1);
//   };
//   useEffectOnce(() => {
//     props.getData({page, size: 10});
//   });
//
//   return <InfiniteScroll
//     initialLoad={false}
//     pageStart={0}
//     loadMore={handleInfiniteOnLoad}
//     hasMore={!loading && hasMore}
//     useWindow={false}
//   >
//     <List
//       itemLayout="vertical"
//       size="large"
//
//       dataSource={dataSource}
//       renderItem={(item: any) => (
//         <List.Item
//           key={item.title}
//           actions={[
//             <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
//             <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
//             <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
//           ]}
//           extra={
//             <img
//               width={224}
//               alt="logo"
//               src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//             />
//           }
//         >
//           <List.Item.Meta
//             title={<a href={item.href}>{item.title}</a>}
//             description={item.description}
//           />
//           {item.content}
//         </List.Item>
//       )}
//     />
//   </InfiniteScroll>;
// };
//
// export default ScrollList;
//
//
