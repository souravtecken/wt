const scalDate = new Date();
const bcalDate = new Date();
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function assignDate(dateObjA, dateObjB) {
    dateObjA.setDate(1);
    dateObjA.setMonth(dateObjB.getMonth());
    dateObjA.setDate(dateObjB.getDate());
    dateObjA.setFullYear(dateObjB.getFullYear());
}

function initSCalendarView() {     
    const scalTabs = document.getElementById("scalendar-container").getElementsByClassName("scal-tab");
    scalDate.setDate(scalDate.getDate() - 1);
    for(let i=0;i<scalTabs.length;i++) {
        const dateContainers = scalTabs[i].getElementsByTagName("span");
        dateContainers[0].innerHTML=days[(scalDate.getDay())];
        dateContainers[1].innerHTML=scalDate.getDate();
        dateContainers[2].innerHTML=months[(scalDate.getMonth())].substring(0,3);
        dateContainers[3].innerHTML=scalDate.getFullYear();
        scalDate.setDate(scalDate.getDate()+1);
    }
    scalDate.setDate(scalDate.getDate() - 2);
    assignDate(bcalDate,scalDate);
    initBCalendarView();
}

function initBCalendarView() {
    const monthContainer=document.getElementById("bcal-mon");
    monthContainer.innerHTML = months[bcalDate.getMonth()];
    const yearContainer = document.getElementById("bcal-year");
    yearContainer.innerHTML=bcalDate.getFullYear();
    bcalDate.setDate(1);
    while (bcalDate.getDay()!=1) {
        bcalDate.setDate(bcalDate.getDate()-1);    
    }
    let bcalContainer = document.getElementById("bcal-container");
    bcalContainer = bcalContainer.getElementsByClassName("days");
    bcalContainer=bcalContainer[0].getElementsByTagName("li");
    for(let i=0;i<bcalContainer.length;i++) {
        bcalContainer[i].classList.remove('inactive');
        bcalContainer[i].classList.remove('active');
        if (bcalDate.getMonth()!=scalDate.getMonth()) {
            bcalContainer[i].innerHTML=bcalDate.getDate();
            bcalContainer[i].setAttribute('class','inactive');
        }
        else {
            if (bcalDate.getDate()===scalDate.getDate()) {
                bcalContainer[i].innerHTML="<span class='active'></span>";
                const bcalDateContainer = bcalContainer[i].getElementsByTagName("span");
                bcalDateContainer[0].innerHTML=bcalDate.getDate();     
            }
            else
                bcalContainer[i].innerHTML = bcalDate.getDate();
        }
        bcalDate.setDate(bcalDate.getDate()+1);
    }
    assignDate(bcalDate,scalDate);
}

function scalendarViewChange(clicked_id)
{    
    if (clicked_id == "scal-button-left")        
        scalDate.setDate(scalDate.getDate()-1);    
    else
        scalDate.setDate(scalDate.getDate()+1);
    initSCalendarView();
}

function bcalendarSelect(clickedDateElement)
{
    const spanElements = clickedDateElement.getElementsByTagName("span");
    if (spanElements.length==0)
    {
        if (clickedDateElement.className=="inactive")
        {
            if(Number(clickedDateElement.innerHTML)<15)
            {
                bcalDate.setDate(1);
                bcalDate.setMonth(bcalDate.getMonth()+1);
            }
            else 
            {
                bcalDate.setDate(1);
                bcalDate.setMonth(bcalDate.getMonth()-1);
            }
        }
        bcalDate.setDate(clickedDateElement.innerHTML);
        assignDate(scalDate,bcalDate);
        initSCalendarView();
    }
}

function jumpToToday()
{
    const currentDate = new Date();
    assignDate(scalDate, currentDate);
    assignDate(bcalDate, currentDate);
    initSCalendarView();
}

function bcalenderMonthChange(clickedClass)
{
    bcalDate.setDate(1);
    if (clickedClass.className=="prev")
        bcalDate.setMonth(bcalDate.getMonth()-1);
    else
        bcalDate.setMonth(bcalDate.getMonth()+1);
    assignDate(scalDate,bcalDate);
    initSCalendarView();
}

initSCalendarView();