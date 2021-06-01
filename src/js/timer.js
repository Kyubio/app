var thisSession = localStorage.getItem("pressedButton");
thisSession = parseFloat(thisSession);

var timeRunning;

var timeRun;

var progression = localStorage.getItem("progress"+ thisSession);

var settime = localStorage.getItem("time" + thisSession);
var settime_split = settime.split(":");
var settime_sec = settime_split[0] * 3600000;
var settime_mili = settime_split[1] * 60000;

if(settime_mili == 0)
{}

if(progression >= 100)
{}
else
{
    CounterStart();
}

function CounterStart() {
    var origionalTime = localStorage.getItem("time" + thisSession);
    var orisplittedTime = origionalTime.split(":");
    var orihoursSec = orisplittedTime[0] * 3600000;
    var oriminSec = orisplittedTime[1] * 60000;
    var oritimeMili = orihoursSec + oriminSec;

    var curTime = localStorage.getItem("remaining-time" + thisSession);
    var splittedTime = curTime.split(":");
    var hoursSec = splittedTime[0] * 3600000;
    var minSec = splittedTime[1] * 60000;
    var timeMili = hoursSec + minSec;
    var timeleft = timeMili;
    var timefreq = 60000;

    timeRun = setInterval(function () {
        //calculate progress
        var remainingTime = oritimeMili - timeleft;
        remainingTime = remainingTime / oritimeMili;
        remainingTime = remainingTime * 100;
        localStorage.setItem("progress" + thisSession, remainingTime);

        timeleft = timeleft - timefreq;

        var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

        if(minutes >= 0 && minutes <= 9)
        {
            timeRunning = hours + ":0" +minutes;
        }
        else
        {
            timeRunning = hours + ":" + minutes;
        }
        
        let charts = document.getElementsByClassName("mkCharts");
        localStorage.setItem("remaining-time" + thisSession, timeRunning);

        if (timeleft == 0) {
            clearInterval(timeRun);
            //calculate progress
            var remainingTime = timeMili - timeleft;
            remainingTime = remainingTime / timeMili;
            remainingTime = remainingTime * 100;
            localStorage.setItem("progress" + thisSession, remainingTime);

            console.log("done");
            toggleFrequencyShow();

            //zet hier de code om de timer in mqtt te starten
            mqtt.subscribe("trilMotor");
            msgTrilMotor = new Paho.MQTT.Message("0");
            msgTrilMotor.destinationName = "trilMotor";
            mqtt.send(msgTrilMotor);
            console.log(msgTrilMotor);
        }

        for (let i = 0; i < charts.length; i++) {
            let chart = charts[i];
            let percent = localStorage.getItem("progress" + thisSession);
            let time = timeRunning;
            let color =
                "color" in chart.dataset ? chart.dataset.color : "#4EC7EB";
            let size = "size" in chart.dataset ? chart.dataset.size : "100";
            let stroke = "stroke" in chart.dataset ? chart.dataset.stroke : "1";
            charts[i].innerHTML = createCircleChart(
                percent,
                color,
                size,
                stroke,
                time
            );
        }
    }, 1000);
};

$("#start-counter").click(function () {
    CounterStart();
    $('#start-counter').css("display", "none");
    $('#pause-counter').css("display", "block");    

    //zet hier de code om de timer in mqtt te starten
    mqtt.subscribe("trilMotor");
    msgTrilMotor = new Paho.MQTT.Message("1");
    msgTrilMotor.destinationName = "trilMotor";
    mqtt.send(msgTrilMotor);
    console.log(msgTrilMotor);
});

$("#pause-counter").click(function () {
    clearInterval(timeRun);
    
    if(progression >= 100)
    {}
    else
    {
        $('#pause-counter').css("display", "none");
        $('#start-counter').css("display", "block");
    }
    //zet hier de code om de timer in mqtt te starten
    mqtt.subscribe("trilMotor");
    msgTrilMotor = new Paho.MQTT.Message("0");
    msgTrilMotor.destinationName = "trilMotor";
    mqtt.send(msgTrilMotor);
    console.log(msgTrilMotor);
});

$("#stop-counter").click(function () {
    clearInterval(timeRun);

    //zet hier de code om de timer in mqtt te starten
    mqtt.subscribe("trilMotor");
    msgTrilMotor = new Paho.MQTT.Message("0");
    msgTrilMotor.destinationName = "trilMotor";
    mqtt.send(msgTrilMotor);
    console.log(msgTrilMotor);
});

function createCircleChart(percent, color, size, stroke, time) {
    let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <path class="mkc_circle-bg" stroke="#eeeeee" stroke-width="${
            stroke * 1
        }" fill="none" d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"/>
        <path class="mkc_circle" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${percent},100" stroke-linecap="round" fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831" />
        <text class="mkc_info" x="50%" y="50%" alignment-baseline="central" text-anchor="middle" font-size="8">${time}</text>
    </svg>`;
    return svg;
}

let charts = document.getElementsByClassName("mkCharts");

for (let i = 0; i < charts.length; i++) {
    let chart = charts[i];
    let percent = localStorage.getItem("progress" + thisSession);
    let time = localStorage.getItem("remaining-time" + thisSession);
    let color = "color" in chart.dataset ? chart.dataset.color : "#4EC7EB";
    let size = "size" in chart.dataset ? chart.dataset.size : "100";
    let stroke = "stroke" in chart.dataset ? chart.dataset.stroke : "1";
    charts[i].innerHTML = createCircleChart(percent, color, size, stroke, time);
}

$('.chevron-thing').click(function(){
    $('.Start-Stop').css("display", "block");
    $('.chevron-thing').css("display", "none");
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("modal1");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function showChangeNameModule() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

//modal frequency
var info = document.getElementById("finished");

function toggleFrequencyShow() {
    info.style.display = "block";
}

function toggleFrequencyHide() {
    info.style.display = "none";
}

span.onclick = function () {
    info.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == info) {
        info.style.display = "none";
    }
};