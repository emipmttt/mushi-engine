export const calculateMousePosition = (e) => {
  const screenElement = document.querySelector(".screen");

  const mouseX = parseInt(e.clientX) + screenElement.scrollLeft - 400;
  let counterX = 0;
  const mouseY = parseInt(e.clientY) + screenElement.scrollTop;
  let counterY = 0;

  while (counterX <= mouseX) {
    counterX += 64;
  }

  while (counterY <= mouseY) {
    counterY += 64;
  }

  return { counterX, counterY };
};
