import FormContainer from 'components/form/container';
import UnitSelect from 'components/form/unit-select';
import UnitText from 'components/form/unit-text';
import { ObjectType } from 'types';
import { EmailTemplateEntity } from 'types/email-template';
import fieldLabel from 'assets/constants/fieldLabel';
import { useParams } from 'react-router-dom';
import UnitComposer from 'components/form/unit-composer';
import emptyFunction from 'helpers/empty-function-helper';
import emailInspection from 'assets/constants/email-inspection';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import relatedEvent from 'assets/constants/related-event';
import opportunityService from 'services/oppurtunity-service';
import { useEffect, useRef, useState } from 'react';
import InsertButton from 'components/form/button-insert';
import StackRow from 'components/stack/stack-row';

interface recordViewType {
  emailTemplate: EmailTemplateEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  theme?: string;
  content?: string;
  setContent?: (e: any) => any;
  isCreate?: boolean;
}

const RecordView = ({
  emailTemplate,
  validation,
  onChange,
  readOnly = false,
  theme = 'bubble',
  content = '',
  setContent,
  isCreate = false
}: recordViewType) => {
  const { market_preference_id } = useParams();

  const [insertVatiableOptions, setInsertVatiableOptions] = useState<any>();
  let reactQuillRef = useRef<any>();

  const updateQuillRef = (value: any) => {
    reactQuillRef.current = value;
  };

  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  const getInsertVariableOptions = async () => {
    const fields = await opportunityService.getFields();
    setInsertVatiableOptions(
      Object.values(fields.data.data).map((option: any) => {
        return { label: option.label, value: option.name };
      })
    );
  };

  const handleInsert = () => {
    var range = reactQuillRef.current!.getEditorSelection();

    let position = range ? range.index : 0;

    if (emailTemplate.variable_name) {
      reactQuillRef.current.editor.insertText(
        position,
        `$opportunity_${emailTemplate.variable_name} `
      );
    }
  };

  useEffect(() => {
    getInsertVariableOptions();
  }, []);

  return (
    <FormContainer>
      {!market_preference_id && (
        <>
          <UnitText
            label={fieldLabel.name}
            name="name"
            value={emailTemplate.name ?? ''}
            onChange={handleChange}
            error={valMessages['name'] ?? ''}
            required
            readOnly={readOnly}
          />

          <UnitSelect
            name="related_event"
            label={fieldLabel.relatedEvent}
            records={getObjectEntriesAsArray(relatedEvent)}
            value={emailTemplate.related_event ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.description}
            name="description"
            value={emailTemplate.description ?? ''}
            onChange={handleChange}
            error={valMessages['description'] ?? ''}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.subject}
            name="subject"
            value={emailTemplate.subject ?? ''}
            onChange={handleChange}
            error={valMessages['subject'] ?? ''}
            readOnly={readOnly}
          />

          <UnitSelect
            name="variable_module"
            label={fieldLabel.insertVariable}
            records={getObjectEntriesAsArray({ closing: 'Closing' })}
            value={'closing'}
            onChange={handleChange}
            readOnly={readOnly}
            disabled={true}
            grid={{ xs: 4, sm: 2 }}
          />

          <UnitSelect
            name="variable_name"
            label=""
            records={insertVatiableOptions}
            value={emailTemplate.variable_name ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
            grid={{ xs: 4, sm: 5 }}
            sx={{ pt: 3 }}
          />

          <UnitText
            label=""
            name="variable_text"
            value={
              emailTemplate.variable_name
                ? `$opportunity_${emailTemplate.variable_name}`
                : ''
            }
            onChange={handleChange}
            error={valMessages['variable_text'] ?? ''}
            readOnly={readOnly}
            disabled={true}
            grid={{ xs: 4, sm: 5 }}
            sx={{ pt: 3 }}
          />

          {isCreate && (
            <StackRow>
              <InsertButton
                onClick={() => {
                  handleInsert();
                }}
              />
            </StackRow>
          )}

          <UnitComposer
            grid={{ xs: 12, sm: 12 }}
            value={readOnly ? emailTemplate.body_html : content}
            readOnly={readOnly}
            theme={theme}
            onChange={(emailTemplate: ObjectType) => {
              if (setContent !== undefined) setContent(emailTemplate);
            }}
            label="Body"
            updateQuillRef={updateQuillRef}
          />
        </>
      )}
      {market_preference_id && (
        <>
          <UnitSelect
            name="email_inspection"
            label={fieldLabel.emailInspection}
            records={getObjectEntriesAsArray(emailInspection)}
            value={emailTemplate.email_inspection ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />
        </>
      )}
    </FormContainer>
  );
};

export default RecordView;
