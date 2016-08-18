angular.module('DfstcSchedulingApp').controller('registerController', function(UserService){
var vm = this;
// USER SETUP
var user = {};
user.email = vm.email;
user.password = vm.password;
user.firstName = vm.firstName;
user.lastName = vm.lastName;
user.phoneNumber = vm.phoneNumber;
user.address = {address1: vm.addressOne,
address2: vm.addressTwo,
city: vm.city,
state: vm.state
zip: vm.zipcode};
user.potentialPos = vm.volunteerOpportunities;
// PUSHING NAMES OF OPPORTUNITIES INTO AN ARRAY
vm.volunteerOpportunities = [];
if(vm.imageCoach == true){
  volunteerOpportunities.push("Image Coach")
};
if(vm.clothingSorter == true){
  volunteerOpportunities.push("Clothing Sorter")
};
if(vm.clothingOrganizer == true){
  volunteerOpportunities.push("Clothing Organizer")
};
if(vm.frontDesk == true){
  volunteerOpportunities.push("Front Desk")
};
if(vm.clothingSale == true){
  volunteerOpportunities.push("Clothing Sale Volunteer")
};
if(vm.clothingSaleCaptain == true){
  volunteerOpportunities.push("Clothing Sale Captain")
};
if(vm.careerAdvocate == true){
  volunteerOpportunities.push("Career Advocate")
};
if(vm.intelligenceMentor == true){
  volunteerOpportunities.push("Intelligence Mentor")
};
if(vm.intelligenceMuse == true){
  volunteerOpportunities.push("Intelligence Muse")
};
if(vm.communityAmbassador == true){
  volunteerOpportunities.push("Community Ambassador")
};
if(vm.eventSetUp == true){
  volunteerOpportunities.push("Event Set Up")
};
if(vm.photographer == true){
  volunteerOpportunities.push("Photographer")
};
if(vm.graphicDesigner == true){
  volunteerOpportunities.push("Graphic Designer")
};
// END POSITIONS

user.company = vm.company;
user.organization = vm.group;
user.isAvail = {
  Monday: {
    Morning: vm.mondayMorning,
    Afternoon: vm.mondayAfternoon,
    Evening: vm.mondayEvening
  },
  Tuesday: {
    Morning: vm.tuesdayMorning,
    Afternoon: vm.tuesdayAfternoon,
    Evening: vm.tuesdayEvening
  },
  Wednesday: {
    Morning: vm.wednesdayMorning,
    Afternoon: vm.wednesdayAfternoon,
    Evening: vm.wednesdayEvening
  },
  Thursday: {
    Morning: vm.thursdayMorning,
    Afternoon: vm.thursdayAfternoon,
    Evening: vm.thursdayEvening
  },
  Friday: {
    Morning: vm.fridayMorning,
    Afternoon: vm.fridayAfternoon,
    Evening: vm.fridayEvening
  },
  Saturday: {
    Morning: vm.saturdayMorning,
    Afternoon: vm.saturdayAfternoon,
    Evening: vm.saturdayEvening
  }
};

});
