angular.module('DfstcSchedulingApp').controller('EditController', EditController);

function EditController($http, $state, $uibModal, $scope, UserService, AppointmentService, calendarConfig, moment) {
  var vm = this;

  vm.showAppointments = AppointmentService.appointments;
  vm.editAppointment = {};
  vm.editAppointment.event = AppointmentService.updateEvent.event;
  vm.currentUser = {};
  vm.currentUser.user = UserService.currentUser.user;
  vm.myAppointments = {};
  vm.myAppointments.scheduled = [];
  vm.myAppointments.scheduled = AppointmentService.myAppointments.scheduled;

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
  vm.popup1 = {
    opened: false
  }

  vm.popup2 = {
    opened: false
  }//end calendar and form settings


  vm.updateAppointment = function(info){
    AppointmentService.updateAppointment(info._id, info);
    vm.showAppointments.appointments.splice(findIndex(vm.showAppointments.appointments, '_id', info._id), 1);
    vm.showAppointments.appointments.push(info);

  }

  function findIndex(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
        return i;
      }
    }
  }
  vm.deleteAppointment = function(event){
    console.log('deleting', event);
    AppointmentService.deleteAppointment(event._id);
    vm.showAppointments.appointments.splice(findIndex(vm.showAppointments.appointments, '_id', event._id), 1);
  }
// volunteer adding themselves to appointment
  vm.claimAppointment = function(info){
    info.volunteers.push(vm.currentUser.user);
    AppointmentService.updateAppointment(info._id, info);
    AppointmentService.appointments.appointments.splice(findIndex(AppointmentService.appointments, '_id', info._id), 1);
    info.color = calendarConfig.colorTypes.info;
    AppointmentService.myAppointments.scheduled.push(info);
    AppointmentService.appointments.appointments.push(info);
    // location.reload();
    // $scope.safeApply();
  };
// admin removing volunteer from appointment
  vm.removeVolunteer = function(index, event){
    event.volunteers.splice(index, 1);
    for (var i = AppointmentService.appointments.length-1; i >= 0; i--){
      if (AppointmentService.appointments[i]._id == event._id){
        AppointmentService.appointments[i].volunteers.splice(index, 1);
      }
    }
    AppointmentService.updateAppointment(event._id, event);
  }
// volunteer removing self from appointment
  vm.removeMe = function(event){
    event.color = calendarConfig.colorTypes.warning;
    for (var i = event.volunteers.length-1; i >= 0; i--){
      if (event.volunteers[i]._id == UserService.currentUser.user._id){
        event.volunteers.splice(i, 1);
      }
    }
    AppointmentService.updateAppointment(event._id, event);

    for (var j = AppointmentService.appointments.length-1; j >= 0; j--){
      if (AppointmentService.appointments[j]._id == event._id){
        AppointmentService.appointments.splice(j, 1);
        AppointmentService.appointments.push(event);
      }
    }
    for (var k = AppointmentService.myAppointments.scheduled.length-1; k >= 0; k--){
      if (AppointmentService.myAppointments.scheduled[k]._id == event._id){
        AppointmentService.myAppointments.scheduled.splice(k, 1);
        // AppointmentService.myAppointments.scheduled.splice(k, 1);
      }
    }
    // location.reload();
    console.log('me all day', AppointmentService.myAppointments.scheduled);
  }
}; //end EditController
