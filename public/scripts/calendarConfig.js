angular.module('DfstcSchedulingApp')
  .config(function(calendarConfig) {

    calendarConfig.dateFormatter = 'moment';
    calendarConfig.displayAllMonthEvents = true;
    calendarConfig.allDateFormats.moment.date.hour = 'hh:mm';
  });
