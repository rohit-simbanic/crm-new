import documentSubType from 'assets/constants/document-sub-type';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { validatePdfTemplate } from 'helpers/validation/pdf-template-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import pdfTemplateService from 'services/pdf-template-service';
import initialPdfTemplate from 'state/contracts/initial-pdf-template';
import { PdfTemplateEntity } from 'types/pdf-template-type';

import RecordView from '../record-view';

interface ContentType {
  html: string;
  text: string;
}

const PdfTemplateCreate = ({ routeTag }: { routeTag: string }) => {
  const { pdf_template_id, market_preference_id } = useParams();
  const { routeName, setRouteName } = useRouteName();
  const navigate = useNavigate();

  const [pdfTemplate, setPdfTemplate] =
    useState<PdfTemplateEntity>(initialPdfTemplate);

  const [subtypeOption, setSubtypeOption] = useState<any>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const [contentBody, setContentBody] = useState<ContentType>({
    html: '',
    text: ''
  });

  const [contentHeader, setContentHeader] = useState<ContentType>({
    html: '',
    text: ''
  });

  const [contentFooter, setContentFooter] = useState<ContentType>({
    html: '',
    text: ''
  });

  const handleChange = (e: any) => {
    setPdfTemplate(
      Object.assign({}, pdfTemplate, { [e.target.name]: e.target.value })
    );
  };

  const loadPdfTemplate = async (pdf_template_id: string) => {
    let pdfTemplate;
    if (market_preference_id) {
      pdfTemplate = await marketPreferenceService.getAssociatedPDFTemplate(
        market_preference_id!,
        pdf_template_id
      );
    } else {
      pdfTemplate = await pdfTemplateService.get(pdf_template_id);
    }

    setPdfTemplate(pdfTemplate.data);
    setContentBody({ ...contentBody, html: pdfTemplate.data.description });
    setContentFooter({ ...contentFooter, html: pdfTemplate.data.pdffooter });
    setContentHeader({ ...contentHeader, html: pdfTemplate.data.pdfheader });
  };

  const handleSubmit = async () => {
    const reqbody: any = {
      name: pdfTemplate.name || '',
      template_order_c: pdfTemplate.template_order_c || '',
      state_c: pdfTemplate.state_c || '',
      document_state: pdfTemplate.document_state || '',
      category_id: pdfTemplate.category_id || '',
      document_subtype: pdfTemplate.document_subtype || '',
      type: pdfTemplate.type || '',
      expire_version: pdfTemplate.expire_version || 0,
      active: pdfTemplate.active || 0,
      margin_bottom: pdfTemplate.margin_bottom || '',
      margin_footer: pdfTemplate.margin_footer || '',
      margin_left: pdfTemplate.margin_left || '',
      margin_right: pdfTemplate.margin_right || '',
      margin_top: pdfTemplate.margin_top || '',
      description: contentBody.html,
      pdffooter: contentHeader.html,
      pdfheader: contentFooter.html
    };

    const { hasValidationError, ...errors } = validatePdfTemplate(
      pdfTemplate,
      market_preference_id
    );

    setValidation(errors);

    if (hasValidationError) return;

    let response;

    setValidation({});

    setIsLoading(true);

    if (pdf_template_id) {
      if (market_preference_id) {
        const associatePDFReqBody = {
          homeowner_association: pdfTemplate.homeowner_association,
          offer_package: pdfTemplate.offer_package,
          contract_type: pdfTemplate.contract_type
        };
        response = await marketPreferenceService.updateAssociatePDFTemplate(
          market_preference_id,
          pdf_template_id,
          associatePDFReqBody
        );
        navigate(`/market-preferences/${market_preference_id}/contracts`);
      }
      if (!market_preference_id) {
        response = await pdfTemplateService.update(pdf_template_id, reqbody);
      }
    } else {
      response = await pdfTemplateService.create(reqbody);
    }

    setIsLoading(false);

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      if (market_preference_id) {
        navigate(`/market-preferences/${market_preference_id}/contracts`);
      } else {
        navigate(`/pdf-templates/${response.data.id}/view`);
      }
    }
  };

  useEffect(() => {
    setSubtypeOption(documentSubType[pdfTemplate.category_id] || []);
  }, [pdfTemplate.category_id]);

  useEffect(() => {
    if (pdf_template_id !== undefined) loadPdfTemplate(pdf_template_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          pdfTemplate={pdfTemplate}
          validation={validation}
          onChange={handleChange}
          contentBody={contentBody.html}
          contentHeader={contentHeader.html}
          contentFooter={contentFooter.html}
          setContentBody={setContentBody}
          setContentHeader={setContentHeader}
          setContentFooter={setContentFooter}
          subTypeOption={subtypeOption}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};
export default PdfTemplateCreate;
