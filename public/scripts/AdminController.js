angular.module('DfstcSchedulingApp').controller('AdminController', AdminController).controller('ModalController', ModalController);

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
  vm.trainingComplete = trainingComplete;
  vm.toggleActive = toggleActive;
  vm.sortBy = sortBy;

  vm.sortDefault = 'lastName';
  vm.sortOrder = 'lastName'
  function sortBy(property) {
    vm.sortReverse = (vm.sortOrder === property) ? !vm.sortReverse : false;
    vm.sortReverse ? vm.sortDefault = '-lastName' : vm.sortDefault = 'lastName';
    vm.sortOrder = property;
  }

  function toggleActive(volunteer) {
    UserService.editProfile(volunteer);
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

  function trainingComplete(volunteer) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'trainingComplete.html',
      size: 'sm',
      controller: 'ModalController',
      controllerAs: 'modal',
      resolve: {
        volunteer: function() {
          return volunteer;
        }
      }
    })

    modalInstance.result.then(function() {
      console.log(volunteer);
      volunteer.isTrainee = false;
      volunteer.isVolunteer = true;
      UserService.editProfile(volunteer);
    })
  }

  function openProfile(id) {

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
  // Search volunteer options and filters
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
  vm.roleFilter = roleFilter;
  vm.statusFilter = statusFilter;
  vm.search.role = 'all';
  vm.search.status = 'all';

  function availableFilter(volunteer) {
    for (var day in vm.search.avail) {
      for (var time in vm.search.avail[day]) {
        if(vm.search.avail[day][time]) {
          vm.searchAvailActive = true;
          if(!volunteer.isAvail[day]) {
            return false;
          }
        } else {
          vm.searchAvailActive = false;
          return true;
        }

        // if(vm.search.avail[day][time]) {
        //   if(volunteer.isAvail[day]) {
        //     if(!(volunteer.isAvail[day][time] === vm.search.avail[day][time])) {
        //       console.log(volunteer.email, 'is not available on', day, time);
        //       vm.searchAvailActive = true;
        //       return false;
        //     }
        //   } else {
        //     console.log(volunteer.email, 'is not available any time on', day);
        //     return false;
        //   }
        // }
      }
    }
  }
  // function availableFilter(volunteer) {
  //   var check = false;
  //   for (var day in vm.search.avail) {
  //     for (var time in vm.search.avail[day]) {
  //       if(vm.search.avail[day][time]) {
  //         check = true;
  //       }
  //       //check to be sure the volunteer avail[day] object even exists, if so, then check search params
  //       if(volunteer.isAvail[day] && vm.search.avail[day]) {
  //         if(volunteer.isAvail[day][time] === vm.search.avail[day][time]) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   if(check) {
  //     vm.searchAvailActive = true;
  //     return false;
  //   } else {
  //     vm.searchAvailActive = false;
  //     return true;
  //   }
  // }

  function opportunityFilter(volunteer) {
    var check = false;
    for (var opp in vm.search.opportunity) {
      if(vm.search.opportunity[opp]) {
        check = true;
      }
      if(vm.search.opportunity[opp]) {
        if(volunteer.volunteerOpportunities[opp] === vm.search.opportunity[opp]) {
          return true;
        }
      }
    }
    if(check) {
      vm.searchOpportunityActive = true;
      return false;
    } else {
      vm.searchOpportunityActive = false;
      return true;
    }
  }


  function roleFilter(volunteer) {
    // console.log(vm.search.role);
    var check = 0;
    if(vm.search.role === 'isTrainee') {
      if(volunteer.isTrainee) {
        return true;
      }
    }
    if(vm.search.role === 'isVolunteer') {
      if(volunteer.isVolunteer) {
        return true;
      }
    }
    if(vm.search.role === 'all') {
      // console.log('showing all');
      return true;
    }
  }

  function statusFilter(volunteer) {
    // console.log(vm.search.role);
    var check = 0;
    if(vm.search.status === 'true') {
      if(volunteer.isActive) {
        return true;
      }
    }
    if(vm.search.status === 'false') {
      if(!volunteer.isActive) {
        return true;
      }
    }
    if(vm.search.status === 'all') {
      // console.log('showing all');
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
  //end search filters

} //end Admin Controller

function ModalController($uibModalInstance, volunteer) {
  var vm = this;
  vm.volunteer = volunteer;
  vm.saveTraining = saveTraining;
  vm.dismissTraining = dismissTraining;
  function saveTraining() {
    $uibModalInstance.close();
  }

  function dismissTraining() {
    $uibModalInstance.dismiss();
  }
}
