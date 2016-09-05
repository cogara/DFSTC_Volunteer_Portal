angular.module('DfstcSchedulingApp').factory('AnnouncementService', AnnouncementService);

function AnnouncementService($http){

  function addAnnouncement(announcement){
    console.log(announcement);
    var data = {};
    data.announcement = announcement;
    return $http.post('/api/announcement', data).then(successHandle, failureHandle);

    var successHandle = function(res){
      console.log('AnnouncementService success', response.data);
      return response.data;
    };

    var failureHandle = function(res){
      console.log('AnnouncementService fail', response.data);
      return response.data;
    };
  }


  function getAnnouncement() {
    return $http.get('/api/announcement').then(function(res) {
      console.log(res.data);
      return res.data;
    })
  }

  return {
    addAnnouncement:addAnnouncement,
    getAnnouncement:getAnnouncement
  }
}
