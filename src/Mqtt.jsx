/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable import/default */
// eslint-disable-next-line import/namespace
import mqtt from "mqtt";
import { handlePlantAnimationValue } from "./handlerFunctions";
import { MqttClientStyles } from "./styles";
import { useState } from "react";
import { TextInput } from "./components/TextInput";

const letsMqtt = (
  rootBone,
  httpRoute,
  topic,
  onConnect = () => {},
  onDisconnect = () => {},
  setClient = () => {}
) => {
  var options = {
    protocol: "mqtt",
    clientId: "b0908853",
  };
  var client = mqtt.connect(`ws://${httpRoute}:8883`, options);

  client.subscribe(topic); //topic
  client.on("message", (topic, message) => {
    const value = JSON.parse(message.toString()).value;
    // eslint-disable-next-line no-undef
    console.log(JSON.parse(message.toString()));
    handlePlantAnimationValue(value, rootBone);
  });
  // client.on("disconnect", () => {
  //   // eslint-disable-next-line no-undef
  //   console.log("disconnected");
  // });
  client.on("connect", onConnect);
  // eslint-disable-next-line no-undef
  client.on("end", () => onConnect(false));
  setClient(client);
};

// eslint-disable-next-line react/prop-types
const Mqtt = ({ rootBone }) => {
  const [httpRoute, setHttpRoute] = useState("192.168.62.210");
  const [topic, setTopic] = useState("planta");
  const [hidden, setHidden] = useState(true);
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(() => {});

  return (
    <MqttClientStyles>
      {!hidden ? (
        <section className="modal">
          <h1>MQTT</h1>
          {!connected ? (
            <>
              <TextInput
                defaultValue="192.168.62.210"
                label={"IP address"}
                onChange={setHttpRoute}
              ></TextInput>
              <TextInput
                defaultValue="planta"
                label={"Topic"}
                onChange={setTopic}
              ></TextInput>
              <button
                className="send-btn"
                onClick={() => {
                  letsMqtt(
                    rootBone,
                    httpRoute,
                    topic,
                    setConnected,
                    // eslint-disable-next-line no-undef
                    console.log("disconnected"),
                    setClient
                  );
                }}
              >
                Connect
              </button>
            </>
          ) : (
            <>
              <h2>Connected</h2>
              <button
                className="send-btn"
                onClick={() => {
                  client.end();
                }}
              >
                Disconnect
              </button>
            </>
          )}
          <button className="cross" onClick={() => setHidden((prev) => !prev)}>
            X
          </button>
        </section>
      ) : (
        <>
          <button className="cross" onClick={() => setHidden((prev) => !prev)}>
            MQTT
          </button>
        </>
      )}
    </MqttClientStyles>
  );
};

export default Mqtt;
