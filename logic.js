$(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Geolocation is not supported by this browser.");
	}
	
	function showPosition(position) {
		var tocall = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
		apicall(tocall);
	}
	
	function apicall(tocall) {
		$.ajax({
			url: `https://api.openweathermap.org/data/2.5/weather?${tocall}&appid=94900283e0940af78b9a67b1af5180f1&units=metric`,
			success: function(result) {
				updater(result);
			}
		}).fail(function() {
			notify('<p>Entered city not found!</p><p>Please try with another city</p>');
		});
	}
	
	function updater(result) {
		$('.city h1').text(result.name);
		$('#main').text(result.weather[0].main);
		$('#icon').attr('src', `http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
		$('#lon').text(`Longitude: ${result.coord.lon}`);
		$('#lat').text(`Latitude: ${result.coord.lat}`);
		$('#temp').html(`Temperature: ${result.main.temp} <sup>o</sup>C`);
		$('#humidity').html(`Humidity: ${result.main.humidity} %`);
		$('#pressure').text(`Pressure: ${result.main.pressure} hPa`);
		$('#wind').text(`Wind Speed: ${result.wind.speed} m/s`);
		var climate = result.weather[0].main;
		var image;
		if (climate == 'Drizzle') {
			image = './images/Drizzle.jpg';
		} else if (climate == 'Rain') {
			image = './images/Rain.jpg';
		} else if (climate == 'Snow') {
			image = './images/Snow.jpg';
		} else if (climate == 'Thunderstorm') {
			image = './images/Thunderstorm.jpg';
		} else if (climate == 'Clear') {
			image = './images/Clear.jpg';
		} else if (climate == 'Clouds') {
			image = './images/Clouds.jpg';
		} else if (climate == 'Thunderstorm') {
			image = './images/Thunderstorm.jpg';
		} else {
			image = './images/else.jpg';
		}
		$('.bgimg').css('background-image', `url(${image})`);
		notify(`current weather reports of ${result.name}`);
	}

	$('.btn').click(function() {
		var tocall = `q=${$('#search').val()}`;
		apicall(tocall);
	});

	setTimeout(function() {
		$('.preloader').css('display', 'none');
		notify('This is weather conditions of your city (or of your nearby city)');
	}, 800);

	function notify(message) {
		$('.notification').html(`<p>${message}</p>`).slideDown(300);
		setTimeout(closeNotification, 4000);
	}

	function closeNotification() {
		$('.notification').slideUp(300);
	}
});