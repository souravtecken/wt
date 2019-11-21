const updateDateTime = () => {
    const currentTime = new Date();
    document.getElementById("date").innerHTML = currentTime.getDate();
    document.getElementById("month").innerHTML = currentTime.getMonth();
    document.getElementById("year").innerHTML = currentTime.getFullYear();
    document.getElementById("hours").innerHTML = currentTime.getHours();
    document.getElementById("minutes").innerHTML = currentTime.getMinutes();
    console.log(currentTime);
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

initTimeTable();