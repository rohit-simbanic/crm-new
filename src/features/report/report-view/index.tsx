import ContainerRight from 'components/container/right';
import ContentArea from 'components/content-area';
import SideNavPanel from 'components/side-nav-panel';
import envConfig from 'config/env';
import { getAuthToken } from 'helpers/auth-helper';
import Iframe from 'react-iframe';
import { useParams } from 'react-router-dom';

const ReportView = () => {
  let token = getAuthToken();
  let { report_id } = useParams();

  let url = `${envConfig.REACT_APP_CRM_URL}/index.php?module=AOR_Reports&action=DetailView&record=${report_id}&source=${token}`;

  return (
    <>
      <ContainerRight>
        <SideNavPanel items={[]} />

        <ContentArea>
          <Iframe
            url={url}
            width="100%"
            height="600px"
            id=""
            className=""
            display="block"
            position="relative"
          />
        </ContentArea>
      </ContainerRight>
    </>
  );
};

export default ReportView;
