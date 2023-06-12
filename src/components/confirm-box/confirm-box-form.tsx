import NoButton from 'components/form/button-no';
import YesButton from 'components/form/button-yes';
import UnitItem from 'components/form/unit-item';
import ModalHeader from 'components/modal/modal-header';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxHeader from 'components/paper-box/paper-box-header';
import React from 'react';
import Typography from '@mui/material/Typography';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';

const ConfirmBoxContent = ({
  title,
  text,
  proceed,
  cancel
}: {
  title: string;
  text: string;
  proceed: (e: any) => any;
  cancel: (e: any) => any;
}) => {
  return (
    <PaperBox evelationValue={0} sx={{ bgcolor: '#eff1f6' }}>
      <PaperBoxHeader
        value={
          <>
            <UnitItem grid={{ xs: 12, sm: 12 }} p={0}>
              <ModalHeader title={title} onClose={cancel} />
            </UnitItem>
          </>
        }
      />
      <PaperBoxContent sx={{ p: 2 }}>
        <Typography>{text}</Typography>
      </PaperBoxContent>
      <PaperBoxFooter>
        <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
          <YesButton onClick={proceed} />
          <NoButton onClick={cancel} />
        </StackRow>
      </PaperBoxFooter>
    </PaperBox>
  );
};

export default ConfirmBoxContent;
