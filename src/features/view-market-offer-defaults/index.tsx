import CircularLoader from 'components/dog-loader/dog-lodar';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import initialMarketPreference from 'state/market-preference';
import { ObjectType } from 'types';
import { MarketPreferenceEntity } from 'types/market-preferences';

import useRouteName from 'pages/route-outlet-context';
import RecordView from './record-view';

const ViewMarketOfferDefaults = ({ routeTag }: { routeTag: string }) => {
  const { market_preference_id } = useParams<ObjectType>();

  const [loading, setloading] = useState(false);

  const { routeName, setRouteName } = useRouteName();

  const [marketPreferences, setMarketPreferences] =
    useState<MarketPreferenceEntity>(initialMarketPreference);

  const loadMarketPreference = async (market_preference_id: string) => {
    setloading(true);
    let response = await marketPreferenceService.getById(market_preference_id);
    setloading(false);

    setMarketPreferences(response.data);
  };

  useEffect(() => {
    if (market_preference_id) loadMarketPreference(market_preference_id);
  }, []);

  useEffect(() => {
    setRouteName(routeTag);
  }, []);

  if (loading) return <CircularLoader />;

  return (
    <PaperBox>
      <PaperBoxContent>
        <RecordView marketPreferences={marketPreferences} readOnly={true} />
      </PaperBoxContent>
    </PaperBox>
  );
};
export default ViewMarketOfferDefaults;
