import fs from 'fs';
import path from 'path';

export const readFileList = (dir: string, filesList: string[] = []) => {
  if (dir.includes('component') || dir.includes('redux')) {
    return;
  }
  const files = fs.readdirSync(dir);
  files.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList); // 递归读取文件
    } else {
      if (fullPath.includes('.tsx')) {
        filesList.push(fullPath);
      }
    }
  });
  return filesList;
};

