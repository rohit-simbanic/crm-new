import opportunityStatus from 'assets/constants/opportunity-status';
import CircularLoader from 'components/dog-loader/dog-lodar';
import PaperBox from 'components/paper-box';
import PaperBoxContent from 'components/paper-box/paper-box-content';
import getObjectEntriesAsArray from 'helpers/object-field-helper';
import useRouteName from 'pages/route-outlet-context';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import marketPreferenceService from 'services/market-preferences';
import initialMarketPreference from 'state/market-preference';
import { ObjectType } from 'types';
import { MarketPreferenceEntity } from 'types/market-preferences';

import RecordView from '../record-view';
import { moduleLabels } from 'assets/list/tracker/constant';
import trackerService from 'services/tracker-service';

const MarketPreferenceView = ({ routeTag }: { routeTag: string }) => {
  const { market_preference_id } = useParams<ObjectType>();

  const [loading, setloading] = useState(false);

  const { routeName, setRouteName } = useRouteName();

  const [marketPreferences, setMarketPreferences] =
    useState<MarketPreferenceEntity>(initialMarketPreference);

  const loadMarketPreference = async (market_preference_id: string) => {
    setloading(true);
    let response = await marketPreferenceService.getById(market_preference_id);
    setloading(false);

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

    trackerService.createRecentlyViewed({
      module_name: moduleLabels.MarketPreferences.label,
      item_id: market_preference_id,
      item_summary: data.name,
      action: 'detailview'
    });
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

export default MarketPreferenceView;
