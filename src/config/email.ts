import { ObjectType } from 'types';

const emailConfig: ObjectType = {
  ENTERA_EMAIL_FAILSAFE_ENTERA_REALTY_COM:
    process.env.REACT_APP_ENTERA_EMAIL_FAILSAFE_ENTERA_REALTY_COM,
  SENDER_FROM_EMAIL: process.env.REACT_APP_SENDER_FROM_EMAIL,
  SENDER_FROM_NAME: process.env.REACT_APP_SENDER_FROM_NAME,
  INBOUND_POSTMARK_EMAIL_ADDRESS: ['f240dea398ce059478e86702fd05cd55@inbound.postmarkapp.com', '9457967395adf5a7f400c97a4cbdcc06@inbound.postmarkapp.com']

};

export default emailConfig;
