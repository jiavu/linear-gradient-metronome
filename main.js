//window.alert("main.js ist geladen.");
//vlet testEl = document.getElementById("test2");
//testEl.innerHTML = "test2";

const alphaCh = document.getElementById("alphaCh");
const colorLayer = document.getElementById("colorLayer");


const newBarColor = "rgb(255,0,0)";	// in rgb()	// (red)
let beatColor = "rgb(0,0,255)";	// in rgb()	// (blue)

//let beat = 1;
let tempColor;


angular.module("metronome", [])
	.controller("metrCtrl", function($scope) {
		
		const ctrl = this;
		
		$scope.bgColor = "black";
		$scope.metrColor = newBarColor;
		$scope.tempo = 120;
		$scope.active = false;
		$scope.changeTo = "Start";
		
		ctrl.beat = 1;
		ctrl.interv = 500;

		ctrl.activeMetr = function(interv, beat) {

				if ($scope.active) {
					TweenMax.fromTo(alphaCh, interv/1000/2, {
						opacity: 0,
					},{
						onRepeat: function() {
							
							tempColor = (beat <= 2)?
							//$scope.metrColor = (beat === 1)?
								newBarColor : beatColor;
							beat++;
							if (beat >= 9) beat = 1;
							//console.log(beat, $scope.metrColor);
							TweenMax.set(colorLayer, {
								backgroundImage: `radial-gradient( ${tempColor}, rgb(0,0,0,0) )`
							})
							//colorLayer.style.backgroundImage = `radial-gradient( ${tempColor}, rgb(0,0,0,0) )`;
						},
						opacity: 1,
						yoyo: true,
						repeat: -1,
						ease: Power0.easeNone
					});
			} else {
				TweenMax.set(alphaCh, { opacity: 1 });
			}
		};
		
		ctrl.changeState = function() {

			$scope.active = !$scope.active;
			$scope.changeTo = $scope.active?
				(ctrl.beat = 1,
				"Stop") : "Start";

			ctrl.activeMetr(ctrl.interv, ctrl.beat);
		};
		
		ctrl.changeBPM = () => {
			ctrl.interv = 1000/($scope.tempo/60);
			ctrl.activeMetr();
		};

	});