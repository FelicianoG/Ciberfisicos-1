import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";
import { Main } from "./styles";
import { SideMenu } from "./components/SideMenu";
import { ToneMapping } from "./components/ToneMapping";
import Mqtt from "./Mqtt";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";


const MainContent = () => {
  const rootBone = useRef();
  const cameraRef = useRef();
  const orbitRef = useRef();
  const speed = useRef(0.001);

  useEffect(() => {
    cameraRef.current = new THREE.PerspectiveCamera();
    cameraRef.current.position.x = -13.4;
    cameraRef.current.position.y = 3.82;
    cameraRef.current.position.z = 31;
    cameraRef.current.fov = 8;
  }, []);

  return (
    <>
      <Mqtt rootBone={rootBone} speed={speed} />

      <Main>
      
        <SideMenu orbitRef={orbitRef} rootBone={rootBone} />
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
            <OrbitControls ref={orbitRef} target={[1, 0, -8]} />
            <Experience ref={rootBone} />
          </Canvas>
        </div>
      </Main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute component={MainContent} />} />
      </Routes>
    </Router>
  );
}

export default App;
