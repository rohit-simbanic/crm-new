import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import msaService from 'services/msa-service';
import initialMsa from 'state/msa/initial-msa';
import { ObjectType } from 'types';
import { MsaEntity } from 'types/msa-types';

import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';

const MsaView = ({ routeTag }: { routeTag: string }) => {
  const { msa_id } = useParams<ObjectType>();
  const { routeName, setRouteName } = useRouteName();
  const [msa, setMsa] = useState<MsaEntity>(initialMsa);

  const loadMsa = async (msa_id: string) => {
    let responce = await msaService.get(msa_id);
    setMsa(responce.data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.Msa.label,
      item_id: msa_id,
      item_summary: responce.data.name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (msa_id) loadMsa(msa_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  });

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView msa={msa} readOnly={true} />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default MsaView;
