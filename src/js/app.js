// sample angular code
/* recommended */
(function() {
  'use strict';
  angular
    .module('app', [
        'ui.bootstrap'
    ]);

angular
    .module('app')
    .factory('dataservice', dataservice)
    .factory('storage', storage)
    .factory('accordionService', accordionService)
    .controller('InputController', InputController);




InputController.$inject = ['dataservice','storage','$http','accordionService'];
dataservice.$inject = ['$http', '$q','storage'];
storage.$inject = [];
accordionService.$inject = ['storage'];


function storage (){
    var vm = this;
  vm.completeData = [];
  vm.trimmedData = {};

  return {
     completeData: vm.completeData,
     trimmedData: vm.trimmedData
  };

}

function InputController(dataservice,storage,$http,accordionService) {




    function getRepos(user) {
        console.log('sanity check', user.userName);
        var userName = user.userName
        return dataservice.getRepos(userName)
          .then(function(data){
            vm.repos = data;
        })
}
      var vm = this;
      vm.getRepos = getRepos;
 }



function accordionService(storage){
   return {
            redrawAccordion: redrawAccordion
        };


        var vm = this;
        var data = vm.data;
        var oneAtATime = vm.oneAtATime;
        var status = vm.status;

      function redrawAccordion(){

        data = storage.trimmedData;
        oneAtATime = true;



        status = {
          isCustomHeaderOpen: false,
          isFirstOpen: true,
          isFirstDisabled: false
        };
      }
       
     
}







function dataservice($http,$q,storage){

  return {
    getRepos: getRepos
  };


  function getRepos(userName){

  return $http.get('https://api.github.com/users/'+userName+'/repos')
    .then(getReposComplete)
    .catch(getReposFailed);


    function getReposComplete(response){
              console.log('sanity check');
              storage.trimmedData = {};
              storage.completeData = response.data;
              storage.completeData.forEach(function(instanceObj){
                let title = instanceObj.full_name;
                storage['trimmedData'][title] = {};
                //console.log(storage['trimmedData']);
              })
                var promises = [];  
                Object.keys(storage.trimmedData).forEach(function(title){
                    var promise = $http.get('https://api.github.com/repos/'+title+'/commits').then(function(response){
                      //console.log(response);
                      var commits = [];
                      response.data.forEach(function(instanceObj){
                          //console.log(instanceObj);
                          var obj = {};
                          obj.author = instanceObj.commit.author.name;
                          obj.message = instanceObj.commit.message;
                          obj.sha = instanceObj.sha;
                          commits.push(obj);

                      })
                      storage['trimmedData'][title]['content'] = commits;
                    });
                    promises.push(promise);
                })

            $q.all(promises).then(function(){
        console.log(storage.trimmedData);
            });

        return response;
    }

    function getReposFailed(error) {
        console.log(('XHR Failed for getRepos.' + error.data));

    }
   }
  }
})();
