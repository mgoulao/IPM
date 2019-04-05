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
			},
			{
				id: 2,
				name: "Cozidos",
				rating: 3.4,
				distance: 0.2,
				type: "restaurant",
				fav: true
			},
			{
				id: 3,
				name: "Xique",
				rating: 1.0,
				distance: 2.4,
				type: "bar",
				fav: false
			},
			{
				id: 4,
				name: "Museu de Arte",
				rating: 4.3,
				distance: 3.8,
				type: "museum",
				false: false
			},
			{
				id: 5,
				name: "Museu Moderno",
				rating: 4.1,
				distance: 5.2,
				type: "museum",
				fav: true
			},
			{
				id: 6,
				name: "Pizza 👌",
				rating: 3.8,
				distance: 1.4,
				type: "restaurant",
				fav: true
			},
			{
				id: 7,
				name: "Xin li",
				rating: 4.9,
				distance: 1.9,
				type: "restaurant",
				fav: true
			},
			{
				id: 8,
				name: "Pede um copo",
				rating: 2.8,
				distance: 3.0,
				type: "bar",
				fav: false
			},
			{
				id: 9,
				name: "Baril",
				rating: 1.5,
				distance: 7.3,
				type: "bar",
				fav: false
			},
			{
				id: 10,
				name: "Arco do Cego",
				rating: 2.1,
				distance: 0.2,
				type: "garden",
				fav: false
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

		this.placeInfoScreen = new PlaceInfo();

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
	constructor() {
		this.elem = document.querySelector(".place-info");

		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-place-info-btn");

		closeBtn.addEventListener("click", () => {
			this.close();
		});
	}

	open(place) {
		let typeElem = document.querySelector(".place-info-type");
		let nameElem = document.querySelector(".place-info-name");
		let favElem = document.querySelector(".place-info-fav");
		let ratingElem = document.querySelector(".place-info-rating span");
		let distanceElem = document.querySelector(".place-info-distance");

		typeElem.innerHTML = place.type;
		nameElem.innerHTML = place.name;
		favElem.innerHTML = place.fav ? "bookmark" : "bookmark_border";
		ratingElem.innerHTML = place.rating;
		distanceElem.innerHTML = place.distance;

		this.elem.classList.add("active");

		let favBtn = document.querySelector(".place-info-fav");
		favBtn.addEventListener("click", () => {
			place.fav = !place.fav;
			favElem.innerHTML = place.fav ? "bookmark" : "bookmark_border";

		});
	}

	close() {
		this.elem.classList.remove("active");
	}

}

class ContactManager {
	constructor(contactScreen) {
		this.waitingForResponse = false;
		this.contactScreen = contactScreen;
		this.setupListeners();
		this.contacts = [
			{
				name: "Manel",
				id: "1",
				call: true,
				locate: true,
				receiveCall: true,
				messages: [],
				added: true,
			},
			{
				name: "Ana Maria",
				id: "2",
				call: true,
				locate: true,
				receiveCall: true,
				messages: [],
				added: true,
			},
			{
				name: "Miguel",
				id: "3",
				location: false,
				call: false,
				receiveCall: true,
				messages: [],
				added: false,
			},
			{
				name: "João",
				id: "4",
				location: false,
				call: false,
				receiveCall: true,
				messages: [],
				added: false,
			}, {
				name: "Paulo",
				id: "5",
				location: false,
				call: false,
				receiveCall: true,
				messages: [],
				added: false,
			}, {
				name: "Afonso",
				id: "6",
				location: false,
				call: false,
				receiveCall: true,
				messages: [],
			},
			{
				name: "Arnaldo",
				id: "7",
				call: true,
				locate: true,
				receiveCall: true,
				messages: [],
				added: false,
			},
			{
				name: "José",
				id: "8",
				call: true,
				locate: true,
				receiveCall: true,
				messages: [],
				added: true,
			},
			{
				name: "Josefina",
				id: "9",
				call: true,
				locate: true,
				receiveCall: true,
				messages: [],
				added: true,
			},
			{
				name: "Vitor",
				id: "10",
				call: true,
				receiveCall: true,
				locate: true,
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
					console.log(checked);
				}
			});
		});

		$(document).on("click", ".helper-add-contact-btn", (e) => {
			let id = e.originalEvent.path[3].getAttribute("id");
			if (this.waitingForResponse) {
				let contact = this.getContact(id);
				let receiveCall = document.getElementById("permission-call-btn").classList.contains("active");
				contact.receiveCall = receiveCall;
				this.contactScreen.sendReponse(contact);
				this.createContactsList();
				this.close();
			}
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
			let description = "Do you want send this message?";
			let confirmScreen = new ConfirmScreen();
			confirmScreen.open(description, () => { }, () => { this.close() });
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

		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-pal-finder-btn");

		closeBtn.addEventListener("click", () => {
			this.close();
		});
	}

	open() {
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
			this.palFinderScreen.open();
		});

		$(document).on('click', '.message-btn', (e) => {
			let homeContactBtn = document.querySelector(".contacts-home-btn");
			let messageScreen = new MessageScreen();
			let id = e.originalEvent.path[3].getAttribute("id");
			let contact = this.contactManager.getContact(id);
			let author = contact.name;
			let message = "";

			contact.messages.forEach((e) => {
				message += e + "</br>";
			});
			contact.messages = [];
			this.createListElem();
			messageScreen.open(author, message);

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
		this.setupListeners();
	}

	setupListeners() {
		let closeBtn = document.querySelector(".close-message-btn");
		closeBtn.addEventListener("click", () => {
			this.close();
		});
	}

	open(author, message) {
		let authorElem = document.querySelector(".message-author");
		let messageElem = document.querySelector(".message-content");

		authorElem.innerHTML = author;
		messageElem.innerHTML = message;

		this.elem.classList.add("active");
	}

	close() {
		this.elem.classList.remove("active");
	}
}

class ConfirmScreen {
	constructor() {
		this.elem = document.querySelector(".confirm");
	}

	open(description, cancelCallback, confirmCallback) {
		let cancelBtn = document.querySelector(".confirm-cancel-btn");
		let confirmBtn = document.querySelector(".confirm-ok-btn");

		let descriptionElem = document.querySelector(".confirm-description");
		descriptionElem.innerHTML = description;

		cancelBtn.addEventListener("click", () => { this.close(); cancelCallback(); });
		confirmBtn.addEventListener("click", () => { this.close(); confirmCallback(); })

		this.elem.classList.add("active");
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