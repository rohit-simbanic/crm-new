import variableConfig from 'config/variable';
import moment from 'moment-timezone';
import { isEmpty } from './misc-helper';

const DateUtility = {
  getDateString: (date: any, delimeter?: string) => {
    return !isEmpty(date)
      ? moment(date).format(`MM${delimeter || '/'}DD${delimeter || '/'}YYYY`)
      : '';
  },
  getDateTimeString: (date: any, delimeter?: string) => {
    return !isEmpty(date)
      ? moment(date).format(
          `MM${delimeter || '/'}DD${delimeter || '/'}YYYY hh:mm A`
        )
      : '';
  },
  getTimeString: (date: any, delimeter?: string) => {
    return !isEmpty(date) ? moment(date).format(`hh:mm A`) : '';
  },
  getTodayDateString: () => {
    return moment().format('YYYY-MM-DD');
  },
  getTodayDateWithFormatString: (format: any) => {
    return moment().format(format);
  },
  getTodayDateTimeString: () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },
  getCalendarWorkingDay: (date: any, days: any) => {
    return moment(date).add(days, 'd');
  },
  rolloverWeekendDateTimeToWeekdayDateTime: (dateTimeString: any) => {
    if (dateTimeString.format('dddd') === 'Saturday') {
      return dateTimeString.add(2, 'd');
    }
    if (dateTimeString.format('dddd') === 'Sunday') {
      return dateTimeString.add(1, 'd');
    }
    return dateTimeString;
  },
  getBusinessWorkingDay: (date: any, days: any) => {
    let isCheckDate;
    let i = 1;
    for (i = 1; i <= days; i++) {
      isCheckDate = moment(date).startOf('day').add(i, 'd');
      if (DateUtility.isWeekend(isCheckDate)) {
        days++;
      }
    }
    return isCheckDate ? isCheckDate?.toISOString() : date;
  },
  convertUTCtoTimeZone: (date: any, type?: string) => {
    return !isEmpty(date)
      ? moment
          .tz(date, DateUtility.getCurrentTimeZone())
          .format(type === 'date' ? 'DD/MM/YYYY' : 'YYYY-MM-DD HH:mm:ss')
      : date;
  },
  convertTimeZoneToUTC: (date: any) => {
    return !isEmpty(date)
      ? moment(date, moment.ISO_8601).utc().toISOString()
      : date;
  },
  getCurrentTimeZone: () => {
    let loginUser = JSON.parse(localStorage.getItem('user')!);

    return loginUser?.user?.timezone
      ? loginUser?.user?.timezone
      : 'America/Chicago';
  },
  addHourInDate: (date: any, hours: number) => {
    return moment(date)
      .startOf('day')
      .add(hours, 'hours')
      .format('YYYY-MM-DD HH:mm:ss');
  },
  isWeekend: (date: any) => {
    const weekday = moment(date).startOf('day').format('dddd');
    return weekday === 'Sunday' || weekday === 'Saturday';
  },
  addHours: (date: any, hours: number) => {
    if (!isEmpty(date)) {
      if (DateUtility.isCheckStartEndTime(date, hours)) {
        return date.startOf('day').add(hours, 'hours');
      }
    }
    return date;
  },
  isCheckStartEndTime: (date: any, hours: number) => {
    const startTime = moment(date).startOf('day').add(hours, 'hours').unix();
    const endTime = moment(date).unix();
    const startDayOfTime = moment(date).startOf('day').unix();
    if (startDayOfTime === endTime) {
      return true;
    } else {
      return startTime === endTime;
    }
  }
};

export default DateUtility;
function getCurrentTimeZone(): string | boolean {
  throw new Error('Function not implemented.');
}
