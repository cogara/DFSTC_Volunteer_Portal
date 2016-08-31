angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, $uibModal, UserService, AppointmentService, calendarConfig, AnnouncementService, moment) {
  var vm = this;

  vm.showAppointments = AppointmentService.appointments;
  vm.editAppointment = {};
  vm.editAppointment.event = AppointmentService.updateEvent.event;


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

  AppointmentService.getAppointments()


  // Announcements functions

  vm.announcement={
    title: "",
    message: ''
  };

  vm.Ann={
    title: "",
    message: '',
    date:new Date()
  }

  vm.title = "test";


  vm.addAnnouncementModal = function(){
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'addAnnouncementModal.html',
      controller: 'DashboardController',
      controllerAs: 'dash',
      size: 'lg'
    })
  }

  vm.addAnnouncement = function(){
    console.log(vm.announcement);
    AnnouncementService.addAnnouncement(vm.announcement).then(function(response){
      console.log('add announcement success', response.data);
    }, function(response){
      console.log('add announcement fail', response.data);
    })
  }

  var getAnnouncement = function(){
    AnnouncementService.getAnnouncement().then(successHandle)
      function successHandle(res){
        vm.Ann.title = res[0].title;
        vm.Ann.message = res[0].message;
        vm.Ann.date = moment(res[0].date).format('MMM Do YYYY');
      };

  }
 getAnnouncement();

}; //end DashboardController
