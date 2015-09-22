angular.module('et.sonority', [])
//video 35:32 shows the directive way you could do this.
.controller('SonorityController', function($scope, $window, $interval, soundFactory) {
  //var audioCtx = new AudioContext();
  // var audioCtx = soundFactory;
  // var oscillator = audioCtx.createOscillator();
  var keyboard = new QwertyHancock({
                 id: 'keyboard',
                 width: 600,
                 height: 150,
                 octaves: 2,
                 startNote: 'A3',
                 whiteNotesColour: 'white',
                 blackNotesColour: 'black',
                 hoverColour: '#f3e939'
            });


  var audioCtx = new AudioContext();
  var masterGainNode = audioCtx.createGain();
  
  masterGainNode.connect(audioCtx.destination);
  $scope.masterVolume = masterGainNode.gain;
  $scope.masterVolume.value = .3;
  //$scope.max = '100';
  $scope.progressing = false;

  $scope.oscillators = [];
  $scope.makeOscillator = function() {
    var osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.start();
    var gain = audioCtx.createGain();
    gain.gain.value = .25;
    gain.connect(masterGainNode);
    var oscObj = {
      osc: osc,
      playing: false,
      gain: gain
    };
    $scope.oscillators.push(oscObj);
  };

  $scope.randomize = function() {
    var number = Math.ceil(Math.random() * 10);
    $scope.stopAll();
    $scope.oscillators = [];
    for (var i = 0; i < number; i++) {
      $scope.makeOscillator();
    }
    console.log($scope.oscillators);
    $scope.oscillators.forEach(function(oscObj) {
      oscObj.osc.frequency.value = Math.ceil(Math.random() * 1500);
      $scope.toggleSound(oscObj);
    });

  };

  var progression = function() {
    //$scope.interval = $window.setInterval(function() {$scope.randomize() }, 2000);
    $scope.randomize();
    $scope.interval = $interval($scope.randomize, 2000);
  };

  var endProgression = function() {
    console.log('ending');
    //$window.clearInterval($scope.interval);
    $interval.cancel($scope.interval);
  };

  

  $scope.toggleProgression = function() {
    ('progression? ', $scope.progressing);
    $scope.progressing ? endProgression() : progression();
    $scope.progressing = !$scope.progressing;
  };

  $scope.stopAll = function() {
    $scope.oscillators.forEach(function(oscObj) {
      if (oscObj.playing) $scope.toggleSound(oscObj);
    });
  };

  $scope.toggleSound = function(oscObj) {
    oscObj.playing ? soundFactory.stop(oscObj) : soundFactory.start(oscObj);
    oscObj.playing = !oscObj.playing; 

  };  
  $scope.setVolume = function(oscObj, vol) {
    // console.log('set vol', vol);
    // oscObj.gain.gain.value = vol/100;
    // console.log();

  };
  // $scope.setFreq = function(oscObj, freq) {
  //   oscObj.osc.frequency.value = freq;
  //   console.log('set: ', freq);
  // };
}).factory('soundFactory', function() {

  var start = function(oscObj) {
    if (!oscObj.playing) oscObj.osc.connect(oscObj.gain);
  };
  var stop = function(oscObj) {
    if (oscObj.playing) oscObj.osc.disconnect();
  };
  return {
    start: start,
    stop: stop    
  };
})