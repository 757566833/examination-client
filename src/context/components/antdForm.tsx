import {ConfigProviderProps} from 'antd/lib/config-provider';
import zhCN from 'antd/lib/locale/zh_CN';
export const antdProvider:ConfigProviderProps ={
  csp: {
    nonce: 'YourNonceCode',
  },
  form: {
    validateMessages: {
      required: '${label}不能为空',
    },
  },
  // getPopupContainer: (node)=>{
  //   console.log(node);
  //   if (node&&node.parentElement) {
  //     return node.parentElement;
  //   }
  //   return document.body;
  // },
  dropdownMatchSelectWidth: true,
  locale: zhCN,

};
