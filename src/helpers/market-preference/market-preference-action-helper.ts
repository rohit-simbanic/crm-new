import eventBus from 'helpers/event-bus-helper';
import marketPreferenceService from 'services/market-preferences';

const removeAssociatedMarketPreference = async (
  market_preference_id: string,
  email_template_id: string
) => {
  await marketPreferenceService.deleteAssociatedEmailTemplate(
    market_preference_id,
    email_template_id
  );
  eventBus.dispatch(`market_preference_refresh`, {});
};

export { removeAssociatedMarketPreference };
