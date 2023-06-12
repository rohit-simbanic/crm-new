import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import config from './config';
import 'react-quill/dist/quill.snow.css';
import htmlEditButton from 'quill-html-edit-button';
Quill.register('modules/htmlEditButton', htmlEditButton);

interface PropsTypes {
  value: string;
  onChange: (val: any) => void;
  readOnly: boolean;
  theme: string;
  height?: string;
  updateQuillRef?: (e: any) => any;
}

const Composer = (props: PropsTypes) => {
  let { value, onChange, readOnly, theme, height, updateQuillRef } = props;
  return (
    <React.Fragment>
      <ReactQuill
        style={{
          height: height ?? '430px',
          border: readOnly ? '1px solid black' : ''
        }}
        modules={config.modules}
        formats={config.formats}
        theme={theme}
        value={value}
        onChange={(html, delta, source, editor) => {
          onChange({ html: editor.getHTML(), text: editor.getText() });
        }}
        ref={(el: any) => {
          if (updateQuillRef) {
            updateQuillRef(el);
          }
        }}
        readOnly={readOnly}
      />
    </React.Fragment>
  );
};

export default Composer;
