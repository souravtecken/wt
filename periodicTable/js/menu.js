$(document).ready(function(){
    var menuHeight=document.getElementById("menu"); //
    menuHeight=$(menuHeight).height();                       //
    menuHeight=(menuHeight+2)*-1;                            //This part gets the menu to be above the page view;
    $("#menu").css("top",menuHeight);               //
    $("#menu_activator").mouseenter(function(){
        $("#menu_pullDown").animate({top: "0.01em"},200); // Gets the "menu pull down" thing to drop down.
        $(this).css("display","none");       // "menu_activator" made to disappear because of the "z-index" problem.
    });                                                   // Click function for Menu pull down won't work if Menu activator's still present
    $("#menu_pullDown").mouseout(function(){
        $(this).animate({top: "-1.1em"},200); // Takes the "menu pull down" thing back up 
        $("#menu_activator").css("display","block");      // Menu activator appears again.
    });
    //_____________________________________________________________________________________________
    $("#menu_pullDown").click(function(){
        $("#menu").animate({top:"0.01em"},200);    
    });
    $("#menu_footer").click(function(){
        $("#menu").animate({top:menuHeight},100);
    });

});
//Sourav Raveendran
