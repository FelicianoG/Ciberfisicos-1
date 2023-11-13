/* eslint-disable no-unused-vars */
/* eslint-disable import/default */
// eslint-disable-next-line import/namespace
import mqtt from "mqtt";
import { handlePlantAnimationValue } from "./handlerFunctions";

var options = {
  protocol: "mqtt",
  // clientId uniquely identifies client
  // choose any string you wish
  clientId: "b0908853",
};
var client = mqtt.connect("ws://34.228.60.166:8883", options);
// var client = mqtt.connect("ws://192.168.62.210:8883", options);

// preciouschicken.com is the MQTT topic
client.subscribe("planta");

// eslint-disable-next-line react/prop-types
const Mqtt = ({ rootBone }) => {
  client.on("message", (topic, message) => {
    const value = JSON.parse(message.toString()).value;
    // eslint-disable-next-line no-undef
    console.log(JSON.parse(message.toString()));
    handlePlantAnimationValue(value, rootBone);
  });

  return <div>Mqtt</div>;
};

export default Mqtt;
