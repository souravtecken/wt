// By: Sourav Raveendran
var currentPage=0,isKeyTogglePresent=false,isColorBoxPresent=false,colorToBeChanged,lastGroupHighlighed, lastPeriodHighlighted,lastKeySelected=[],lotsOfElementsCounter=0,tempToggle=false,lastpressed=0,pressed,butcolor/*(Button Color)*/,g,p,count=0,ctype,btype,check,propcount=0,atomicnumber,atomicmass,
    atomicname,ec,atomicsymbol,radioactive,cstructure,counter=2,i,x,prevClicked="info";
// Initialising colors
var ckeyColors=["#D32F2F","#F06292","#FF7043","#689F38","#FFB300","#CDDC39","#AEB6BF","#9E9D24","#4DB6AC","#546E7A"];
var bkeyColors=["#66FF66","#FFFF19","#FF5050","#33CCFF"];
// Initialising melting points.    
var mPoint=[13.81, 0.95, 453.7, 1560, 2365, 3825, 63.15, 54.8, 53.55, 24.55, 371, 922, 933.5, 1683, 317.3, 392.2, 172.17, 83.95, 336.8, 1112, 1814,
	    1945, 2163, 2130, 1518, 1808, 1768, 1726, 1356.6, 692.73, 302.92, 1211.5, 1090, 494, 265.95, 116, 312.63, 1042, 1795, 2128, 2742, 2896,
	    2477, 2610, 2236, 1825, 1235.08, 594.26, 429.78, 505.12, 903.91, 722.72, 386.7, 161.39, 301.54, 1002, /*Till 56*/ /*From 72-88*/ 2504,
	    3293, 3695, 3455, 3300, 2720, 2042.1, 1337.58, 234.31, 577, 600.65, 544.59, 527, 575, 202, 300, 973, /*Till 88*/ /*From 104-118*/ "Unknown",
	    "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown",
	    "Unknown", /*Till 118*/ /*From 57-71*/ 1191, 1071, 1204, 1294, 1315, 1347, 1095, 1585, 1629, 1685, 1747, 1802, 1818, 1092, 1936,/*Till 71*/
	    /*From 89-103*/ 1323, 2028, 1845, 1408, 912, 913, 1449, 1618, 1323, 1173, 1133, 1800, 1100, 1100, 1900];	
//_______________________________________________________________________________________________________
// Initialising Boiling points.
var bPoint=[20.28, 4.216, 1615, 3243, 4275, 5100, 77.344, 90.188, 85, 27.1, 1156, 1380, 2740, 2630, 553, 717.82, 239.18, 87.45, 1033, 1757, 3109, 3560,
	    3650, 2945, 2335, 3023, 3143, 3005, 2840, 1180, 2478, 3107, 876, 958, 331.85, 120.85, 961, 1655, 3611, 4682, 5015, 4912, 4538, 4425, 3970,
	    3240, 2436, 1040, 2350, 2876, 1860, 1261, 457.5, 165.1, 944, 2078, /* Till 56 */ /*From 72 - 88*/ 4875, 5730, 5825, 5870, 5300, 4700, 4100, 3130,
	    629.88, 1746, 2023, 1837, 1235 , 610, 211.4, 950, 1413, /*Till 88*/ /*From 104 - 118*/ "Unknown","Unknown","Unknown","Unknown","Unknown",
	    "Unknown","Unknown","Unknown","Unknown","Unknown","Unknown","Unknown","Unknown","Unknown","Unknown", /*Till 118*/ /*From 57-71*/ 3737,
	    3715, 3785, 3347, 3273, 2067, 1800, 3545, 3500, 2840, 2968, 3140, 2223, 1469, 3668, /*Till 71*/ /*From 89-103*/ 3470, 5060, 4300, 4407, 4175, 3505,
	    2880,3383, "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown", "Unknown"];
//_______________________________________________________________________________________________________
//___________________________________________________________________________________________________________________________________________________________________
function fillingOrbitals()
{
	var j=0,k,splitStart,splitEnd,l,m;
	var x,y;
	var orbitalOrder=["s","p","d","f"];
	var eConfiguration =[];
	var whichOneToHighlight="";
	var numberOfUpArrowsAvailable;
	var numberOfDownArrowsAvailable;
	//_______________________________________________________________________________________________________
	for(i=0;j<=ec.length;i++)
	{
		splitStart=j;
		while((k!="-")&&(j<=ec.length))             //This loop assigns the array eConfiguration with values which correspond 
		{                                           //to the number of electrons in the atom's orbit number which corresponds
			k=ec.substring(j,(j+1));            //to 1 greater than the array's index number.
			j++;					 
		}                                           //It does this by splitting the numerals and the hyphens present in the variable 'ec'
		k="";
		splitEnd=(j-1);
		eConfiguration[i]=ec.substring(splitStart,splitEnd);
	}
	//________________________________________________________________________________________________________
	for (i=0;i<eConfiguration.length;i++) {
		eConfiguration[i]=Number(eConfiguration[i]); //The values obtained are strings.
	}                                                    // This loop converts it into a numerical datatype.
	//________________________________________________________________________________________________________
	for (i=0;i<eConfiguration.length;i++)
	{
		for(j=0;j<4;j++)
		{
			x=String(i+1)+String(orbitalOrder[j]);
			x=document.getElementsByClassName(x);
			numberOfUpArrowsAvailable=x.length;
			numberOfDownArrowsAvailable=x.length;
			for(m=0;m<2;m++)
			{
				for(k=0;k<x.length;k++)
				{
					y=x[k].childNodes;
					if(eConfiguration[i]>0)
					{
						eConfiguration[i]-=1;
						if(numberOfUpArrowsAvailable>0)
						{
							whichOneToHighlight="upArrow";
							numberOfUpArrowsAvailable-=1;
						}
						else if ((numberOfUpArrowsAvailable<=0)&&(numberOfDownArrowsAvailable>0))
						{
							whichOneToHighlight="downArrow";
							numberOfDownArrowsAvailable-=1;
						}
						else if ((numberOfUpArrowsAvailable<=0)&&(numberOfDownArrowsAvailable<=0))
						{
							break;
						}
						for (l=0;l<y.length;l++)
						{
							if (y[l].id==whichOneToHighlight) {
								y[l].style.visibility="visible";
							}
						}
					}
					else
					{
						break;
					}
				}
				if (eConfiguration[i]<=0)
				{
					break;
				}
			}
			if (eConfiguration[i]<=0)
			{
				break;
			}
		}
	}
}
function nextPage(clickedElement)
{
	var x;
	if (clickedElement.id=="key_toggle_right") {
		currentPage+=1;
	}
	else
	{
		currentPage-=1;
	}
	x=document.getElementsByClassName("toggle_state_indicator_part");
	for(i=0;i<x.length;i++)
	{
		if (i!=currentPage) {
			x[i].style.background="lightgrey";
		}
		else{
			x[i].style.background="grey";
		}
	}
	if (currentPage==0) {
		document.getElementById("legend").style.display="block";
		document.getElementById("orbitals").style.display="none";
		document.getElementById("key_toggle_right").style.display="block"; //These 2 lines are just to prevent the page_toggle button from
		document.getElementById("key_toggle_left").style.display="none";  //being visible even afer being clicked.
	}
	else if(currentPage==1){
		document.getElementById("orbitals").style.display="block";
		document.getElementById("legend").style.display="none";
		document.getElementById("key_toggle_right").style.display="none"; //These 2 lines are just to prevent the page_toggle button from
		document.getElementById("key_toggle_left").style.display="block"; //being visible even afer being clicked.
	}
	
}
function keyToggleAppear()
{
	if (isKeyTogglePresent==false) {
		if (currentPage==0) {
			document.getElementById("key_toggle_right").style.display="block";
		}
		else
		{
			document.getElementById("key_toggle_left").style.display="block";
		}
		isKeyTogglePresent=true;
	}
	else
	{
		document.getElementById("key_toggle_right").style.display="none";
		document.getElementById("key_toggle_left").style.display="none";
		isKeyTogglePresent=false;
	}
}
function colorBoxClose()
{
	isColorBoxPresent=false;
	document.getElementById("colorBox").style.display="none";
}
function  colorBoxAppear(clicked_id)
{
	var x;
	isColorBoxPresent=true;
	document.getElementById("colorBox").style.display="block";
	x=document.getElementById(clicked_id).childNodes;
	document.getElementById("toColorChange").innerHTML=x[1].innerHTML+" :";
	colorToBeChanged=clicked_id;
}
function colorChange(colorValue)
{
	var x;
	if (counter==1)
	{
		x=document.getElementsByClassName("ckey");
		for(i=0;i<x.length;i++)
		{
			if (x[i].id==colorToBeChanged)
			{
				ckeyColors[i]=colorValue;
				counter=2;
				hide();
				break;
			}
		}
	}
	else
	{
		x=document.getElementsByClassName("bkey");
		for(i=0;i<x.length;i++)
		{
			if (x[i].id==colorToBeChanged)
			{
				bkeyColors[i]=colorValue;
				counter=1;
				hide();
				break;
			}
		}
	}
}
//__________________NOT MY FUNCTION_________________________________________________________________
//USED TO OBTAIN HEX VALUE FOR LIGHTER OR DARKER SHADE OF A COLOR
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}
//_____________________________________________________________________________________________
function highlightLotsOfElements(clicked_id)
{
	var col=document.getElementById(clicked_id).childNodes;
	col=col[0].style.backgroundColor;
	if(counter==1)
	{
		counter=2;
	}
	else
	{
		counter=1;
	}
	hide();
	if ((lotsOfElementsCounter!=0)||(count!=0)) {
		lastKeySelected[0].style.background="transparent";
		if (count!=0) {
			lastGroupHighlighed.style.background="transparent";
			lastPeriodHighlighted.style.background="transparent";
			lastKeySelected[1].style.background="transparent";
		}
	}
	lotsOfElementsCounter++;
	x=document.getElementsByTagName("button");
	var a,b;
	for(i=0;i<x.length;i++)
	{
		a=x[i].parentNode;
		b=x[i].getAttribute("class");
		if((a.tagName==="TD")&&(i!=2)&&(i!=3)&&(i!=4)&&((b.substring(7,15)!=clicked_id)&&(b.substring(0,1)!=clicked_id)))
		{
			x[i].style.background="Transparent";
		}
		else if ((a.tagName==="TD")&&(i!=2)&&(i!=3)&&(i!=4)&&((b.substring(7,15)===clicked_id)||(b.substring(0,1)===clicked_id)))
		{
			document.getElementById("info").style.backgroundColor=x[i].style.backgroundColor;
		}
	}
	lastKeySelected[0]=document.getElementById(clicked_id);
	lastKeySelected[0].style.background=col;
	if (isColorBoxPresent===true) {
		colorBoxAppear(clicked_id);
	}
	clearWrite();
}
function outputUpdateButtonRadius(radius)
{
	radius=radius+"%";
	x=document.getElementsByTagName("button");
	var y;
	for(i=0;i<x.length;i++)
	{
		y=x[i].parentNode;
		if ((y.tagName==="TD")&(i!=1)/*Here x[i] is the information box */)
		{
			x[i].style.borderRadius=radius;
		}
	}
}
function outputUpdateTemperature(temp)
{
	document.getElementById("K").innerHTML=temp+"K";
	document.getElementById("C").innerHTML=(temp-273)+"&deg;C";
	document.getElementById("F").innerHTML=(((temp-273)*9/5)+32)+"&deg;F";
	tempToggle=true;
	document.getElementById("temperatureControlNest").style.background="hsla(120, 120%, 75%, 0.3)";
	document.getElementById('temperatureDisplay').value = document.getElementById(currentTempUnit).innerHTML;
	x=document.getElementsByClassName("atomicsymboldisplay");
	for (i=0;i<118;i++)
	{		
		if ((temp>=mPoint[i])&&(temp<bPoint[i])&&(mPoint[i]!="Unknown"))
		{
			x[i].style.color="blue";
		}
		else if ((temp>=bPoint[i])&&(bPoint[i]!="Unknown"))
		{
			x[i].style.color="red"; // Color to show that it's in gaseous state
		}
		else if (temp < mPoint[i])
		{
			x[i].style.color="black"; // Color to show that it is in solid state
		}
		else if ((mPoint[i]==="Unknown")&&(bPoint[i])==="Unknown")
		{
			x[i].style.color="white";	
		}
	}
}
function tempActivate()
{
	if (tempToggle===false)
	{
		outputUpdateTemperature(document.getElementById("temperatureControl").value);
	}
	else
	{
		tempToggle=false;
		document.getElementById("temperatureControlNest").style.background="transparent";
		x=document.getElementsByClassName("atomicsymboldisplay");
		for(i=0;i<118;i++)
		{
			x[i].style.color="black";
		}		
	}
}
function myFunction(clicked_id)
{
	document.getElementById(prevClicked).style.border="none";
	prevClicked=clicked_id;
	
	document.getElementById(clicked_id).style.border="1px solid black";
	
	x=document.getElementsByClassName("arrow");
	for (i=0;i<x.length;i++) {
		x[i].style.visibility="hidden";
	}
	if (lotsOfElementsCounter!=0) {
		lastKeySelected[0].style.background="transparent";
	}
	//_______________PREVIOUS HIGHLIGHTING REMOVAL___________________________
	if(counter==1)
		{
			counter=2;
		}
		else
		{
			counter=1;
		}
	hide();
	if(count==1)
	{
		if(propcount==1)
		{
		propcount=0;
		g.style.backgroundColor="transparent";
		}
		p.style.backgroundColor="transparent";
		ctype.style.backgroundColor="transparent";
		btype.style.backgroundColor="transparent";
	}
	//_______________________________________________________________________
	count=1;
	g=document.getElementById(clicked_id);		
	//________________INFORMATION BOX - COLOR________________________________
	butcolor=g;
	butcolor=butcolor.getAttribute('class');
	lastpressed=butcolor;
	butcolor=document.getElementsByClassName(butcolor);
	butcolor=butcolor[0].style.backgroundColor;
	document.getElementById("info").style.backgroundColor=butcolor;
	//_______________________________________________________________________
	//_________ ELEMENT TYPE HIGHLIGHTING____________________________________
	ctype=g.getAttribute('class');
	ctype=String(ctype);
	btype=ctype;
	btype=btype.substring(0,1);
	btype=document.getElementById(btype);
	lastKeySelected[0]=btype;
	btype.style.backgroundColor="grey";
	ctype=ctype.substring(7,15);
	check=ctype;
	ctype=document.getElementById(ctype);
	lastKeySelected[1]=ctype;
	ctype.style.backgroundColor="grey";
	//_______________________________________________________________________
	g=g.parentNode;
	p=g.parentNode;
	//________________________GROUP HIGHLIGHTING ____________________________
	if((check!="lanthani")&&(check!="actinide"))
	{
		g=g.getAttribute('class');
		g=String(g);
		g=g.substring(0,1)+g.substring(5,g.length);
		g=document.getElementById(g);
		lastGroupHighlighed=g;
		g.style.backgroundColor="grey";
		propcount=1;
	}
	//_______________________________________________________________________
	//_______________________  PERIOD HIGHLIGHTING___________________________
	p=p.getAttribute('class');
	p=String(p);
	p=p.substring(0,1)+p.substring(6,p.length);
	p=document.getElementById(p);
	lastPeriodHighlighted=p;
	p.style.backgroundColor="grey";
	//_______________________________________________________________________
}
function hide()
{
	tempToggle=false;
	document.getElementById("temperatureControlNest").style.background="transparent";
	var y;
	tempActivate();
	tempActivate(); //Cancels out each other, no effect produced. Can't explain what this does. Don't bother.
	document.getElementById(currentTempUnit).style.border="1px solid hsla(206, 100%, 31%, 1)";
	document.getElementById("temperatureDisplay").value = document.getElementById(currentTempUnit).innerHTML;;
	if(counter==1)
	{
		counter=2;
		//___________________________BLOCK TYPE KEY APPEARS__________________
		x=document.getElementsByClassName("ckey");
		for(i=0;i<x.length;i++)
		{
			x[i].style.display="none";
		}
		x=document.getElementsByClassName("bkey");
		for(i=0;i<x.length;i++)
		{
			x[i].style.display="inline-block";
		}
		//___________________________________________________________________
		x=document.getElementsByClassName("bkey");
		for (i=0;i<x.length;i++)
		{
			y=x[i].childNodes;
			y[0].style.backgroundColor=bkeyColors[i];
		}
		x=document.getElementsByClassName("sblock");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=bkeyColors[0];
		}
		x=document.getElementsByClassName("dblock");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=bkeyColors[1];
		}
		x=document.getElementsByClassName("pblock");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=bkeyColors[2];
		}
		x=document.getElementsByClassName("fblock");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=bkeyColors[3];
		}
	}
	else if(counter==2)
	{
		//______________ CHEMICAL TYPE KEY APPEARS__________________________
		x=document.getElementsByClassName("bkey");
		for(i=0;i<x.length;i++)
		{
			x[i].style.display="none";
		}
		x=document.getElementsByClassName("ckey");
		for(i=0;i<x.length;i++)
		{
			x[i].style.display="inline-block";
		}
		//__________________________________________________________________
		counter=1;
		x=document.getElementsByClassName("ckey");
		for (i=0;i<x.length;i++)
		{
			y=x[i].childNodes;
			y[0].style.backgroundColor=ckeyColors[i];
		}
		x=document.getElementsByClassName("othernonmetals");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[0];
		}
		x=document.getElementsByClassName("alkalimetals");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[2];
		}
		x=document.getElementsByClassName("alkalineearthmetals");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[4];
		}
		x=document.getElementsByClassName("noblegases");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[6];
		}
		x=document.getElementsByClassName("metalloids");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[8];
		}
		x=document.getElementsByClassName("halogens");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[1];
		}
		x=document.getElementsByClassName("transitionmetals");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[3];
		}
		x=document.getElementsByClassName("posttransitionmetals");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[5];
		}
		x=document.getElementsByClassName("lanthanides");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[7];
		}
		x=document.getElementsByClassName("actinides");
		for(i=0;i<x.length;i++)
		{
			x[i].style.backgroundColor=ckeyColors[9];
		}
	}
	if(lastpressed!=0)
	{
		pressed=lastpressed;
		pressed=document.getElementsByClassName(pressed);
		pressed=pressed[0].style.backgroundColor;
		document.getElementById("info").style.backgroundColor=pressed;
	}
}
//_________________________________________________________________________________________________________________________________________________________________
function write()
{
	document.getElementById("oxidationStates").innerHTML=oxidationStates;
	document.getElementById("atomicnumber").innerHTML=atomicnumber;
	document.getElementById("atomicmass").innerHTML=atomicmass;
	document.getElementById("atomicname").innerHTML=atomicname;
	document.getElementById("atomicsymbol").innerHTML=atomicsymbol;
	document.getElementById("ec").innerHTML=ec;
	if (radioactive===1)
	{
		document.getElementById("radioactive").style.backgroundImage="url('radioactive.png')";
	}
	else
	{
		document.getElementById("radioactive").style.backgroundImage="";
	}
	//______________________________________________________________________________________________________
	if (cstructure==="SimpleCubic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('simplecubic.png')";
	}
	else if (cstructure==="BaseCenteredMonoclinic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('basecenteredmonoclinic.png')";
	}
	else if (cstructure==="BodyCenteredCubic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('bodycenteredcubic.png')";
	}
	else if (cstructure==="FaceCenteredCubic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('facecenteredcubic.png')";
	}
	else if (cstructure==="SimpleTriclinic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('simpletriclinic.png')";
	}
	else if (cstructure==="SimpleHexagonal")
	{
		document.getElementById("cstructure").style.backgroundImage="url('simplehexagonal.png')";
	}
	else if (cstructure==="SimpleOrthorombic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('simpleorthorombic.png')";
	}
	else if (cstructure==="BaseCenteredOrthorhombic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('basecenteredorthorhombic.png')";
	}
	else if (cstructure==="FaceCenteredOrthorhombic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('facecenteredorthorhombic.png')";
	}
	else if (cstructure==="CenteredTetragonal")
	{
		document.getElementById("cstructure").style.backgroundImage="url('centeredtetragonal.png')";
	}
	else if (cstructure==="TetrahedralPacking")
	{
		document.getElementById("cstructure").style.backgroundImage="url('tetrahedralpacking.png')";
	}
	else if (cstructure==="SimpleMonoclinic")
	{
		document.getElementById("cstructure").style.backgroundImage="url('simplemonoclinic.png')";
	}
	else if (cstructure==="SimpleTrigonal")
	{
		document.getElementById("cstructure").style.backgroundImage="url('simpletrigonal.png')";
	}
	else if (cstructure==="Unknown")
	{
		document.getElementById("cstructure").style.backgroundImage="";
	}
	else
	{
		document.getElementById("cstructure").style.backgroundImage="";
	}
	fillingOrbitals();
}
function hydrogen()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, -1";
	color="Colourless";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=1;
	atomicmass=1.008;
	atomicname="Hydrogen";
	atomicsymbol="H";
	ec="1";
	write();
}
function helium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="0";
	color="Colourless";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=2;
	atomicmass=4.002602;
	atomicname="Helium";
	atomicsymbol="He";
	ec="2";
	write();
}
function lithium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="+1";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=3;
	atomicmass=6.94;
	atomicname="Lithium";
	atomicsymbol="Li";
	ec="2-1";
	write();
}
function beryllium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2";
	color="SlateGray";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=4;
	atomicmass=9.0121831;
	atomicname="Beryllium";
	atomicsymbol="Be";
	ec="2-2";
	write();
}
function boron()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3";
	color="Black";
	cstructure="SimpleTrigonal"
	radioactive=0;
	atomicnumber=5;
	atomicmass=10.81;
	atomicname="Boron";
	atomicsymbol="B";
	ec="2-3";
	write();
}
function carbon()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, -1, -2, -3, -4";
	color="Black";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=6;
	atomicmass=12.011;
	atomicname="Carbon";
	atomicsymbol="C";
	ec="2-4";
	write();
}
function nitrogen()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, 5, -1, -2, -3";
	color="Colourless";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=7;
	atomicmass=14.007;
	atomicname="Nitrogen";
	atomicsymbol="N";
	ec="2-5";
	write();
}
function oxygen()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, -1, -2";
	color="Colourless";
	cstructure="BaseCenteredMonoclinic"
	radioactive=0;
	atomicnumber=8;
	atomicmass=15.999;
	atomicname="Oxygen";
	atomicsymbol="O";
	ec="2-6";
	write();
}
function fluorine()
{
	magneticOrdering="N/A";
	oxidationStates="-1";
	color="Colourless";
	cstructure="BaseCenteredMonoclinic"
	radioactive=0;
	atomicnumber=9;
	atomicmass=18.998403163;
	atomicname="Fluorine";
	atomicsymbol="F";
	ec="2-7";
	write();
}
function neon()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="0";
	color="Colourless";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=10;
	atomicmass=20.1797;
	atomicname="Neon";
	atomicsymbol="Ne";
	ec="2-8";
	write();
}
function sodium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, -1";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=11;
	atomicmass=22.98976928;
	atomicname="Sodium";
	atomicsymbol="Na";
	ec="2-8-1";
	write();
}
function magnesium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=12;
	atomicmass=24.305;
	atomicname="Magnesium";
	atomicsymbol="Mg";
	ec="2-8-2";
	write();
}
function aluminium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=13;
	atomicmass=26.9815385;
	atomicname="Aluminium";
	atomicsymbol="Al";
	ec="2-8-3";
	write();
}
function silicon()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, -1, -2, -3, -4";
	color="Gray";
	cstructure="TetrahedralPacking"
	radioactive=0;
	atomicnumber=14;
	atomicmass=28.085;
	atomicname="Silicon";
	atomicsymbol="Si";
	ec="2-8-4";
	write();
}
function phosphorus()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, 5, -1, -2, -3";
	color="Colourless";
	cstructure="SimpleTriclinic"
	radioactive=0;
	atomicnumber=15;
	atomicmass=30.973761998;
	atomicname="Phosphorus";
	atomicsymbol="P";
	ec="2-8-5";
	write();
}
function sulphur()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, -1, -2";
	color="Yellow";
	cstructure="FaceCenteredOrthorhombic"
	radioactive=0;
	atomicnumber=16;
	atomicmass=32.06;
	atomicname="Sulphur";
	atomicsymbol="S";
	ec="2-8-6";
	write();
}
function chlorine()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, -1, -2";
	color="Yellow";
	cstructure="BaseCenteredOrthorhombic"
	radioactive=0;
	atomicnumber=17;
	atomicmass=35.45;
	atomicname="Chlorine";
	atomicsymbol="Cl";
	ec="2-8-7";
	write();
}
function argon()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="0";
	color="Colourless";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=18;
	atomicmass=39.948;
	atomicname="Argon";
	atomicsymbol="Ar";
	ec="2-8-8";
	write();
}
function potassium()
{
	magneticOrdering="N/A";
	oxidationStates="1, -2";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=19;
	atomicmass=39.0983;
	atomicname="Potassium";
	atomicsymbol="K";
	ec="2-8-8-1";
	write();
}
function calcium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=20;
	atomicmass=40.078;
	atomicname="Calcium";
	atomicsymbol="Ca";
	ec="2-8-8-2";
	write();
}
function scandium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=21;
	atomicmass=44.955908;
	atomicname="Scandium";
	atomicsymbol="Sc";
	ec="2-8-9-2";
	write();
}
function titanium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, -1";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=22;
	atomicmass=47.867;
	atomicname="Titanium";
	atomicsymbol="Ti";
	ec="2-8-10-2";
	write();
}
function vanadium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3, 4, 5, -1";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=23;
	atomicmass=50.9415;
	atomicname="Vanadium";
	atomicsymbol="V";
	ec="2-8-11-2";
	write();
}
function chromium()
{
	magneticOrdering="Antiferromagnetic";
	oxidationStates="1, 2, 3, 4, 5,  6, -1, -2";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=24;
	atomicmass=51.9961;
	atomicname="Chromium";
	atomicsymbol="Cr";
	ec="2-8-13-1";
	write();
}
function manganese()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, -1, -2, -3";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=25;
	atomicmass=54.938044;
	atomicname="Manganese";
	atomicsymbol="Mn";
	ec="2-8-13-2";
	write();
}
function iron()
{
	magneticOrdering="Ferromagnetic";
	oxidationStates="1, 2, 3, 4, 5,  6, -1, -2";
	color="Gray";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=26;
	atomicmass=55.845;
	atomicname="Iron";
	atomicsymbol="Fe";
	ec="2-8-14-2";
	write();
}
function cobalt()
{
	magneticOrdering="Ferromagnetic";
	oxidationStates="1, 2, 3, 4, 5, -1";
	color="Gray";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=27;
	atomicmass=58.933194;
	atomicname="Cobalt";
	atomicsymbol="Co";
	ec="2-8-15-2";
	write();
}
function nickel()
{
	magneticOrdering="Ferromagnetic";
	oxidationStates="1, 2, 3, 4, -1";
	color="Gray";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=28;
	atomicmass=58.6934;
	atomicname="Nickel";
	atomicsymbol="Ni";
	ec="2-8-16-2";
	write();
}
function copper()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4";
	color="Copper";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=29;
	atomicmass=63.546;
	atomicname="Copper";
	atomicsymbol="Cu";
	ec="2-8-18-1";
	write();
}
function zinc()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2";
	color="SlateGray";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=30;
	atomicmass=65.38;
	atomicname="Zinc";
	atomicsymbol="Zn";
	ec="2-8-18-2";
	write();
}
function gallium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3";
	color="Silver";
	cstructure="BaseCenteredOrthorhombic"
	radioactive=0;
	atomicnumber=31;
	atomicmass=69.723;
	atomicname="Gallium";
	atomicsymbol="Ga";
	ec="2-8-18-3";
	write();
}
function germanium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, -1, -2, -3, -4";
	color="Gray";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=32;
	atomicmass=72.63;
	atomicname="Germanium";
	atomicsymbol="Ge";
	ec="2-8-18-4";
	write();
}
function arsenic()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 5, -3";
	color="Silver";
	cstructure="SimpleTrigonal"
	radioactive=0;
	atomicnumber=33;
	atomicmass=74.921595;
	atomicname="Arsenic";
	atomicsymbol="As";
	ec="2-8-18-5";
	write();
}
function selenium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 4, 6, -2";
	color="Gray";
	cstructure="SimpleMonoclinic"
	radioactive=0;
	atomicnumber=34;
	atomicmass=78.971;
	atomicname="Selenium";
	atomicsymbol="Se";
	ec="2-8-18-6";
	write();
}
function bromine()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4, 5, 7, -1";
	color="Red";
	cstructure="BaseCenteredOrthorhombic"
	radioactive=0;
	atomicnumber=35;
	atomicmass=79.904;
	atomicname="Bromine";
	atomicsymbol="Br";
	ec="2-8-18-7";
	write();
}
function krypton()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="+2";
	color="Colourless";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=36;
	atomicmass=83.798;
	atomicname="Krypton";
	atomicsymbol="Kr";
	ec="2-8-18-8";
	write();
}
function rubidium()
{
	magneticOrdering="N/A";
	oxidationStates="1, -1";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=37;
	atomicmass=85.4678;
	atomicname="Rubidium";
	atomicsymbol="Rb";
	ec="2-8-18-8-1";
	write();
}
function strontium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=38;
	atomicmass=87.62;
	atomicname="Strontium";
	atomicsymbol="Sr";
	ec="2-8-18-8-2";
	write();
}
function yttrium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=39;
	atomicmass=88.90584;
	atomicname="Yttrium";
	atomicsymbol="Y";
	ec="2-8-18-9-2";
	write();
}
function zirconium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=40;
	atomicmass=91.224;
	atomicname="Zirconium";
	atomicsymbol="Zr";
	ec="2-8-18-10-2";
	write();
}
function niobium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3, 4, 5, -1";
	color="Gray";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=41;
	atomicmass=92.90637;
	atomicname="Niobium";
	atomicsymbol="Nb";
	ec="2-8-18-12-1";
	write();
}
function molybdenum()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, -1, -2";
	color="Gray";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=42;
	atomicmass=95.95;
	atomicname="Molybdenum";
	atomicsymbol="Mo";
	ec="2-8-18-13-1";
	write();
}
function technetium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, -1, -3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=1;
	atomicnumber=43;
	atomicmass=98;
	atomicname="Technetium";
	atomicsymbol="Te";
	ec="2-8-18-13-2";
	write();
}
function ruthenium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, 8, -2";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=44;
	atomicmass=101.07;
	atomicname="Ruthenium";
	atomicsymbol="Ru";
	ec="2-8-18-15-1";
	write();
}
function rhodium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, -1";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=45;
	atomicmass=102.90550;
	atomicname="Rhodium";
	atomicsymbol="Rh";
	ec="2-8-18-16-1";
	write();
}
function palladium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 4, 6";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=46;
	atomicmass=106.42;
	atomicname="Palladium";
	atomicsymbol="Pd";
	ec="2-8-18-18";
	write();
}
function silver()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 4";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=47;
	atomicmass=107.8682;
	atomicname="Silver";
	atomicsymbol="Ag";
	ec="2-8-18-18-1";
	write();
}
function cadmium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=48;
	atomicmass=112.414;
	atomicname="Cadmium";
	atomicsymbol="Cd";
	ec="2-8-18-18-2";
	write();
}
function indium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3";
	color="Silver";
	cstructure="CenteredTetragonal"
	radioactive=0;
	atomicnumber=49;
	atomicmass=114.818;
	atomicname="Indium";
	atomicsymbol="In";
	ec="2-8-18-18-3";
	write();
}
function tin()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 4, -4";
	color="Silver";
	cstructure="CenteredTetragonal"
	radioactive=0;
	atomicnumber=50;
	atomicmass=118.710;
	atomicname="Tin";
	atomicsymbol="Sn";
	ec="2-8-18-18-4";
	write();
}
function antimony()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="3, 5, -3";
	color="Silver";
	cstructure="SimpleTrigonal"
	radioactive=0;
	atomicnumber=51;
	atomicmass=121.760;
	atomicname="Antimony";
	atomicsymbol="Sb";
	ec="2-8-18-18-5";
	write();
}
function tellurium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="2, 4, 5, 6, -2";
	color="Silver";
	cstructure="SimpleTrigonal"
	radioactive=0;
	atomicnumber=52;
	atomicmass=127.60;
	atomicname="Tellurium";
	atomicsymbol="Te";
	ec="2-8-18-18-6";
	write();
}
function iodine()
{
	magneticOrdering="N/A";
	oxidationStates="1, 3, 4, 5, 7, -1";
	color="SlateGray";
	cstructure="BaseCenteredOrthorhombic"
	radioactive=0;
	atomicnumber=53;
	atomicmass=126.90447;
	atomicname="Iodine";
	atomicsymbol="I";
	ec="2-8-18-18-7";
	write();
}
function xenon()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 4, 6, 8";
	color="Colourless";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=54;
	atomicmass=131.293;
	atomicname="Xenon";
	atomicsymbol="Xe";
	ec="2-8-18-18-8";
	write();
}
function caesium()
{
	magneticOrdering="N/A";
	oxidationStates="1, -1";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=55;
	atomicmass=132.90545196;
	atomicname="Caesium";
	atomicsymbol="Cs";
	ec="2-8-18-18-8-1";
	write();
}
function barium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="+2";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=56;
	atomicmass=132.327;
	atomicname="Barium";
	atomicsymbol="Ba";
	ec="2-8-18-18-8-2";
	write();
}
function lanthanum()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=57;
	atomicmass=138.90547;
	atomicname="Lanthanum";
	atomicsymbol="La";
	ec="2-8-18-18-9-2";
	write();
}
function cerium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3, 4";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=58;
	atomicmass=140.116;
	atomicname="Cerium";
	atomicsymbol="Ce";
	ec="2-8-18-19-9-2";
	write();
}
function praseodymium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3, 4";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=59;
	atomicmass=140.90766;
	atomicname="Praseodymium";
	atomicsymbol="Pr";
	ec="2-8-18-21-8-2";
	write();
}
function neodymium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3, 4";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=60;
	atomicmass=144.242;
	atomicname="Neodymium";
	atomicsymbol="Nd";
	ec="2-8-18-22-8-2";
	write();
}
function promethium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=61;
	atomicmass=145;
	atomicname="Promethium";
	atomicsymbol="Pm";
	ec="2-8-18-23-8-2";
	write();
}
function samarium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="SimpleTrigonal"
	radioactive=0;
	atomicnumber=62;
	atomicmass=150.36;
	atomicname="Samarium";
	atomicsymbol="Sm";
	ec="2-8-18-24-8-2";
	write();
}
function europium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=63;
	atomicmass=151.964;
	atomicname="Europium";
	atomicsymbol="Eu";
	ec="2-8-18-25-8-2";
	write();
}
function gadolinium()
{
	magneticOrdering="Ferromagnetic";
	oxidationStates="1, 2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=64;
	atomicmass=157.25;
	atomicname="Gadolinium";
	atomicsymbol="Gd";
	ec="2-8-18-25-9-2";
	write();
}
function terbium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=65;
	atomicmass=158.92535;
	atomicname="Terbium";
	atomicsymbol="Tb";
	ec="2-8-18-27-8-2";
	write();
}
function dysprosium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3, 4";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=66;
	atomicmass=162.5;
	atomicname="Dysprosium";
	atomicsymbol="Dy";
	ec="2-8-18-28-8-2";
	write();
}
function holmium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=67;
	atomicmass=164.93033;
	atomicname="Holmium ";
	atomicsymbol="Ho";
	ec="2-8-18-29-8-2";
	write();
}
function erbium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=68;
	atomicmass=167.259;
	atomicname="Erbium";
	atomicsymbol="Er";
	ec="2-8-18-30-8-2";
	write();
}
function thulium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=69;
	atomicmass=168.93422;
	atomicname="Thulium";
	atomicsymbol="Tm";
	ec="2-8-18-31-8-2";
	write();
}
function ytterbium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=70;
	atomicmass=173.054;
	atomicname="Ytterbium";
	atomicsymbol="Yb";
	ec="2-8-18-32-8-2";
	write();
}
function lutetium()
{
	magneticOrdering="N/A";
	oxidationStates="+3";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=71;
	atomicmass=174.9668;
	atomicname="Lutetium";
	atomicsymbol="Lu";
	ec="2-8-18-32-9-2";
	write();
}
function hafnium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3, 4";
	color="Gray";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=72;
	atomicmass=178.49;
	atomicname="Hafnium";
	atomicsymbol="Hf";
	ec="2-8-18-32-10-2";
	write();
}
function tantalum()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3, 4, 5, -1";
	color="Gray";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=73;
	atomicmass=180.94788;
	atomicname="Tantalum";
	atomicsymbol="Ta";
	ec="2-8-18-32-11-2";
	write();
}
function tungsten()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, -1, -2";
	color="Gray";
	cstructure="BodyCenteredCubic"
	radioactive=0;
	atomicnumber=74;
	atomicmass=183.84;
	atomicname="Tungsten";
	atomicsymbol="W";
	ec="2-8-18-32-12-2";
	write();
}
function rhenium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, -1, -3";
	color="Gray";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=75;
	atomicmass=186.207;
	atomicname="Rhenium";
	atomicsymbol="Re";
	ec="2-8-18-32-13-2";
	write();
}
function osmium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, 8, -1, -2";
	color="SlateGray";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=76;
	atomicmass=190.23;
	atomicname="Osmium";
	atomicsymbol="Os";
	ec="2-8-18-32-14-2";
	write();
}
function iridium()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -3";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=77;
	atomicmass=192.217;
	atomicname="Iridium";
	atomicsymbol="Ir";
	ec="2-8-18-32-15-2";
	write();
}
function platinum()
{
	magneticOrdering="Paramagnetic";
	oxidationStates="1, 2, 3, 4, 5, 6, -1, -2";
	color="Gray";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=78;
	atomicmass=195.084;
	atomicname="Platinum";
	atomicsymbol="Pt";
	ec="2-8-18-32-17-1";
	write();
}
function gold()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 3, 5, -1";
	color="Gold";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=79;
	atomicmass=196.966569;
	atomicname="Gold";
	atomicsymbol="Au";
	ec="2-8-18-32-18-1";
	write();
}
function mercury()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 2, 4";
	color="Silver";
	cstructure="SimpleTrigonal"
	radioactive=0;
	atomicnumber=80;
	atomicmass=200.59;
	atomicname="Mercury";
	atomicsymbol="Hg";
	ec="2-8-18-32-18-2";
	write();
}
function thallium()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 3, -1";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=0;
	atomicnumber=81;
	atomicmass=204.38;
	atomicname="Thallium";
	atomicsymbol="Tl";
	ec="2-8-18-32-18-3";
	write();
}
function lead()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="2, 4, -4";
	color="SlateGray";
	cstructure="FaceCenteredCubic";
	radioactive=0;
	atomicnumber=82;
	atomicmass=207.2;
	atomicname="Lead";
	atomicsymbol="Pb";
	ec="2-8-18-32-18-4";
	write();
}
function bismuth()
{
	magneticOrdering="Diamagnetic";
	oxidationStates="1, 3, 5, -3";
	color="Gray";
	cstructure="BaseCenteredMonoclinic"
	radioactive=0;
	atomicnumber=83;
	atomicmass=208.98040;
	atomicname="Bismuth";
	atomicsymbol="Bi";
	ec="2-8-18-32-18-5";
	write();
}
function polonium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 4, 5, 6, -2";
	color="Silver";
	cstructure="SimpleCubic"
	radioactive=1;
	atomicnumber=84;
	atomicmass=209;
	atomicname="Polonium";
	atomicsymbol="Po";
	ec="2-8-18-32-18-6";
	write();
}
function astatine()
{
	magneticOrdering="N/A";
	oxidationStates="1, 3, 5, 7, -1";
	color="Silver";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=85;
	atomicmass=210;
	atomicname="Astatine";
	atomicsymbol="At";
	ec="2-8-18-32-18-7";
	write();
}
function radon()
{
	magneticOrdering="N/A";
	oxidationStates="2, 6";
	color="Colourless";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=86;
	atomicmass=222;
	atomicname="Radon";
	atomicsymbol="Rn";
	ec="2-8-18-32-18-8";
	write();
}
function francium()
{
	magneticOrdering="N/A";
	oxidationStates="+1";
	color="Silver";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=87;
	atomicmass=223;
	atomicname="Francium";
	atomicsymbol="Fr";
	ec="2-8-18-32-18-8-1";
	write();
}
function radium()
{
	magneticOrdering="N/A";
	oxidationStates="+2";
	color="Silver";
	cstructure="BodyCenteredCubic"
	radioactive=1;
	atomicnumber=88;
	atomicmass=226;
	atomicname="Radium";
	atomicsymbol="Ra";
	ec="2-8-18-32-18-8-2";
	write();
}
function actinium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=1;
	atomicnumber=89;
	atomicmass=227;
	atomicname="Actinium";
	atomicsymbol="Ac";
	ec="2-8-18-32-18-9-2";
	write();
}
function thorium()
{
	magneticOrdering="N/A";
	oxidationStates="1, 2, 3, 4";
	color="Silver";
	cstructure="FaceCenteredCubic";
	radioactive=1;
	atomicnumber=90;
	atomicmass=232.0377;
	atomicname="Thorium";
	atomicsymbol="Th";
	ec="2-8-18-32-18-10-2";
	write();
}
function protactinium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3, 4, 5";
	color="Silver";
	cstructure="CenteredTetragonal"
	radioactive=1;
	atomicnumber=91;
	atomicmass=	231.03588;
	atomicname="Protactinium";
	atomicsymbol="Pa";
	ec="2-8-18-32-20-9-2";
	write();
}
function uranium()
{
	magneticOrdering="N/A";
	oxidationStates="2, 3, 4, 5, 6";
	color="Silver";
	cstructure="BaseCenteredOrthorhombic"
	radioactive=1;
	atomicnumber=92;
	atomicmass=238.02891;
	atomicname="Uranium";
	atomicsymbol="U";
	ec="2-8-18-32-21-9-2";
	write();
}
function neptunium()
{
	magneticOrdering="N/A";
	oxidationStates="3, 4, 5, 6, 7";
	color="Silver";
	cstructure="SimpleOrthorombic"
	radioactive=1;
	atomicnumber=93;
	atomicmass=237;
	atomicname="Neptunium";
	atomicsymbol="Np";
	ec="2-8-18-32-22-9-2";
	write();
}
function plutonium()
{
	magneticOrdering="N/A";
	oxidationStates="3, 4, 5, 6, 7, 8";
	color="Silver";
	cstructure="SimpleMonoclinic"
	radioactive=1;
	atomicnumber=94;
	atomicmass=244;
	atomicname="Plutonium";
	atomicsymbol="Pu";
	ec="2-8-18-32-24-8-2";
	write();
}
function americium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3, 4, 5, 6, 7";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=1;
	atomicnumber=95;
	atomicmass=243;
	atomicname="Americium";
	atomicsymbol="Am";
	ec="2-8-18-32-25-8-2";
	write();
}
function curium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3, 4, 6, 8";
	color="Silver";
	cstructure="SimpleHexagonal";
	radioactive=1;
	atomicnumber=96;
	atomicmass=247;
	atomicname="Curium";
	atomicsymbol="Cm";
	ec="2-8-18-32-25-9-2";
	write();
}
function berkelium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3, 4";
	color="N/A";
	cstructure="SimpleHexagonal";
	radioactive=1;
	atomicnumber=97;
	atomicmass=247;
	atomicname="Berkelium";
	atomicsymbol="Bk";
	ec="2-8-18-32-27-8-2";
	write();
}
function californium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3, 4";
	color="N/A";
	cstructure="SimpleHexagonal";
	radioactive=1;
	atomicnumber=98;
	atomicmass=251;
	atomicname="Californium";
	atomicsymbol="Cf";
	ec="2-8-18-32-28-8-2";
	write();
}
function einsteinium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3, 4";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=99;
	atomicmass=252;
	atomicname="Einsteinium";
	atomicsymbol="Es";
	ec="2-8-18-32-29-8-2";
	write();
}
function fermium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=100;
	atomicmass=257;
	atomicname="Fermium";
	atomicsymbol="Fm";
	ec="2-8-18-32-30-8-2";
	write();
}
function mendelevium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=101;
	atomicmass=258;
	atomicname="Mendelevium";
	atomicsymbol="Md";
	ec="2-8-18-32-31-8-2";
	write();
}
function nobelium()
{
	magneticOrdering="N/A";
	oxidationStates="2 ,3";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=102;
	atomicmass=259;
	atomicname="Nobelium";
	atomicsymbol="No";
	ec="2-8-18-32-32-8-2";
	write();
}
function lawrencium()
{
	magneticOrdering="N/A";
	oxidationStates="+3";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=103;
	atomicmass=262;
	atomicname="Lawrencium";
	atomicsymbol="Lr";
	ec="2-8-18-32-32-8-3";
	write();
}
function rutherfordium()
{
	magneticOrdering="N/A";
	oxidationStates="+4";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=104;
	atomicmass=267;
	atomicname="Rutherfordium";
	atomicsymbol="Rf";
	ec="2-8-18-32-32-10-2";
	write();
}
function dubnium()
{
	magneticOrdering="N/A";
	oxidationStates="+5";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=105;
	atomicmass=268;
	atomicname="Dubnium";
	atomicsymbol="Db";
	ec="2-8-18-32-32-11-2";
	write();
}
function seaborgium()
{
	magneticOrdering="N/A";
	oxidationStates="+6";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=106;
	atomicmass=271;
	atomicname="Seaborgium";
	atomicsymbol="Sg";
	ec="2-8-18-32-32-12-2";
	write();
}
function bohrium()
{
	magneticOrdering="N/A";
	oxidationStates="+7";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=107;
	atomicmass=272;
	atomicname="Bohrium";
	atomicsymbol="Bh";
	ec="2-8-18-32-32-13-2";
	write();
}
function hassium()
{
	magneticOrdering="N/A";
	oxidationStates="+8";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=108;
	atomicmass=270;
	atomicname="Hassium";
	atomicsymbol="Hs";
	ec="2-8-18-32-32-14-2";
	write();
}
function meitnerium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=109;
	atomicmass=276;
	atomicname="Meitnerium";
	atomicsymbol="Mt";
	ec="2-8-18-32-32-15-2";
	write();
}
function darmstadtium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=110;
	atomicmass=281;
	atomicname="Darmstadtium";
	atomicsymbol="Ds";
	ec="2-8-18-32-32-17-1";
	write();
}
function roentgenium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=111;
	atomicmass=280;
	atomicname="Roentgenium";
	atomicsymbol="Rg";
	ec="2-8-18-32-32-18-1";
	write();
}
function copernicium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=112;
	atomicmass=285;
	atomicname="Copernicium";
	atomicsymbol="Cn";
	ec="2-8-18-32-32-18-2";
	write();
}
function ununtrium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=113;
	atomicmass=284;
	atomicname="Nihonium";
	atomicsymbol="Nh";
	ec="2-8-18-32-32-18-3";
	write();
}
function flerovium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=114;
	atomicmass=289;
	atomicname="Flerovium";
	atomicsymbol="Fl";
	ec="2-8-18-32-32-18-4";
	write();
}
function ununpentium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=115;
	atomicmass=288;
	atomicname="Moscovium";
	atomicsymbol="Mc";
	ec="2-8-18-32-32-18-5";
	write();
}
function livermorium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=116;
	atomicmass=293;
	atomicname="Livermorium";
	atomicsymbol="Lv";
	ec="2-8-18-32-32-18-6";
	write();
}
function ununseptium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=117;
	atomicmass=294;
	atomicname="Tennessine";
	atomicsymbol="Ts";
	ec="2-8-18-32-32-18-7";
	write();
}
function ununoctium()
{
	magneticOrdering="N/A";
	oxidationStates="N/A";
	color="N/A";
	cstructure="Unknown"
	radioactive=1;
	atomicnumber=118;
	atomicmass=294;
	atomicname="Oganesson";
	atomicsymbol="Og";
	ec="2-8-18-32-32-18-8";
	write();
}
function clearWrite()
{
	magneticOrdering="";
	oxidationStates="";
	color="";
	cstructure=""
	radioactive=null;
	atomicnumber=null;
	atomicmass=null;
	atomicname="";
	atomicsymbol="";
	ec="";
	write();	
}
// By: Sourav Raveendran