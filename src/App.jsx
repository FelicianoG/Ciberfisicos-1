/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Experience } from "./Experience";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";

function ToneMapping() {
  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.5;
    scene.traverse((object) => {
      if (object.material) {
        object.material.needsUpdate = true;
      }
    });
  }, [gl, scene]);
  return <></>;
}

function App() {
  const currentFrame = useRef();
  const camera = new THREE.PerspectiveCamera();
  camera.position.x = -13.4;
  camera.position.y = 3.82;
  camera.position.z = 31;
  camera.fov = 8;

  return (
    <>
      <main style={{ display: "flex", width: "100%" }}>
        <div style={{ zIndex: 1 }}>
          <h1>CyberPhysical</h1>
          <input
            max={1}
            min={0}
            step={0.01}
            onChange={(e) => {
              currentFrame.current.children[1].position.z =
                -4.65 - 4.85 * e.target.value;
              (currentFrame.current.children[1].children[0].position.z =
                -4.8 * e.target.value)(
                (currentFrame.current.children[0].rotation.x =
                  -120 * e.target.value)
              );
              // eslint-disable-next-line no-undef
              console.log(currentFrame.current);
            }}
            type="range"
          ></input>
        </div>
        <div style={{ height: "100vh", flex: 1, width: "100%" }}>
          <Canvas
            flat
            linear
            camera={camera}
            style={{
              backgroundColor: "#ffaa44",
            }}
          >
            <ToneMapping />
            <Experience ref={currentFrame} currentFrame={currentFrame} />
          </Canvas>
        </div>
      </main>
    </>
  );
}

export default App;
