import partySubtype from 'assets/constants/party-subtype';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import partyService from 'services/parties-service';
import initialParty from 'state/party/initial-party';
import { ObjectType } from 'types';
import { PartyEntity } from 'types/party-types';

import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';

const PartyView = ({ routeTag }: { routeTag: string }) => {
  const { party_id } = useParams<ObjectType>();

  const [party, setParty] = useState<PartyEntity>(initialParty);
  const [subTypeOption, setSubTypeOption] = useState<[]>([]);
  const { routeName, setRouteName } = useRouteName();
  const loadParty = async (party_id: string) => {
    let party = await partyService.getById(party_id);
    setParty(party.data);

    let data = {
      ...party.data,

      assigned_user_name: party.data.get_assigned_user_id
        ? `${party.data.get_assigned_user_id.first_name} ${party.data.get_assigned_user_id.last_name} `
        : ``,

      assigned_user_id: party.data.get_assigned_user_id
        ? party.data.get_assigned_user_id.id
        : ''
    };

    setParty(data);

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.Parties.label,
      item_id: party_id,
      item_summary: data.name,
      action: 'detailview'
    });
  };

  useEffect(() => {
    if (party_id) loadParty(party_id);
  }, []);

  useEffect(() => {
    setSubTypeOption(partySubtype[party.type] || []);
  }, [party.type]);

  useEffect(() => {
    setRouteName(routeTag);
  });

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          party={party}
          readOnly={true}
          subTypeOption={subTypeOption}
        />
      </PaperBoxContent>
    </PaperBox>
  );
};

export default PartyView;
