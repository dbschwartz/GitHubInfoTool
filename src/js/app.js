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
    .controller('InputController', InputController);




InputController.$inject = ['dataservice'];
dataservice.$inject = ['$http'];

function InputController(dataservice, logger) {
  var vm = this;
  vm.repos = [];

  activate();


  function activate() {
      return getRepos().then(function(){
        console.log('activated view')
      }); 
  }

function getRepos() {

    return dataservice.getRepos()
      .then(function(data){
          vm.repos = data;
          return vm.repos;
        });
    }

}



function dataservice($http, logger){

  return {
    getRepos: getRepos
  };


  function getRepos(){

  return $http.get('https://api.github.com/users/dbschwartz/repos')
    .then(getReposComplete)
    .catch(getReposFailed);


    function getReposComplete(response){
        console.log(response);
    }

    function getReposFailed(error) {
        console.log(('XHR Failed for getRepos.' + error.data));

    }
   }
  }
})();
