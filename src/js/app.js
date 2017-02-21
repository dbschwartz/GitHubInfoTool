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
    .controller('InputController', InputController);




InputController.$inject = ['dataservice'];
dataservice.$inject = ['$http'];
storage.$inject = ['dataservice']


function storage (dataservice){
  var vm = this;
  vm.model = [];
}

function InputController(dataservice) {


function getRepos(user) {
    console.log('sanity check', user.userName);
    let userName = user.userName
    return dataservice.getRepos(userName)
      .then(function(data){
          vm.repos = data;
          storage.model = data;
          return vm.repos;
        });
    }

  var vm = this;
  vm.repos = [];
  vm.getRepos = getRepos;

}




function dataservice($http){

  return {
    getRepos: getRepos
  };


  function getRepos(userName){

  return $http.get('https://api.github.com/users/'+userName+'/repos')
    .then(getReposComplete)
    .catch(getReposFailed);


    function getReposComplete(response){
        console.log(response);
        return response;
    }

    function getReposFailed(error) {
        console.log(('XHR Failed for getRepos.' + error.data));

    }
   }
  }
})();
