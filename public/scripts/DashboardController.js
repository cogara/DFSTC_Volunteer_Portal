angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, $modal, UserService, AppointmentService) {
  var vm = this;

  vm.openProfile = openProfile;

  console.log('hello?');
  function openProfile(id) {
    console.log('sending id', id);

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'profileModal.html',
      controller: 'ProfileController',
      controllerAs: 'prof',
      size: 'lg',
      resolve: {
        profile: function (UserService) {
          return UserService.getProfile(id).then(function(response){
            return response;
          });
        }
      }
    });

    modalInstance.result.then(function (profile) {
      //do function to save new profile info
      return UserService.editProfile(profile).then(function() {
        console.log('promise?');
        window.location.reload();
      });

      console.log(profile);
    });
  };

  //These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'month';
  vm.viewDate = new Date();
  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function(args) {
      //alert.show('Edited', args.calendarEvent);
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function(args) {
      //alert.show('Deleted', args.calendarEvent);
    }
  }];

  vm.addAppointment = function(){
  console.log(vm.appointment);
  AppointmentService.addAppointment(vm.appointment).then(function(response){
    console.log('add appointment success', response.data);
  }, function(response){
    console.log('add appointment fail', response.data);
  })
  }

  vm.appointment={
    title: "Image Coach Appointment",
    startTime: '',
    endTime: '',
    volunteerSlots: 5,
    clientSlots: 5,
    trainingAppointment: false
  };

  vm.today = function() {
    vm.dt = new Date();
  };
  vm.today();

  vm.clear = function() {
    vm.dt = null;
  };

  vm.inlineOptions = {
    minDate: new Date(),
    showWeeks: true
  };

  vm.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 0
  };

  vm.toggleMin = function() {
    vm.inlineOptions.minDate = vm.inlineOptions.minDate ? null : new Date();
    vm.dateOptions.minDate = vm.inlineOptions.minDate;
  };

  vm.toggleMin();

  vm.open1 = function() {
    console.log('Clicked open1');
    vm.popup1.opened = true;
    console.log(vm.popup1);
  };

  vm.open2 = function() {
    console.log('Clicked open2');
    vm.popup2.opened = true;
  };

  vm.setDate = function(year, month, day) {
    vm.dt = new Date(year, month, day);
  };

  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.format = vm.formats[0];
  vm.altInputFormats = ['M!/d!/yyyy'];
  //
  vm.popup1 = {}

  vm.popup2 = {};

}; //end DashboardController
