let globalReminders = [];
const updateDateTime = () => {
    const currentTime = new Date();
    document.getElementById("date").innerHTML = currentTime.getDate();
    document.getElementById("month").innerHTML = currentTime.getMonth();
    document.getElementById("year").innerHTML = currentTime.getFullYear();
    document.getElementById("hours").innerHTML = currentTime.getHours();
    document.getElementById("minutes").innerHTML = currentTime.getMinutes();
}
setInterval(updateDateTime, 1000);
$(document).ready(() => {    
    $('.timetable-toggle').click((event) => {
        const organisationTimetable = $('#organisation-timetable');
        const personalTimetable = $('#personal-timetable');
        const clickedId = event.target.id;
        if(clickedId === 'personal-timetable-tab'){            
            $('#organisation-timetable-tab').removeClass('active');
            personalTimetable.show();
            organisationTimetable.hide();
        }            
        else{
            $('#personal-timetable-tab').removeClass('active');
            personalTimetable.hide();
            organisationTimetable.show();
        }            
        event.target.classList.add('active');
    })

    $('.reminder-tab').click((event) => {
        const activeReminders = $('#active-reminders-container');
        const pastReminders = $('#past-reminders-container');
        const upcomingReminders = $('#upcoming-reminders-container');
        const clickedId = event.target.id;
        if(clickedId === 'active-reminder-tab'){
            $('#past-reminder-tab').removeClass('active');
            $('#upcoming-reminder-tab').removeClass('active');
            activeReminders.show();
            pastReminders.hide();
            upcomingReminders.hide();
        }
        else if(clickedId === 'past-reminder-tab'){
            $('#active-reminder-tab').removeClass('active');
            $('#upcoming-reminder-tab').removeClass('active');
            activeReminders.hide();
            pastReminders.show();
            upcomingReminders.hide();
        }
        else {
            $('#past-reminder-tab').removeClass('active');
            $('#active-reminder-tab').removeClass('active');
            activeReminders.hide();
            pastReminders.hide();
            upcomingReminders.show();
        }
        event.target.classList.add('active');
    })
    // Enable bootstrap accordions
    $('.collapse').collapse();
})

function createTimetableRow(time, title){
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = time;
    const td2 = document.createElement("td");
    td2.innerHTML = title;
    tr.appendChild(td1);
    tr.appendChild(td2);
    return tr;
}

function initTimeTable(){
    const days = [ "saturday", "sunday", "monday", "tuesday", "thursday", "friday"]
    const username = localStorage.getItem("user");
    fetch(`timetable.php/?user=${username}`)
        .then(response => {            
            return response.json();
        })
        .then(response => {
            const timetable = JSON.parse(response);
            const currentDate = new Date();
            console.log(timetable);
            for(const tableId of Object.keys(timetable)){                
                const table = document.getElementById(tableId);                
                const sessions = timetable[tableId][days[currentDate.getDay()]];
                console.log(days[currentDate.getDay()]);
                console.log(sessions);
                for(const session of sessions){
                    table.appendChild(createTimetableRow(session.time, session.title));
                }                
            }
        })
}

function addReminder(){        
    const reminderObj = {};
    reminderObj["title"] = document.getElementById("reminder-title").value;    
    reminderObj["date"] = document.getElementById("reminder-date").value;
    reminderObj["time"] = document.getElementById("reminder-time").value;
    reminderObj["additionalInfo"] = document.getElementById("reminder-additional-information").value;
    let key = 1;
    if(globalReminders.length)
        key = globalReminders[globalReminders.length-1].key+1;            
    reminderObj.key = key;
    globalReminders.push(reminderObj);    
    fetch("reminders.php", {
        method: "POST",        
        body:JSON.stringify({
            "username":localStorage.getItem("user"),
            "reminders":JSON.stringify(globalReminders)
        })                    
    })
    .then(response => response.json())
    .then(response => {        
        window.location.reload();
    });    
}

function createDateObjectFromString(dateString){
    const dateList = dateString.split("-");
    const dateObj = new Date();
    dateObj.setDate(dateList[2]);
    dateObj.setMonth(dateList[1]-1);
    dateObj.setFullYear(dateList[0]);
    return dateObj;
}

function getViewDate(){
    const mapMonthCode = {"Jan":0, "Feb":1, "Mar":2, "Apr":3, "May":4, "Jun":5, "Jul":6, "Aug":7, "Sep":8,"Oct":9, "Nov":10, "Dec":11};
    const dateObj = new Date();
    dateObj.setDate(document.getElementById("scal2Date").innerHTML);
    dateObj.setFullYear(document.getElementById("scal2Year").innerHTML);
    dateObj.setMonth(mapMonthCode[document.getElementById("scal2Mon").innerHTML]);
    return dateObj;
}

function renderReminders(){    
    let pastReminders = "";
    let upcomingReminders = "";
    let activeReminders = "";
    const dateBeingViewed = getViewDate();
    for(const reminder of globalReminders){
        const reminderTemplate = `<a href='#' \
        class='list-group-item list-group-item-primary list-group-item-action flex-column align-items-start'> \
            <div class='d-flex w-100 justify-content-between'> \
                <h5 class='mb-1'>${reminder.title}</h5> \
                <small>${reminder.date} - ${reminder.time}</small> \
            </div> \
            <p class='mb-1'> \
                ${reminder.additionalInfo} \
            </p> \            
            <small onclick="deleteReminder(${reminder.key})">Delete Reminder</small>\
        </a>`
        const reminderDate = createDateObjectFromString(reminder.date);
        if(reminderDate.getTime() < dateBeingViewed.getTime())
            pastReminders += reminderTemplate;
        else if(reminderDate.getTime() <= (dateBeingViewed.getTime() + (7*24*60*60*1000)))
            activeReminders += reminderTemplate;
        else 
            upcomingReminders += reminderTemplate;        
    }
    document.getElementById("active-reminders-container").innerHTML = activeReminders;
    document.getElementById("past-reminders-container").innerHTML = pastReminders;
    document.getElementById("upcoming-reminders-container").innerHTML = upcomingReminders;
}

function deleteReminder(key){
    if(confirm("Are you sure you want to delete reminder?")){
        console.log(globalReminders);
        globalReminders = globalReminders.filter((reminder) => reminder.key != key);
        console.log(globalReminders);
        fetch("reminders.php", {
            method: "POST",        
            body:JSON.stringify({
                "username":localStorage.getItem("user"),
                "reminders":JSON.stringify(globalReminders)
            })                    
        })                
        window.location.reload();
    }
}
function getReminders(){
    const username = localStorage.getItem("user");
    fetch(`reminders.php/?user=${username}`)
        .then(response => {            
            return response.json();
        })
        .then(response => {
            globalReminders = JSON.parse(response);    
            renderReminders();        
        })
}
getReminders();
initTimeTable();