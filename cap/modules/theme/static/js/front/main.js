require([
    'js/front/app',
  ], function(app) {
      // Initialize the app
      angular.element(document).ready(function() {
        angular.bootstrap(document.getElementById("cap-hello"), ['cap.front']);
      });
});