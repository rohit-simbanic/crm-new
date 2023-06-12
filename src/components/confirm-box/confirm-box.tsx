import ModalComponent from 'components/modal';
import React from 'react';
import ConfirmBoxContent from './confirm-box-form';

const ConfirmBox = ({
  title,
  text,
  proceed,
  cancel,
  isLoading = false
}: {
  title: string;
  text: string;
  onClose?: (e: any) => any;
  proceed: (e: any) => any;
  cancel: (e: any) => any;
  isLoading?: boolean;
}) => {
  return (
    <>
      <ModalComponent
        Component={ConfirmBoxContent}
        data={{
          title,
          text,
          cancel,
          proceed
        }}
        onClose={cancel}
        loading={isLoading}
        size="md"
        isConfirmationBox={true}
      />
    </>
  );
};

export default ConfirmBox;
