//window.alert("main.js ist geladen.");
//vlet testEl = document.getElementById("test2");
//testEl.innerHTML = "test2";

const alphaCh = document.getElementById("alphaCh");


const newBarColor = "rgb(255,0,0)";	// in rgb()	// (red)
let beatColor = "rgb(0,0,255)";	// in rgb()	// (blue)


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

		ctrl.activeMetr = function() {

				if ($scope.active) {
					TweenMax.fromTo(alphaCh, ctrl.interv/1000/2, {
						opacity: 0,
					},{
						onRepeat: function() {
							$scope.metrColor = (ctrl.beat === 1)?
								newBarColor : beatColor;
							ctrl.beat++;
							if (ctrl.beat >= 9) ctrl.beat = 1;
							console.log(ctrl.beat, $scope.metrColor);
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