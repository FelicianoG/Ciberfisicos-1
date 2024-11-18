/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable import/default */
// eslint-disable-next-line import/namespace
import mqtt from "mqtt";
import { animateNumericVariableTemp } from "./handlerFunctions";
import { MqttClientStyles } from "./styles";
import { useRef, useState } from "react";
import { TextInput } from "./components/TextInput";
import { Slider } from "./components/Slider";
import LogoutButton from './components/LogoutButton';


// eslint-disable-next-line react/prop-types
const Mqtt = ({ rootBone, speed }) => {
  const [httpRoute, setHttpRoute] = useState("");
  const [topic, setTopic] = useState("planta");
  const [hidden, setHidden] = useState(true);
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(() => {});
  const [showIp, setShowIp] = useState(true);
  const position = useRef(0);
  const animationFrame = useRef();

  const letsMqtt = (
    rootBone,
    httpRoute,
    topic,
    position,
    animationFrame,
    onConnect = () => {},
    onDisconnect = () => {},
    setClient = () => {}
  ) => {
    var options = {
      protocol: "mqtt",
      clientId: "b0908853",
    };
    var client = mqtt.connect(`${httpRoute}`, options);

    client.subscribe(topic); //topic
    client.on("message", (topic, message) => {
      const value = JSON.parse(message.toString()).value;
      // eslint-disable-next-line no-undef
      console.log(JSON.parse(message.toString()));
      // handlePlantAnimation(value, rootBone);
      animateNumericVariableTemp(
        position.current,
        value,
        position,
        rootBone,
        animationFrame,
        speed
      );
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

  return (
    <MqttClientStyles>
      {!hidden ? (
        <section className="modal">
          <h1>Settings</h1>
          <LogoutButton />
          {!connected ? (
            <>
              <TextInput
                defaultValue=""
                label={"IP address"}
                onChange={setHttpRoute}
              ></TextInput>
              <TextInput
                defaultValue="planta"
                label={"Topic"}
                onChange={setTopic}
              ></TextInput>
              <TextInput
                // eslint-disable-next-line react/prop-types
                defaultValue={speed.current}
                label={"Velocidad"}
                onChange={(e) => {
                  // eslint-disable-next-line react/prop-types
                  speed.current = +e;
                }}
              ></TextInput>

              <button
                className="send-btn"
                onClick={() => {
                  letsMqtt(
                    rootBone,
                    httpRoute,
                    topic,
                    position,
                    animationFrame,
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
              <TextInput
                // eslint-disable-next-line react/prop-types
                defaultValue={speed.current}
                label={"Velocidad"}
                onChange={(e) => {
                  // eslint-disable-next-line react/prop-types
                  speed.current = +e;
                }}
              ></TextInput>
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
            Menu
          </button>
          
          
        </>
      )}
    </MqttClientStyles>
  );
};

export default Mqtt;
