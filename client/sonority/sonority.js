angular.module('et.sonority', [])

.controller('SonorityController', function($scope, soundFactory) {
  //var audioCtx = new AudioContext();
  // var audioCtx = soundFactory;
  // var oscillator = audioCtx.createOscillator();
  $scope.playing = false;
  $scope.isPlaying = 'start';
  $scope.toggleSound= function() {
    if (!$scope.playing) {
      soundFactory.startSound();
        $scope.isPlaying = 'stop';
    } else {
      soundFactory.stopSound();
        $scope.isPlaying = 'start';
    }  
    $scope.playing = !$scope.playing;
  };  
}).factory('soundFactory', function() {
  var audioCtx = new AudioContext();
  var oscillators = [];
  console.log('context in fac: ', audioCtx);
    var osc2 = audioCtx.createOscillator();
    console.log('osc2: ', osc2);
  var startSound = function() {

    var osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    oscillators.push(osc);
    console.log('osc: ', osc);
    osc.connect(audioCtx.destination);
    osc.start();
    console.log(osc);

  };
  var stopSound = function() {
    oscillators[0].stop();
    oscillators = [];
  }

  return {startSound: startSound,
          stopSound: stopSound};
});