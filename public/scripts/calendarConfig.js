// angular.module('mwl.calendar').config(function(calendarConfig) {
//     console.log(calendarConfig);
    // calendarConfig.dateFormatter = 'moment';
    // moment.locale('en_US')
//     calendarConfig.displayAllMonthEvents = true;
//     calendarConfig.allDateFormats.moment.date.hour = 'hh:mm';
//   });


angular
  .module('mwl.calendar')
  .constant('calendarConfig', {

    allDateFormats: {
      angular: {
        date: {
          hour: 'ha',
          day: 'd MMM',
          month: 'MMMM',
          weekDay: 'EEEE',
          time: 'hh:mm',
          datetime: 'MMM d, h:mm a'
        },
        title: {
          day: 'EEEE d MMMM, yyyy',
          week: 'Week {week} of {year}',
          month: 'MMMM yyyy',
          year: 'yyyy'
        }
      },
      moment: {
        date: {
          hour: 'h',
          day: 'D MMM',
          month: 'MMMM',
          weekDay: 'dddd',
          time: 'hh:mm',
          datetime: 'MMM D, h:mm a'
        },
        title: {
          day: 'dddd D MMMM, YYYY',
          week: 'Week {week} of {year}',
          month: 'MMMM YYYY',
          year: 'YYYY'
        }
      }
    },
    get dateFormats() {
      return this.allDateFormats[this.dateFormatter].date;
    },
    get titleFormats() {
      return this.allDateFormats[this.dateFormatter].title;
    },
    dateFormatter: 'moment',
    showTimesOnWeekView: true,
    displayAllMonthEvents: false,
    i18nStrings: {
      weekNumber: 'Week {week}'
    },
    templates: {},
    colorTypes: {
      info: {
        primary: '#1e90ff',
        secondary: '#d1e8ff'
      },
      important: {
        primary: '#ad2121',
        secondary: '#fae3e3'
      },
      warning: {
        primary: '#e3bc08',
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
        primary: '#006400',
        secondary: '#caffca'
      }
    }
  });
