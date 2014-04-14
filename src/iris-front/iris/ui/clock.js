iris.ui(function (self) {

	self.settings({
		  time : null
		, onTimeout: function() {
			iris.log("TIMEOUT >>>>>>>>>>", self.setting("time"));
		}
	});

	var
		  timeout
		, interval
		, minuteDeg = 0
		, secondDeg = 0
		, minuteIncDeg = 6
		, secondIncDeg = 6
	;

	self.create = function() {
		
		// self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.clock.html);
	};

	self.start = function(p_time){ // time in minutes
		if (p_time) {
			self.setting("time", p_time);
			
			minuteDeg = -360 * (p_time/60) / 60;
			secondDeg = 0;

			posSecondHand();
			posMinuteHand();

			clearTimeout(timeout);
			timeout = setTimeout(function(){
				self.stop();
				self.setting("onTimeout")();
			}, p_time*1000);

			clearInterval(interval);
			interval = setInterval(stepSecond, 1000);
		}
		self.get().removeClass("stopped");
	};

	self.stop = function(){
		clearTimeout(timeout);
		clearInterval(interval);
		minuteDeg = 0;
		secondDeg = 0;
		posSecondHand();
		posMinuteHand();
	};

	function stepSecond() {
		secondDeg = (secondDeg + secondIncDeg) % 360;
		posSecondHand();
		if (secondDeg === 0) {
			minuteDeg += minuteIncDeg;
			posMinuteHand();
		}
	}

	function posSecondHand() {
		rotateSecondDeg = 'rotate('+secondDeg+'deg)';
		self.get('second').css({
			WebkitTransform : rotateSecondDeg,
			MozTransform    : rotateSecondDeg,
			MsTransform     : rotateSecondDeg,
			OTransform      : rotateSecondDeg,
			transform       : rotateSecondDeg
		});
	}

	function posMinuteHand() {
		rotateMinuteDeg = 'rotate('+minuteDeg+'deg)';
		self.get('minute').css({
			WebkitTransform : rotateMinuteDeg,
			MozTransform    : rotateMinuteDeg,
			MsTransform     : rotateMinuteDeg,
			OTransform      : rotateMinuteDeg,
			transform       : rotateMinuteDeg
		});
	}

},iris.path.ui.clock.js);
