angular.module('et.sonority', [])
//video 35:32 shows the directive way you could do this.
.controller('SonorityController', function($scope, soundFactory) {
  //var audioCtx = new AudioContext();
  // var audioCtx = soundFactory;
  // var oscillator = audioCtx.createOscillator();
  var audioCtx = new AudioContext();
  var masterGainNode = audioCtx.createGain();
  
  masterGainNode.connect(audioCtx.destination);
  $scope.masterVolume = masterGainNode.gain;
  $scope.masterVolume.value = .5;
  //$scope.max = '100';

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
    $scope.oscillators.forEach(function(oscObj) {
      oscObj.osc.frequency.value = Math.ceil(Math.random() * 1500);
      $scope.toggleSound(oscObj);
    });

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