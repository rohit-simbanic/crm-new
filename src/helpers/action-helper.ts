import CancelOffer from 'features/brokerage-actions/cancel-offer';
import RejectOffer from 'features/brokerage-actions/reject-offer';
import AcceptOffer from 'features/brokerage-actions/accept-offer';
import CounterOffer from 'features/brokerage-actions/counter-offer';
import EnterDueDiligence from 'features/brokerage-actions/enter-due-diligence';
import BuyerCounterOfferConfirmation from 'features/brokerage-actions/buyer-counter-offer-confirmation';
import OptionEarnestFeeStatus from 'features/brokerage-actions/option-earnest-fee-status';
import ExtensionRequest from 'features/brokerage-actions/extension-request';
import TerminationRequest from 'features/brokerage-actions/termination-request';
import RetradeComplete from 'features/brokerage-actions/retrade-complete';
import RetradeRequest from 'features/brokerage-actions/retrade-request';
import ClearDueDiligence from 'features/brokerage-actions/clear-due-diligence';
import DueDiligenceFees from 'features/brokerage-actions/due-diligence-fees';
import ExtensionConfirmation from 'features/brokerage-actions/extension-confirmation';
import TerminationApproval from 'features/brokerage-actions/termination-approval';

const actionHelper = {
  getActionModal: (action: string) => {
    let component = null;

    switch (action) {
      case 'cancel_opportunity':
        component = CancelOffer;
        break;
      case 'reject_opportunity':
        component = RejectOffer;
        break;
      case 'execute_contract':
        component = AcceptOffer;
        break;
      case 'opportunity_action_counter_offer':
        component = CounterOffer;
        break;
      case 'due_diligence_opportunity':
        component = EnterDueDiligence;
        break;
      case 'buyer_counter_offer_confirmation':
        component = BuyerCounterOfferConfirmation;
        break;
      case 'option_earnest_fee_status':
        component = OptionEarnestFeeStatus;
        break;
      case 'extension_request':
        component = ExtensionRequest;
        break;
      case 'termination_request':
        component = TerminationRequest;
        break;
      case 'termination_approval':
        component = TerminationApproval;
        break;
      case 'retrade_approval':
        component = RetradeComplete;
        break;
      case 'request_price_adjustment':
        component = RetradeRequest;
        break;
      case 'clear_due_diligence':
        component = ClearDueDiligence;
        break;
      case 'due_diligence_fees':
        component = DueDiligenceFees;
        break;
      case 'extension_confirmation':
        component = ExtensionConfirmation;
        break;
    }

    return component;
  }
};

export default actionHelper;
