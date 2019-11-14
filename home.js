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