import { GridValueGetterParams } from '@mui/x-data-grid';
import { EmailTemplateEntity } from 'types/email-template';
import { isEmpty } from 'helpers/misc-helper';
import relatedEvent from 'assets/constants/related-event';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import RouteOpenNewIconLink from 'components/link/route-open-new-icon-link';
import RouteEditIconLink from 'components/link/route-edit-icon-link';
import RouteLink from 'components/link/route-link';
import { getObjectKeyValue } from 'helpers/object-field-helper';
import DateUtility from 'helpers/date-helper';
import { MenuItem } from '@mui/material';
import fieldLabel from 'assets/constants/fieldLabel';
import eventBus from 'helpers/event-bus-helper';
import { useLocation, useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import RouteLinkBlack from 'components/link/route-link-black';
import { v4 as uuid } from 'uuid';
import DropdownMenu from 'components/dropdown-menu';

const Action = ({ emailTemplate }: { emailTemplate: EmailTemplateEntity }) => {
  const { market_preference_id } = useParams();
  const location = useLocation();

  const removeAssociatedEmailTemplate = async (
    market_preference_id: string,
    email_template_id: string
  ) => {
    await marketPreferenceService.deleteAssociatedEmailTemplate(
      market_preference_id,
      email_template_id
    );
    eventBus.dispatch(`email_template_refresh`, {});
  };

  const associateEmailTemplate = async (
    id: string,
    email_template_id: string
  ) => {
    await marketPreferenceService.associateEmailTemplate(id, {
      email_template_id: [email_template_id]
    });

    eventBus.dispatch('email_template_refresh', {});
  };

  const ddMenuItems = [];

  if (market_preference_id) {
    if (!location.pathname.includes('selection-list')) {
      ddMenuItems.push(
        <MenuItem key={uuid()}>
          <RouteLinkBlack
            name={fieldLabel.removeEmailTemplate}
            url={`/market-preferences/${market_preference_id}/email-templates`}
            handleClick={() =>
              removeAssociatedEmailTemplate(
                market_preference_id!,
                emailTemplate.id
              )
            }
          />
        </MenuItem>
      );
    }
    if (location.pathname.includes('selection-list')) {
      ddMenuItems.push(
        <MenuItem key={uuid()}>
          <RouteLinkBlack
            name={fieldLabel.addEmailTemplate}
            url={`/market-preferences/${market_preference_id}/email-templates`}
            handleClick={() =>
              associateEmailTemplate(market_preference_id!, emailTemplate.id)
            }
          />
        </MenuItem>
      );
    }
  }

  return (
    <>
      {ddMenuItems.length > 0 && <DropdownMenu menuItems={ddMenuItems} />}
      {!location.pathname.includes('selection-list') && (
        <RouteEditIconLink
          url={
            market_preference_id
              ? `/market-preferences/${market_preference_id}/email-templates/${emailTemplate.id}/edit`
              : `/email-templates/${emailTemplate.id}/edit`
          }
        />
      )}

      {!market_preference_id && (
        <RouteOpenNewIconLink
          url={
            market_preference_id
              ? `/market-preferences/${market_preference_id}/email-templates/${emailTemplate.id}/view`
              : `/email-templates/${emailTemplate.id}/view`
          }
        />
      )}
    </>
  );
};

export const getEmailTemplateColumns = (email_inspaction: boolean) => {
  let column: GridColDef[] = [
    {
      headerName: fieldLabel.action,
      field: 'action',
      sortable: false,
      renderCell: (param: GridRenderCellParams) => (
        <Action emailTemplate={param.row} />
      ),
      flex: 0.3,
      minWidth: 100
    },
    {
      headerName: fieldLabel.name,
      field: 'name',
      sortable: true,
      flex: 1,
      renderCell: (param: GridRenderCellParams) => {
        return (
          <RouteLink
            url={`/email-templates/${param.row.id}/view`}
            name={param.row.name}
          />
        );
      }
    },
    {
      headerName: 'Related Event',
      field: 'related_event',
      sortable: false,
      flex: 1,
      valueGetter: ({ row }: GridValueGetterParams) => {
        return getObjectKeyValue(relatedEvent, row.related_event);
      }
    },
    {
      headerName: 'Subject',
      field: 'subject',
      sortable: true,
      flex: 1
    }
  ];

  if (email_inspaction) {
    column.push({
      headerName: fieldLabel.inspection,
      field: '',
      sortable: true,
      flex: 1,
      valueGetter: (param: GridValueGetterParams) => {
        return !isEmpty(
          param.row?.market_preferences_email_template[0]?.email_inspection
        )
          ? `${param.row?.market_preferences_email_template[0]?.email_inspection}`
          : '';
      }
    });
  }

  column = [
    ...column,
    {
      headerName: fieldLabel.dateModified,
      field: 'date_modified',
      sortable: true,
      flex: 0.5,
      valueGetter: ({ row }: GridRenderCellParams) => {
        return DateUtility.getDateTimeString(row.date_entered);
      }
    },
    {
      headerName: fieldLabel.dateEntered,
      field: 'date_entered',
      sortable: true,
      flex: 0.5,
      valueGetter: ({ row }: GridRenderCellParams) => {
        return DateUtility.getDateTimeString(row.date_entered);
      }
    }
  ];
  return column;
};
