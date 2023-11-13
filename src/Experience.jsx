/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { forwardRef, useRef } from "react";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const Model = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, scene, materials, animations } = useGLTF("/planta2.gltf");
  const { actions, mixer } = useAnimations(animations, group);
  // eslint-disable-next-line no-undef
  // actions.ArmatureAction
  useFrame((state, delta) => {
    // eslint-disable-next-line no-undef
    // console.log(actions.ArmatureAction.play());
    mixer.setTime(4.16);
  });
  // eslint-disable-next-line react/prop-types

  return (
    <group
      // eslint-disable-next-line react/prop-types
      position={[0, 0, 0]}
      // ref={ref}
      {...props}
      dispose={null}
    >
      <group name="Main">
        <primitive ref={ref} object={nodes.root} />
      </group>
    </group>
  );
});
useGLTF.preload("/planta2.gltf");

// eslint-disable-next-line react/prop-types
export const Experience = forwardRef((props, ref) => {
  return (
    <>
      <Model ref={ref}></Model>

      <OrbitControls target={[0, 0, 0]} />

      {/* <axesHelper args={[5]} /> */}
      <Environment preset="forest" />
    </>
  );
});
