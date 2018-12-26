//window.alert("main.js ist geladen.");
//vlet testEl = document.getElementById("test2");
//testEl.innerHTML = "test2";

const colorField = document.getElementById("container");
// style="background-image: radial-gradient( {{ metrColor }}, rgb(0,0,0,0) );"

const newBarColor = "255,0,0";	// in rgb()	// (red)
const beatColor = "0,0,255";	// in rgb()	// (blue)
let alpha = 1;	// 0 bis 1


angular.module("metronome", [])
	.controller("metrCtrl", function($scope) {
		
		const ctrl = this;
		
		$scope.metrColor = `rgb(${newBarColor},${alpha})`;
		$scope.tempo = 120;
		$scope.active = false;
		$scope.changeTo = "Start";
		
		ctrl.beat = 1;
		ctrl.interv = 500;
		ctrl.timeline = new TimelineLite();


		ctrl.activeMetr = function() {
			//let intervalID;

				if ($scope.active) {
					ctrl.timeline.set(colorField, {
						backgroundImage: `radial-gradient( ${$scope.metrColor}, rgb(0,0,0,0) )`
					}).to(colorField, ctrl.interv/1000, {
						backgroundImage: "radial-gradient( ${$scope.metrColor}, rgb(0,0,0,0) )",
						onComplete: ctrl.activeMetr
					});

				/*
				invervalID = window.setInterval(function(){
					console.log("executed");
					for (let f = 0; f < Math.floor(interv); f++) {
						$scope.metrColor = `rgb(${newBarColor},${alpha-f*1/interv})`;
						console.log($scope.metrColor);
					}
				}, interv);
			} else {
				clearInterval(intervalID);
				*/
			}
		};
		
		ctrl.changeState = function() {

			$scope.active = !$scope.active;
			$scope.changeTo = $scope.active?
				(ctrl.beat = 1,
				"Stop") : "Start";

			ctrl.activeMetr(ctrl.interv, ctrl.beat);
		};
		
		ctrl.changeBPM = () => ctrl.interv = 1000/($scope.tempo/60);

	});