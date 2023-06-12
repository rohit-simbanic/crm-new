import fieldLabel from 'assets/constants/fieldLabel';
import hasPostOccupancy from 'assets/constants/has-post-occupancy';
import leaseType from 'assets/constants/lease-type';
import occupancyStatus from 'assets/constants/occupancy-status';
import oppurtunityStatusList from 'assets/constants/oppurtunity-status-list';
import SaveButton from 'components/form/button-save';
import FormContainer from 'components/form/container';
import UnitDate from 'components/form/unit-date';
import UnitEmpty from 'components/form/unit-empty';
import UnitHeading from 'components/form/unit-heading';
import UnitPercentageFormatter from 'components/form/unit-percentage-formatter';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch, { isChecked } from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import ModalComponent from 'components/modal';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import PaperBoxFooter from 'components/paper-box/paper-box-footer';
import StackRow from 'components/stack/stack-row';
import { actionPerform } from 'event/action-event';
import UploadDocuments from 'features/document-upload';
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import oppurtunityService from 'services/oppurtunity-service';
import ValidationService from 'services/validation-service';
import { ObjectType } from 'types';

const RecordView = ({
  oppurtunity,
  onClose,
  currentTab
}: {
  oppurtunity: ObjectType;
  onClose?: any;
  currentTab?: string;
}) => {
  const navigate = useNavigate();
  let { action } = useParams<ObjectType>();
  const [validation, setValidation] = useState<{ [key: string]: any }>({});
  const [documentModal, setDocumentModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toggleModal = () => setDocumentModal(!documentModal);

  const handleChange = (e: any) => {
    if (e.target) {
      setData(Object.assign({}, data, { [e.target.name]: e.target.value }));
    } else {
      setData(Object.assign({}, data, e));
    }
  };

  const handleSubmit = async () => {
    let fieldToCheck = [
      'offer_date_c',
      'seller_name_c',
      'tax_id_c',
      'has_post_occupancy',
      'lease_type',
      'lease_agreement_received'
    ];

    const { status, ...errors } = ValidationService.validate(
      data,
      fieldToCheck,
      'action'
    );

    setValidation(errors);

    if (!status && oppurtunity.id) {
      const reqBody = {
        contract_received_date: data.contract_received_date,
        contract_execution_date_c: data.contract_execution_date_c,
        offer_date_c: data.offer_date_c,

        tax_id_c: data.tax_id_c,
        new_construction_no_tax_id: data.new_construction_no_tax_id,
        seller_name_c: data.seller_name_c,

        has_post_occupancy: data.has_post_occupancy,
        lease_type: data.lease_type,
        lease_agreement_received: data.lease_agreement_received,
        occupancy_status_c: data.occupancy_status_c,
        initial_commission_percentage: data.initial_commission_percentage
      };

      setIsLoading(true);

      const result: ObjectType = await oppurtunityService.performAction(
        oppurtunity.id,
        reqBody,
        'accept_offer'
      );

      setIsLoading(false);

      if (result.isError) {
        setValidation(result.errorMessage);
      }

      if (result.isSuccess) {
        if (action) {
          onClose();
          actionPerform.accept_offer();
        } else {
          eventBus.dispatch('refresh_opportunity', {});
          navigate(`/opportunities/${oppurtunity.id}/view`);
        }
      }
    }
  };

  useEffect(() => {
    handleChange({
      opportunity_status_c: oppurtunityStatusList.offer_accepted,
      contract_received_date:
        oppurtunity.contract_received_date || DateUtility.getTodayDateString(),
      contract_execution_date_c:
        oppurtunity.contract_execution_date_c ||
        DateUtility.getTodayDateString(),
      offer_date_c: oppurtunity.offer_date_c || '',
      tax_id_c: oppurtunity.tax_id_c || '',
      new_construction_no_tax_id:
        oppurtunity?.new_construction_no_tax_id == true
          ? oppurtunity?.new_construction_no_tax_id
          : 0,
      seller_name_c: oppurtunity?.seller_name_c
        ? oppurtunity?.seller_name_c
        : '',
      has_post_occupancy: oppurtunity.has_post_occupancy || '',
      lease_type: oppurtunity.lease_type || '',
      lease_agreement_received:
        oppurtunity?.lease_agreement_received == true ? 1 : 0,
      occupancy_status_c: oppurtunity.occupancy_status_c || '',
      initial_commission_percentage: oppurtunity?.initial_commission_percentage
        ? oppurtunity?.initial_commission_percentage
        : ''
    });
  }, []);

  return (
    <>
      <PaperBox variantValue="elevation" sx={{ p: 0 }}>
        <PaperBoxContent
          sx={{
            height: 'calc(100vh - 45vh)',
            overflowY: 'auto',
            p: 2
          }}
        >
          <FormContainer>
            <UnitDate
              label={fieldLabel.contractReceivedDate}
              name="contract_received_date"
              value={data.contract_received_date ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'contract_received_date', value: e }
                })
              }
              error={validation['contract_received_date'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitDate
              label={fieldLabel.contractExecutionDate}
              name="contract_execution_date_c"
              value={data.contract_execution_date_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'contract_execution_date_c', value: e }
                })
              }
              error={validation['contract_execution_date_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitDate
              label={fieldLabel.offerDate}
              name="offer_date_c"
              value={data.offer_date_c ?? ''}
              onChange={(e: any) =>
                handleChange({
                  target: { name: 'offer_date_c', value: e }
                })
              }
              error={validation['offer_date_c'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              required
            />

            <UnitText
              label={fieldLabel.taxID}
              name="tax_id_c"
              value={data.tax_id_c ?? ''}
              onChange={handleChange}
              error={validation['tax_id_c'] ?? ''}
              required
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSwitch
              value={data?.new_construction_no_tax_id}
              onChange={handleChange}
              name="new_construction_no_tax_id"
              label={fieldLabel.newConstructionNoTaxId}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitText
              label={fieldLabel.sellerName}
              name="seller_name_c"
              value={data.seller_name_c ?? ''}
              onChange={handleChange}
              error={validation['seller_name_c'] ?? ''}
              required
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitHeading title="Post Occupancy" />

            <UnitSelect
              name="has_post_occupancy"
              label={fieldLabel.hasPostOccupancy}
              records={getObjectEntriesAsArray(hasPostOccupancy)}
              value={
                data?.has_post_occupancy ? data?.has_post_occupancy : 'yes'
              }
              onChange={handleChange}
              error={validation['has_post_occupancy'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
              hasBlankOption={false}
            />

            <UnitSelect
              name="lease_type"
              label={fieldLabel.leaseType}
              records={getObjectEntriesAsArray(leaseType)}
              value={data.lease_type ?? ''}
              onChange={handleChange}
              error={validation['lease_type'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSwitch
              value={data.lease_agreement_received ?? 0}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value === 1) {
                  toggleModal();
                }
              }}
              name="lease_agreement_received"
              label={fieldLabel.leaseArgumentReceived}
              error={validation['lease_agreement_received'] ?? ''}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitSelect
              name="occupancy_status_c"
              label={fieldLabel.occupancyStatus}
              records={getObjectEntriesAsArray(occupancyStatus)}
              value={data.occupancy_status_c ?? ''}
              onChange={handleChange}
              grid={{ xs: 12, sm: 4 }}
            />

            <UnitEmpty grid={{ xs: 0, sm: 4 }} />
            <UnitEmpty grid={{ xs: 0, sm: 4 }} />

            <UnitPercentageFormatter
              label={fieldLabel.initialCommissionPercentage}
              name="initial_commission_percentage"
              value={data.initial_commission_percentage ?? ''}
              onChange={handleChange}
              grid={{ xs: 12, sm: 4 }}
            />
          </FormContainer>
          {documentModal == true && (
            <ModalComponent
              title={'Upload Document'}
              Component={UploadDocuments}
              data={{
                document_type: 'lease_agreement',
                onSuccess: () => {
                  toggleModal();
                },
                action: 'lease_agreement_document'
              }}
              onClose={(val: any) => {
                toggleModal();
                if (val !== 1) {
                  setData((preData: ObjectType) => ({
                    ...preData,
                    lease_agreement_received: 0
                  }));
                }
              }}
              loading={false}
              size="md"
            ></ModalComponent>
          )}
        </PaperBoxContent>
        <PaperBoxFooter>
          <StackRow sx={{ pt: 0, pr: 0, pb: 0, pl: 0 }}>
            <SaveButton onClick={handleSubmit} disabled={isLoading} />
          </StackRow>
        </PaperBoxFooter>
      </PaperBox>
    </>
  );
};

export default RecordView;
