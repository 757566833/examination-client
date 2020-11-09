
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import AppRouter from './app';
const HotApp = hot(AppRouter);
ReactDOM.render(<HotApp />, document.getElementById('root'))
