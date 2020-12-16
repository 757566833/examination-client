import React, {useState} from 'react';
import {useLocation} from 'react-router';
import * as H from 'history';
import {getParams} from '@/util/url';
import {useLoading} from '@/hooks/common/loading';
import {getNoteById, IText} from '@/service/note';
import Markdown from '@/components/extended/markdown/Markdown';
import {useEffectOnce} from '@/hooks/common';
import {Typography, Skeleton, Tag, Avatar} from 'antd';
import {timeRender} from '@/util/time';
import Line from '@/components/custom/line/Line';

const Text: React.FC = () => {
  const aaa: H.Location = useLocation<H.LocationState>();
  console.log(getParams(aaa.search));
  const json = getParams<{ id: string }>(aaa.search);
  const [loadMarkdown, loading] = useLoading(getNoteById);
  const [markdown, setMarkdown] = useState<IText>({
    tid: -1,
    avatar: '',
    username: '',
    category: '',
    title: '',
    subTitle: '',
    tags: [],
    description: '',
    text: '',
    create_time: '',
    update_time: '',
  });
  const getData = async () => {
    const res = await loadMarkdown(json.id);
    setMarkdown(res.data);
  };
  useEffectOnce(() => {
    getData().then();
  });
  return <div>
    <div style={{margin: '0 auto', width: 980}}>
      <Skeleton
        loading={loading}
        active
        paragraph={{
          rows: 20,
        }}
      >
        <div style={{padding: '25px 45px'}}>
          <Typography>
            <Typography.Title>
              {markdown.title}
            </Typography.Title>
            {markdown.tags.map((item) => {
              return <Typography.Text key={item}><Tag>{item}</Tag></Typography.Text>;
            })}
            <Typography.Text>
              <div className="flex">
                <div>
                  <Avatar
                    src={markdown.avatar}
                    size={60}
                  />
                </div>
                <div>
                  <div>{markdown.username}</div>
                  <div>{timeRender(markdown.create_time)}</div>
                </div>
              </div>
            </Typography.Text>
          </Typography>
        </div>
        <Line/>
        <Markdown value={markdown.text}/>
      </Skeleton>
    </div>
  </div>;
};
export default Text;
