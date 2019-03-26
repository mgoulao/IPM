const dayToString = (day) => {
    let ret = "";
    switch (day) {
        case 0:
            ret = "domingo";
            break;
        case 1:
            ret = "segunda";
            break;
        case 2:
            ret = "terça";
            break;
        case 3:
            ret = "quarta";
            break;
        case 4:
            ret = "quinta";
            break;
        case 5:
            ret = "sexta";
            break;
        case 6:
            ret = "sábado";
            break;
        default:
            ret = "error";
            break;
    }
    return ret;
}

const dateToString = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const hourToString = (date) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    return `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes}`;
}

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
        $(`.${this.screens[this.previousScreen]}`).fadeOut( 200, () => {
            previousScreenElem.classList.remove("active");
        });
    }

    showScreen() {
        let currentScreenElem = document.querySelector(`.${this.screens[this.currentScreen]}`);
        this.removeScreen();
        $(`.${this.screens[this.currentScreen]}`).fadeIn( 300, () => {
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

class Contacts {

    constructor() {
        this.elem = document.querySelector(".contacts");
        this.setupListeners();
        this.list = [
            {
                name: "Miguel",
                id: "123",
                call: true,
                locate: true,
            }
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
                        <i class="material-icons phone-btn">local_phone</i>
                    </div>
                </div>
            </li>`;

        });
        let contactsList = document.querySelector(".contacts-list");
        contactsList.innerHTML = listElems;
    }
    setupListeners() {
        $(document).on('click', '.phone-btn', (e) => {
            console.log(e.originalEvent.path[3]);
        });
    }

}


window.onload = () => {
    let clock = new Clock();
    let contacts = new Contacts();
    let swipe = new Swipe();
}