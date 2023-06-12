import FormContainer from 'components/form/container';
import UnitSelect from 'components/form/unit-select';
import UnitSwitch from 'components/form/unit-switch';
import UnitText from 'components/form/unit-text';
import { ObjectType } from 'types';
import fieldLabel from 'assets/constants/fieldLabel';
import { PdfTemplateEntity } from 'types/pdf-template-type';
import { useParams } from 'react-router-dom';
import { OptionType } from 'types/option-type';
import UnitComposer from 'components/form/unit-composer';
import emptyFunction from 'helpers/empty-function-helper';
import contentType from 'assets/constants/content-type';
import offerPackage from 'assets/constants/offer-package';
import homeOwnerAssociation from 'assets/constants/home-owner-association';
import documentType from 'assets/constants/document-type';
import documentState from 'assets/constants/document-state';
import state from 'assets/constants/state';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import type from 'assets/constants/type';

interface recordViewType {
  pdfTemplate: PdfTemplateEntity;
  validation?: ObjectType;
  onChange?: (e: any) => any;
  readOnly?: boolean;
  theme?: string;
  contentBody?: string;
  contentHeader?: string;
  contentFooter?: string;
  setContentBody?: (e: any) => any;
  setContentHeader?: (e: any) => any;
  setContentFooter?: (e: any) => any;
  subTypeOption?: OptionType[];
}

const RecordView = ({
  pdfTemplate,
  validation,
  onChange,
  readOnly = false,
  theme = 'snow',
  contentBody = '',
  contentHeader = '',
  contentFooter = '',
  setContentBody,
  setContentHeader,
  setContentFooter,
  subTypeOption
}: recordViewType) => {
  const { market_preference_id } = useParams();

  let handleChange = onChange ?? emptyFunction;
  let valMessages = validation ?? {};

  return (
    <FormContainer>
      {!market_preference_id && (
        <>
          <UnitText
            label={fieldLabel.name}
            name="name"
            value={pdfTemplate.name ?? ''}
            onChange={handleChange}
            error={valMessages['name'] ?? ''}
            required
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.templateOrder}
            name="template_order_c"
            value={pdfTemplate.template_order_c ?? ''}
            onChange={handleChange}
            error={valMessages['template_order_c'] ?? ''}
            readOnly={readOnly}
          />

          <UnitSelect
            name="state_c"
            label={fieldLabel.state}
            records={getObjectEntriesAsArray(state)}
            value={pdfTemplate.state_c ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitSelect
            name="document_state"
            label={fieldLabel.documentState}
            records={getObjectEntriesAsArray(documentState)}
            value={pdfTemplate.document_state ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitSelect
            name="category_id"
            label={fieldLabel.documentType}
            records={getObjectEntriesAsArray(documentType)}
            value={pdfTemplate?.category_id ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitSelect
            name="document_subtype"
            label={fieldLabel.documentSubType}
            records={subTypeOption}
            value={pdfTemplate?.document_subtype || ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitSelect
            name="type"
            label={fieldLabel.type}
            records={getObjectEntriesAsArray(type)}
            value={pdfTemplate.type ?? ''}
            onChange={handleChange}
            error={valMessages['type'] ?? ''}
            required
            readOnly={readOnly}
          />

          <UnitSwitch
            value={pdfTemplate.expire_version ?? 0}
            onChange={handleChange}
            name="expire_version"
            label={fieldLabel.expire}
            disabled={readOnly}
          />

          <UnitText
            label={fieldLabel.marginLeft}
            name="margin_left"
            value={pdfTemplate.margin_left ?? ''}
            onChange={handleChange}
            error={valMessages['margin_left'] ?? ''}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.marginRight}
            name="margin_right"
            value={pdfTemplate.margin_right ?? ''}
            onChange={handleChange}
            error={valMessages['margin_right'] ?? ''}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.marginTop}
            name="margin_top"
            value={pdfTemplate.margin_top ?? ''}
            onChange={handleChange}
            error={valMessages['margin_top'] ?? ''}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.marginBottom}
            name="margin_bottom"
            value={pdfTemplate.margin_bottom ?? ''}
            onChange={handleChange}
            error={valMessages['margin_bottom'] ?? ''}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.marginHeader}
            name="margin_header"
            value={pdfTemplate.margin_header ?? ''}
            onChange={handleChange}
            error={valMessages['margin_header'] ?? ''}
            readOnly={readOnly}
          />

          <UnitText
            label={fieldLabel.marginFooter}
            name="margin_footer"
            value={pdfTemplate.margin_footer ?? ''}
            onChange={handleChange}
            error={valMessages['margin_footer'] ?? ''}
            readOnly={readOnly}
          />

          <UnitComposer
            grid={{ xs: 12, sm: 12 }}
            value={readOnly ? pdfTemplate.description : contentBody}
            readOnly={readOnly}
            theme={theme}
            onChange={(pdfTemplate: ObjectType) => {
              if (setContentBody !== undefined) setContentBody(pdfTemplate);
            }}
            label="Body"
          />

          <UnitComposer
            grid={{ xs: 12, sm: 12 }}
            value={readOnly ? pdfTemplate.pdfheader : contentHeader}
            readOnly={readOnly}
            theme={theme}
            onChange={(pdfTemplate: ObjectType) => {
              if (setContentHeader !== undefined) setContentHeader(pdfTemplate);
            }}
            label="Header"
          />

          <UnitComposer
            grid={{ xs: 12, sm: 12 }}
            value={readOnly ? pdfTemplate.pdffooter : contentFooter}
            readOnly={readOnly}
            theme={theme}
            onChange={(pdfTemplate: ObjectType) => {
              if (setContentFooter !== undefined) setContentFooter(pdfTemplate);
            }}
            label="Footer"
          />
        </>
      )}

      {market_preference_id && (
        <>
          <UnitSelect
            name="homeowner_association"
            label={fieldLabel.homeOwnerAssociation}
            records={getObjectEntriesAsArray(homeOwnerAssociation)}
            value={pdfTemplate.homeowner_association ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitSelect
            name="offer_package"
            label={fieldLabel.offerPackage}
            records={getObjectEntriesAsArray(offerPackage)}
            value={pdfTemplate.offer_package ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />

          <UnitSelect
            name="contract_type"
            label={fieldLabel.type}
            records={getObjectEntriesAsArray(contentType)}
            value={pdfTemplate.contract_type ?? ''}
            onChange={handleChange}
            readOnly={readOnly}
          />
        </>
      )}
    </FormContainer>
  );
};

export default RecordView;
