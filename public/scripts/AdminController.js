angular
  .module('DfstcSchedulingApp')
  .controller('AdminController', AdminController)
  .controller('ModalController', ModalController)
  // .controller('RegisterClientController', RegisterClientController)
  .filter('PhoneFormat', phoneFormat);

function AdminController($http, $state, $uibModal, UserService, AdminService, volunteerList, Excel, $timeout) {
  var vm = this;
  vm.volunteers = volunteerList;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;
  vm.openProfile = openProfile;
  vm.trainingComplete = trainingComplete;
  vm.toggleActive = toggleActive;
  vm.sortBy = sortBy;
  vm.resetSearch = resetSearch;
  vm.expandProfile = expandProfile;
  vm.availableFilter = availableFilter;
  vm.opportunityFilter = opportunityFilter;
  vm.roleFilter = roleFilter;
  vm.statusFilter = statusFilter;
  vm.clearSearchOpp = clearSearchOpp;
  vm.clearSearchAvail = clearSearchAvail;

  vm.printDiv = printDiv;
  function printDiv(divId) {
    window.frames["print_frame"].document.body.innerHTML = document.getElementById(divId).innerHTML;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
  }


  vm.exportToExcel = exportToExcel;
  vm.printDiv = printDiv;

  function expandProfile(volunteer, panel) {
    if(panel === 'all') {
      if ((!volunteer.expandRight) || (!volunteer.expandDown)) {
        volunteer.expandRight = true;
        volunteer.expandDown = true;
      } else {
        volunteer.expandRight = false;
        volunteer.expandDown = false;
      }
    }
    if(panel === "right") {
      volunteer.expandRight = true;
    }
    if(panel === "down") {
      volunteer.expandDown = true;
    }
  }

  function toggleActive(volunteer) {
    vm.preventProfile = true;
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
    vm.preventProfile=true;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'trainingComplete.html',
      size: 'sm',
      controller: 'ModalController',
      controllerAs: 'modal',
      resolve: {
        volunteer: function() {
          var sendVolunteer = {};
          for (var key in volunteer) {
            if((key !== 'expandDown') || (key !== 'expandRight')) {
              console.log('saving', key, volunteer[key]);
              sendVolunteer[key] = volunteer[key];
            }
          }
          return sendVolunteer;
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
    console.log(vm.preventProfile);
    if(!vm.preventProfile) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'adminProfileModal.html',
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
          getVolunteers();
        });

        console.log(profile);
      });
    }
    vm.preventProfile = false;
  };

  function clearSearchAvail() {
    vm.search.avail = {};
    vm.search.avail.monday = {};
    vm.search.avail.tuesday = {};
    vm.search.avail.wednesday = {};
    vm.search.avail.thursday = {};
    vm.search.avail.friday = {};
    vm.search.avail.saturday = {};
    vm.searchAvailActive = false;
    console.log(vm.search.avail);
    vm.availDropdownOpen = false;
  }

  // Search volunteer options and filters
  function clearSearchOptions() {
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


    vm.search.role = 'all';
    vm.search.status = 'all';
    //
    // vm.sortDefault = 'lastName';
    // vm.sortLast = 'firstName';
    // vm.sortOrder = 'lastName';
    vm.searchAvailActive = false;
    // vm.searchOpportunityActive = false;
  }

  function resetSearch() {
    clearSearchOptions();
  }


  vm.sortDefault = 'lastName';
  vm.sortLast = 'firstName';
  vm.sortOrder = 'lastName';
  function sortBy(property) {
    vm.sortReverse = (vm.sortOrder === property) ? !vm.sortReverse : false;
    (vm.sortReverse) ? vm.sortDefault = '-lastName' : vm.sortDefault = 'lastName';
    (vm.sortReverse) ? vm.sortLast = '-firstName' : vm.sortLast = 'firstName';
    vm.sortOrder = property;
  }

  function availableFilter(volunteer) {
    for (var day in vm.search.avail) {
      for (var time in vm.search.avail[day]) {
        if (vm.search.avail[day][time]) {
          vm.searchAvailActive = true;
          if(volunteer.isAvail && volunteer.isAvail[day]) {
            if(!volunteer.isAvail[day][time]) {
              return false;
            }
          } else {
            return false;
          }
        } else {
          vm.searchAvailActive = false;
        }
      }
    }
    return true;
  }

  function opportunityFilter(volunteer) {
    var check;
    for(var opp in vm.search.opportunity) {
      if (vm.search.opportunity[opp]) {
        check = true;
        if (!volunteer.volunteerOpportunities[opp]) {
          return false;
        }
      }
    }
    if (check) {
      vm.searchOpportunityActive = true;
    } else {
      vm.searchOpportunityActive = false;
    }
    return true;
  }

  function roleFilter(volunteer) {
    if(vm.search.role === 'isTrainee') {
      if(volunteer.isTrainee) {
        vm.searchRoleActive = true;
        return true;
      }
    }
    if(vm.search.role === 'isVolunteer') {
      if(volunteer.isVolunteer) {
        vm.searchRoleActive = true;
        return true;
      }
    }
    if(vm.search.role === 'all') {
      // console.log('showing all');
      vm.searchRoleActive = false;
      return true;
    }
  }

  function statusFilter(volunteer) {
    // console.log(vm.search.role);
    if(vm.search.status === 'true') {
      if(volunteer.isActive) {
        vm.searchStatusActive = true;
        return true;
      }
    }
    if(vm.search.status === 'false') {
      if(!volunteer.isActive) {
        vm.searchStatusActive = true;
        return true;
      }
    }
    if(vm.search.status === 'all') {
      vm.searchStatusActive = false;
      return true;
    }
  }

  function clearSearchOpp() {
      for (var key in vm.search.opportunity) {
        vm.search.opportunity[key] = false;
      }
    vm.oppDropdownOpen = false;
  }

  clearSearchOptions();
  //end search filters

  function exportToExcel(volunteerTable) {
    vm.exportHref = Excel.tableToExcel(volunteerTable, 'volunteers');
    $timeout(function() {
      location.href = vm.exportHref;
    }, 100);
  }

  function printDiv(divId) {
    window.frames["print_frame"].document.body.innerHTML = document.getElementById(divId).innerHTML;
    // console.log(window.frames["print_frame"].document.body.innerHTML);
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
  }

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

// function RegisterClientController($uibModalInstance) {
//   var vm = this;
//   vm.registerClient = registerClient;
//   vm.cancel = cancel;
//   function registerClient(client) {
//     $uibModalInstance.close(client);
//   }
//
//   function cancel() {
//     $uibModalInstance.dismiss();
//   }
// }


function phoneFormat() {
  return function (tel) {
    if (!tel) { return ''; }

    var value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
        return tel;
    }

    var country, city, number;

    country = 1;
    city = value.slice(0, 3);
    number = value.slice(3);

    if (country == 1) {
        country = "";
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + " (" + city + ") " + number).trim();
  };


}
