/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { handlePlantAnimation } from "../handlerFunctions";
import { Slider } from "./Slider";
import { ButtonGrid, ButtonStyles } from "../styles";
import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
export const SideMenu = ({ orbitRef, rootBone }) => {
  const [extended, setExtended] = useState(false);
  const position = useRef(0);
  const animationFrame = useRef();

  function animateNumericVariable(startValue, endValue, callback) {
    const speed = 0.001;
    const distance = endValue - startValue;
    const duration = Math.abs(distance) / speed;

    // eslint-disable-next-line no-undef
    const startTime = performance.now();

    function update() {
      // eslint-disable-next-line no-undef
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const animatedValue = startValue + progress * distance;

      // Update your variable or DOM element with the animated value
      // For example, updating the left position of an element
      handlePlantAnimation(animatedValue, rootBone);
      position.current = animatedValue;

      if (progress < 1) {
        // eslint-disable-next-line no-undef
        requestAnimationFrame(update);
      } else {
        if (callback) {
          callback();
        }
      }
    }

    // eslint-disable-next-line no-undef
    animationFrame.current = requestAnimationFrame(update);
  }

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
            if (animationFrame.current) {
              // eslint-disable-next-line no-undef
              cancelAnimationFrame(animationFrame.current);
            }
            // eslint-disable-next-line no-undef
            console.log("position start " + position.current);
            animateNumericVariable(position.current, e.target.value, () => {
              // eslint-disable-next-line no-undef
              console.log("position end " + position.current);
            });
          }}
        />
      </section>

      <h3>Camera Control</h3>
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
