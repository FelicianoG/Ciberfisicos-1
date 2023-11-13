/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Experience } from "./Experience";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
// eslint-disable-next-line import/no-named-as-default
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
function ToneMapping({ exposure }) {
  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure;
    scene.traverse((object) => {
      if (object.material) {
        object.material.needsUpdate = true;
      }
    });
  });
  return <></>;
}

function App() {
  const rootBone = useRef();
  const cameraRef = useRef();
  const orbitRef = useRef();

  useEffect(() => {
    cameraRef.current = new THREE.PerspectiveCamera();
    cameraRef.current.position.x = -13.4;
    cameraRef.current.position.y = 3.82;
    cameraRef.current.position.z = 31;
    cameraRef.current.fov = 8;
  }, []);

  const handlePlantAnimation = (e) => {
    rootBone.current.children[1].position.z = -4.65 - 4.85 * e.target.value;
    rootBone.current.children[1].children[0].position.z = -4.8 * e.target.value;
    rootBone.current.children[0].rotation.x = -120 * e.target.value;

    // eslint-disable-next-line no-undef
    console.log(rootBone.current);
  };

  const handleCamera = (e) => {
    // eslint-disable-next-line no-undef
    console.log(orbitRef.current.object.position);
  };

  return (
    <>
      <Main>
        <div className="ui">
          <h1>CyberPhysical</h1>
          <section className="input-container">
            <input
              max={1}
              min={0}
              step={0.01}
              onChange={(e) => {
                handlePlantAnimation(e);
              }}
              type="range"
            ></input>
            <input onChange={(e) => handleCamera(e)} type="range"></input>
          </section>
        </div>
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

const Main = styled.main`
  display: flex;
  width: 100%;
  font-size: 0.6vw;
  .ui {
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
`;

export default App;
