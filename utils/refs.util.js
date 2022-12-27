export function getRefs() {
  const containerElem = document.querySelector('#container');
  const imageElem = document.querySelector('[data-element="target"]');
  const snapButtonElem = document.querySelector('[data-element="snap-btn"]');
  const dustSoundElem = document.querySelector('[data-element="dust-sound"]');
  const inifiniteGauntletElem = document.querySelector('[data-element="inifinite-gauntlet"]');
  const gauntletSoundElem = inifiniteGauntletElem.querySelector('audio');
  const textElem = document.querySelector('#text');
  const heartsElem = document.querySelector('.hearts-wrapper');
  const backdropElem = document.querySelector('.backdrop');

  return {
    containerElem,
    imageElem,
    snapButtonElem,
    dustSoundElem,
    inifiniteGauntletElem,
    gauntletSoundElem,
    textElem,
    heartsElem,
    backdropElem
  };
}
