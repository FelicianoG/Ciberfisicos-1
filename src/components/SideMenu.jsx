/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { handlePlantAnimation } from "../handlerFunctions";
import { Slider } from "./Slider";
import { ButtonGrid, ButtonStyles } from "../styles";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const SideMenu = ({ orbitRef, rootBone }) => {
  const [extended, setExtended] = useState(false);
  return (
    <div className={`side-menu${extended ? " extended" : ""}`}>
      <button
        className="main-title"
        onClick={() => {
          setExtended((prev) => !prev);
        }}
      >
        {extended ? "CP Plant" : "CPP"}
      </button>
      <section className="input-container">
        <Slider
          hidden={extended}
          title={"Position Control"}
          max={1}
          min={0}
          step={0.01}
          onChange={(e) => {
            handlePlantAnimation(e, rootBone);
          }}
        />
      </section>
      <ButtonGrid>
        <CamButton orbitRef={orbitRef} title={"A1"} />
        <CamButton orbitRef={orbitRef} title={"A2"} />
        <CamButton orbitRef={orbitRef} title={"A3"} />
        <CamButton orbitRef={orbitRef} title={"A4"} />
        <CamButton orbitRef={orbitRef} title={"A5"} />
        <CamButton orbitRef={orbitRef} title={"A6"} />
      </ButtonGrid>
    </div>
  );
};

//<input onChange={(e) => handleCamera(e, orbitRef)} type="range"></input>

// eslint-disable-next-line react/prop-types
export const CamButton = ({ title, orbitRef }) => {
  const [camState, setCamState] = useState({});
  useEffect(() => {}, [orbitRef]);

  const handleSave = (orbitRef) => {
    // eslint-disable-next-line no-undef, react/prop-types
    console.log(orbitRef.current.object.position);
    // eslint-disable-next-line react/prop-types
    setCamState((prev) => {
      return { ...prev, [title]: { ...orbitRef.current.object.position } };
    });
  };

  const handleLoad = (orbitRef, title) => {
    if (!camState[title]) {
      return;
    }
    const { x, y, z } = camState[title];

    // eslint-disable-next-line no-undef
    console.log(camState[title]);
    // eslint-disable-next-line no-undef
    // console.log(orbitRef.current.object.position);

    orbitRef.current.object.position.x = x;
    orbitRef.current.object.position.y = y;
    orbitRef.current.object.position.z = z;
    orbitRef.current.update();

    // eslint-disable-next-line no-undef
    console.log(orbitRef.current.object);
  };

  return (
    <ButtonStyles>
      <button
        onClick={(e) => handleLoad(orbitRef, title)}
        className="load-state"
      >
        {title}
      </button>
      <button
        onClick={(e) => handleSave(orbitRef, title)}
        className="save-state"
      >
        save
      </button>
    </ButtonStyles>
  );
};
