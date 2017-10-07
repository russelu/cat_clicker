var model = {
    currentCat: null,
    adminMode: false,
    cats: [
        {
            clickCount: 0,
            name: 'Abby',
            imgSrc: 'img/cat1.jpg'
        },
        {
            clickCount: 0,
            name: 'Benjamin',
            imgSrc: 'img/cat2.jpg'
        },
        {
            clickCount: 0,
            name: 'Catherine',
            imgSrc: 'img/cat3.jpg'
        }
    ]
};

var octopus = {

    init: function() {
        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
        admin.init();
        displayAdmin.hide();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
        catView.render();
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    toggleAdmin: function() {
        if (model.adminMode) {
            model.adminMode = false;
            displayAdmin.hide();
        } else {
            model.adminMode = true;
            displayAdmin.init();
        };
    },

    setCat: function(newName, newCC) {
        model.currentCat.name = newName;
        if (newCC) {
            model.currentCat.clickCount = newCC;
        };
        displayAdmin.init();
        catListView.render();
        catView.render();
    }
};

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.catCountElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.catCountElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cats = octopus.getCats();

        this.catListElem.innerHTML = '';

        for (var i = 0; i < cats.length; i++) {
            var cat = cats[i];

            var elem = document.createElement('li');
            elem.textContent = cat.name;

            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                };
            })(cat));

            this.catListElem.appendChild(elem);
        };
    }
};

var displayAdmin = {

    init: function() {
        //this.adminFormElem = document.getElementById('admin-form');
        document.getElementById('new-name').style.visibility = "visible";
        document.getElementById('new-cc').style.visibility = "visible";
        document.getElementById('save').style.visibility = "visible";
        document.getElementById('cancel').style.visibility = "visible";
    },

    hide: function() {

        document.getElementById('new-name').style.visibility = "hidden";
        document.getElementById('new-cc').style.visibility = "hidden";

        saveButtonElem = document.getElementById('save');
        saveButtonElem.addEventListener('click', function(){
            octopus.setCat(document.getElementById('new-name').value,
                parseInt(document.getElementById('new-cc').value));
        });
        saveButtonElem.style.visibility = "hidden";
        cancelButtonElem = document.getElementById('cancel')
        cancelButtonElem.addEventListener('click', function(){
            octopus.toggleAdmin();
        });
        cancelButtonElem.style.visibility = "hidden";
    }
};

var admin = {

    init: function() {
        this.adminButtonElem = document.getElementById('admin-button');
        this.adminButtonElem.addEventListener('click', function(){
            octopus.toggleAdmin();
        });
    }
};

octopus.init();