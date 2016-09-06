angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, $uibModal, $scope, UserService, AppointmentService, calendarConfig, moment, AnnouncementService) {
  var vm = this;

  vm.showAppointments = AppointmentService.appointments;
  vm.editAppointment = {};
  vm.editAppointment.event = AppointmentService.updateEvent.event;
  vm.currentUser = {};
  vm.currentUser.user = UserService.currentUser.user;
  vm.myAppointments = {};
  vm.myAppointments.scheduled = AppointmentService.myAppointments.scheduled;
  vm.highPriority = AppointmentService.highPriority;
  vm.hideContent = true;

  vm.saveAnnouncement = saveAnnouncement;
  function saveAnnouncement() {
    if(vm.editAnnouncementToggle) {
      AnnouncementService.addAnnouncement(vm.announcement);
    }
    return true;
  }

  getAnnouncements();
  function getAnnouncements(){
    AnnouncementService.getAnnouncement().then(successHandle)

    function successHandle(res){
      vm.announcement = res[0];
      console.log(res[0]);
    };
  }


  vm.openProfile = openProfile;

  vm.profileToggle = false;
  vm.toggleProfile = toggleProfile;
  vm.eventColors = calendarConfig.colorTypes;
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
    if (vm.occurs.often == 'once'){
      AppointmentService.addAppointment(vm.appointment).then(function(response){
        vm.showAppointments.appointments.push(vm.appointment);
      }, function(response){
      })
    } else {
      var weeks = Math.ceil(((moment(vm.occurs.until).diff(vm.appointment.startsAt, 'days'))/7)+1);
      for (var i = 0; i <= weeks; i ++){
        var sendAppointment = angular.copy(vm.appointment);
        sendAppointment.startsAt = moment(vm.appointment.startsAt).add(i, 'week');
        sendAppointment.endsAt = moment(vm.appointment.endsAt).add(i, 'week');
        if (moment(sendAppointment.startsAt) <= moment(vm.occurs.until).add(1, 'days')){
          vm.showAppointments.appointments.push(sendAppointment);
          AppointmentService.addAppointment(sendAppointment).then(function(response){
          }, function(response){
          })
        }
      }
    }
  }

  vm.appointment = {
    title: "Image Coach Appointment",
    color: calendarConfig.colorTypes.special,
    startsAt: '',
    endsAt: '',
    volunteerSlots: 5,
    clientSlots: 5,
    clients: 0,
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
    vm.popup1.opened = true;
  };

  vm.open2 = function() {
    vm.popup2.opened = true;
  };

  vm.open3 = function() {
    vm.popup3.opened = true;
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
  }

  vm.popup3 = {
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

  vm.occurs = {
    often: 'once',
    until: ''
  };

  vm.eventClicked = function(calendarEvent){
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

  // Announcements functions

  // vm.addAnnouncementModal = function(){
  //   var modalInstance = $uibModal.open({
  //     animation: true,
  //     templateUrl: 'addAnnouncementModal.html',
  //     controller: 'DashboardController',
  //     controllerAs: 'dash',
  //     size: 'lg'
  //   })
  // }

  // vm.addAnnouncement = function(){
  //   console.log(vm.announcement);
  //   AnnouncementService.addAnnouncement(vm.announcement).then(function(response){
  //     console.log('add announcement success', response.data);
  //   }, function(response){
  //     console.log('add announcement fail', response.data);
  //   })
  // }
  //
  // var getAnnouncement = function(){
  //   AnnouncementService.getAnnouncement().then(successHandle)
  //
  //   function successHandle(res){
  //     vm.Ann.title = res[0].title;
  //     vm.Ann.message = res[0].message;
  //     vm.Ann.date = moment(res[0].date).format('MMM Do YYYY');
  //   };
  // }
  // getAnnouncement();

  vm.pageLoad = function(){
    if (typeof vm.showAppointments.appointments === 'undefined'){
      AppointmentService.getAppointments(UserService.currentUser.user);
    }
  }
}; //end DashboardController
