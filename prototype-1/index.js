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
    return `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes}`;
}


const randomMessage = () => {
    let messages = [
        "Estou perdido ajuda.",
        "Onde estás, não consigo ver-te",
        "Encontramo-nos no sitio combinado às 4"
    ];
    return messages[Math.floor(Math.random()*messages.length)];
}
//TODO - Add weather

class Swipe {
    constructor() {
        this.screens = ["home", "contacts"];
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
        this.day = document.querySelector(".day");
        this.date = document.querySelector(".date");

        let date = new Date();
        this.hours.innerHTML = hourToString(date);
        this.day.innerHTML = dayToString(date.getDay());
        this.date.innerHTML = dateToString(date);
    }
}

class AddContact {
    constructor(contactScreen) {
        this.waitingForResponse = false;
        this.contactScreen = contactScreen;
        this.setupListeners();
        this.contacts = [
            {
                name: "Miguel",
                id: "3",
                location: false,
                call: false,
                messages: [],
            },
            {
                name: "João",
                id: "4",
                location: false,
                call: false,
                messages: [],
            }, {
                name: "Paulo",
                id: "5",
                location: false,
                call: false,
                messages: [],
            }, {
                name: "Afonso",
                id: "6",
                location: false,
                call: false,
                messages: [],
            }
        ];
        this.createContactsList();
    }

    createContactsList() {
        let listElem = document.querySelector(".helper-contacts-list");
        let res = "";
        this.contacts.forEach((e) => {
            res +=
                `<li id="${e.id}">
                    <h6>${e.name}</h6>
                    <div class="helper-contact-permissions">
                        <i class="material-icons">location_on</i>
                        <input type="checkbox" name="locate" value="true">
                        <i class="material-icons">phone</i>
                        <input type="checkbox" name="call" value="true">
                        <i class="material-icons helper-add-contact-btn">add</i>
                        <i class="material-icons helper-add-mensage-btn">mic</i>
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
            let id = e.originalEvent.path[2].getAttribute("id");
            let checked = e.currentTarget.checked;
            this.contacts.forEach((contact) => {
                if (id === contact.id) {
                    contact.location = checked;
                }
            });
        });

        $(document).on("change", ".helper-contact-permissions input[name='call']", (e) => {
            let id = e.originalEvent.path[2].getAttribute("id");
            let checked = e.currentTarget.checked;
            this.contacts.forEach((contact) => {
                if (id === contact.id) {
                    contact.call = checked;
                }
            });
        });

        $(document).on("click", ".helper-add-contact-btn", (e) => {
            let id = e.originalEvent.path[2].getAttribute("id");
            if (this.waitingForResponse) {
                let contact = this.getContact(id);
                let index = this.contacts.indexOf(contact);
                this.contactScreen.sendReponse(contact);
                this.contacts.splice(index, 1);
                this.createContactsList();
                this.close();
            }
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
}

class CallScreen {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        let endCallBtn = document.querySelector(".rec-call-btn");
        let recordingText = document.querySelector(".call-recording");

        endCallBtn.addEventListener("mousedown", () => {
            this.startTime = Date.now();
            recordingText.classList.add("active");
        });

        endCallBtn.addEventListener("mouseup", () => {
            let time = Date.now() - this.startTime;
            if (time > 1000) {
                this.close();
                recordingText.classList.remove("active");
            }
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

class Contacts {

    constructor() {
        this.elem = document.querySelector(".contacts");
        this.startTime = 0;
        this.setupListeners();
        this.addContact = new AddContact(this);
        this.callScreen = new CallScreen();
        this.notification = false;
        this.list = [
            {
                name: "Manel",
                id: "1",
                call: true,
                locate: true,
                messages: [],
            },
            {
                name: "Ana Maria",
                id: "2",
                call: true,
                locate: true,
                messages: [],
            },
            {
                name: "Arnaldo",
                id: "7",
                call: true,
                locate: true,
                messages: [],
            },
            {
                name: "José",
                id: "8",
                call: true,
                locate: true,
                messages: [],
            },
            {
                name: "Josefina",
                id: "9",
                call: true,
                locate: true,
                messages: [],
            },
            {
                name: "Vitor",
                id: "10",
                call: true,
                locate: true,
                messages: [],
            },
        ];
        this.createListElem();
    }

    createListElem() {
        let listElems = "";
        this.list.forEach((e) => {
            listElems +=
                `<li id="${e.id}">
                <span>${e.name}</span>
                <div class="list-btn-container">
                    <div class="list-btn">
                        ${e.call ? '<i class="material-icons phone-btn">local_phone</i>' : ''}
                    </div>
                </div>
            </li>`;

        });
        let contactsList = document.querySelector(".contacts-list");
        contactsList.innerHTML = listElems;
    }

    openCallScreen(id) {
        this.list.forEach((e) => {
            if (e.id === id) {
                this.callScreen.open(e);
            }
        });
    }

    openAddContactScreen() {
        this.addContact.open();
    }

    closeAddContactScreen() {
        this.addContact.close();
    }


    setupListeners() {
        let addContactBtn = document.querySelector(".add-contact-btn");

        $(document).on('click', '.phone-btn', (e) => {
            this.openCallScreen(e.originalEvent.path[3].getAttribute("id"));
        });

        addContactBtn.addEventListener("click", () => {
            this.openAddContactScreen();
        });
    }

    sendReponse(contact) {
        this.list.push(contact);
        this.createListElem();
    }

    addNotification() {
        this.notification = true;
    }

    removeNotification() {

    }

}


window.onload = () => {
    let clock = new Clock();
    let contacts = new Contacts();
    let swipe = new Swipe();
}