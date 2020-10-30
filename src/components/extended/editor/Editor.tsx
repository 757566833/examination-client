import React, {useState} from 'react';
// 引入编辑器组件
import BraftEditor, {ExtendControlType} from 'braft-editor';
import styles from './Editor.less';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css';

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null));
  const submitContent = () => {
    const htmlContent = editorState.toHTML();
    // const result = await saveEditorContent(htmlContent)
    console.log(htmlContent);
  };
  const preview = () => {
    // if (window.previewWindow) {
    //   window.previewWindow.close();
    // }
    //
    // window.previewWindow = window.open();
    // window.previewWindow.document.write(this.buildPreviewHtml());
    // window.previewWindow.document.close();
  };
  const extendControls: ExtendControlType[] = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview,
    },
  ];
  return (
    <div className={`${styles.editor} flex`}>
      <div className={styles.input}>
        <BraftEditor
          value={editorState}
          onChange={setEditorState}
          onSave={submitContent}
          extendControls={extendControls}
        />
      </div>
      <div className={styles.preview}>
        <div className="braft-output-content" dangerouslySetInnerHTML={{__html: editorState.toHTML()}}></div>
      </div>

    </div>
  );
};
export default Editor;
