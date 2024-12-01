export const handlePlantAnimation = (position, rootBone) => {
  rootBone.current.children[1].position.z = -4.65 - 4.85 * position;
  rootBone.current.children[1].children[0].position.z = -4.8 * position;
  rootBone.current.children[0].rotation.x = -120 * position;

  // eslint-disable-next-line no-undef
  // console.log(rootBone.current);
};

export const handleCamera = (e, orbitRef) => {
  // eslint-disable-next-line no-undef
  console.log(orbitRef.current.object.position);
};

export function animateNumericVariableTemp(
  startValue,
  endValue,
  position,
  rootBone,
  animationFrame,
  speed,
  callback
) {
  const distance = endValue - startValue;
  const duration = Math.abs(distance) / speed.current;

  // eslint-disable-next-line no-undef
  // console.log("spped: " + speed.current);

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
