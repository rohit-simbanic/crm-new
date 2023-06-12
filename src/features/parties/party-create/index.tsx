import partySubtype from 'assets/constants/party-subtype';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import eventBus from 'helpers/event-bus-helper';
import { validateParty } from 'helpers/validation/party-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import partyService from 'services/parties-service';
import initialParty from 'state/party/initial-party';
import { ObjectType } from 'types';
import { PartyEntity } from 'types/party-types';

import RecordView from '../record-view';
import { isEmpty } from 'helpers/misc-helper';

const CreateParties = ({ routeTag }: { routeTag: string }) => {
  const { opportunity_id, party_id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();
  const { routeName, setRouteName } = useRouteName();
  const [party, setParty] = useState<PartyEntity>(initialParty);

  const [validation, setValidtion] = useState<ObjectType>({});

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [subtypeOption, setSubtypeOption] = useState<any>([]);

  const handleChange = (e: any) => {
    if (e.target) {
      setParty(Object.assign({}, party, { [e.target.name]: e.target.value }));
    } else {
      setParty(Object.assign({}, party, e));
    }
  };

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
        : '',
      is_empty_subtype: isEmpty(party.data.sub_type)
    };

    setParty(data);
  };

  const handleSubmit = async () => {
    let reqBody = {
      ...party,
      opportunity_id: opportunity_id
    };

    const { status, ...errors } = validateParty(reqBody);

    setValidtion(errors);

    if (!status) return;

    setIsLoading(true);

    let result;
    if (!party_id) {
      result = await partyService.createParties(reqBody);
    } else {
      result = await partyService.update(party_id, reqBody);
    }

    setIsLoading(false);

    if (result.isSuccess) {
      if (opportunity_id) {
        eventBus.dispatch('refresh_opportunity', {});
        navigate(`/opportunities/${opportunity_id}/view`);
      } else {
        navigate(`/parties/${result.data.id}/view`);
      }
    }

    if (result.isError) {
      setValidtion(result.errorMessage);
      return;
    }
  };

  useEffect(() => {
    setSubtypeOption(partySubtype[party.type] || []);
  }, [party.type]);

  useEffect(() => {
    handleChange(initialParty);
  }, [location]);

  useEffect(() => {
    if (party_id !== undefined) loadParty(party_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  });

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          party={party}
          validation={validation}
          onChange={handleChange}
          subTypeOption={subtypeOption}
          isEdit={!party_id ? false : true}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default CreateParties;
