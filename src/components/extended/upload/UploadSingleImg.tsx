import React, {useState} from 'react';
import {Upload, Button, message} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {httpUrl} from '@/config/url';
import {UploadProps} from 'antd/lib/upload/interface';
import {useLocalStorage} from '@/hooks/context';
import ImgCrop from 'antd-img-crop';

export interface IUploadSingleImg {
  value?: string
  onChange?: (url: string) => void
}

const UploadSingleImg: React.FC<IUploadSingleImg> = (props) => {
  const [token] = useLocalStorage('token');
  const [loading, setLoading] = useState(false);
  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.png,.jpg,.jpeg,.bmp',
    action: `${httpUrl}/file/upload/form`,
    headers: {
      authorization: token,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        setLoading(true);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        console.log(info);
        props.onChange && props.onChange(info.file.response || '');
        setLoading(false);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
        setLoading(false);
      }
    },
    showUploadList: false,
  };
  return <ImgCrop
    rotate={true}
    modalOk="确定"
    modalCancel="取消"
    modalTitle={'截取图片'}
    aspect={272}
  >
    <Upload {...uploadProps}>
      {props.children ? props.children : <Button loading={loading} size='small' icon={<UploadOutlined/>}></Button>}
    </Upload>
  </ImgCrop>;
};
export default UploadSingleImg;
