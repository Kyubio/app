var CurrentSessionID;
var SessionID = localStorage.getItem("CurrentSessionID");
if (SessionID == null) {
    localStorage.setItem("CurrentSessionID", 1);
}

var d = new Date();
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
var month = months[d.getMonth()];
var logDate = d.getDate() + " " + month;

var Progress;

var setTime;

var frequency = 5;

var lastSessionLog;

function CreateButton() {
    var curSession = localStorage.getItem("CurrentSessionID");
    setTime = localStorage.getItem("time" + curSession);
    Progress = localStorage.getItem("progress" + curSession);

    lastSessionLog =
        "<a class='buttonSelector' id='" +
        SessionID +
        "' href='sessionTimer.html'><button class='SessionLog'> <div class='session_dt'> <div class='Session_date'>" +
        logDate +
        "</div> <div class='Session_time'>" +
        setTime +
        "</div></div>  <div class='Session_progress'><div id='progress-bar"+SessionID+"'></div></div><div> <i class='far fa-chevron-right chevron_sessionButton'></i></div> </button></a>";
    localStorage.setItem("button" + curSession, lastSessionLog);
}

//check welke tijd er wordt ingesteld en zet deze in de var setTime
$("#timerCnfrm").click(function () {
    Progress = "0";
    setTime = $("#timeSelect").val();

    var splittedTime = setTime.split(":");
    var hoursSec = splittedTime[0] * 3600000;
    var minSec = splittedTime[1] * 60000;
    var timeMili = hoursSec + minSec;

    var hours = Math.floor((timeMili % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeMili % (1000 * 60 * 60)) / (1000 * 60));

    if(minutes >= 0 && minutes <= 9)
        {
            time = hours + ":0" +minutes;
        }
        else
        {
            time = hours + ":" + minutes;
        }

    localStorage.setItem("time" + SessionID, time); //localStorage
    localStorage.setItem("remaining-time" + SessionID, time); //localStorage
    localStorage.setItem("progress" + SessionID, Progress); //localStorage
});

//lets start knop op de session settings pagina listener
$("#settingsCnfrm").click(function () {
    CreateButton();
    var NubSession = parseFloat(SessionID);
    NubSession = NubSession + 1;
    localStorage.setItem("CurrentSessionID", NubSession);

    //zet hier de code om de timer in mqtt te starten
    mqtt.subscribe("trilMotor");
    msgTrilMotor = new Paho.MQTT.Message("1");
    msgTrilMotor.destinationName = "trilMotor";
    mqtt.send(msgTrilMotor);
    console.log(msgTrilMotor);
});

//frequency slider js
const allRanges = document.querySelectorAll(".freqContainer");
allRanges.forEach((wrap) => {
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
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;

    localStorage.setItem("frequency" + SessionID, val); //localStorage
}
