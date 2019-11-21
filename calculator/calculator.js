//CALCULATOR
var a, b, operator, c, point, i, pc = 0,
	npoint = 0,
	na = 0,
	ks = 0;
/* a : Number being entered
	a : Second number during calculation.
	b : First number during calculation.
	c : To display first number on pressing operator.
	point : value(0) = no decimal ; value(1) = decimal;
	npoint : Number of decimal places
	na :  number of digits including "."
	ks : (Key Stroke) To see if the user has entered any number after 
		an operator has been clicked. 
*/
a = 0;
b = 0;
c = 0;
//_______________________________NUMBERS___________________________________
function zero() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "0"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function one() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "1"
		document.getElementById("enter").value = a
	} else {
		a = Number(a) * 10 + 1;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function two() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "2"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 2;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function three() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "3"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 3;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function four() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "4"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 4;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function five() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "5"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 5;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function six() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "6"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 6;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function seven() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "7"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 7;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function eight() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "8"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 8;
		c = a;
		document.getElementById("enter").value = c;
	}
}

function nine() {
	ks = 1;
	if (point == 1) {
		a = document.getElementById("enter").value;
		a = a + "9"
		document.getElementById("enter").value = a;
	} else {
		a = Number(a) * 10 + 9;
		c = a;
		document.getElementById("enter").value = c;
	}
}
//KEYBOARD//
document.onkeydown = function (event) {
	var key_press = String.fromCharCode(event.keyCode);
	var key_code = event.keyCode;
	if (key_code == "187") {
		equals();
	} else if (key_code == "191") {
		divide();
	} else if (key_code == "190") {
		decimal();
	} else if (key_code == "8") {
		_clear();
	} else if (key_press == "0") {
		zero();
	} else if (key_press == "1") {
		one();
	} else if (key_press == "2") {
		two();
	} else if (key_press == "3") {
		three();
	} else if (key_press == "4") {
		four();
	} else if (key_press == "5") {
		five();
	} else if (key_press == "6") {
		six();
	} else if (key_press == "7") {
		seven();
	} else if (key_press == "8") {
		eight();
	} else if (key_press == "9") {
		nine();
	}
}
//_________//
//_________________________________________________________________________

//_____________________________OPERATORS___________________________________
function root() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	operator = 8;
	document.getElementById("symbolknow").innerHTML = a + "&radic;";
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function exponent() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = a + "<sup>n</sup>";
	operator = 7;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function remainder() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = "REM";
	operator = 6;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function percent() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = "%";
	operator = 5;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function add() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = "+";
	operator = 1;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function subtract() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = "-";
	operator = 2;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function multiply() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = "X";
	operator = 3;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function divide() {
	if (ks == 1) {
		equals();
	}
	if (operator != 0) {
		a = b;
		b = 0;
	}
	document.getElementById("symbolknow").innerHTML = "&divide;";
	operator = 4;
	if (b === 0) {
		b = Number(a);
	}
	a = 0;
	point = 0;
	ks = 0;
}

function equals() {
	a = Number(a);
	point = 0;
	document.getElementById("symbolknow").innerHTML = "=";
	if (operator === 1) {
		a = a + b;
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 2) {
		a = b - a;
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 3) {
		a = a * b;
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 4) {
		a = b / a;
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 5) {
		a = (b / 100) * a;
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 6) {
		a = b % a;
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 7) {
		a = Math.pow(b, a);
		document.getElementById("enter").value = a;
		b = 0;
	} else if (operator === 8) {
		a = Math.pow(a, 1 / b);
		document.getElementById("enter").value = a;
		b = 0;
	}
	operator = 0;
	ks = 0;
	a = String(a);
	npoint = na - (a.indexOf("."));
	if (npoint < 0) {
		point = 1;
	}
}
//_________________________________________________________________________
function _ac() {
	ks = 0;
	a = 0;
	b = 0;
	point = 0;
	operator = 0;
	c = 0;
	npoint = 0;
	na = 0;
	document.getElementById("enter").value = a;
	document.getElementById("symbolknow").innerHTML = "";
}

function symbolremove() {
	if (operator > 0) {
		operator = 0;
		document.getElementById("symbolknow").innerHTML = "";
		a = b;
		b = 0;
		ks = 1;
	}
}

function _clear() {
	if (point == 1) {
		a = String(a);
		na = a.length;
		npoint = na - (a.indexOf("."));
		a = a.slice(0, (na - 1));
		document.getElementById("enter").value = a;
		if (npoint == 1) {
			point = 0;
		}
	} else {
		a = Number(a);
		a = ((a - (a % 10)) / 10);
		document.getElementById("enter").value = a;
	}
}

function decimal() {
	if (point != 1) {
		point = 1;
		a = a + ".";
		document.getElementById("enter").value = a;
		a = String(a);
	}
}

function prime() {
	if (ks == 1) {
		equals();
	}
	a = Number(a);
	for (i = 1; i <= a / 2; i++) {
		if (a % i == 0) {
			pc = pc + 1;
		}
		if (pc == 2) {
			break;
		}
	}
	if (pc == 1) {
		confirm(a + " is a Prime Number");
	} else if (pc > 1) {
		confirm(a + " is a Composite Number");
	} else if (a == 1) {
		confirm("1 is Neither Prime Nor Composite");
	}
	pc = 0;
}

var property = new Array();
var unit = new Array();
var factor = new Array();


property[0] = "Length";
unit[0] = new Array("Meter (m)", "Angstrom (A')", "Astronomical unit (AU)", "Caliber (cal)", "Centimeter (cm)", "Kilometer (km)", "Ell", "Em", "Fathom", "Furlong", "Fermi (fm)", "Foot (ft)", "Inch (in)", "League (int'l)", "League (UK)", "Light year (LY)", "Micrometer (mu-m)", "Mil", "Millimeter (mm)", "Nanometer (nm)", "Mile (int'l nautical)", "Mile (UK nautical)", "Mile (US nautical)", "Mile (US statute)", "Parsec", "Pica (printer)", "Picometer (pm)", "Point (pt)", "Rod", "Yard (yd)");
factor[0] = new Array(1, 1E-10, 1.49598E11, .000254, .01, 1000, 1.143, 4.2323E-03, 1.8288, 201.168, 1E-15, .3048, .0254, 5556, 5556, 9.46055E+15, .000001, .0000254, .001, 1E-9, 1852, 1853.184, 1852, 1609.344, 3.08374E+16, 4.217518E-03, 1E-12, .0003514598, 5.0292, .9144);

property[1] = "Area";
unit[1] = new Array("Square meter (m^2)", "Acre (acre)", "Are", "Barn (barn)", "Hectare", "Rood", "Square centimeter", "Square kilometer", "Circular mil", "Square foot (ft^2)", "Square inch (in^2)", "Square mile (mi^2)", "Square yard (yd^2)");
factor[1] = new Array(1, 4046.856, 100, 1E-28, 10000, 1011.71413184285, .0001, 1000000, 5.067075E-10, 9.290304E-02, 6.4516E-04, 2589988, .8361274);

property[2] = "Temperature";
unit[2] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)");
factor[2] = new Array(1, 0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

property[3] = "Mass";
unit[3] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)", "Carat (metric)(ct)", "Hundredweight (long)", "Hundredweight (short)", "Pound mass (lbm)", "Pound mass (troy)", "Ounce mass (ozm)", "Ounce mass (troy)", "Slug", "Ton (assay)", "Ton (long)", "Ton (short)", "Ton (metric)", "Tonne");
factor[3] = new Array(1, .001, 1e-6, .000000001, .0002, 50.80235, 45.35924, .4535924, .3732417, .02834952, .03110348, 14.5939, .02916667, 1016.047, 907.1847, 1000, 1000);

property[4] = "Pressure & Stress";
unit[4] = new Array("Newton/sq.meter", "Atmosphere (normal)", "Atmosphere (techinical)", "Bar", "Centimeter mercury(cmHg)", "Centimeter water (4'C)", "Decibar", "Kgr force/sq.centimeter", "Kgr force/sq.meter", "Kip/square inch", "Millibar", "Millimeter mercury(mmHg)", "Pascal (Pa)", "Kilopascal (kPa)", "Megapascal (Mpa)", "Poundal/sq.foot", "Pound-force/sq.foot", "Pound-force/sq.inch (psi)", "Torr (mmHg,0'C)");
factor[4] = new Array(1, 101325, 98066.5, 100000, 1333.22, 98.0638, 10000, 98066.5, 9.80665, 6894757, 100, 133.3224, 1, 1000, 1000000, 47.88026, 47.88026, 6894.757, 133.322);

property[5] = "Velocity & Speed";
unit[5] = new Array("Meter/second (m/sec)", "Foot/minute (ft/min)", "Foot/second (ft/sec)", "Kilometer/hour (kph)", "Knot (int'l)", "Mile (US)/hour (mph)", "Mile (nautical)/hour", "Mile (US)/minute", "Mile (US)/second", "Speed of light (c)", "Mach (STP)(a)");
factor[5] = new Array(1, 5.08E-03, .3048, .2777778, .5144444, .44707, .514444, 26.8224, 1609.344, 299792458, 340.0068750);

property[6] = "Volume";
unit[6] = new Array("Cubic Meter (m^3)", "Cubic centimeter", "Cubic millimeter", "Acre-foot", "Barrel (oil)", "Board foot", "Bushel (US)", "Cup", "Fluid ounce (US)", "Cubic foot", "Gallon (UK)", "Gallon (US,dry)", "Gallon (US,liq)", "Gill (UK)", "Gill (US)", "Cubic inch (in^3)", "Liter (new)", "Liter (old)", "Ounce (UK,fluid)", "Ounce (US,fluid)", "Peck (US)", "Pint (US,dry)", "Pint (US,liq)", "Quart (US,dry)", "Quart (US,liq)", "Stere", "Tablespoon", "Teaspoon", "Ton (register)", "Cubic yard");
factor[6] = new Array(1, .000001, .000000001, 1233.482, .1589873, .002359737, .03523907, .0002365882, .00002957353, .02831685, .004546087, .004404884, .003785412, .0001420652, .0001182941, .00001638706, .001, .001000028, .00002841305, .00002957353, 8.8097680E-03, .0005506105, 4.7317650E-04, .001101221, 9.46353E-04, 1, .00001478676, .000004928922, 2.831685, .7645549);

property[7] = "Time";
unit[7] = new Array("Second (sec)", "Day (mean solar)", "Day (sidereal)", "Hour (mean solar)", "Hour (sidereal)", "Minute (mean solar)", "Minute (sidereal)", "Month (mean calendar)", "Second (sidereal)", "Year (calendar)", "Year (tropical)", "Year (sidereal)");
factor[7] = new Array(1, 8.640E4, 86164.09, 3600, 3590.17, 60, 60, 2628000, .9972696, 31536000, 31556930, 31558150);


function UpdateUnitMenu(propMenu, unitMenu) {
	var i;
	i = propMenu.selectedIndex;
	FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
	var i;
	myMenu.length = myArray.length;
	for (i = 0; i < myArray.length; i++) {
		myMenu.options[i].text = myArray[i];
	}
}

function CalculateUnit(sourceForm, targetForm) {
	var sourceValue = sourceForm.unit_input.value;

	sourceValue = parseFloat(sourceValue);
	if (!isNaN(sourceValue) || sourceValue == 0) {
		sourceForm.unit_input.value = sourceValue;
		ConvertFromTo(sourceForm, targetForm);
	}
}

function ConvertFromTo(sourceForm, targetForm) {
	var propIndex;
	var sourceIndex;
	var sourceFactor;
	var targetIndex;
	var targetFactor;
	var result;

	propIndex = document.property_form.the_menu.selectedIndex;

	sourceIndex = sourceForm.unit_menu.selectedIndex;
	sourceFactor = factor[propIndex][sourceIndex];

	targetIndex = targetForm.unit_menu.selectedIndex;
	targetFactor = factor[propIndex][targetIndex];


	result = sourceForm.unit_input.value;
	if (property[propIndex] == "Temperature") {
		result = parseFloat(result) + tempIncrement[sourceIndex];
	}
	result = result * sourceFactor;

	result = result / targetFactor;
	if (property[propIndex] == "Temperature") {
		result = parseFloat(result) - tempIncrement[targetIndex];
	}
	targetForm.unit_input.value = result;
}

window.onload = function (e) {
	FillMenuWithArray(document.property_form.the_menu, property);
	UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
	UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}