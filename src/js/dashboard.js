var CurrentSessionID;
var SessionID = localStorage.getItem("CurrentSessionID");
if(SessionID == null)
{
  localStorage.setItem("CurrentSessionID", 1);
}

var d = new Date;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[d.getMonth()];
var logDate = d.getDate() + " " +  month;

var Progress;

var setTime;

var frequency = 5;

var lastSessionLog;

function CreateButton()
{
  var curSession = localStorage.getItem("CurrentSessionID");
  setTime = localStorage.getItem("time"+curSession);
  Progress = localStorage.getItem("progress"+curSession);

  lastSessionLog = "<a class='buttonSelector' id='" + SessionID + "' href='sessionTimer.html'><button class='SessionLog'> <div> <div id='progression'>" + Progress + "</div> <div> <p>" + logDate + "</p> <p>" + setTime + "</p> </div> <i class='far fa-chevron-right'></i></div> </button></a>";
  localStorage.setItem("button"+curSession, lastSessionLog);
  
}

//check welke tijd er wordt ingesteld en zet deze in de var setTime
$("#timerCnfrm").click(function(){
  Progress = "0";
  setTime = $("#timeSelect").val();
  localStorage.setItem("time"+SessionID, setTime); //localStorage 
  localStorage.setItem("remaining-time"+SessionID, setTime); //localStorage 
  localStorage.setItem("progress"+SessionID, Progress); //localStorage
});

//lets start knop op de session settings pagina listener
$("#settingsCnfrm").click(function(){

    //zet hier de code om de timer in mqtt te starten
    mqtt.subscribe("trilMotor");
    msgTrilMotor = new Paho.MQTT.Message("1");
    msgTrilMotor.destinationName = "trilMotor";
    mqtt.send(msgTrilMotor);
    console.log(msgTrilMotor);

    CreateButton();
    var NubSession = parseFloat(SessionID);
    NubSession = NubSession + 1;
    localStorage.setItem("CurrentSessionID", NubSession);

    
});

//frequency slider js
const allRanges = document.querySelectorAll(".freqContainer");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".freqSlider");
  const bubble = wrap.querySelector(".freqVal");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8- newVal * 0.15}px))`;

  localStorage.setItem("frequency"+SessionID, val); //localStorage
}

