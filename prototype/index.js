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
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

const hourToString = (date) => {
    return `${date.getHours()}:${date.getMinutes()}`
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
}