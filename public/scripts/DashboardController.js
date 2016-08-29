angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, $uibModal, UserService, AppointmentService, calendarConfig, moment) {
  var vm = this;
  for (var i = 0; i<AppointmentService.appointments.length; i++){
    console.log('Checking appointments in controller!');
    for (var j = 0; j<AppointmentService.appointments[i].volunteers.length; j++){
    if(AppointmentService.apppointments[i].volunteers[j]._id == UserService.checkLoggedIn._id){
      AppointmentService.appointments[i].color = calendarConfig.colorTypes.info;
    } else {
      AppointmentService.appointments[i].color = calendarConfig.colorTypes.warn;
    }
    }
  }

  vm.showAppointments = AppointmentService.appointments;
  vm.editAppointment = {};
  vm.editAppointment.event = AppointmentService.updateEvent.event;
  vm.currentUser = {};
  vm.currentUser.user = UserService.currentUser.user;
  vm.myAppointments = {};
  vm.myAppointments = AppointmentService.myAppointments.scheduled;

console.log('mine', AppointmentService.myAppointments.scheduled);
  vm.openProfile = openProfile;

  vm.profileToggle = false;
  vm.toggleProfile = toggleProfile;
  function toggleProfile() {
    vm.profileToggle ? vm.profileToggle = false : vm.profileToggle =  true;
  }
  function openProfile(id) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'profileModal.html',
      controller: 'ProfileController',
      controllerAs: 'prof',
      size: 'lg',
      resolve: {
        profile: function (UserService) {
          return UserService.getProfile(id).then(function(response){
            response.tempCompany = response.company;
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

// start calendar and form settings
  //These variables MUST be set as a minimum for the calendar to work
  vm.calendarView = 'month';
  vm.viewDate = new Date();
  var actions = [{
    label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
    onClick: function(args) {
    }
  }, {
    label: '<i class=\'glyphicon glyphicon-remove\'></i>',
    onClick: function(args) {
    }
  }];

  vm.addAppointment = function(){
    console.log(vm.appointment);
    AppointmentService.addAppointment(vm.appointment).then(function(response){
      vm.showAppointments.appointments.push(vm.appointment);
      console.log('add appointment success', response.data);
    }, function(response){
      console.log('add appointment fail', response.data);
    })
  }

  vm.appointment={
    title: "Image Coach Appointment",
    color: calendarConfig.colorTypes.special,
    startsAt: '',
    endsAt: '',
    volunteerSlots: 5,
    clientSlots: 5,
    trainingAppointment: false,
    volunteers: [],
    incrementsBadgeTotal: false
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
  vm.popup1 = {
    opened: false
  }

  vm.popup2 = {
    opened: false
  }//end calendar and form settings

  vm.addAppointmentModal = function(){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'addAppointmentModal.html',
      controller: 'DashboardController',
      controllerAs: 'dash',
      size: 'lg'
    })
  }

  vm.eventClicked = function(calendarEvent){
    console.log(calendarEvent);
    AppointmentService.myAppointments.scheduled = [];
    AppointmentService.updateEvent.event = calendarEvent;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'editAppointmentModal.html',
      controller: 'DashboardController',
      controllerAs: 'dash',
      size: 'lg',
      resolve: {
        appointment: function (){
          return AppointmentService.updateEvent.event;
        }
      }
    });
  }

  vm.updateAppointment = function(info){
    console.log(info);
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

  vm.claimAppointment = function(info){
    info.volunteers.push(vm.currentUser.user);
    AppointmentService.updateAppointment(info._id, info);
    vm.showAppointments.appointments.splice(findIndex(vm.showAppointments.appointments, '_id', info._id), 1);
  };

  vm.removeVolunteer = function(index, event){
    event.volunteers.splice(index, 1);
    for (var i = vm.showAppointments.appointments.length-1; i >= 0; i--){
      if (vm.showAppointments.appointments[i]._id == event._id){
        vm.showAppointments.appointments[i].volunteers.splice(index, 1);
      }
    }
    AppointmentService.updateAppointment(event._id, event);

  }

console.log(UserService.currentUser.user);

  // Checks the pulled appointments to see if the current user is assigned, then colors Appts

  AppointmentService.getAppointments(UserService.currentUser.user)
  // for (var i = 0; i<AppointmentService.appointments.length; i++){
  //   console.log('Checking appointments in controller!');
  //   for (var j = 0; j<AppointmentService.appointments[i].volunteers.length; j++){
  //   if(AppointmentService.apppointments[i].volunteers[j]._id == UserService.checkLoggedIn._id){
  //     AppointmentService.appointments[i].color = calendarConfig.colorTypes.info;
  //   } else {
  //     AppointmentService.appointments[i].color = calendarConfig.colorTypes.warn;
  //   }
  //   }
  // }

}; //end DashboardController
