import documentSubType from 'assets/constants/document-sub-type';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import pdfTemplateService from 'services/pdf-template-service';
import initialPdfTemplate from 'state/contracts/initial-pdf-template';
import { ObjectType } from 'types';
import { PdfTemplateEntity } from 'types/pdf-template-type';

import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';

const PdfTemplateView = ({ routeTag }: { routeTag: string }) => {
  const { pdf_template_id, market_preference_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();
  const [pdfTemplate, setPdfTemplate] =
    useState<PdfTemplateEntity>(initialPdfTemplate);

  const loadPdfTemplate = async (pdf_template_id: string) => {
    let pDFTemplate;
    if (market_preference_id) {
      pDFTemplate = await marketPreferenceService.getAssociatedPDFTemplate(
        market_preference_id!,
        pdf_template_id
      );
    } else {
      pDFTemplate = await pdfTemplateService.get(pdf_template_id);
    }

    setPdfTemplate(pDFTemplate.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.PdfTemplates.label,
      item_id: pdf_template_id,
      item_summary: pDFTemplate.data.name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (pdf_template_id) loadPdfTemplate(pdf_template_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          pdfTemplate={pdfTemplate}
          readOnly={true}
          theme="bubble"
          subTypeOption={documentSubType[pdfTemplate?.category_id] || []}
        />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default PdfTemplateView;
