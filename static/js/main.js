console.log('JAVASCRIPT FILE IS RUNNING ^~^');

// HTML OBJECTS 
const target = document.querySelector('.header-space');
const returnToTopBtn = document.querySelector('.span-to-top');
const clickableSections = document.querySelectorAll('.span-item');
const insideDivs =  document.querySelectorAll('.section-inside-div');
const hiddenObject = document.querySelectorAll('.hide-span');
const btnTabs = document.querySelectorAll('.tab-btn');
const experienceTabs = document.querySelectorAll('.experience-tab');
const experienceHover = document.querySelectorAll('.sub-hover');
const modalSubject = document.querySelectorAll('.modal-subject');
const secondDiv = document.querySelectorAll('.image-holder');
const btnList = document.querySelectorAll('.tab-btn');

_giveLocation = +'';

returnToTopBtn.addEventListener('click', function(){
    window.scrollTo(0, 0);
})

// window.addEventListener('load', function(){
//     this.window.scrollTo(0, 0);
// });

// GO TO SECTION FUNCTION DEPENDS ON DATASET AND ID OF HTML -> DON'T REMOVE ! -> WILL REFACTOR CODE LATER
clickableSections.forEach(i => {
    i.addEventListener('click', function(e){
        let clickedSubject = e.target.closest('.li-item');

        // GETTING DATASET THAT WILL REFERENCE SECTION ID 
        grabLocation = function(){
            const getDataSet = clickedSubject.dataset.section;
            const chosenSection = document.getElementById(getDataSet);
            const location = chosenSection.getBoundingClientRect();
            const locationY = Math.floor(location.y);
            clickedSubject.setAttribute("data-location", locationY);
            
            const getGeoLocation = clickedSubject.dataset.location;
            _giveLocation = getGeoLocation;

            return locationY;
        };

        goToLocation = function(loc){
            // GUARD CLAUSE
            if(loc === 0) {
                return;
            }
            // IF AT TOP GO TO SECTION 
            if(window.scrollY === 0) {
                window.scrollTo(0, loc);
            };

            // IF NOT ON TOP CALCULATE WINDOW - LOC
            if(window.scrollY > 25){
                const calResult = Math.floor(window.scrollY) + loc;
                window.scrollTo(0, calResult);
            };
        };

        getYLocation = function(){
            if(Math.floor(window.scrollY) <= _giveLocation ){
                clickedSubject.classList.add('setFixedOpacity');
            };

            if(Math.floor(window.scrollY) > _giveLocation || Math.floor(window.scrollY) < _giveLocation){
                clickedSubject.classList.remove('setFixedOpacity');
            }; 
        };

    // CALLING MEHTODS
    const info = grabLocation();
    goToLocation(info);
    getYLocation();
    });
});

document.addEventListener('scroll', function(){
    // SETTING STICKY CLASS
    if(Math.floor(window.scrollY) < 100){
        target.classList.add('setSticky');
    };

    // SETTING OPACITY BACK TO 1 WHEN Y == 0 
    if(Math.floor(window.scrollY) == 0){
        target.classList.remove('setOpacity');
    };

    // DISPLAY RETURN TO TOP BTN
    if(Math.floor(window.scrollY) < 500){
        returnToTopBtn.classList.add('hide-object');
    };

    if(Math.floor(window.scrollY) > 500){
        returnToTopBtn.classList.remove('hide-object');
    };
});

// EXPERICE HIDE AND REVEAL FUNCTIONS
btnTabs.forEach(btn =>{

    btn.addEventListener('click', function(e){
        
        // GET BTN THAT HAS ALREADY A CLASS WITH REVEAL-OBJECT
        experienceTabs.forEach(tab =>{
            if(tab.classList.contains('reveal-object')) {
                tab.classList.remove('reveal-object');
                tab.classList.add('hide-object');
                tab.dataset.selected = 'false';
            }
        })

        const clickedBtn = e.target.closest('.tab-btn');
        const clickedBtnId = +clickedBtn.dataset.tab;        
        const appropriateTab = document.getElementById(`tab-${clickedBtnId}`);
        appropriateTab.classList.remove('hide-object');
        appropriateTab.classList.add('reveal-object');
        appropriateTab.dataset.selected = 'true';
    });
});

modalSubject.forEach(el =>{

    el.addEventListener('click', function(e){    
        el.classList.add('hide-object');
        const specP = e.target.closest('.image-holder');

        // GET DATASET INFO
        const dataInfo = specP.dataset.div;

        // GRAB NEW DIV BY CLASS OF DATASET
        const revealingDiv = document.querySelector(`.divv${dataInfo}`);

        // REVEAL OBJECT BY ADDING CLASS:REVEAVL OBJECT
        revealingDiv.classList.remove('hide-object');
        revealingDiv.classList.add('reveal-object');

        // ADD BACKGROUND IMAGE TO ENTIRE DIV
        const setBImageDiv = document.querySelector(`.subject${dataInfo}`);
        setBImageDiv.classList.add(`setBImage${dataInfo}`);

        // HIDE SUBJECT TITLE DIV
        const propDiv = document.querySelector(`.topDiv${dataInfo}`);
        propDiv.classList.add('hide-object');
    });
});

btnList.forEach(btn =>{

    btn.addEventListener('click', function(e){

        btnList.forEach(button =>{
            if(button.classList.contains('highlight-btn')){
                button.classList.remove('highlight-btn');
                button.classList.remove('white-tint');
                button.classList.add('transparent-back');
            };
        });

        const propBtn = e.target.closest('.tab-btn');
        propBtn.classList.remove('transparent-back');
        propBtn.classList.add('highlight-btn');
        propBtn.classList.add('white-tint');
    })
})