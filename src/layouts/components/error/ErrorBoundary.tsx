import React, {ErrorInfo} from 'react';

/**
 *
 */
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    console.log('error');
    console.log(error);
    return {};
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    // 你同样可以将错误日志上报给服务器
    // logErrorToMyService(error, errorInfo);
    console.log('what');
    console.log(error, errorInfo);
  }

  /**
   * 渲染函数
   * @return {React.ComponentElement}
   */
  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
