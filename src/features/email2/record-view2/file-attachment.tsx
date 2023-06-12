import React, { useRef, useState } from 'react';
import { IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const FileAttachment = ({ addUnSavedFile }: { addUnSavedFile: any }) => {
  let fileInput = useRef<HTMLInputElement>(null);

  const browseFiles = (e: any) => {
    const files: any = fileInput.current?.files;
    for (let file of files) {
      addUnSavedFile(file);
    }
    e.target.value = '';
  };

  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="label"
        sx={{ ml: '10px' }}
      >
        <input
          hidden
          accept="*/*"
          type="file"
          multiple={true}
          ref={fileInput}
          onChange={browseFiles}
        />
        <AttachFileIcon color="info" fontSize="large" />
      </IconButton>
    </>
  );
};

export default FileAttachment;
