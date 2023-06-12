import EVENTS from "assets/constants/events";
import eventBus from "helpers/event-bus-helper";
import { ObjectType } from "types";

export const updateOpportunityEvent = (data: ObjectType) => {
    eventBus.dispatch(EVENTS.UPDATE_OPPORTUNITY, data);
}