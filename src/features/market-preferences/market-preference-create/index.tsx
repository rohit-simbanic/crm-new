import opportunityStatus from 'assets/constants/opportunity-status';
import CircularLoader from 'components/dog-loader/dog-lodar';
import CancelButton from 'components/form/button-cancel';
import SaveButton from 'components/form/button-save';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import StackRowWithDivider from 'components/stack/stack-row-with-divider';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import { validateMarketPreference } from 'helpers/validation/market-preference-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import initialMarketPreference from 'state/market-preference';
import { ObjectType } from 'types';
import { MarketPreferenceEntity } from 'types/market-preferences';

import RecordView from '../record-view';
import setRequest from './set-request';

const MarketPreferenceCreate = ({ routeTag }: { routeTag: string }) => {
  const { market_preference_id } = useParams<ObjectType>();

  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const { routeName, setRouteName } = useRouteName();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [marketPreferences, setMarketPreferences] =
    useState<MarketPreferenceEntity>(initialMarketPreference);

  const [validation, setValidation] = useState<{ [key: string]: any }>({});

  const handleChange = (e: any) => {
    if (e.target) {
      setMarketPreferences(
        Object.assign({}, marketPreferences, {
          [e.target.name]: e.target.value
        })
      );
    } else {
      setMarketPreferences(Object.assign({}, marketPreferences, e));
    }
  };

  const loadMarketPreference = async (market_preference_id: string) => {
    setloading(true);
    let response = await marketPreferenceService.getById(market_preference_id);

    let sqs =
      response.data.sqs_status_trigger?.replace(/\^/g, '').split(',') ?? [];

    let sqs_status_trigger = getObjectEntriesAsArray(opportunityStatus).filter(
      (x: any) => sqs.includes(x.value)
    );
    let data = {
      ...response.data,
      sqs_status_trigger,
      sqs_status_trigger_text_display: sqs_status_trigger
        .map((x: any) => x.label)
        .join(', '),
      msa_name: response.data.get_msa?.name,
      account_name: response.data.get_account?.name
    };

    setMarketPreferences(data);
    setloading(false);
  };

  const handleSubmit = async () => {
    const { status, ...errors } = validateMarketPreference(marketPreferences);

    setValidation(errors);

    if (!status) return;

    let response;

    let reqBody = setRequest(marketPreferences);

    reqBody = {
      ...reqBody,
      sqs_status_trigger: marketPreferences.sqs_status_trigger!.map(
        (x: any) => x.value
      )
    };

    setIsLoading(true);

    if (market_preference_id) {
      response = await marketPreferenceService.update(
        market_preference_id,
        reqBody
      );
    } else {
      response = await marketPreferenceService.createMarketPreferences(reqBody);
    }

    setIsLoading(false);

    if (response.isValidationError) {
      setValidation(response.errorMessage);
    }

    if (response.isSuccess) {
      navigate(`/market-preferences/${response.data.id}/view`);
    }
  };

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  useEffect(() => {
    if (market_preference_id !== undefined && marketPreferences.id.length === 0)
      loadMarketPreference(market_preference_id);
  }, []);

  if (loading) return <CircularLoader />;

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView
          marketPreferences={marketPreferences}
          validation={validation}
          onChange={handleChange}
        />

        <StackRowWithDivider>
          <SaveButton onClick={handleSubmit} disabled={isLoading} />
          <CancelButton />
        </StackRowWithDivider>
      </PaperBoxContent>
    </PaperBox>
  );
};

export default MarketPreferenceCreate;
