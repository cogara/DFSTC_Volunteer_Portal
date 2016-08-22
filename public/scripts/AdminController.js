angular.module('DfstcSchedulingApp').controller('AdminController', AdminController);

function AdminController($http, $state, $uibModal, UserService, AdminService, volunteerList) {
  var vm = this;
  vm.volunteers = volunteerList;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;
  vm.searchAllOpp = searchAllOpp;
  vm.searchAllAvail = searchAllAvail;
  vm.openProfile = openProfile;

  // Setting search options
  vm.search = {};
  vm.search.opportunity = {};
  vm.search.opportunity.all = false;
  vm.search.opportunity.one = false;
  vm.search.opportunity.two = false;
  vm.search.opportunity.three = false;
  vm.search.opportunity.four = false;
  vm.search.opportunity.five = false;
  vm.search.opportunity.six = false;
  vm.search.opportunity.seven = false;
  vm.search.opportunity.eight = false;
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
        check++;
        console.log('at least one opp selected');
      }
      if(volunteer.volunteerOpportunities[opp] === vm.search.opportunity[opp]) {
        return true;
      }
    }
    if(check > 0) {
      return false;
    } else {
      return true;
    }
  }

  function searchAllOpp() {
    console.log(vm.search.opportunity.all);
    if (vm.search.opportunity.all) {
      for (var key in vm.search.opportunity) {
        vm.search.opportunity[key] = false;
      }
    } else {
      for (var key in vm.search.opportunity) {
        vm.search.opportunity[key] = true;
      }
    }
  }

  function searchAllAvail() {
    if (vm.search.avail.all) {
      vm.search.avail.all = false;
      for (var key in vm.search.avail) {
        console.log(key);
        vm.search.avail[key].morning = false;
        vm.search.avail[key].afternoon = false;
        vm.search.avail[key].evening = false;
      }
    } else {
      vm.search.avail.all = true;
      for (var key in vm.search.avail) {
        vm.search.avail[key].morning = true;
        vm.search.avail[key].afternoon = true;
        vm.search.avail[key].evening = true;
      }
    }
  }

  function getVolunteers() {
    AdminService.getVolunteers().then(function(response) {
      vm.volunteers = response;
    })
  }

  function viewVolunteer(volunteer) {
    console.log(volunteer);
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
