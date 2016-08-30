angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, $uibModal, $scope, UserService, AppointmentService, calendarConfig, moment) {
  var vm = this;

  vm.showAppointments = AppointmentService.appointments;
  vm.editAppointment = {};
  vm.editAppointment.event = AppointmentService.updateEvent.event;
  vm.currentUser = {};
  vm.currentUser.user = UserService.currentUser.user;
  vm.myAppointments = {};
  vm.myAppointments.scheduled = [];
  vm.myAppointments.scheduled = AppointmentService.myAppointments.scheduled;

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
      controller: 'EditController',
      controllerAs: 'edit',
      size: 'lg',
      resolve: {
        appointment: function (){
          return AppointmentService.updateEvent.event;
        }
      }
    });
  }
  vm.alerts = [];

  vm.addAlert = function() {
      $scope.alerts.push({ msg: 'Thank you for choosing to volunteer! We will send you a reminder email before your chosen appointment.'});
    };

  vm.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

//   vm.updateAppointment = function(info){
//     AppointmentService.updateAppointment(info._id, info);
//     vm.showAppointments.appointments.splice(findIndex(vm.showAppointments.appointments, '_id', info._id), 1);
//     vm.showAppointments.appointments.push(info);
//
//   }
//
//   function findIndex(array, attr, value) {
//     for(var i = 0; i < array.length; i += 1) {
//       if(array[i][attr] === value) {
//         return i;
//       }
//     }
//   }
//   vm.deleteAppointment = function(event){
//     console.log('deleting', event);
//     AppointmentService.deleteAppointment(event._id);
//     vm.showAppointments.appointments.splice(findIndex(vm.showAppointments.appointments, '_id', event._id), 1);
//   }
// // volunteer adding themselves to appointment
//   vm.claimAppointment = function(info){
//     info.volunteers.push(vm.currentUser.user);
//     AppointmentService.updateAppointment(info._id, info);
//     vm.showAppointments.appointments.splice(findIndex(vm.showAppointments.appointments, '_id', info._id), 1);
//     info.color = calendarConfig.colorTypes.info;
//     vm.myAppointments.scheduled.push(info);
//     vm.showAppointments.appointments.push(info);
//     location.reload();
//     // $scope.safeApply();
//   };
// // admin removing volunteer from appointment
//   vm.removeVolunteer = function(index, event){
//     event.volunteers.splice(index, 1);
//     for (var i = vm.showAppointments.appointments.length-1; i >= 0; i--){
//       if (vm.showAppointments.appointments[i]._id == event._id){
//         vm.showAppointments.appointments[i].volunteers.splice(index, 1);
//       }
//     }
//     AppointmentService.updateAppointment(event._id, event);
//   }
// // volunteer removing self from appointment
//   vm.removeMe = function(event){
//     event.color = calendarConfig.colorTypes.warning;
//     for (var i = event.volunteers.length-1; i >= 0; i--){
//       if (event.volunteers[i]._id == UserService.currentUser.user._id){
//         event.volunteers.splice(i, 1);
//       }
//     }
//     AppointmentService.updateAppointment(event._id, event);
//
//     // for (var j = vm.showAppointments.appointments.length-1; j >= 0; j--){
//     //   if (vm.showAppointments.appointments[j]._id == event._id){
//     //     vm.showAppointments.appointments.splice(j, 1);
//     //     vm.showAppointments.appointments.push(event);
//     //   }
//     // }
//     // for (var k = vm.myAppointments.scheduled.length-1; k >= 0; k--){
//     //   if (vm.myAppointments.scheduled[k]._id == event._id){
//     //     vm.myAppointments.scheduled.splice(k, 1);
//     //     // AppointmentService.myAppointments.scheduled.splice(k, 1);
//     //   }
//     // }
//     // location.reload();
//     // console.log('me all day', vm.myAppointments);
//   }

  AppointmentService.getAppointments(UserService.currentUser.user)
}; //end DashboardController
