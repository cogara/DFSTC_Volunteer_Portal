angular
  .module('DfstcSchedulingApp')
  .controller('AdminController', AdminController)
  .controller('ModalController', ModalController)
  // .controller('RegisterClientController', RegisterClientController)
  .filter('PhoneFormat', phoneFormat)
  .filter('sum', sum);



function AdminController($http, $state, $uibModal, UserService, AdminService, volunteerList, appointments, Excel, $timeout) {
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
  vm.selectTrainee = selectTrainee;
  vm.approveMultipleTrainee = approveMultipleTrainee;
  vm.exportToExcel = exportToExcel;
  vm.printDiv = printDiv;
  vm.appointments = appointments;
  vm.todaysDate = new Date();
  vm.toggleReportExpandVolunteers = toggleReportExpandVolunteers;
  vm.toggleReportExpandClients = toggleReportExpandClients;
  vm.toggleReportExpandAll = toggleReportExpandAll;

  function toggleReportExpandVolunteers() {
    vm.reportExpandVolunteers = !vm.reportExpandVolunteers;
    var boolean = vm.reportExpandVolunteers;
    console.log(boolean);
    closeToggleVolunteers(boolean);
    checkToggleAll();
  }
  function toggleReportExpandClients() {
    vm.reportExpandClients = !vm.reportExpandClients;
    var boolean = vm.reportExpandClients;
    closeToggleClients(boolean);
    checkToggleAll();
  }
  function toggleReportExpandAll() {
    vm.reportExpandAll = !vm.reportExpandAll;
    var boolean = vm.reportExpandAll;
    vm.reportExpandVolunteers = boolean;
    vm.reportExpandClients = boolean;
    closeToggleVolunteers(boolean);
    closeToggleClients(boolean);
    checkToggleAll();
  }

  function checkToggleAll() {
    vm.reportExpandAll = (vm.reportExpandClients && vm.reportExpandVolunteers) ? true:false;
  }

  function closeToggleVolunteers(boolean) {
    for (var i = 0; i < vm.appointments.length; i++) {
      vm.appointments[i].toggleVolunteers = boolean;
    }
  }

  function closeToggleClients(boolean) {
    for (var i = 0; i < vm.appointments.length; i++) {
      vm.appointments[i].toggleClients = boolean;
    }
  }

  // getAppointments();
  // function getAppointments() {
  //   AdminService.getAppointments().then(function(response) {
  //     console.log(response.data);
  //     if(!response.data.clients) {
  //       response.data.clients = ['test'];
  //     }
  //     console.log('length', response.data.clients.length);
  //     vm.appointments = response.data;
  //   })
  // }

  function approveMultipleTrainee() {
    if(confirm('Convert to Volunteers?')) {
      for (var i = 0; i < vm.volunteers.length; i++) {
        if(vm.volunteers[i].traineeSelected) {
          vm.volunteers[i].isTrainee = false;
          vm.volunteers[i].isVolunteer = true;
          UserService.editProfile(vm.volunteers[i]);
          vm.traineeSelectCheck = false;
        }
      }
    }
  }

  function selectTrainee(trainee) {
    vm.preventProfile = true;
    console.log(trainee);
    if(trainee.traineeSelected) {
      trainee.traineeSelected = false;
    } else {
      trainee.traineeSelected = true;
    }
    // trainee.traineeSelected = (trainee.traineeSelected) ? false : true;
    for (var i = 0; i < vm.volunteers.length; i++) {
      console.log(vm.volunteers[i].traineeSelected);
      if(vm.volunteers[i].traineeSelected) {
        vm.traineeSelectCheck = true;
        return;
      } else {
        vm.traineeSelectCheck = false;
      }
    }
  }



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
    vm.preventProfile = true;
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

  vm.search = {};

  vm.search.opportunity = {};
  function clearSearchOpp() {
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
    vm.oppDropdownOpen = false;
  }

  vm.search.avail = {};
  function clearSearchAvail() {

    vm.search.avail.monday = {};
    vm.search.avail.tuesday = {};
    vm.search.avail.wednesday = {};
    vm.search.avail.thursday = {};
    vm.search.avail.friday = {};
    vm.search.avail.saturday = {};
    for(var day in vm.search.avail) {
      vm.search.avail[day].monday = false;
      vm.search.avail[day].morning = false;
      vm.search.avail[day].evening = false;
    }
    vm.searchAvailActive = false;
    vm.availDropdownOpen = false;
  }

  // Search volunteer options and filters
  function clearSearchOptions() {
    clearSearchOpp();
    clearSearchAvail();
    vm.search.role = 'all';
    vm.search.status = 'all';
    vm.search.input = null;
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
    var filterCheck;
    for (var day in vm.search.avail) {
      for (var time in vm.search.avail[day]) {
        if (vm.search.avail[day][time]) {
          filterCheck = true;
          if(volunteer.isAvail && volunteer.isAvail[day]) {
            if(!volunteer.isAvail[day][time]) {
              vm.searchAvailActive = filterCheck;
              return false;
            }
          } else {
            vm.searchAvailActive = filterCheck;
            return false;
          }
        }
      }
    }
    vm.searchAvailActive = filterCheck;
    return true;
  }

  function opportunityFilter(volunteer) {
    var check;
    for(var opp in vm.search.opportunity) {
      if (vm.search.opportunity[opp]) {
        check = true;
        if (!volunteer.volunteerOpportunities[opp]) {
          vm.searchOpportunityActive = check;
          return false;
        }
      }
    }
    vm.searchOpportunityActive = check;
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

  clearSearchOptions();
  //end search filters

  //report filters

  vm.filterCompany = filterCompany;
  function filterCompany(volunteer) {

    if(volunteer.hoursVolunteered && vm.filterCompanyInput) {
      volunteer.displayHours = 0;
      for (var i = 0; i < volunteer.hoursVolunteered.length; i++) {
        if(vm.filterCompanyExact) {
          if((volunteer.hoursVolunteered[i].company.toLowerCase()) === (vm.filterCompanyInput.toLowerCase())) {
            volunteer.displayHours += volunteer.hoursVolunteered[i].hours;
            volunteer.matchedCompany = volunteer.hoursVolunteered[i].company;
          }
        } else {
          var tempCompany = volunteer.hoursVolunteered[i].company.slice(0,vm.filterCompanyInput.length).toLowerCase();
          if((tempCompany) === (vm.filterCompanyInput.toLowerCase())) {
            volunteer.displayHours += volunteer.hoursVolunteered[i].hours;
            volunteer.matchedCompany = volunteer.hoursVolunteered[i].company;
          }
        }
      }
    } else if (vm.filterCompanyInput === '' || vm.filterCompanyInput === undefined){
      volunteer.displayHours = 0;
      if(volunteer.hoursVolunteered) {
        for (var i = 0; i < volunteer.hoursVolunteered.length; i++) {
          volunteer.displayHours += volunteer.hoursVolunteered[i].hours;
        }
      }
    }
    return true;
  }

  vm.reportFilterDate = reportFilterDate;
  function reportFilterDate(volunteer) {
    if(volunteer.hoursVolunteered && (vm.reportDateStart && vm.reportDateEnd)) {
      for (var i = 0; i < volunteer.hoursVolunteered.length; i++) {
        var tempStart = vm.reportDateStart.toISOString().slice(0,10);
        var tempEnd = vm.reportDateEnd.toISOString().slice(0,10);
        var tempDate = volunteer.hoursVolunteered[i].date.slice(0,10);
        tempStart = parseInt(tempStart.split('-').join(''));
        tempEnd = parseInt(tempEnd.split('-').join(''));
        tempDate = parseInt(tempDate.split('-').join(''));

        if(tempStart <= tempDate && tempDate <= tempEnd) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }

  }

  vm.reportDateFormat = 'MMM dd, yyyy';
  vm.dateStartOpen = dateStartOpen;
  vm.dateStart = {};
  vm.dateEnd = {};
  vm.dateStart.opened = false;
  function dateStartOpen() {
    vm.dateStart.opened = !vm.dateStart.opened;
  }
  vm.dateEndOpen = dateEndOpen;
  vm.dateEnd.opened = false;
  function dateEndOpen() {
    vm.dateEnd.opened = !vm.dateEnd.opened;
    setMinDate();
  }

  vm.dateOptions = {
    maxDate: new Date()
  }

  function setMinDate() {
    vm.dateOptions.minDate = vm.reportDateStart ? vm.reportDateStart : null;
  }
  //end report filters

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

function sum() {
  return function(volunteers) {
    var sum = 0;
    console.log(volunteers);
    for (var i = 0; i < volunteers.length; i++) {
      sum += volunteers[i].displayHours;
    }
    console.log(sum);
    return sum;
  }
}
