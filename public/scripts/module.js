angular.module('DfstcSchedulingApp', ['ui.router', 'ui.bootstrap', 'mwl.calendar', 'ngAnimate', 'uiSwitch', 'monospaced.elastic', 'ui.mask', 'ngFileUpload']);
angular.module('DfstcSchedulingApp').run(function($rootScope) {
    $rootScope.safeApply = function(fn) {
    console.log('run safe apply');
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
          console.log('safe if');
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
          console.log('safe else');
            this.$apply(fn);
        }
    };
});
