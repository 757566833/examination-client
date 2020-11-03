
export const animateCSSByQuery = (element: Element | null, classname: string, animation: string, prefix = 'animate__') => {
  return new Promise((resolve, _reject) => {
    const animationName = `${prefix}${animation}`;
    console.log(element, classname);
    const node = element?.querySelector(classname);
    console.log(node);
    node?.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    const handleAnimationEnd = () => {
      node?.classList.remove(`${prefix}animated`, animationName);
      node?.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    };

    node?.addEventListener('animationend', handleAnimationEnd);
  });
};
export const animateCSSByElement = (element: Element, animation: string, prefix = 'animate__') => {
  return new Promise((resolve, _reject) => {
    const animationName = `${prefix}${animation}`;
    console.log(animationName);
    element.classList.add(`${prefix}animated`, animationName);
    console.log(element.classList);
    // When the animation ends, we clean the classes and resolve the Promise
    const handleAnimationEnd = () => {
      element.classList.remove(`${prefix}animated`, animationName);
      element.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    };

    element.addEventListener('animationend', handleAnimationEnd);
  });
};
