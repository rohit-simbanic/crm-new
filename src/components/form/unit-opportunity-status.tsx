import { Grid } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import opportunityStatus from 'assets/constants/opportunity-status';
import { opportunityStatusEnv } from 'assets/constants/opportunity-status-env';
import ConfirmBox from 'components/confirm-box/confirm-box';
import { isEmpty } from 'helpers/misc-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import moment from 'moment';
import React, { useState } from 'react';
import { opportunity_status_c } from 'services/validation/opportunity_status_c';
import UnitSelect from './unit-select';

const initialConfirmModal = {
  open: false,
  text: '',
  title: '',
  proceed: () => {},
  cancel: () => {}
};

interface OpportunityStatusUnitInterface {
  grid?: {
    xs: number;
    sm: number;
  };
  value: any;
  opportunity: any;
  handleChange: (e: any) => any;
  readOnly?: boolean;
}

const UnitOpportunityStatus = ({
  grid = { xs: 12, sm: 6 },
  value,
  handleChange,
  opportunity,
  readOnly = false
}: OpportunityStatusUnitInterface) => {
  const [confirmModal, setConfirmModal] = useState<any>(initialConfirmModal);
  const onChange = (e: any) => {
    const errors = opportunity_status_c.validate(
      {
        opportunity_status_c: e.target.value
      },
      '',
      opportunity
    );

    if (errors.length === 0) {
      handleChange({
        target: {
          name: 'opportunity_status_c',
          value: e.target.value
        }
      });
      return;
    }

    setConfirmModal({
      open: true,
      text: errors[0],
      title: 'Are you sure?',
      proceed: () => {
        handleChange({
          target: {
            name: 'opportunity_status_c',
            value: e.target.value
          }
        });
        setConfirmModal(initialConfirmModal);
      },
      cancel: () => {
        setConfirmModal(initialConfirmModal);
      }
    });
  };

  let ops;
  let user = JSON.parse(localStorage.getItem('user') || '');
  if (
    !isEmpty(user?.user?.status_restriction_offer_date) &&
    !isEmpty(opportunity?.offer_finalized_at)
  ) {
    const offerFinalizeDate = moment(opportunity?.offer_finalized_at).unix();
    const statusRestrictionDate = moment(
      user.user.status_restriction_offer_date
    ).unix();

    if (
      offerFinalizeDate > statusRestrictionDate &&
      opportunityStatusEnv[opportunity?.opportunity_status_c] !== undefined
    ) {
      ops = opportunityStatusEnv[opportunity?.opportunity_status_c];
    } else {
      ops = opportunityStatus;
    }
  } else {
    ops = opportunityStatus;
  }

  return (
    <>
      <UnitSelect
        name="opportunity_status_c"
        onChange={onChange}
        label={fieldLabel.opportunityStatus}
        value={value}
        records={getObjectEntriesAsArray(ops)}
        readOnly={readOnly}
      />
      {confirmModal.open && <ConfirmBox {...confirmModal} />}
    </>
  );
};
export default UnitOpportunityStatus;
