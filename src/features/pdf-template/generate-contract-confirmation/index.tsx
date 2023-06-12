import fieldLabel from 'assets/constants/fieldLabel';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import ConfirmBox from 'components/confirm-box/confirm-box';
import {
  generateContract,
  getCdaContractGenerateWarning
} from 'helpers/pdf-template/pdf-template-action-helper';
import { useState } from 'react';
import { OpportunityEntity } from 'types/opportunity-entity';
import { PdfTemplateEntity } from 'types/pdf-template-type';
import { IconButton } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const initialConfirmModal = {
  open: false,
  text: '',
  title: '',
  proceed: () => {},
  cancel: () => {}
};

interface initialConfirmModal {
  open: boolean;
  text: string;
  title: string;
  proceed: (e: any) => any;
  cancel: (e: any) => any;
}

const GenerateContractConfirmationModal = ({
  pdfTemplate,
  opportunity
}: {
  pdfTemplate: PdfTemplateEntity;
  opportunity: OpportunityEntity;
}) => {
  const [confirmModal, setConfirmModal] =
    useState<initialConfirmModal>(initialConfirmModal);

  const isCDAContract = (): boolean => {
    return (
      pdfTemplate.category_id === 'commission_instructions' &&
      pdfTemplate.document_subtype === 'cda'
    );
  };

  const isOpportunityInDiligencePeriod = (): boolean => {
    return [
      oppurtunityStatusList.closing_diligence_period,
      oppurtunityStatusList.closing_diligence_amended
    ].includes(opportunity.opportunity_status_c);
  };

  const shouldGenerateCadInDueDiligencePeriod = (): boolean => {
    return isCDAContract() && isOpportunityInDiligencePeriod();
  };

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (shouldGenerateCadInDueDiligencePeriod()) {
      setConfirmModal({
        open: true,
        text: getCdaContractGenerateWarning(opportunity?.opportunity_status_c),
        title: fieldLabel.areYouSure,
        proceed: () => {
          generateContract(pdfTemplate.id, opportunity!.id, true);
          setConfirmModal(initialConfirmModal);
        },
        cancel: () => {
          setConfirmModal({ ...confirmModal, open: false });
        }
      });
    } else if (isCDAContract()) {
      generateContract(pdfTemplate.id, opportunity.id, true);
    } else {
      generateContract(pdfTemplate.id, opportunity.id, false);
    }
  };

  return (
    <>
      <IconButton aria-label="" onClick={handleClick}>
        <FileDownloadIcon color="info" />
      </IconButton>
      {confirmModal.open && (
        <ConfirmBox key={pdfTemplate.id} {...confirmModal} />
      )}
    </>
  );
};

export default GenerateContractConfirmationModal;
