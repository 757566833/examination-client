import React, {useState} from 'react';
import {ColorResult, PhotoshopPicker, RGBColor} from 'react-color';
import Button from './Button';
//
const ColorInput: React.FC<{ onClick: (name: string, value?: string) => void }> = (props) => {
  const [color, setColor] = useState<string>('#000000');
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    setVisible(true);
  };

  // const handleClose = () => {
  //   // this.setState({displayColorPicker: false});
  //   setVisible(false);
  // };

  const handleChange = (color: ColorResult) => {
    // this.setState({ color: color.rgb });
    setColor(color.hex);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onAccept = () => {
    props.onClick('zitiyanse', color);
  };
  return <>
    <Button onClick={handleClick} name={'zitiyanse'} desc={'字体颜色'} type={'button'}/>
    <div style={{position: 'relative'}}>
      <div className={visible ? '' : 'disappear'} style={{position: 'absolute', zIndex: 300, top: 50}}>
        <PhotoshopPicker
          color={color}
          onChange={handleChange}
          onCancel={handleCancel}
          header='颜色选择'
          onAccept={onAccept}
        />
      </div>
    </div>

  </>;
};

export default ColorInput;
