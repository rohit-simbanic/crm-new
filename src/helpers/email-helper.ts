import { missingField } from 'assets/validation-template';
import { ObjectType } from 'types';
import { isEmpty } from './misc-helper';
import eventBus from './event-bus-helper';
import EVENTS from 'assets/constants/events';

const emailHelper = {
  validate: (data: ObjectType) => {
    let validation: ObjectType = {
      status: false
    };

    if (isEmpty(data.from)) {
      validation = {
        ...validation,
        status: true,
        from: [missingField('From')]
      };
    }

    if (isEmpty(data.reply_to)) {
      validation = {
        ...validation,
        status: true,
        reply_to: [missingField('Reply To')]
      };
    }

    if (isEmpty(data.to)) {
      validation = {
        ...validation,
        status: true,
        to: [missingField('To')]
      };
    }

    if (isEmpty(data.subject)) {
      validation = {
        ...validation,
        status: true,
        subject: [missingField('subject')]
      };
    }

    if (isEmpty(data.body_html) || isEmpty(data.body_text)) {
      validation = {
        ...validation,
        status: true,
        body_html: [missingField('Body')]
      };
    }

    if (isEmpty(data.opportunity_id)) {
      validation = {
        ...validation,
        status: true,
        opportunity_id: [missingField('Opportunity')]
      };
    }

    return validation;
  },

  checkFileSize: (files: any) => {
    let result = [];
    for (const file of files) {
      let size = file.size / 1048576;
      if (size > 15) {
        result.push(`${file.name}`);
      }
    }

    if (result.length) {
      eventBus.dispatch(EVENTS.SHOW_TOAST, {
        isError: true,
        message: `Add Links  for following files: ${result.join(', ')}`
      });
    }

    return result.length == 0 ? true : false;
  }
};

export default emailHelper;
