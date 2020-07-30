import fs from 'fs';
import path from 'path';
import { readFileList } from './util';
try {
  fs.mkdirSync(path.resolve(__dirname, '..', 'src'));
} catch (error) {

}
try {
  fs.mkdirSync(path.resolve(__dirname, '..', 'src', 'pages'));
} catch (error) {

}
try {
  fs.mkdirSync(path.resolve(__dirname, '..', 'src', 'layouts'));
} catch (error) {

}
const filesList: string[] = [];
readFileList('./src/pages', filesList);
console.log(filesList);
console.log(process.env.mode);
let str = `
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

`;
if (process.env.mode == 'development') {
  str += `
import 'react-hot-loader';
`;
}
str += `
import Layout from "@/layouts";
import '@/global'
import '@/global.less'
`;
for (const [index, iterator] of filesList.entries()) {
  const importPage = iterator.replace('src/', '@/');
  const importPageUrl = importPage.replace('.tsx', '');
  str += `
import Component${index} from "${importPageUrl}";
`;
}
str += `
const AppRouter: React.FC = () => {
    return (
        <Layout>
            <Router>
                <Switch>

`;

for (const [index, iterator] of filesList.entries()) {
  let importPage = iterator.replace('src/pages/', '/').replace('.tsx', '');
  if (importPage.endsWith('/index')) {
    importPage = importPage.substr(0, importPage.length - 6);
  }
  if (!importPage) {
    importPage = '/';
  }
  str += `
                    <Route path="${importPage}" exact={true} component={Component${index}} />
`;
}
str += `
                </Switch>
            </Router>
        </Layout>
    );
}
export default AppRouter;
`;

try {
  fs.mkdirSync(path.join(__dirname, '..', 'src'));
} catch (error) {

}
fs.writeFileSync(path.join(__dirname, '..', 'src', 'app.tsx'), str);
if (process.env.mode == 'production') {
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'index.tsx'), `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import AppRouter from './app';
    ReactDOM.render(<AppRouter />, document.getElementById('root'))
    `);
} else {
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'index.tsx'), `
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import AppRouter from './app';
const HotApp = hot(AppRouter);
ReactDOM.render(<HotApp />, document.getElementById('root'))
`);
}
