import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import emptyFunction from 'helpers/empty-function-helper';
import { isEmpty } from 'helpers/misc-helper';
import React from 'react';
import { ObjectType } from 'types';
import { ComposeMailType } from 'types/email-types';

import AttachmentPanel from './attachment-panel';
import ComposeForm from './compose-form';

interface recordViewType {
  mail: ComposeMailType;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  content?: ObjectType;
  setContent?: React.Dispatch<React.SetStateAction<ObjectType>>;
  savedAttachments?: any[];
  unSavedAttachments?: any[];
  dispatch?: (e: any) => any;
  dispatch2?: (e: any) => any;
  send?: (e: any) => any;
  theme?: string;
  draftMail?: (e: any) => any;
  loading?: boolean;
}

const RecordView = ({
  mail,
  validation,
  onChange,
  readOnly = false,
  content = {},
  setContent,
  savedAttachments = [],
  unSavedAttachments = [],
  dispatch,
  dispatch2,
  send,
  draftMail,
  theme = 'bubble',
  loading = false
}: recordViewType) => {
  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  const [sidePane, setSidePane] = React.useState('');

  const updateSidePane = (value: string) => {
    setSidePane((preSidePane) => (preSidePane !== value ? value : ''));
  };

  return (
    <FormContainer>
      <UnitItem
        grid={{
          xs: 12,
          sm: 12,
          md: !isEmpty(sidePane) ? 6 : 11,
          lg: !isEmpty(sidePane) ? 6 : 11
        }}
        sx={{ height: '90%' }}
      >
        <ComposeForm
          mail={mail}
          handleChange={handleChange}
          valMessages={valMessages}
          readOnly={readOnly}
          draftMail={draftMail}
          send={send}
          dispatch={dispatch}
          dispatch2={dispatch2}
          content={content}
          setContent={setContent}
          savedAttachments={savedAttachments}
          unSavedAttachments={unSavedAttachments}
          loading={loading}
        />
      </UnitItem>
      <UnitItem
        grid={{
          xs: 12,
          sm: 12,
          md: !isEmpty(sidePane) ? 6 : 1,
          lg: !isEmpty(sidePane) ? 6 : 1
        }}
        sx={{ height: '90%' }}
      >
        <AttachmentPanel
          updateSidePane={updateSidePane}
          valMessages={valMessages}
          mail={mail}
          sidePane={sidePane}
          readOnly={readOnly}
          handleChange={handleChange}
          setContent={setContent}
        />
      </UnitItem>
    </FormContainer>
  );
};

export default RecordView;
