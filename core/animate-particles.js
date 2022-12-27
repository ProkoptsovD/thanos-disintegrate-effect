export const animateParticles = (element, x, y, angle, duration) => {
  const ANIMATION_EASING_FUNC = 'cubic-bezier(0.11, 0, 0.5, 0)';

  element.animate(
    [
      {
        transform: 'translate(0px, 0px) rotate(0deg)',
        filter: 'blur(0px)',
        opacity: '1'
      },
      {
        transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
        filter: 'blur(0.2px)',
        opacity: '0'
      }
    ],
    { duration, easing: ANIMATION_EASING_FUNC, fill: 'forwards' }
  );
};
