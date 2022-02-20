Line = document.getElementById("inputLine");

function textSelect(inp, s, e) {
    e = e || s;
    if (inp.createTextRange) {
        var r = inp.createTextRange();
        r.collapse(true);
        r.moveEnd('character', e);
        r.moveStart('character', s);
        r.select();
    } else if (inp.setSelectionRange) {
        inp.focus();
        inp.setSelectionRange(s, e);
    }
}


const resetLine = () => {

    if (Line.value == "ERROR TRY AGAIN" || Line.value == "Write a calculation")
    Line.value = "";
    else console.log(Line.value);
}
const letterInside = (s) => {
    if (s.includes("Math.sqrt")) return false;
    Str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]";
    for (i = 0; i < s.length; i++) {
        console.log(s.charAt(i));
        if (Str.includes(s.charAt(i))) return true;
          
    }
    return false;
}


var resFlag = false;
document.getElementById("inputLine").value = "Write a calculation";


const numbersPress = (i) => {
    Line = document.getElementById("inputLine");
    if (i == 'C') Line.value = "Write a calculation"; 
    else {
        if (Line.value == "Write a calculation" || resFlag == true)
           {Line.value = i;
            resFlag = false;
           }
        else {
            if (Line.selectionStart != Line.length && Line.selectionStart != 0) {
                Line.value = Line.value.slice(0,Line.selectionStart) + i + Line.value.slice(Line.selectionStart);
            }
            else Line.value += i;
        }
    }
} 

const calc = () => {
    console.log(Line.value);
    Line.value = Line.value.replace("√" , "Math.sqrt");
     
   
    try{
    Line = document.getElementById("inputLine");
    if ( String(Line.value).includes("//") || Number.POSITIVE_INFINITY == eval(Line.value) || letterInside(String(Line.value)) == true) Line.value = "ERROR TRY AGAIN";
    else Line.value = eval(Line.value); 
    resFlag = true;}
    catch(err) {
        console.log(err);
        Line.value = "ERROR TRY AGAIN";
        resFlag = true;
    }
}


document.getElementById("inputLine").addEventListener("keyup", function(event) {
    Line = document.getElementById("inputLine");
    if (event.key === "Enter") {
        if (Line.value == "")  Line.value = "";
    	else{console.log(Line.value); calc();}
		return false;
    }
});



const pressSqrt = () => {
    numbersPress("√()");
    textSelect(Line, String(Line.value).length-1);
    console.log(Line.selectionStart);
}
