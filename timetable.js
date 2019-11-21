function createSessionColumn(){
    const td = document.createElement("td");
    td.setAttribute("class", "session-column");
    const input1 = document.createElement("input");
    input1.placeholder = "Title";
    input1.setAttribute("class", "cell-input");
    input1.type = "text";    
    const input2 = document.createElement("input");
    input2.placeholder = "Time";
    input2.setAttribute("class", "cell-input");
    input2.type = "text";    
    td.appendChild(input1);
    td.appendChild(document.createElement("br"));
    td.appendChild(input2);
    return td;
}

function addSession(clickedElement){
    const lastCol = clickedElement.parentNode;
    const row = lastCol.parentNode;    
    row.insertBefore(createSessionColumn(), lastCol);
}

function initTimeTable(){
    const username = localStorage.getItem("user");
    fetch(`timetable.php/?user=${username}`)
        .then(response => {            
            return response.json();
        })
        .then(response => {
            const timetable = JSON.parse(response);
            console.log(timetable);
            for(const tableId of Object.keys(timetable)){                
                const table = document.getElementById(tableId);
                for(const day of Object.keys(timetable[tableId])){
                    const dayRow = timetable[tableId][day];                    
                    const tableRow = table.getElementsByClassName(day)[0];
                    const lastCol = tableRow.getElementsByClassName("add-session")[0];
                    for(const sessionObj of dayRow){
                        const newColumn =  createSessionColumn();
                        const inputElements = newColumn.getElementsByTagName("input");
                        inputElements[0].value = sessionObj["title"];
                        inputElements[1].value = sessionObj["time"];
                        tableRow.insertBefore(newColumn, lastCol);
                    }                                        
                }
            }
        })
}

function getTimetableFromPage(tableId){
    const table = document.getElementById(tableId);
    const timetableObject = {};
    const tableRows = table.getElementsByTagName("tr");
    for(const tableRow of tableRows){
        const sessionList = []
        const tableColumns = tableRow.getElementsByClassName("session-column");
        for(const tableColumn of tableColumns){
            const sessionObj = {};
            const inputElements = tableColumn.getElementsByTagName("input");
            sessionObj["title"] = inputElements[0].value;
            sessionObj["time"] = inputElements[1].value;
            if(sessionObj["title"])
                sessionList.push(sessionObj);
        }
        timetableObject[tableRow.getAttribute("class")] = sessionList;
    }            
    return timetableObject;
}

function saveTimetable(){
    const tables = document.getElementsByTagName("table");
    const timetableObject = {};
    for(const table of tables)
        timetableObject[table.getAttribute("id")] = getTimetableFromPage(table.getAttribute("id"));
    fetch("timetable.php", {
        method: "POST",        
        body:JSON.stringify({
            "username":localStorage.getItem("user"),
            "timetable":JSON.stringify(timetableObject)
        })                    
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    });
    
}
    
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

initTimeTable();