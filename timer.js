let deadline = '2020-04-13'; //Указываем конечное время нашего таймера

//Узнать промежуток времени между настоящим временем и дедлайном и парсим дату
function getTimeRemaining(endTime) { //В параметры передаем дедлайн
	//Узнаем разницу и парсим в дату
	//(вторая дата это настоящий момент времени)
	let t = Date.parse(endTime) - Date.parse(new Date()), //получаем кол-во милисекунд;
		//Чтобы получить секунды
		//Нужно получить остаток 
		//(вычленяем количество минут и берем остаток, тоесть наши секунды)
		seconds = Math.floor((t / 1000) % 60),
		minutes = Math.floor((t / 1000 / 60) % 60), //Тоже самое но получаем минуты
		hours = Math.floor((t / (1000 * 60 * 60) % 24)), //получаем часы
		// hours = Math.floor((t/1000/60/60) ), получаем часы
		days = Math.floor((t / (1000 * 60 * 60 * 24))); //дни
	//Возвращаем объект из таймера, и парисрованной даты настоящего времени
	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds,
		'days': days,
	};

}
//Взтавляем значение в нашу верстку и запускаем таймер
//Функция принимает два параметра 
//id таймера в верстке и наш дедлайн

function setClock(id, endTime) {
	let timer = document.getElementById(id), //получаем наш таймер
		hours = timer.querySelector('.hours'), //часы из верстки
		minutes = timer.querySelector('.minutes'), //минуты
		seconds = timer.querySelector('.seconds'), //секунды
		days = timer.querySelector('.days');
	//делаем таймер динамичным с помощью сетинтервала
	let timeInterval = setInterval(updateClock, 1000);
	//Записываем значения
	//Парсим дату и записываем значение
	console.log(seconds.length)

	function updateClock() {
		//каждый раз как вызывается эта функция мы 
		//будем получать изменения каждую секунду
		//и получать обновленное время
		let t = getTimeRemaining(endTime); //получаем объет с разницей по времени
		hours.textContent = t.hours; //получаем часы
		minutes.textContent = t.minutes; //минуты
		seconds.textContent = t.seconds; //секунды
		days.textContent = t.days;
		//Добавляем ноль когда секунд,минут,часов меньше дясяти
		if (t.seconds < 10) {
			seconds.textContent = '0' + t.seconds;
		}
		if (t.minutes < 10) {
			minutes.textContent = '0' + t.minutes;
		}
		if (t.hours < 10) {
			hours.textContent = '0' + t.hours;
		}
		if (t.total <= 0) { //останавливаем интервал по завершению
			clearInterval(timeInterval);
			hours.textContent = '00';
			minutes.textContent = '00';
			seconds.textContent = '00';
			days.textContent = '0';
		}
	}
}

setClock('timer', deadline);