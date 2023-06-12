import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import { validateEmailTemplate } from 'helpers/validation/email-template-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emailTemplateService from 'services/email-template-service';
import marketPreferenceService from 'services/market-preferences';
import initialEmailTemplate from 'state/email-template/initial-email-template';
import { ObjectType } from 'types';
import { EmailTemplateEntity } from 'types/email-template';
import RecordView from '../record-view';
import { isEmpty } from 'helpers/misc-helper';

const EmailTemplateCreate = ({ routeTag }: { routeTag: string }) => {
  const { email_template_id, market_preference_id } = useParams();
  const navigate = useNavigate();

  const [emailTemplate, setEmailTemplate] =
    useState<EmailTemplateEntity>(initialEmailTemplate);

  const { routeName, setRouteName } = useRouteName();

  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [content, setContent] = useState<ObjectType>({
    html: '',
    text: ''
  });

  const handleChange = (e: any) => {
    setEmailTemplate(
      Object.assign({}, emailTemplate, { [e.target.name]: e.target.value })
    );
  };

  const loadEmailTemplate = async (email_template_id: string) => {
    let emailTemplate;
    if (market_preference_id) {
      emailTemplate = await marketPreferenceService.getAssociatedEmailTemplate(
        market_preference_id,
        email_template_id
      );
    } else {
      emailTemplate = await emailTemplateService.get(email_template_id);
    }

    setEmailTemplate(emailTemplate.data);
    setContent({ html: emailTemplate.data.body_html });
  };

  const handleSubmit = async () => {
    const reqbody: any = {
      name: emailTemplate.name || '',
      related_event: emailTemplate.related_event || '',
      type: emailTemplate.type || '',
      description: emailTemplate.description || '',
      subject: emailTemplate.subject || '',
      body_html: content.html
    };

    const { hasValidationError, ...errors } = validateEmailTemplate(
      emailTemplate,
      market_preference_id
    );
    setValidation(errors);

    if (hasValidationError) return;

    let response;

    setValidation({});

    setIsLoading(true);

    if (
      isEmpty(email_template_id) ||
      routeName === 'email-templates-duplicate'
    ) {
      response = await emailTemplateService.create(reqbody);
    } else if (
      !isEmpty(email_template_id) &&
      !isEmpty(market_preference_id) &&
      routeName == 'market-preferences-email-templates-edit'
    ) {
      const associatedReqBody = {
        email_inspection: emailTemplate.email_inspection
      };
      response = await marketPreferenceService.updateAssociateEmailTemplate(
        market_preference_id!,
        email_template_id!,
        associatedReqBody
      );

      navigate(`/market-preferences/${market_preference_id}/email-templates`);
    } else if (!isEmpty(email_template_id)) {
      response = await emailTemplateService.update(email_template_id!, reqbody);
    }

    setIsLoading(false);

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      if (market_preference_id) {
        navigate(`/market-preferences/${market_preference_id}/email-templates`);
      } else {
        navigate(`/email-templates/${response.data.id}/view`);
      }
    }
  };

  useEffect(() => {
    if (email_template_id !== undefined) loadEmailTemplate(email_template_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          emailTemplate={emailTemplate}
          validation={validation}
          onChange={handleChange}
          content={content?.html}
          setContent={setContent}
          theme="snow"
          isCreate={true}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default EmailTemplateCreate;
