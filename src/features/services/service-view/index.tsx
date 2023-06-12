import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OpportunityViewService from 'services/opportunity-view-service';
import initialService from 'state/service/initial-service';
import { ObjectType } from 'types';
import { ServiceEntity } from 'types/service-types';
import RecordView from '../record-view';
import CircularLoader from 'components/dog-loader/dog-lodar';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';
import userFullName from 'helpers/user-name-helper';

const ServiceView = ({ routeTag }: { routeTag: string }) => {
  const { routeName, setRouteName } = useRouteName();

  const { service_id } = useParams<ObjectType>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const [services, setServices] = useState<ServiceEntity>(initialService);

  const loadServices = async (service_id: string) => {
    setIsloading(true);
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
    setServices(data);
    setIsloading(false);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.Services.label,
      item_id: service_id,
      item_summary: service.data.inspection_type,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (service_id) loadServices(service_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        {isLoading ? (
          <CircularLoader />
        ) : (
          <RecordView service={services} readOnly={true} isView={true} />
        )}
      </PaperBoxContent>
    </PaperBox>
  );
};

export default ServiceView;
