/**
 * 是否开启鼠标按住拖动时选中文字的功能 true是开 false是关
 * @param {boolean} defaultCtrl
 * @return {void}
 */
export const useDocumentSelect: (defaultCtrl?: boolean) => [(ctrl: boolean) => void] = (defaultCtrl = true) => {
  const stop = function() {
    return false;
  };
  const open = null;
  if (defaultCtrl) {
    document.onselectstart = open;
  } else {
    document.onselectstart = stop;
  }
  const ctrl: (ctrl: boolean) => void = (ctrl) => {
    if (ctrl) {
      console.log('打开');
      document.onselectstart = open;
    } else {
      console.log('关闭');
      document.onselectstart = stop;
    }
  };
  return [ctrl];
};
