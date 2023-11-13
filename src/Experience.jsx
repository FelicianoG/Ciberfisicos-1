/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { forwardRef, useRef } from "react";
import { useGLTF, Environment } from "@react-three/drei";

export const Model = forwardRef((props, ref) => {
  const { nodes } = useGLTF("/planta2.gltf");
  // const { actions, mixer } = useAnimations(animations, group);

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

      {/* <axesHelper args={[5]} /> */}
      <Environment preset="forest" />
    </>
  );
});
