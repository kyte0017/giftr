//Authored By: Hayden Kyte
//Verions 1.0.0
var saveProfiles = [];
var saveGifts;
var person;
var currentId = "";
var currentGift = "";
var app = {
    init: function () {
        try {
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
            console.log("try");
            if (!localStorage.getItem("kyte0017")) { 
                console.log("Local");
                localStorage.setItem('kyte0017', JSON.stringify(saveProfiles));
            }
            else {
                //have to create this
                displayPerson();
            }
        }
        catch (e) {
            document.addEventListener('DOMContentLoaded', this.onDeviceReady.bind(this), false);
            console.log('failed to find deviceready');
        }
    }
    , onDeviceReady: function () {
        //set up event listeners and default variable values
        window.addEventListener('push', app.pageChanged);
        firststart();
        //cordova.plugins.notification.local
        //show the list when loading
    }
    , pageChanged: function () {
        //user has clicked a link in the tab menu and new page loaded
        //check to see which page and then call the appropriate function
        var content = document.querySelector(".content");
        var pageid = (content.childNodes[3]);
        // var cancel = document.querySelector("#personalModal");
        // var save = document.querySelector("#personalModal").querySelector(".btn btn-primary btn-block");
        switch (pageid.id) {
            //ON THE CONTACT PAGE
        case "contact-list":
            console.log("contact list!");
            //add event listeners and call functions
            //The SAVING FUNCTION for PERSON
            firststart();
            //ON THE GIFT PAGE                
        case "gift-list":
            console.log("gift-list!");
            console.log(currentId);
            //display gifts
            displayGift();
            saveGift();
        }
    }
}
app.init();
//OTHER FUNCTIONS
//Setting Local Storage
function setStorage(person) {
    saveProfiles = JSON.parse(localStorage.getItem('kyte0017'));
    saveProfiles.push(person);
    localStorage.setItem("kyte0017", JSON.stringify(saveProfiles));
}

function setGifts(ideasArray) {
    saveGifts = JSON.parse(localStorage.getItem('kyte0017'));
    saveGifts.push(ideasArray);
    localStorage.setItem("kyte0017", JSON.stringify(saveGifts));
}
//Display on the First Page
function displayPerson() {
    let display = JSON.parse(localStorage.getItem('kyte0017'));
    //  console.log(display);
    var ul = document.querySelector("#contact-list");
    ul.innerHTML = "";
    for (var i = 0; i < display.length; i++) {
        var ul = document.querySelector("#contact-list");
        var list = document.createElement('li');
        list.className = 'table-view-cell';
        list.id = display[i].id;
        //NAME, ENABLING MODAL
        var nameSpan = document.createElement('span');
        nameSpan.className = "name";
        nameSpan.setAttribute = ('href', '#personModal');
        var nameAnchor = document.createElement('a');
        nameAnchor.href = "#personModal";
        nameAnchor.innerHTML = (display[i].name);
        //ARROW TO NEXT PAGE
        var arrow = document.createElement('a');
        arrow.className = 'navigate-right pull-right';
        arrow.href = "gifts.html";
        arrow.addEventListener("touchend", function (ev) {
            console.log("Clicking!");
            currentId = this.parentElement.id;
        });
        //BIRTHDAY, ALSO CAN GO TO NEXT PAGE
        var dobSpan = document.createElement('span');
        dobSpan.className = 'dob';
        var monthDay = moment(display[i].dob).format("MMM Do");
        dobSpan.innerHTML = (monthDay);
        //APPENDING EVERYTHING
        nameSpan.appendChild(nameAnchor);
        arrow.appendChild(dobSpan);
        list.appendChild(nameSpan);
        list.appendChild(arrow);
        ul.appendChild(list);
        //  console.log(arrow);
        //    console.log(ul);
    }
}

function displayGift() {
    let display = JSON.parse(localStorage.getItem('kyte0017'));
    for (var i = 0; i < display.length; i++) {
        //   console.log(display[i].ideas);
        //    console.log(display[i].id);
        if (currentId == display[i].id) {
            console.log(display[i]);
            console.log("We have the list");
            console.log(display[i].ideas);
            console.log(display[i].ideas.length);
            for (g = 0; g < display[i].ideas.length; g++) {
                console.log(display[i].ideas[g]);
                var ul = document.querySelector("#gift-list");
                var list = document.createElement('li');
                list.className = 'table-view-cell media';
                list.id = display[i].ideas[g].giftid;
                list.innerHTML = "Gift Idea " + (g + 1);
                //Enableing Delete
                var trash = document.createElement('span');
                trash.className = "pull-right icon icon-trash midline";
                trash.addEventListener("touchend", function (ev) {
                   for (var i = 0; i < display.length; i++) {
                //    console.log(display[i]);
                    currentGift = this.parentElement.id;
                    console.log(currentGift);
                    for (var p = 0; p < display.length; p++) {
                        console.log(display[i].ideas[p]);
                            if (currentGift == display[i].ideas[p].giftid) {
                            console.log("Splicing");
                            // console.log(display[i].ideas);
                              display[i].ideas.splice(p,1);
                              localStorage.setItem("kyte0017", JSON.stringify(display));
                                displayGift();

                        }
                        this.parentElement.removeChild;
                        this.removeEventListener("touchend", arguments.callee, false);
                    }
                   } });
                //Display gift name    
                var giftDisplay = document.createElement('div');
                giftDisplay.className = "media-body";
                var where = document.createElement('p');
                where.innerHTML = display[i].ideas[g].at;
                //ARROW TO NEXT PAGE
                var giftName = document.createElement('p');
                giftName.innerHTML = (display[i].ideas[g].idea);
                var urlp = document.createElement('p');
                var url = document.createElement('a');
                url.href = "#";
                url.taget = "_blank";
                url.innerHTML = display[i].ideas[g].url;
                var price = document.createElement('p');
                price.innerHTML = display[i].ideas[g].cost;
                //APPENDING GIFTS
                urlp.appendChild(url);
                giftDisplay.appendChild(giftName);
                giftDisplay.appendChild(urlp);
                giftDisplay.appendChild(price);
                list.appendChild(trash);
                list.appendChild(giftDisplay);
                ul.appendChild(list);

            }
        }
    }
}

function firststart() {
    var saveContact = document.querySelector(".btn.btn-primary.btn-block");
    saveContact.addEventListener('touchend', function () {
        console.log("okay");
        var inputGroup = document.querySelector(".input-group");
        var name = document.querySelector("#fullName").value;
        var dob = document.querySelector("#birthday").value;
        var id = Date.now();
        if (!(name.length == 0) && (!(dob.length == 0))) {
            person = {
                "id": id
                , "name": name
                , "dob": dob
                , "ideas": []
            }
            console.log(dob);
            setStorage(person);
        }
        else {
            console.log("Its empty bruh"); //this is empty bruh
        }
    });
    displayPerson();
}

function saveGift() {
    var saveGift = document.querySelector(".btn.btn-primary.btn-block");
    saveGift.addEventListener('touchend', function () {
        console.log("Saved gift!");
        var inputGroup = document.querySelector(".input-group");
        var giftIdea = document.querySelector("#giftIdea").value;
        var store = document.querySelector("#store").value;
        var url = document.querySelector("#url").value;
        var cost = document.querySelector("#cost").value;
        var giftId = Date.now();
        //        console.log(inputGroup);
        //        console.log(giftIdea);
        //        console.log(store);
        //        console.log(url);
        //        console.log(cost);
        if (!(giftIdea.length == 0)) {
            let display = JSON.parse(localStorage.getItem('kyte0017'));
            for (var i = 0; i < display.length; i++) {
                //   console.log(display[i].ideas);
                //    console.log(display[i].id);
                if (currentId == display[i].id) {
                    //var ideasArray = display[i].ideas;
                    //   console.log(ideasArray);
                    var giftNew = {
                        "giftid": giftId
                        , "idea": giftIdea
                        , "at": store
                        , "url": url
                        , "cost": cost
                    }
                    display[i].ideas.push(giftNew);
                    localStorage.setItem("kyte0017", JSON.stringify(display));
                }
                else {
                    console.log("What's the present?!");
                }
            }
        }
    });
}