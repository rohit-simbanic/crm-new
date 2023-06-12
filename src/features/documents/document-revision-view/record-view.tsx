import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import documentState from 'assets/constants/document-state';
import { documentStatus2 } from 'assets/constants/document-status';
import fieldLabel from 'assets/constants/fieldLabel';
import FormContainer from 'components/form/container';
import UnitRead from 'components/form/unit-read';
import RouteLink from 'components/link/route-link';
import DateUtility from 'helpers/date-helper';
import { DocumentRevisionEntity } from 'types/documents-types';

interface recordViewType {
  revision: DocumentRevisionEntity;
}

const RecordView = ({ revision }: recordViewType) => {
  return (
    <FormContainer>
      <UnitRead
        label={fieldLabel.documentName}
        value={revision.filename ?? '-'}
      />
      <UnitRead
        label={fieldLabel.latestRevison}
        value={revision.revision ?? '-'}
      />
      <UnitRead label={fieldLabel.revision} value={revision.revision ?? '-'} />
      <UnitRead
        label={fieldLabel.status}
        value={documentStatus2[revision.status] ?? '-'}
      />
      <UnitRead
        label={fieldLabel.file}
        value={
          <>
            <RouteLink
              url={`/documents/${revision.id}/viewer`}
              name={`${revision.filename || ''}`}
              target={true}
            />
            <RouteLink
              url={`/documents/${revision.id}/viewer`}
              name={
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              }
              target={true}
            />
          </>
        }
      />
      <UnitRead
        label={fieldLabel.state}
        value={documentState[revision.state] ?? '-'}
      />
      <UnitRead
        label={fieldLabel.createdDate}
        value={
          revision.date_entered
            ? DateUtility.convertUTCtoTimeZone(revision.date_entered)
            : '-'
        }
        grid={{ sm: 12, xs: 12 }}
      />
      <UnitRead
        label={fieldLabel.changeLog}
        value={revision.change_log ?? '-'}
        grid={{ sm: 12, xs: 12 }}
      />
    </FormContainer>
  );
};

export default RecordView;
