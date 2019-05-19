let count = 0;
const dayToString = (day) => {
	let ret = "";
	switch (day) {
		case 0:
			ret = "sunday";
			break;
		case 1:
			ret = "monday";
			break;
		case 2:
			ret = "tuesday";
			break;
		case 3:
			ret = "wednesday";
			break;
		case 4:
			ret = "thursday";
			break;
		case 5:
			ret = "friday";
			break;
		case 6:
			ret = "saturday";
			break;
		default:
			ret = "error";
			break;
	}
	return ret;
}

const dateToString = (date) => {
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const hourToString = (date) => {
	let hour = date.getHours();
	let minutes = date.getMinutes();
	return `${hour < 10 ? "0" + hour : hour}`;
}

const minutesToString = (date) => {
	let hour = date.getHours();
	let minutes = date.getMinutes();
	return `${minutes < 10 ? "0" + minutes : minutes}`;
}

const randomMessage = () => {
	let messages = [
		"I'm lost.",
		"Where are you, I can't see you",
		"I'll arrive to the hotel at 5",
		"Are you at home?",
		"Is John with you",
		"I'm going to the supermarket to buy some food",
		"Cozidos restaurant seems good",
		"What restaurant should we go tonight",
		"Are you ok?",
		"I'm fine thanks",
		"What am I doing with my life"
	];
	return messages[Math.floor(Math.random() * messages.length)];
}

const getPlaceIcon = (type) => {
	let res = "";
	switch (type) {
		case "garden":
			res = "nature_people";
			break;
		case "museum":
			res = "account_balance";
			break;
		case "bar":
			res = "local_bar";
			break;
		case "restaurant":
			res = "restaurant";
			break;
		default:
			res = "location_on";
	}
	return res;
}

class Swipe {
	constructor() {
		this.screens = ["home", "places", "contacts"];
		this.currentScreen = 0;
		this.previousScreen = -1;

		$(".main-menu").on("swipeleft", this.swipeRight.bind(this));
		$(".main-menu").on("swiperight", this.swipeLeft.bind(this));
	}

	removeScreen() {
		if (this.previousScreen == -1) return;

		let previousScreenElem = document.querySelector(`.${this.screens[this.previousScreen]}`);
		$(`.${this.screens[this.previousScreen]}`).fadeOut(200, () => {
			previousScreenElem.classList.remove("active");
		});
	}

	showScreen() {
		let currentScreenElem = document.querySelector(`.${this.screens[this.currentScreen]}`);
		this.removeScreen();
		$(`.${this.screens[this.currentScreen]}`).fadeIn(300, () => {
			currentScreenElem.classList.add("active");
		});
	}

	swipeRight() {
		this.previousScreen = this.currentScreen;
		let a = this.currentScreen + 1;
		let b = this.screens.length;
		this.currentScreen = ((a % b) + b) % b;
		this.showScreen();
	}

	swipeLeft() {
		this.previousScreen = this.currentScreen;
		let a = this.currentScreen - 1;
		let b = this.screens.length;
		this.currentScreen = ((a % b) + b) % b;
		this.showScreen();
	}


}

class Clock {
	constructor() {
		this.elem = document.querySelector(".home");
		this.hours = document.querySelector(".hours");
		this.minutes = document.querySelector(".minutes");
		this.day = document.querySelector(".day");
		this.date = document.querySelector(".date");

		let date = new Date();
		this.hours.innerHTML = hourToString(date);
		this.minutes.innerHTML = minutesToString(date);
		this.day.innerHTML = dayToString(date.getDay());
		this.date.innerHTML = dateToString(date);
	}
}

class Places {
	constructor() {
		this.places = [
			{
				id: 1,
				name: "O Jardim",
				rating: 4.5,
				distance: 0.4,
				type: "garden",
				fav: false,
				hasReservation: false,
				phone: "212 490 340",
				schedule: {
					week: "8:30 - 20:00",
					sat: "7:00 - 21:00",
					sun: "7:00 - 21:00"
				}
			},
			{
				id: 2,
				name: "Cozidos",
				rating: 3.4,
				distance: 0.2,
				type: "restaurant",
				fav: true,
				hasReservation: true,
				ratio: 7,
				phone: "212 490 234",
				reservation: {
					day: "23/3/2012",
					hour: "20:45",
					price: 26
				},
				schedule: {
					week: "12:30 - 15:00,<br> 20:00 - 23:00",
					sat: "12:30 - 15:00,<br> 20:00 - 23:00",
					sun: "12:30 - 15:00,<br> 20:00 - 23:00"
				}
			},
			{
				id: 3,
				name: "Xique",
				rating: 1.0,
				distance: 2.4,
				type: "bar",
				fav: false,
				hasReservation: true,
				ratio: 30,
				phone: "212 252 434",
				schedule: {
					week: "12:30 - 15:00,<br> 20:00 - 23:00",
					sat: "12:30 - 15:00,<br> 20:00 - 23:00",
					sun: "12:30 - 15:00,<br> 20:00 - 23:00"
				}
			},
			{
				id: 4,
				name: "Museu de Arte",
				rating: 4.3,
				distance: 3.8,
				type: "museum",
				false: false,
				hasReservation: true,
				ratio: 5,
				phone: "217 443 453",
				schedule: {
					week: "8:30 - 20:00",
					sat: "7:00 - 22:00",
					sun: "7:00 - 22:00"
				}
			},
			{
				id: 5,
				name: "Museu Moderno",
				rating: 4.1,
				distance: 5.2,
				type: "museum",
				fav: true,
				hasReservation: true,
				ratio: 10,
				phone: "212 490 234",
				schedule: {
					week: "8:30 - 20:00",
					sat: "7:00 - 22:00",
					sun: "7:00 - 22:00"
				}
			},
			{
				id: 6,
				name: "Pizza 👌",
				rating: 3.8,
				distance: 1.4,
				type: "restaurant",
				fav: true,
				hasReservation: true,
				ratio: 8,
				phone: "212 490 234",
				schedule: {
					week: "11:00 - 15:00,<br> 18:00 - 23:00",
					sat: "11:00 - 15:00,<br> 18:00 - 23:00",
					sun: "11:00 - 15:00,<br> 18:00 - 23:00"
				}
			},
			{
				id: 7,
				name: "Xin li",
				rating: 4.9,
				distance: 1.9,
				type: "restaurant",
				fav: true,
				hasReservation: true,
				ratio: 15,
				phone: "212 490 234",
				schedule: {
					week: "12:30 - 15:00,<br> 20:00 - 23:00",
					sat: "12:30 - 15:00,<br> 20:00 - 23:00",
					sun: "12:30 - 15:00,<br> 20:00 - 23:00"
				}
			},
			{
				id: 8,
				name: "Pede um copo",
				rating: 2.8,
				distance: 3.0,
				type: "bar",
				fav: false,
				hasReservation: false,
				phone: "212 490 234",
				schedule: {
					week: "17:00 - 00:00",
					sat: "15:00 - 03:00",
					sun: "15:00 - 23:00"
				}
			},
			{
				id: 9,
				name: "Baril",
				rating: 1.5,
				distance: 7.3,
				type: "bar",
				fav: false,
				hasReservation: false,
				phone: "212 490 234",
				schedule: {
					week: "closed",
					sat: "15:00 - 5:00",
					sun: "12:00 - 2:00"
				}
			},
			{
				id: 10,
				name: "Arco do Cego",
				rating: 2.1,
				distance: 0.2,
				type: "garden",
				fav: false,
				hasReservation: false,
				phone: "no number",
				schedule: {
					week: "24h",
					sat: "24h",
					sun: "24h"
				}
			},
		];
		this.filters = {
			all: { key: "all", function: (a) => { return true } },
			fav: { key: "fav", function: (a) => { return a.fav } },
			restaurant: { key: "restaurant", function: (a) => { return a.type === "restaurant" } },
			museum: { key: "museum", function: (a) => { return a.type === "museum" } },
			bar: { key: "bar", function: (a) => { return a.type === "bar" } },
			garden: { key: "garden", function: (a) => { return a.type === "garden" } },
		}
		this.sorts = {
			rating: {
				key: "rating",
				function: (a, b) => { return b.rating - a.rating }
			},
			km: { key: "km", function: (a, b) => { return a.distance - b.distance } },
			abc: {
				key: "abc",
				function: (a, b) => {
					if (a.name < b.name) { return -1; }
					if (a.name > b.name) { return 1; }
					return 0;
				}
			},
		}
		this.placesFilter = this.filters.all;
		this.placesSort = this.sorts.km;

		this.placeInfoScreen = new PlaceInfo(this);
		this.reservationsScreen = new Reservations();

		this.createPlacesList();
		this.setupListeners();
	}

	createPlacesList() {
		let placesListElem = document.querySelector(".places-list");
		let res = "";
		this.places.sort(this.placesSort.function);
		this.places.forEach((e) => {
			let icon = getPlaceIcon(e.type);
			if (this.placesFilter.function(e)) {
				res +=
					`<li id="${e.id}">
					<div class="place-icon-container">
						<i class="material-icons">${icon}</i>
					</div>
					<div class="place-info-container">
						<div class="place-vertical-container">
							<h5 class="place-name">${e.name}</h5>
							<div class="place-horizontal-container">
								<div class="place-rate">
									<span>${e.rating}</span>
									<i class="material-icons">star</i>
								</div>
								<span class="place-distance">${e.distance} Km</span>
							</div>
						</div>
					</div>
				</li>`;
			}
		});
		placesListElem.innerHTML = res;
	}

	setupListeners() {
		let reservationsBtn = document.querySelector(".places-reservations-btn");

		reservationsBtn.addEventListener("click", () => {
			this.reservationsScreen.open(this.places);
		});

		$(document).on("click", ".places-type-filter li", (e) => {
			let previousSelect = this.placesFilter.key;
			let newSelect = e.currentTarget.getAttribute("id");

			this.placesFilter = this.filters[newSelect];

			document.getElementById(previousSelect).classList.remove("active");
			document.getElementById(newSelect).classList.add("active");

			this.createPlacesList();
		});

		$(document).on("click", ".places-props-filter li", (e) => {
			let previousSelect = this.placesSort.key;
			let newSelect = e.currentTarget.getAttribute("id");

			this.placesSort = this.sorts[newSelect];

			document.getElementById(previousSelect).classList.remove("active");
			document.getElementById(newSelect).classList.add("active");

			this.createPlacesList();
		});

		$(document).on("click", ".places-list li", (e) => {
			let place;

			this.places.forEach((currPlace) => {
				if (e.currentTarget.getAttribute("id") == currPlace.id) {
					place = currPlace;
				}
			});
			this.placeInfoScreen.open(place);
		});
	}

}

class PlaceInfo {
	constructor(placesScreen) {
		this.placesScreen = null;
		if (placesScreen !== undefined)
			this.placesScreen = placesScreen;

		this.elem = document.querySelector(".place-info");
		this.createReservationScreen = new CreateReservation();
		this.place;
		this.clickHandler;

		this.navModeScreen = new NavMode();

		this.clickFavHandler = this.toggleFav.bind(this);
		this.createReservationBtnHandle = this.openCreateReservationPlace.bind(this);
		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-place-info-btn");
		let createReservationBtn = document.querySelector(".create-reservation-btn");
		let goBtn = document.querySelector(".place-go-btn");

		closeBtn.addEventListener("click", () => {
			if (this.placesScreen !== null)
				this.placesScreen.createPlacesList();
			this.close();
		});

		goBtn.addEventListener("click", () => {
			this.navModeScreen.open(this.place.distance);
		});

		createReservationBtn.addEventListener("click", this.createReservationBtnHandle);
	}

	openCreateReservationPlace() {
		this.createReservationScreen.open(this.place, this);
	}

	open(place) {
		let typeElem = document.querySelector(".place-info-type");
		let nameElem = document.querySelector(".place-info-name");
		let favElem = document.querySelector(".place-info-fav");
		let favHelperElem = document.querySelector(".place-info-fav-helper");
		let ratingElem = document.querySelector(".place-info-rating span");
		let distanceElem = document.querySelector(".place-info-distance");
		let placePhone = document.querySelector(".place-phone");

		this.place = place;

		typeElem.innerHTML = place.type;
		nameElem.innerHTML = place.name;
		favElem.innerHTML = place.fav ? "bookmark" : "bookmark_border";
		favHelperElem.innerHTML = place.fav ? "added" : "add";
		if (place.fav)
			favHelperElem.classList.add("active");
		else
			favHelperElem.classList.remove("active");
		ratingElem.innerHTML = place.rating;
		distanceElem.innerHTML = place.distance + " Km";
		placePhone.innerHTML = place.phone;

		let mon = document.querySelector("#seg .place-schedule-time");
		let tue = document.querySelector("#ter .place-schedule-time");
		let wed = document.querySelector("#qua .place-schedule-time");
		let thu = document.querySelector("#qui .place-schedule-time");
		let fri = document.querySelector("#sex .place-schedule-time");
		let sat = document.querySelector("#sab .place-schedule-time");
		let sun = document.querySelector("#dom .place-schedule-time");

		mon.innerHTML = place.schedule.week;
		tue.innerHTML = place.schedule.week;
		wed.innerHTML = place.schedule.week;
		thu.innerHTML = place.schedule.week;
		fri.innerHTML = place.schedule.week;
		sat.innerHTML = place.schedule.sat;
		sun.innerHTML = place.schedule.sun;

		let reservationsContainerElem = document.querySelector(".place-reservations-container");
		let createReservationBtn = document.querySelector(".create-reservation-btn");
		let reservationDayElem = document.querySelector(".place-reservations-day");
		let reservationHourElem = document.querySelector(".place-reservations-hour");
		let reservationPriceElem = document.querySelector(".place-reservations-price");

		if (place.hasReservation) {
			reservationsContainerElem.classList.add("active");
			if (place.reservation) {
				reservationDayElem.innerHTML = place.reservation.day;
				reservationHourElem.innerHTML = place.reservation.hour;
				reservationPriceElem.innerHTML = place.reservation.price + "€";
				createReservationBtn.classList.remove("active");
			} else {
				reservationDayElem.innerHTML = "You don't have a reservation";
				reservationHourElem.innerHTML = "";
				reservationPriceElem.innerHTML = "";
				createReservationBtn.classList.add("active");
			}
		} else {
			reservationsContainerElem.classList.remove("active");
		}

		this.elem.classList.add("active");

		let favBtn = document.querySelector(".place-info-fav");
		favBtn.addEventListener("click", this.clickFavHandler);

		this.setupListeners();
	}

	close() {
		this.elem.classList.remove("active");

		let favBtn = document.querySelector(".place-info-fav");
		let createReservationBtn = document.querySelector(".create-reservation-btn");

		favBtn.removeEventListener("click", this.clickFavHandler);
		createReservationBtn.removeEventListener("click", this.createReservationBtnHandle);
	}

	toggleFav() {
		let favElem = document.querySelector(".place-info-fav");
		let favHelperElem = document.querySelector(".place-info-fav-helper");
		this.place.fav = !this.place.fav;
		favElem.innerHTML = this.place.fav ? "bookmark" : "bookmark_border";
		favHelperElem.innerHTML = this.place.fav ? "added" : "add";
		if (this.place.fav)
			favHelperElem.classList.add("active");
		else
			favHelperElem.classList.remove("active");


	}

}

class CreateReservation {
	constructor() {
		this.elem = document.querySelector(".create-reservation");
		this.place;
		let date = new Date();

		this.state = {
			valid: true,
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			people: "1",
			hour: "08",
			minute: "00",
			price: "0"
		}

		this.placeInfoScreen;

		this.inputChangeHandler = (e) => { this.handleSelectChange(e) };
		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-create-reservation-btn");
		let submitBtn = document.querySelector(".form-confirm-btn");

		let daySelectElem = document.querySelector("select[name=day]");
		let monthSelectElem = document.querySelector("select[name=month]");
		let yearSelectElem = document.querySelector("select[name=year]");
		let peopleSelectElem = document.querySelector("select[name=people]");
		let hourSelectElem = document.querySelector("select[name=hour]");
		let minuteSelectElem = document.querySelector("select[name=minute]");

		daySelectElem.addEventListener("change", this.inputChangeHandler);
		monthSelectElem.addEventListener("change", this.inputChangeHandler);
		yearSelectElem.addEventListener("change", this.inputChangeHandler);
		peopleSelectElem.addEventListener("change", this.inputChangeHandler);
		hourSelectElem.addEventListener("change", this.inputChangeHandler);
		minuteSelectElem.addEventListener("change", this.inputChangeHandler);

		let { day, month } = this.state;
		daySelectElem.value = day;
		monthSelectElem.value = month;

		closeBtn.addEventListener("click", () => {
			this.close();
		});

		submitBtn.addEventListener("click", () => {
			let { day, month, year, price, hour, minute, people, valid } = this.state;

			if (price === "0" || !valid) return;

			let confirmScreen = new ConfirmScreen();
			let title = "Are you sure you want to do this reservation?";
			let description = `Place: ${this.place.name}`;
			description += `<br>Day: ${month}/${day}/${year}`;
			description += `<br>Time: ${hour}:${minute}`;
			description += `<br>People: ${people}`;
			description += `<br>Price: ${price}€`;

			confirmScreen.open(title, description, () => { }, () => {
				this.place.reservation = {
					day: `${month}/${day}/${year}`,
					hour: `${hour}:${minute}`,
					price: price
				}

				this.placeInfoScreen.open(this.place);
				this.close();
			});

		});
	}

	handleSelectChange(event) {
		let submitBtn = document.querySelector(".form-confirm-btn");
		submitBtn.classList.add("active");

		let { name, value } = event.target;
		this.state[name] = value;

		this.checkDate();

		this.createHoursOptions();

		this.updatePrice();
	}

	checkDate() {
		let errorMessage = document.querySelector(".form-date-error");
		let { day, month, year, valid } = this.state;
		let date = new Date();
		valid = true;
		let currentYear = date.getFullYear();
		let currentMonth = date.getMonth() + 1;
		let currentDate = date.getDate();
		if (year == currentYear) {
			if (month < currentMonth) {
				errorMessage.classList.add("active");
				valid = false;
			} else if (month == currentMonth) {
				if (parseInt(day) < currentDate) {
					errorMessage.classList.add("active");
					valid = false;
				}
			}
		}
		if (valid)
			errorMessage.classList.remove("active");
		this.state.valid = valid;
	}

	updatePrice() {
		let priceElem = document.querySelector(".form-price");
		let { people } = this.state;
		let { ratio } = this.place;
		this.state.price = people * ratio;

		priceElem.innerHTML = this.state.price + "€";
	}

	createHoursOptions() {
		let schedule = this.place.schedule.week;
		let hourSelectElem = document.querySelector("select[name=hour]");

		let schedulesList = schedule.split(",<br>");

		let res = "";
		schedulesList.forEach((e) => {
			let periodSplit = e.split(" - ");
			let start = parseInt(periodSplit[0].split(":")[0], 10);
			let end = parseInt(periodSplit[1].split(":")[0], 10);
			for (let i = start; i < end; i++) {
				res += `<option value="${i}">${i}</option>`;
			}

		});

		hourSelectElem.innerHTML = res;

	}

	open(place, placeInfoScreen) {
		this.placeInfoScreen = placeInfoScreen;
		this.place = place;

		let submitBtn = document.querySelector(".form-confirm-btn");
		let nameElem = document.querySelector(".form-place-name");
		let priceElem = document.querySelector(".form-price");

		this.createHoursOptions();

		submitBtn.classList.remove("active");

		nameElem.innerHTML = this.place.name;
		priceElem.innerHTML = "0€";

		this.elem.classList.add("active");
	}

	close() {
		this.elem.classList.remove("active");

		// Reset State

		let daySelectElem = document.querySelector("select[name=day]");
		let monthSelectElem = document.querySelector("select[name=month]");
		let yearSelectElem = document.querySelector("select[name=year]");
		let peopleSelectElem = document.querySelector("select[name=people]");
		let hourSelectElem = document.querySelector("select[name=hour]");
		let minuteSelectElem = document.querySelector("select[name=minute]");

		let date = new Date();

		daySelectElem.value = date.getDate();
		monthSelectElem.value = date.getMonth() + 1;
		yearSelectElem.value = date.getFullYear();

		this.state = {
			valid: true,
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
			people: "1",
			hour: "08",
			minute: "00",
			price: "0"
		}
	}

}

class Reservations {
	constructor() {
		this.elem = document.querySelector(".reservations");
		this.places = [];
		this.setupListeners();
	}

	createReservationsList() {
		let res = "";
		let listContainer = document.querySelector(".reservations-list");
		this.places.forEach((e) => {
			if (e.hasReservation && e.reservation) {
				let { day, hour, price } = e.reservation;
				res +=
					`<li id="${e.id}">
					<div class="reservations-vertical-container">
						<h5 class="reservations-item-title">${e.name}</h5>
						<div class="reservations-horizontal-container">
							<span class="reservations-time">${day} - ${hour}</span>
						</div>
					</div>
					<span class="reservations-price">${price}€</span>
				</li>`;
			}
		});

		listContainer.innerHTML = res;
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-reservations-btn");
		closeBtn.addEventListener("click", () => {
			this.close();
		})

		$(document).on("click", ".reservations-list li", (e) => {
			let placeInfoScreen = new PlaceInfo();
			let id = e.currentTarget.getAttribute("id");
			let place;
			this.places.forEach((e) => {
				if (e.id == id) {
					place = e;
				}
			});
			placeInfoScreen.open(place);
		});
	}

	open(places) {
		this.elem.classList.add("active");
		this.places = places;
		this.createReservationsList();
	}

	close() {
		this.elem.classList.remove("active");
	}
}

class ContactManager {
	constructor(contactScreen) {
		this.waitingForResponse = false;
		this.contactScreen = contactScreen;
		this.confirmScreen = new ConfirmScreen();
		this.setupListeners();
		this.contacts = [
			{
				name: "Manel",
				id: "1",
				call: true,
				locate: true,
				receiveCall: true,
				beLocated: true,
				distance: 3.2,
				messages: [],
				added: true,
			},
			{
				name: "Ana Maria",
				id: "2",
				call: true,
				locate: true,
				receiveCall: true,
				beLocated: true,
				distance: 3.8,
				messages: [],
				added: true,
			},
			{
				name: "Miguel",
				id: "3",
				location: false,
				call: false,
				receiveCall: true,
				distance: 2.2,
				beLocated: true,
				messages: [],
				added: false,
			},
			{
				name: "João",
				id: "4",
				location: false,
				call: false,
				receiveCall: true,
				beLocated: true,
				distance: 4.1,
				messages: [],
				added: false,
			}, {
				name: "Paulo",
				id: "5",
				location: false,
				call: false,
				receiveCall: true,
				beLocated: true,
				distance: 0.7,
				messages: [],
				added: false,
			}, {
				name: "Afonso",
				id: "6",
				location: false,
				call: false,
				receiveCall: true,
				distance: 0.2,
				beLocated: true,
				messages: [],
			},
			{
				name: "Arnaldo",
				id: "7",
				call: true,
				locate: true,
				receiveCall: true,
				distance: 3.2,
				beLocated: true,
				messages: [],
				added: false,
			},
			{
				name: "José",
				id: "8",
				call: true,
				locate: true,
				receiveCall: true,
				distance: 3.4,
				beLocated: true,
				messages: [],
				added: true,
			},
			{
				name: "Josefina",
				id: "9",
				call: true,
				locate: true,
				receiveCall: true,
				beLocated: true,
				distance: 1.2,
				messages: [],
				added: true,
			},
			{
				name: "Vitor",
				id: "10",
				call: true,
				receiveCall: true,
				locate: true,
				distance: 1.6,
				beLocated: true,
				messages: [],
				added: true,
			},
		];
		this.createContactsList();
	}

	createContactsList() {
		let listElem = document.querySelector(".helper-contacts-list");
		let res = "";

		this.contacts.sort()

		this.contacts.forEach((e) => {
			res +=
				`<li id="${e.id}">
					<h6>${e.name}</h6>
          <div class="helper-contact-permissions">
            <div class="helper-add-contact" ${e.added ? 'style="display:none"' : ''}> 
              <i class="material-icons">location_on</i>
              <input type="checkbox" name="locate" value="true">
							<i class="material-icons">phone</i>
              <input type="checkbox" name="call" value="true">
              <i class="material-icons helper-add-contact-btn">add</i>
						</div>
						${e.added && e.receiveCall ?
					'<i class="material-icons helper-add-message-btn">mic</i>'
					: ''
				}
				${e.added && e.beLocated ?
					'<i class="material-icons helper-add-meetup-btn">location_on</i>'
					: ''
				}
          </div>
        </li>`
		});
		listElem.innerHTML = res;
	}

	setupListeners() {
		let locationBtn = document.getElementById("permission-location-btn");
		let callBtn = document.getElementById("permission-call-btn");
		let closeBtn = document.querySelector(".close-add-contacts-btn");
		const callback = (e) => {
			let btn = e.currentTarget;
			if (btn.classList.contains("active")) {
				btn.classList.remove("active");
			} else {
				btn.classList.add("active");
			}
		};
		locationBtn.addEventListener("click", (e) => callback(e));
		callBtn.addEventListener("click", (e) => callback(e));

		closeBtn.addEventListener("click", this.close.bind(this));

		$(document).on("change", ".helper-contact-permissions input[name='locate']", (e) => {
			let id = e.originalEvent.path[3].getAttribute("id");
			let checked = e.currentTarget.checked;
			this.contacts.forEach((contact) => {
				if (id === contact.id) {
					contact.locate = checked;
				}
			});
		});

		$(document).on("change", ".helper-contact-permissions input[name='call']", (e) => {
			let id = e.originalEvent.path[3].getAttribute("id");
			let checked = e.currentTarget.checked;
			this.contacts.forEach((contact) => {
				if (id === contact.id) {
					contact.call = checked;
				}
			});
		});

		$(document).on("click", ".helper-add-contact-btn", (e) => {
			let id = e.originalEvent.path[3].getAttribute("id");
			if (this.waitingForResponse) {
				let contact = this.getContact(id);

				let receiveCall = document.getElementById("permission-call-btn").classList.contains("active");
				let beLocated = document.getElementById("permission-location-btn").classList.contains("active");
				contact.receiveCall = receiveCall;
				contact.beLocated = beLocated;

				let message = `Do you want to add ${contact.name}?`;
				let text = `<b>${contact.name}'s permissions:</b>`;
				text += contact.receiveCall ? `<br>Send messages` : "";
				text += contact.beLocated ? `<br>Find location` : "";
				text += "<br><br><b>Your permissions:</b>";
				text += contact.call ? `<br>Send messages` : "";
				text += contact.locate ? `<br>Find location` : "";

				this.confirmScreen.open(message, text, () => { this.close() }, () => {

					this.contactScreen.sendReponse(contact);
					this.createContactsList();
					this.close();
				});
			}
		});

		$(document).on("click", ".helper-add-meetup-btn", (e) => {
			let id = e.originalEvent.path[2].getAttribute("id");
			let contact = this.getContact(id);
			let confirmMeetup = new ConfirmMeetup();
			confirmMeetup.open(contact, () => { }, () => {
				let navModeScreen = new NavMode();
				navModeScreen.open(contact.distance);
			});
		});

		$(document).on("click", ".helper-add-message-btn", (e) => {
			let id = e.originalEvent.path[2].getAttribute("id");
			let contact = this.getContact(id);
			let homeContactBtn = document.querySelector(".contacts-home-btn");

			contact.messages.push(randomMessage());
			this.contactScreen.createListElem();

			homeContactBtn.classList.add("highlight");
		});
	}

	startWaitingForResponse() {
		this.waitingForResponse = true;
	}

	endWaitingForResponse() {
		this.waitingForResponse = false;
	}

	open() {
		let addContactScreenElem = document.querySelector(".add-contact");
		addContactScreenElem.classList.add("active");
		this.startWaitingForResponse();
	}

	close() {
		let addContactScreenElem = document.querySelector(".add-contact");
		addContactScreenElem.classList.remove("active");
		this.endWaitingForResponse();
	}

	getContact(id) {
		let res;
		this.contacts.forEach((contact) => {
			if (id === contact.id) {
				res = contact;
			}
		});
		return res;
	}

	getContacts() {
		return this.contacts;
	}
}

class CallScreen {
	constructor() {
		this.setupListeners();
	}

	setupListeners() {
		let recCallBtn = document.querySelector(".rec-call-btn");
		let recordingText = document.querySelector(".call-recording");
		let closeCallBtn = document.querySelector(".close-call-btn");

		closeCallBtn.addEventListener("click", () => {
			this.close();
		})

		recCallBtn.addEventListener("mousedown", () => {
			recordingText.classList.add("active");
			recCallBtn.classList.add("highlight");
		});

		recCallBtn.addEventListener("mouseup", () => {
			let description = "Do you want to send this message?";
			let text = randomMessage();
			let confirmScreen = new ConfirmScreen();
			confirmScreen.open(description, text, () => { }, () => { });
			recordingText.classList.remove("active");
			recCallBtn.classList.remove("highlight");
		});
	}

	open(contact) {
		let callName = document.querySelector(".call-name");
		let callScreen = document.querySelector(".call");
		callName.innerHTML = contact.name;
		callScreen.classList.add("active");
	}

	close() {
		let callScreen = document.querySelector(".call");
		callScreen.classList.remove("active");
	}
}

class PalFinder {
	constructor() {
		this.elem = document.querySelector(".pal-finder");
		this.maps = [
			"../files/marker1.png",
			"../files/marker2.png",
			"../files/marker3.png",
			"../files/marker4.png",
			"../files/marker5.png"
		];
		this.navModeScreen = new NavMode();
		this.meetupScreen = new CreateMeetup();
		this.contact;
		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-pal-finder-btn");
		let goBtn = document.querySelector(".pal-finder-start-btn");
		let createMeetupBtn = document.querySelector(".meetup-btn");

		closeBtn.addEventListener("click", () => {
			this.close();
		});

		goBtn.addEventListener("click", () => {
			this.navModeScreen.open(this.contact.distance);
		});



		createMeetupBtn.addEventListener("click", () => {
			this.meetupScreen.open(this.contact, "../files/map1.png", () => { }, () => {
				let wait = document.querySelector(".meetup-wait");
				wait.classList.add("active");

				setTimeout(() => {
					this.navModeScreen.open(this.contact.distance);
					this.close();
					this.meetupScreen.close();
					wait.classList.remove("active");
				}, 4000);
			});
		});

	}

	open(contact) {
		let distance = document.querySelector(".pal-finder-distance");
		let map = document.querySelector(".pal-finder-map");

		distance.innerHTML = `${contact.distance} Km`;
		map.src = this.maps[Math.floor(Math.random() * this.maps.length)];

		this.contact = contact;
		this.elem.classList.add("active");
	}

	close() {
		this.elem.classList.remove("active");
	}

}

class ConfirmMeetup {
	constructor() {
		this.elem = document.querySelector(".confirm-meetup");
		this.maps = [
			"../files/marker1.png",
			"../files/marker2.png",
			"../files/marker3.png",
			"../files/marker4.png",
			"../files/marker5.png"
		];
	}

	open(contact, cancelCallback, confirmCallback) {
		let {name, distance} = contact;
		let cancelBtn = document.querySelector(".confirm-meetup-cancel-btn");
		let confirmBtn = document.querySelector(".confirm-meetup-ok-btn");

		let descriptionElem = document.querySelector(".confirm-meetup-description");
		let mapElem = document.querySelector(".confirm-meetup-map");

		let distanceElem = document.querySelector(".confirm-meetup-distance");
		distanceElem.innerHTML = `${distance/2} Km`;

		descriptionElem.innerHTML = `Meet with ${name}?`;
		mapElem.src = this.maps[Math.floor(Math.random() * this.maps.length)];

		cancelBtn.addEventListener("click", () => { this.close(); cancelCallback(); });
		confirmBtn.addEventListener("click", () => { this.close(); confirmCallback(); })

		this.elem.classList.add("active");
	}

	close() {
		this.elem.classList.remove("active");
	}

}

class CreateMeetup {
	constructor() {
		this.elem = document.querySelector(".create-meetup");
		this.maps = [
			"../files/marker1.png",
			"../files/marker2.png",
			"../files/marker3.png",
			"../files/marker4.png",
			"../files/marker5.png"
		];
	}

	open(contact, img, cancelCallback, confirmCallback) {
		const {name, distance} = contact;
		let cancelBtn = document.querySelector(".meetup-cancel-btn");
		let confirmBtn = document.querySelector(".meetup-ok-btn");
		let moreBtn = document.querySelector(".meetup-more-btn");

		let descriptionElem = document.querySelector(".meetup-description");
		let mapElem = document.querySelector(".meetup-map");
		let distanceElem = document.querySelector(".meetup-distance");

		distanceElem.innerHTML = `${distance/2} Km`;

		descriptionElem.innerHTML = `Meet with ${name}?`;
		mapElem.src = this.maps[Math.floor(Math.random() * this.maps.length)];

		cancelBtn.addEventListener("click", () => { this.close(); cancelCallback(); });
		confirmBtn.addEventListener("click", () => { confirmCallback(); })
		moreBtn.addEventListener("click", () => {
			mapElem.src = this.maps[Math.floor(Math.random() * this.maps.length)];
		})

		this.elem.classList.add("active");
	}

	close() {
		this.elem.classList.remove("active");
	}

}

class Contacts {

	constructor() {
		this.elem = document.querySelector(".contacts");
		this.startTime = 0;
		this.setupListeners();
		this.contactManager = new ContactManager(this);
		this.callScreen = new CallScreen();
		this.palFinderScreen = new PalFinder();
		this.createListElem();
	}

	createListElem() {
		let listElems = "";
		let list = this.contactManager.getContacts();
		list.forEach((e) => {
			if (e.added) {
				listElems +=
					`<li id="${e.id}">
            <span>${e.name}</span>
						<div class="list-btn-container">
							<div class="list-btn">
								${e.locate ? '<i class="material-icons location-btn">location_on</i>' : ''}
              </div>
            	<div class="list-btn">
								${e.call && e.messages.length === 0 ? '<i class="material-icons phone-btn">local_phone</i>' : ''}
								${e.messages.length > 0 ? '<i class="material-icons message-btn">message</i>' : ''}
              </div>
            </div>
          </li>`;
			}
		});
		let contactsList = document.querySelector(".contacts-list");
		contactsList.innerHTML = listElems;
	}

	openCallScreen(id) {
		let list = this.contactManager.getContacts();
		list.forEach((e) => {
			if (e.id === id) {
				this.callScreen.open(e);
			}
		});
	}

	openAddContactScreen() {
		this.contactManager.open();
	}

	closeAddContactScreen() {
		this.contactManager.close();
	}


	setupListeners() {
		let addContactBtn = document.querySelector(".add-contact-btn");

		$(document).on('click', '.phone-btn', (e) => {
			this.openCallScreen(e.originalEvent.path[3].getAttribute("id"));
		});

		$(document).on('click', '.location-btn', (e) => {
			let id = e.originalEvent.path[3].getAttribute("id");
			let contact = this.contactManager.getContact(id);
			this.palFinderScreen.open(contact);
		});

		$(document).on('click', '.message-btn', (e) => {
			let homeContactBtn = document.querySelector(".contacts-home-btn");
			let messageScreen = new MessageScreen();
			let id = e.originalEvent.path[3].getAttribute("id");
			let contact = this.contactManager.getContact(id);
			let message = "";

			contact.messages.forEach((e) => {
				message += e + "</br>";
			});
			contact.messages = [];
			this.createListElem();
			messageScreen.open(contact, message);

			homeContactBtn.classList.remove("highlight");
		});

		addContactBtn.addEventListener("click", () => {
			this.openAddContactScreen();
		});
	}

	sendReponse(contact) {
		let list = this.contactManager.getContacts();
		list.forEach((e) => {
			if (e.id === contact.id) {
				e.added = true;
			}
		});
		this.createListElem();
	}

}

class MessageScreen {


	constructor() {
		this.elem = document.querySelector(".message");

		this.callScreen = new CallScreen();

		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-message-btn");

		closeBtn.addEventListener("click", () => {
			this.close();
		});
	}

	open(contact, message) {
		let replyBtn = document.querySelector(".message-reply-btn");

		let authorElem = document.querySelector(".message-author");
		let messageElem = document.querySelector(".message-content");

		authorElem.innerHTML = contact.name;
		messageElem.innerHTML = message;

		this.elem.classList.add("active");

		replyBtn.addEventListener("click", () => {
			this.callScreen.open(contact);
			this.close();
		});
	}

	close() {
		this.elem.classList.remove("active");
	}
}

class ConfirmScreen {
	constructor() {
		this.elem = document.querySelector(".confirm");
	}

	open(description, text, cancelCallback, confirmCallback) {
		let cancelBtn = document.querySelector(".confirm-cancel-btn");
		let confirmBtn = document.querySelector(".confirm-ok-btn");

		let descriptionElem = document.querySelector(".confirm-description");
		let textElem = document.querySelector(".confirm-text");

		descriptionElem.innerHTML = description;
		textElem.innerHTML = text;

		cancelBtn.addEventListener("click", () => { this.close(); cancelCallback(); });
		confirmBtn.addEventListener("click", () => { this.close(); confirmCallback(); })

		this.elem.classList.add("active");
	}

	close() {
		this.elem.classList.remove("active");
	}
}

class NavMode {
	constructor() {
		this.elem = document.querySelector(".navmode");
		this.maps = [
			"../files/map1.png",
			"../files/map2.png",
			"../files/map3.png",
			"../files/map4.png",
			"../files/map5.png",
		]
		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-navmode-btn");

		closeBtn.addEventListener("click", () => {
			this.close();
		});
	}

	open(distance) {
		let distanceElem = document.querySelector(".navmode-footer span");
		let mapElem = document.querySelector(".dummy-map");

		mapElem.src = this.maps[Math.floor(Math.random() * this.maps.length)];

		this.elem.classList.add("active");

		distanceElem.innerHTML = `${distance} Km`;
	}

	close() {
		this.elem.classList.remove("active");
	}
}

window.onload = () => {
	let clock = new Clock();
	let contacts = new Contacts();
	let places = new Places();
	let swipe = new Swipe();
}