import React, {useCallback, useRef, useState} from 'react';
import {Button, Upload, Modal, message} from 'antd';
import ReactCrop, {Crop} from 'react-image-crop';

import {RcFile} from 'antd/es/upload';
import {downloadLocationBlob} from '@/util/download';
import {UploadProps} from 'antd/lib/upload/interface';
import {httpUrl} from '@/config/url';
import {useLocalStorage} from '@/hooks/context';
import {blob2File} from '@/util/file';
import {formDataUpload} from '@/service/file';

const getCroppedImg: (image: HTMLImageElement, crop: Required<Pick<Crop, 'width' | 'height' | 'x' | 'y'>>) => Promise<Blob> = (image, crop) => {
  if (!crop.width || !crop.height) {
    throw Error('宽或高不存在');
  }
  if (!crop.x || !crop.y) {
    throw Error('位置不存在');
  }
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: Blob | null) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          // console.error('Canvas is empty');
          // // eslint-disable-next-line prefer-promise-reject-errors
          // reject('error');
          return;
        }
        // blob.name = fileName;
        // const fileUrl = URL.createObjectURL(blob);
        // URL.revokeObjectURL(fileUrl);
        // resolve(fileUrl);
        resolve(blob);
      }, 'image/jpeg');
    });
}
;
const makeClientCrop = async (imageRef: HTMLImageElement | undefined, crop: Crop) => {
  if (!crop.width || !crop.height) {
    throw Error('宽或高不存在');
  }
  if (!crop.x || !crop.y) {
    throw Error('位置不存在');
  }
  if (!imageRef) {
    throw Error('图片加载失败');
  }
  const requiredCrop: Required<Pick<Crop, 'width' | 'height' | 'x' | 'y'>> = {
    width: crop.width,
    height: crop.height,
    x: crop.x,
    y: crop.y,
  };
  const croppedImageUrl: Blob = await getCroppedImg(
      imageRef,
      requiredCrop,
  );
  downloadLocationBlob(croppedImageUrl, 'test.jpg');
  return croppedImageUrl;
};

export interface IUploadSingleImgWithCrop {
  value?: string
  onChange?: (url: string) => void
}

const UploadSingleImgWithCrop: React.FC<IUploadSingleImgWithCrop> = (props) => {
  const [token] = useLocalStorage('token');
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>();
  const [visible, setVisible] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    width: 272,
    height: 272,
    aspect: 1 / 1,
  });
  const [file, setFile] = useState<RcFile>();
  const [fileObjectUrl, setFileObjectUrl] = useState<string>('');

  const onOk = async () => {
    const blob = await makeClientCrop(imageRef.current, crop);
    console.log(file);
    if (file && !file?.name.includes('.')) {
      throw Error('文件没后缀，有问题');
      return;
    }
    if (!file) {
      throw Error('没选文件');
      return;
    }
    const fileArray = file.name.split('.');
    const suffix = fileArray[fileArray.length - 1];
    const uploadFile = blob2File(blob, suffix, file?.type);
    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('file', uploadFile);
    setLoading(true);
    const res = await formDataUpload(formData);
    setLoading(false);
    message.success('上传成功');
  };
  const onCancel = () => {
    setVisible(false);
  };
  const onImageLoaded = useCallback((target: HTMLImageElement) => {
    imageRef.current = target;
  }, []);
  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.png,.jpg,.jpeg,.bmp',
    action: `${httpUrl}/file/upload/form`,
    headers: {
      authorization: token,
    },
    beforeUpload: (file: RcFile) => {
      setVisible(true);
      setFile(file);
      console.log(file);
      setFileObjectUrl(URL.createObjectURL(file));
      return false;
    },
    showUploadList: false,
  };
  return <>
    <Modal
      title='截取图片'
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      cancelButtonProps={{loading}}
      okButtonProps={{loading}}
    >
      <ReactCrop
        src={fileObjectUrl}
        crop={crop}
        ruleOfThirds={true}
        onImageLoaded={onImageLoaded}
        onChange={(newCrop) => setCrop(newCrop)}
      />
    </Modal>

    <Upload {...uploadProps}>
      {props.children || <Button>upload</Button>}
    </Upload>
  </>;
};
export default UploadSingleImgWithCrop;
