import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import emailTemplateService from 'services/email-template-service';
import marketPreferenceService from 'services/market-preferences';
import initialEmailTemplate from 'state/email-template/initial-email-template';
import { ObjectType } from 'types';
import { EmailTemplateEntity } from 'types/email-template';
import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';

const EmailTemplateView = ({ routeTag }: { routeTag: string }) => {
  const { email_template_id, market_preference_id } = useParams<ObjectType>();

  const [emailTemplate, setEmailTemplate] =
    useState<EmailTemplateEntity>(initialEmailTemplate);

  const { routeName, setRouteName } = useRouteName();

  const loadEmailTemplate = async (email_template_id: string) => {
    let eMailTemplate;
    if (market_preference_id) {
      eMailTemplate = await marketPreferenceService.getAssociatedEmailTemplate(
        market_preference_id!,
        email_template_id
      );
    } else {
      eMailTemplate = await emailTemplateService.get(email_template_id);
    }

    setEmailTemplate(eMailTemplate.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.EmailTemplates.label,
      item_id: email_template_id,
      item_summary: eMailTemplate.data.name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (email_template_id) loadEmailTemplate(email_template_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          emailTemplate={emailTemplate}
          readOnly={true}
          theme="bubble"
        />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default EmailTemplateView;
