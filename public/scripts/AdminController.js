angular.module('DfstcSchedulingApp').controller('AdminController', AdminController);

function AdminController($http, $state, $uibModal, UserService, AdminService, volunteerList) {
  var vm = this;
  vm.volunteers = volunteerList;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;
  vm.clearSearchOpp = clearSearchOpp;
  vm.clearSearchAvail = clearSearchAvail;
  vm.openProfile = openProfile;

  // Setting search options
  vm.search = {};
  vm.search.opportunity = {};
  vm.search.opportunity.all = false;
  vm.search.opportunity.imageCoach = false;
  vm.search.opportunity.careerCoach = false;
  vm.search.opportunity.clothingSorter = false;
  vm.search.opportunity.clothingOrganizer = false;
  vm.search.opportunity.frontDesk = false;
  vm.search.opportunity.clothingSale = false;
  vm.search.opportunity.clothingSaleCaptain = false;
  vm.search.opportunity.careerAdvocate = false;
  vm.search.opportunity.intelligenceMentor = false;
  vm.search.opportunity.intelligenceMuse = false;
  vm.search.opportunity.communityAmbassador = false;
  vm.search.opportunity.eventSetUp = false;
  vm.search.opportunity.photographer = false;
  vm.search.opportunity.graphicDesigner = false;


  vm.search.avail = {};
  vm.search.avail.monday = {};
  vm.search.avail.tuesday = {};
  vm.search.avail.wednesday = {};
  vm.search.avail.thursday = {};
  vm.search.avail.friday = {};
  vm.search.avail.saturday = {};

  vm.availableFilter = availableFilter;
  vm.opportunityFilter = opportunityFilter;
  function availableFilter(volunteer) {
    var check = 0;
    for (var day in vm.search.avail) {
      for (var time in vm.search.avail[day]) {
        if(vm.search.avail[day][time]) {
          check++;
        }
        //check to be sure the volunteer avail[day] object even exists, if so, then check search params
        if(volunteer.isAvail[day] && vm.search.avail[day]) {
          if(volunteer.isAvail[day][time] === vm.search.avail[day][time]) {
            return true;
          }
        }
      }
    }
    if(check > 0) {
      return false;
    } else {
      return true;
    }
  }

  function opportunityFilter(volunteer) {
    var check = 0;
    for (var opp in vm.search.opportunity) {
      if(vm.search.opportunity[opp]) {
        check = 1;
      }
      if(vm.search.opportunity[opp]) {
        if(volunteer.volunteerOpportunities[opp] === vm.search.opportunity[opp]) {
          return true;
        }
      }
    }
    if(check > 0) {
      return false;
    } else {
      return true;
    }
  }

  function clearSearchOpp() {
      for (var key in vm.search.opportunity) {
        vm.search.opportunity[key] = false;
      }
    vm.oppDropdownOpen = false;
  }

  function clearSearchAvail() {
    for (var key in vm.search.avail) {
      vm.search.avail[key].morning = false;
      vm.search.avail[key].afternoon = false;
      vm.search.avail[key].evening = false;
    }
    vm.availDropdownOpen = false;
  }

  function getVolunteers() {
    AdminService.getVolunteers().then(function(response) {
      vm.volunteers = response;
    })
  }

  function viewVolunteer(volunteer) {
    vm.editingVolunteer = volunteer;
  }

  function editVolunteer() {
    vm.isEditing = true;
  }

  function saveEdit() {
    console.log(vm.editingVolunteer);
    vm.isEditing = false;
    UserService.editProfile(vm.editingVolunteer).then(getVolunteers);
  }

  function openProfile(id) {
    console.log('sending id', id);

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'adminProfileModal.html',
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
        getVolunteers();
      });

      console.log(profile);
    });
  };


} //end Admin Controller
