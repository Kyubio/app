// mqtt verbinding
var mqtt;
var reconnectTimeout = 500;
var host = "test.mosquitto.org";
var port = 8081;

function onFailure(message) {
    console.log("Connection Attempt to Host" + host + "failed");
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(msg) {
    out_msg = "Message received" + msg.payloadString + "<br>";
    out_msg = out_msg + "Message received Topic" + msg.destinationName;
    console.log(out_msg);
}

//callback function
function onConnect() {
    console.log("Connected");
    mqtt.subscribe("trilMotor");
    message = new Paho.MQTT.Message("het werkt :D"); //onconnnect send message
    message.destinationName = "trilMotor";
    mqtt.send(message);
}

function MQTTconnect() {
    console.log("connecting to" + host + "" + port);
    mqtt = new Paho.MQTT.Client(host, port, "clientjs2264");
    var options = {
        useSSL: true,
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.connect(options);
}
