import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import fieldLabel from 'assets/constants/fieldLabel';
import UnitButtonIcon from 'components/form/button-icon';
import FormContainer from 'components/form/container';
import UnitItem from 'components/form/unit-item';
import UnitOpportunitySelect from 'components/form/unit-opportunity-select';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import { isEmpty } from 'helpers/misc-helper';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ObjectType } from 'types';

import Documents from './documents';
import TemplateBox from './template-box';

const AttachmentPanel = ({
  updateSidePane,
  valMessages,
  mail,
  sidePane,
  readOnly,
  handleChange,
  setContent
}: any) => {
  const { thread_id, opportunity_id } = useParams<ObjectType>();

  return (
    <PaperBox>
      <PaperBoxContent>
        <FormContainer>
          <UnitItem
            grid={{ xs: 12, sm: 12, md: 2, lg: 1.4 }}
            p={0}
            sx={{
              textAlign: 'center'
            }}
          >
            {!(thread_id || opportunity_id) && (
              <UnitButtonIcon
                Icon={LightbulbIcon}
                onClick={() => updateSidePane('1')}
                active={sidePane === '1'}
                title={fieldLabel.opportunity}
              />
            )}

            <UnitButtonIcon
              Icon={LibraryBooksIcon}
              onClick={() => updateSidePane('2')}
              active={sidePane === '2'}
              title={fieldLabel.template}
            />

            {!readOnly && !isEmpty(mail?.opportunity_id) && (
              <UnitButtonIcon
                Icon={InsertDriveFileIcon}
                onClick={() => updateSidePane('3')}
                active={sidePane === '3'}
                title={fieldLabel.documents}
              />
            )}
          </UnitItem>

          {!isEmpty(sidePane) && (
            <UnitItem grid={{ xs: 12, sm: 12, md: 10, lg: 10.6 }}>
              {sidePane == '1' && !(thread_id || opportunity_id) && (
                <UnitOpportunitySelect
                  value={{
                    label: mail?.opportunity_name || '',
                    value: mail?.opportunity_id || ''
                  }}
                  multiple={false}
                  onChange={(val: ObjectType) => {
                    handleChange({
                      opportunity_name: val?.label || '',
                      opportunity_id: val?.value || ''
                    });
                  }}
                  grid={{ xs: 12, sm: 12 }}
                  readOnly={false}
                  error={valMessages['opportunity_id']}
                />
              )}

              {sidePane == '2' && (
                <TemplateBox
                  setContent={setContent}
                  template={mail.template}
                  handleChange={handleChange}
                  readOnly={readOnly}
                  mail={{}}
                />
              )}
              {sidePane == '3' &&
                !readOnly &&
                !isEmpty(mail?.opportunity_id) && (
                  <Documents opportunity_id={mail?.opportunity_id} />
                )}
            </UnitItem>
          )}
        </FormContainer>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default AttachmentPanel;
