import React, {useState} from 'react';
import {ColorResult, PhotoshopPicker, RGBColor} from 'react-color';
import Button from './Button';
//
const ColorInput: React.FC = () => {
  const [color, setColor] = useState<RGBColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });
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
    setColor(color.rgb);
  };
  const handleCancel = () => {
    setVisible(false);
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
        />
      </div>
    </div>

  </>;
};

export default ColorInput;
