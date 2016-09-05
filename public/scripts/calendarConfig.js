angular.module('DfstcSchedulingApp').config(function(calendarConfig) {
    calendarConfig.dateFormatter = 'moment';
    moment.locale('en_US')
    calendarConfig.displayAllMonthEvents = true;
    calendarConfig.allDateFormats.moment.date.time = 'hh:mm a';
    calendarConfig.colorTypes = {
      info: {
        primary: '#1e90ff',
        secondary: '#d1e8ff'
      },
      important: {
        primary: '#FF2D85',
        secondary: '#fae3e3'
      },
      warning: {
        primary: '#FFCF2D',
        secondary: '#fdf1ba'
      },
      inverse: {
        primary: '#1b1b1b',
        secondary: '#c1c1c1'
      },
      special: {
        primary: '#800080',
        secondary: '#ffe6ff'
      },
      success: {
        primary: '#42DC00',
        secondary: '#caffca'
      }
    };

    // allDateFormats: {
    //   angular: {
    //     date: {
    //       hour: 'ha',
    //       day: 'd MMM',
    //       month: 'MMMM',
    //       weekDay: 'EEEE',
    //       time: 'hh:mm a',
    //       datetime: 'MMM d, h:mm a'
    //     },
    //     title: {
    //       day: 'EEEE d MMMM, yyyy',
    //       week: 'Week {week} of {year}',
    //       month: 'MMMM yyyy',
    //       year: 'yyyy'
    //     }
    //   },
    //   moment: {
    //     date: {
    //       hour: 'h',
    //       day: 'D MMM',
    //       month: 'MMMM',
    //       weekDay: 'dddd',
    //       time: 'hh:mm a',
    //       datetime: 'MMM D, h:mm a'
    //     },
    //     title: {
    //       day: 'dddd D MMMM, YYYY',
    //       week: 'Week {week} of {year}',
    //       month: 'MMMM YYYY',
    //       year: 'YYYY'
    //     }
    //   }
    // },
    // get dateFormats() {
    //   return this.allDateFormats[this.dateFormatter].date;
    // },
    // get titleFormats() {
    //   return this.allDateFormats[this.dateFormatter].title;
    // },
    // dateFormatter: 'moment',
    // showTimesOnWeekView: true,
    // displayAllMonthEvents: false,
    // i18nStrings: {
    //   weekNumber: 'Week {week}'
    // },
    // templates: {},
    //
  });
