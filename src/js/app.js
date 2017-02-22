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




InputController.$inject = ['dataservice','$http'];
dataservice.$inject = ['$http', '$q','storage'];
storage.$inject = [];


function storage (){
    var vm = this;
  vm.completeData = [];
  vm.trimmedData = {};

  return {
     completeData: vm.completeData,
     trimmedData: vm.trimmedData
  };

}

function InputController(dataservice, $http) {




    function getRepos(user) {
        console.log('sanity check', user.userName);
        var userName = user.userName
        return dataservice.getRepos(userName)
          .then(function(data){
            accordionService
        })
}
      var vm = this;
      vm.repos = [];
      vm.getRepos = getRepos;
 }



function accordionService(){

  var vm = this;

  let dataTrimmed = storage.model.data;


  data.forEach(function(instanceObj){
    var obj = {};



  })

  vm.oneAtATime = true;






  vm.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  vm.items = ['Item 1', 'Item 2', 'Item 3'];


  vm.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
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
