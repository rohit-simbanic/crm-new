import ConfirmBox from 'components/confirm-box/confirm-box';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import DateUtility from 'helpers/date-helper';
import eventBus from 'helpers/event-bus-helper';
import { isEmpty } from 'helpers/misc-helper';
import userFullName from 'helpers/user-name-helper';
import useRouteName from 'pages/route-outlet-context';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import OpportunityViewService from 'services/opportunity-view-service';
import initialService from 'state/service/initial-service';
import { ObjectType } from 'types';
import { ServiceEntity } from 'types/service-types';
import RecordView from '../record-view';
import { serviceFields } from 'helpers/service/service-action-helper';
import { validateService } from 'helpers/validation/service-helper';
import { OpportunityContext } from 'pages/opportunity/Context';
import fieldLabel from 'assets/constants/fieldLabel';

const initialConfirmModal = {
  open: false,
  message: '',
  proceed: () => {},
  cancel: () => {}
};

const CreateService = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id, service_id } = useParams<ObjectType>();
  const location = useLocation();
  const [service, setService] = useState<ServiceEntity>(initialService);
  const [confirmModal, setConfirmModal] = useState<any>(initialConfirmModal);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { routeName, setRouteName } = useRouteName();
  const [field, setField] = useState('');
  const [validation, setValidtion] = useState<ObjectType>({});
  const { oppurtunity } = useContext(OpportunityContext);

  const handleChange = (e: any) => {
    if (e.target) {
      setService(
        Object.assign({}, service, { [e.target.name]: e.target.value })
      );
    } else {
      setService(Object.assign({}, service, e));
    }
  };

  const loadService = async (service_id: string) => {
    let service = await OpportunityViewService.getById(service_id);

    let data = {
      ...service.data,

      requested_by_name: service.data.requested_by
        ? `${userFullName(service?.data?.requested_by)}`
        : ``,
      requested_by: service.data.requested_by
        ? service.data.requested_by.id
        : '',

      confirmation_by_name: service.data.confirmation_by
        ? `${userFullName(service?.data?.confirmation_by)}`
        : ``,
      confirmation_by: service.data.confirmation_by
        ? service.data.confirmation_by.id
        : ''
    };
    setService(data);
  };

  const createOrUpdateService = async (reqBody: ObjectType) => {
    let result;

    setIsLoading(true);

    if (!service_id) {
      result = await OpportunityViewService.createServices(reqBody);
    } else {
      result = await OpportunityViewService.update(service_id, reqBody);
    }

    setIsLoading(false);

    if (result.isSuccess) {
      if (opportunity_id) {
        eventBus.dispatch('resfresh_opportunity', {});
      }
      window.history.back();
    }
  };

  const handleSubmit = async () => {
    service.inspection_date = service?.inspection_date
      ? DateUtility.convertTimeZoneToUTC(service.inspection_date)
      : '';
    let reqBody = {
      inspection_type: service.inspection_type,
      inspection_date: service.inspection_date,
      request_info: service.request_info,
      inspection_scheduled: service.inspection_scheduled,
      requested_date: service.requested_date,
      requested_by: service.requested_by,
      confirmation_date: service.confirmation_date,
      confirmation_by: service.confirmation_by,
      closing_notes: service.closing_notes,
      inspection_notes: service.inspection_notes,
      opportunity_id_1: opportunity_id
    };

    const { hasValidationError, ...errors } = validateService(reqBody);

    setValidtion(errors);

    if (hasValidationError) return;

    let due_diligence_end_c = service?.opportunity?.due_diligence_end_c
      ? service?.opportunity?.due_diligence_end_c
      : oppurtunity?.due_diligence_end_c;

    if (isEmpty(service.inspection_date)) {
      setConfirmModal({
        open: true,
        title: fieldLabel.areYouSure,
        text: fieldLabel.inspectionDateIsEmpty,
        proceed: () => {
          setConfirmModal(initialConfirmModal);
          createOrUpdateService(reqBody);
        },
        cancel: () => {
          setConfirmModal(initialConfirmModal);
        }
      });
    } else if (isEmpty(due_diligence_end_c)) {
      setConfirmModal({
        open: true,
        title: fieldLabel.areYouSure,
        text: fieldLabel.endDateOfDueDiligenceIsEmpty,
        proceed: () => {
          setConfirmModal(initialConfirmModal);
          createOrUpdateService(reqBody);
        },
        cancel: () => {
          setConfirmModal(initialConfirmModal);
        }
      });
    } else {
      setConfirmModal({
        open: true,
        title: fieldLabel.inspectionDateAfterScheduledEndOfDueDiligence,
        proceed: () => {
          setConfirmModal(initialConfirmModal);
          createOrUpdateService(reqBody);
        },
        cancel: () => {
          setConfirmModal(initialConfirmModal);
        }
      });
    }
  };

  const performAfterEffect = () => {
    const result = serviceFields?.[field](service);
    setService((preServcie: ServiceEntity) => ({ ...preServcie, ...result }));
    setField('');
  };

  useEffect(() => {
    if (!isEmpty(field)) {
      performAfterEffect();
    }
  }, [field]);

  useEffect(() => {
    handleChange(initialService);
  }, [location]);

  useEffect(() => {
    if (service_id !== undefined) {
      loadService(service_id);
    }
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      <PaperBox>
        <PaperBoxContent>
          <RecordView
            service={service}
            onChange={handleChange}
            readOnly={false}
            setField={setField}
            validation={validation}
          />

          <StackRowWithDivider>
            <SaveButton onClick={handleSubmit} />
            <CancelButton />
          </StackRowWithDivider>
        </PaperBoxContent>
      </PaperBox>

      {confirmModal.open && (
        <ConfirmBox {...confirmModal} isLoading={isLoading} />
      )}
    </>
  );
};

export default CreateService;
