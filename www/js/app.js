//Authored By: Hayden Kyte
//Verions 1.0.0
var saveProfiles = [];
var giftList = [];
var person;
var currentId = "";
var currentGift = "";
var app = {
    init: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        console.log("try");
        if (!localStorage.getItem("kyte0017")) { 
            console.log("Local");
            localStorage.setItem('kyte0017', JSON.stringify(saveProfiles));
        }
        else {
            //have to create this
            app.displayPerson();
        }
    }
    , onDeviceReady: function () {
        //set up event listeners and default variable values
        window.addEventListener('push', app.pageChanged);
        var addbtn = document.getElementById('addPersonBtn');
        
        addbtn.addEventListener('touchend', app.prepareInsert)
        app.firststart();
        //cordova.plugins.notification.local
        //show the list when loading
    }
    , prepareInsert: function () {
        //this is what will detmeine if its an insert or a edit. by looking at the data person. 
        //if 0, it is an insert, if a "Date.now", its a edit
        document.querySelector("#fullName").value = "";
        document.querySelector("#birthday").value = "";
        document.querySelector('#fullName').setAttribute('data-person', 0);
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
         
                  app.firststart();
             
                 app.displayPerson();
               // app.savePerson(); is in first start and app.displayPerson(); is in save person
            //ON THE GIFT PAGE                
        case "gift-list":
            console.log("gift-list!");
            //display gifts
            app.saveGift();
            app.displayGift();
            app.ideaModel();
        }
    }
    , firststart: function () {
        var saveContact = document.querySelector("#saveContactBtn");
        saveContact.addEventListener('touchend', app.savePerson);
    }
    , setStorage: function (person) {
        saveProfiles = JSON.parse(localStorage.getItem('kyte0017'));
        saveProfiles.push(person);
        localStorage.setItem("kyte0017", JSON.stringify(saveProfiles));
    }
    , displayPerson: function () {
        let saveProfiles = JSON.parse(localStorage.getItem('kyte0017'));
        //  console.log(display);
        var ul = document.querySelector("#contact-list");
        //clearing list before looping through local storage again
        ul.innerHTML = "";
        for (var i = 0; i < saveProfiles.length; i++) {
            var ul = document.querySelector("#contact-list");
            var list = document.createElement('li');
            list.className = 'table-view-cell';
            list.id = saveProfiles[i].id;
            //NAME, ENABLING MODAL
            var nameSpan = document.createElement('span');
            nameSpan.className = "name";
            nameSpan.setAttribute('href', '#personModal');
            var nameAnchor = document.createElement('a');
            nameAnchor.href = "#personModal";
            nameAnchor.innerHTML = (saveProfiles[i].name);
            nameAnchor.setAttribute('data-person', saveProfiles[i].id);
            nameAnchor.addEventListener("touchend", function (ev) {
                console.log("Edit Me");
                console.log(ev.currentTarget.getAttribute('data-person'));
                for (var p = 0; p < saveProfiles.length; p++) {
                    if (ev.currentTarget.getAttribute('data-person') == saveProfiles[p].id) {
                        console.log(saveProfiles[p]);
                        document.querySelector("#fullName").value = saveProfiles[p].name;
                        document.querySelector("#birthday").value = saveProfiles[p].dob;
                        document.querySelector('#fullName').setAttribute('data-person', saveProfiles[p].id);
                    }
                }
            });
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
            var monthDay = moment(saveProfiles[i].dob).format("MMM Do");
            dobSpan.innerHTML = (monthDay);
            //APPENDING EVERYTHING
            nameSpan.appendChild(nameAnchor);
            arrow.appendChild(dobSpan);
            list.appendChild(nameSpan);
            list.appendChild(arrow);
            ul.appendChild(list);
        }
    }
    , displayGift: function () {
        let display = JSON.parse(localStorage.getItem('kyte0017'));
        var ul = document.querySelector("#gift-list");
        console.log("display gift");
        console.log(ul);
        if (!(ul == null)) {
            ul.innerHTML = "";
        }
        for (var i = 0; i < display.length; i++) {
            //   console.log(display[i].ideas);
            //    console.log(display[i].id);
            //We are looking at the person ifd
            if (currentId == display[i].id) {
                //  console.log(display[i]);
                //    console.log("We have the list");
              //  console.log(display[i].ideas);
                //  giftList.push(display[i].ideas);
                // console.log(giftList);
                //     console.log(display[i].ideas.length);
                for (g = 0; g < display[i].ideas.length; g++) {
                    // var giftIndiv = (display[i].ideas[g]);
                    //console.log(test);
                    //      giftList.push(display[i].ideas[g]);
                    //     console.log(giftList);
                    var ul = document.querySelector("#gift-list");
                    console.log(ul);
                    var list = document.createElement('li');
                    list.className = 'table-view-cell media';
                    list.id = display[i].ideas[g].giftid;
                    list.innerHTML = "Gift Idea " + (g + 1);
                    //Enableing Delete
                    var trash = document.createElement('span');
                    trash.className = "pull-right icon icon-trash midline";
                    trash.addEventListener("touchend", app.deleteGift);
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
                    console.log(list);
                    ul.appendChild(list);
                }
            }
        }
    }
    , savePerson: function () {
        var personid = document.querySelector('#fullName').getAttribute('data-person');
        console.log("savePerson");
        console.log(personid);
        if (personid == 0) {
            //insert
            id = Date.now();
            console.log("insert");
        }
        else {
            //update
            var id = personid;
        }
        //var inputGroup = document.querySelector(".input-group");
        var name = document.querySelector("#fullName").value;
        var dob = document.querySelector("#birthday").value;
        if (!(name.length == 0) && (!(dob.length == 0))) {
            if (personid == 0) {
                var person = {
                    "id": id
                    , "name": name
                    , "dob": dob
                    , ideas: []
                }
                saveProfiles.push(person);
                console.log(saveProfiles);
            }
            else {
                //find the match and replace
                saveProfiles.forEach(function (person, idx) {
                    if (personid == person.id) {
                        console.dir("about to edit", person);
                        saveProfiles[idx].name = name;
                        saveProfiles[idx].dob = dob;
                    }
                });
            }
            console.dir(saveProfiles);
            localStorage.setItem('kyte0017', JSON.stringify(saveProfiles));
        }
        else {
            console.log("Its empty bruh"); //this is empty bruh
        }
        app.displayPerson();
    }
    , saveGift: function () {
        var saveGift = document.querySelector("#saveGiftBtn");
        saveGift.addEventListener('touchend', function (ev) {
            console.log("Saved gift!");
            var inputGroup = document.querySelector(".input-group");
            var giftIdea = document.querySelector("#giftIdea").value;
            var store = document.querySelector("#store").value;
            var url = document.querySelector("#url").value;
            var cost = document.querySelector("#cost").value;
            var giftId = Date.now();
            if (!(giftIdea.length == 0)) {
                let display = JSON.parse(localStorage.getItem('kyte0017'));
                for (var i = 0; i < display.length; i++) {
                    //   console.log(display[i].ideas);
                    console.log(display[i].id);
                    if (currentId == display[i].id) {
                        console.log(currentId);
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
                        //since we are looping through localstroage to find the right person, it fill fire the else statment
                        console.log("What's the present?!");
                    }
                }
            }
            app.displayGift();
        });
    }
    , deleteGift: function (ev) {
            //deleting this id
            currentGift = this.parentElement.id;
            //  console.log(currentGift);    
            //Looping through local strorage
            let display = JSON.parse(localStorage.getItem('kyte0017'));
            //      console.log(display);
            for (var y = 0; y < display.length; y++) {
                //  console.log(display[y]);
                //looping through localstorage so we can can find the right person
                if (display[y].id == currentId) {
                    var minusGift = display[y].ideas;
                    console.log(minusGift);
                    for (var m = 0; m < minusGift.length; m++) {
                        if (minusGift[m].giftid == currentGift) {
                            console.log("deleted");
                            console.log(minusGift[m]);
                            //  minusGift[m].splice
                            minusGift.splice(m, 1);
                            console.log(minusGift);
                            //   localStorage.setItem("kyte0017", JSON.stringify(minusGift)); 
                        }
                    }
                }
                //    console.log(giftList[p].giftid);
                console.log("Splicing");
                // console.log(display[i].ideas);
                //       giftList.splice(p,1);
                localStorage.setItem("kyte0017", JSON.stringify(display));
                app.displayGift();
            }
            this.parentElement.removeChild;
            this.removeEventListener("touchend", arguments.callee, false);
        }
        //default clear for idea modal
        
    , ideaModel: function () {
        var imodal = document.querySelector("#giftModalBtn");
        console.log(imodal);
        imodal.addEventListener("touchend", function (ev) {
            console.log("clear idea modal");
            document.querySelector("#giftIdea").value = "";
            document.querySelector("#store").value = "";
            document.querySelector("#url").value = "";
            document.querySelector("#cost").value = "";
            this.removeEventListener;
        });
    }
}
app.init();
//OTHER FUNCTIONS
//Setting Local Storage