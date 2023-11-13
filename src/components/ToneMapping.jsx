/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import "../App.css";

// eslint-disable-next-line react/prop-types
export const ToneMapping = ({ exposure }) => {
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
};
