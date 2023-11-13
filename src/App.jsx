/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import { Main } from "./styles";
import { SideMenu } from "./components/SideMenu";
import { ToneMapping } from "./components/ToneMapping";
import Mqtt from "./Mqtt";

function App() {
  const rootBone = useRef();
  const cameraRef = useRef();
  const orbitRef = useRef();

  useEffect(() => {
    //Camera Setup
    cameraRef.current = new THREE.PerspectiveCamera();
    cameraRef.current.position.x = -13.4;
    cameraRef.current.position.y = 3.82;
    cameraRef.current.position.z = 31;
    cameraRef.current.fov = 8;
  }, []);

  return (
    <>
      <Mqtt rootBone={rootBone}></Mqtt>
      <Main>
        <SideMenu orbitRef={orbitRef} rootBone={rootBone}></SideMenu>
        <div style={{ height: "100vh", flex: 1, width: "100%" }}>
          <Canvas
            flat
            linear
            camera={cameraRef.current}
            style={{
              backgroundColor: "#ffaa44",
            }}
          >
            <ToneMapping exposure={2.2} />
            <OrbitControls ref={orbitRef} target={[0, 0, -2.5]} />
            <Experience ref={rootBone} />
          </Canvas>
        </div>
      </Main>
    </>
  );
}

export default App;
