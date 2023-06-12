import Box from '@mui/material/Box';
import CircularLoader from 'components/dog-loader/dog-lodar';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import envConfig from 'config/env';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import pdfTemplateService from 'services/pdf-template-service';
import initialPdfTemplate from 'state/contracts/initial-pdf-template';
import { ObjectType } from 'types';
import { PdfTemplateEntity } from 'types/pdf-template-type';

const PdfTemplateViewAsPDF = ({ routeTag }: { routeTag: string }) => {
  const { pdf_template_id, market_preference_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfTemplate, setPdfTemplate] =
    useState<PdfTemplateEntity>(initialPdfTemplate);

  const loadPdfTemplate = async (pdf_template_id: string) => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    if (pdf_template_id) loadPdfTemplate(pdf_template_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  return (
    <>
      {!loading ? (
        <PaperBox>
          <link
            rel="stylesheet"
            href={`${envConfig.REACT_APP_CRM_URL}/custom/modules/AOS_PDF_Templates/css/preview-doc.css`}
          />
          <PaperBoxContent>
            <Box
              p={1}
              dangerouslySetInnerHTML={{
                __html: pdfTemplate.description
              }}
            ></Box>
          </PaperBoxContent>
        </PaperBox>
      ) : (
        <CircularLoader />
      )}
    </>
  );
};

export default PdfTemplateViewAsPDF;
