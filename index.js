import { createBlankImageData } from './core/create-blank-image-data.js';
import { getWightedPeakDistibution } from './core/get-weighted-peak-distribution.js';
import { createCanvasFromImageDataArray } from './core/create-canvas-from-image-data-array.js';
import { animateParticles } from './core/animate-particles.js';
import { getRefs } from './utils/refs.util.js';
import {
  addClassNameTo,
  removeClassNameFrom,
  removeElementIn,
  getRandomInteger
} from './utils/helpers.util.js';

const {
  containerElem,
  imageElem,
  snapButtonElem,
  dustSoundElem,
  inifiniteGauntletElem,
  gauntletSoundElem,
  textElem,
  heartsElem,
  backdropElem
} = getRefs();

let originalCanvases, canvasesWithParticles, snapAnimationId;

const imageDataArray = [];
const canvasCount = 35;

snapButtonElem.addEventListener('click', handleButtonClick);

(async () => {
  const canvas = await html2canvas(imageElem);

  const ctx = canvas.getContext('2d');
  const { data: pixelsArray } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  createBlankImageData(pixelsArray, canvasCount, imageDataArray);

  for (let i = 0; i < pixelsArray.length; i += 4) {
    //find the highest probability canvas the pixel should be in
    const p = Math.floor((i / pixelsArray.length) * canvasCount);
    const arr = imageDataArray[getWightedPeakDistibution(p, canvasCount)];
    arr[i] = pixelsArray[i];
    arr[i + 1] = pixelsArray[i + 1];
    arr[i + 2] = pixelsArray[i + 2];
    arr[i + 3] = pixelsArray[i + 3];
  }

  for (let i = 0; i < canvasCount; i += 1) {
    const newCanvas = createCanvasFromImageDataArray(
      imageDataArray[i],
      canvas.width,
      canvas.height
    );
    addClassNameTo(newCanvas, 'dust');
    containerElem.appendChild(newCanvas);
  }

  originalCanvases = containerElem.querySelectorAll(':not(.dust)');
  canvasesWithParticles = containerElem.querySelectorAll('.dust');

  snapButtonElem.removeAttribute('disabled');
  removeClassNameFrom(backdropElem, 'visible');
})();

function handleButtonClick() {
  const delayedHideAndRemovInfiniteGauntlet = () => {
    setTimeout(hideAndRemoveInfiniteGauntlet, 2000);
  };

  snapButtonElem.animate([{ opacity: '1' }, { opacity: '0' }], {
    duration: 250,
    easing: 'linear',
    fill: 'forwards'
  });

  setTimeout(() => {
    snapButtonElem.remove();
    addClassNameTo(textElem, 'fade-out-v2');
    addClassNameTo(inifiniteGauntletElem, 'gauntlet-visible');
  }, 350);
  setTimeout(animateInfiniteGauntlet.bind(this, delayedHideAndRemovInfiniteGauntlet), 1000);
  setTimeout(() => {
    dustSoundElem.volume = 0.3;
    dustSoundElem.play();

    turnIntoDust();
  }, 6000);

  snapButtonElem.setAttribute('disabled', 'true');
}

function turnIntoDust() {
  const ANIMATION_DELAY_FACTOR = 70;
  const ANIMATION_SPEED_FACTOR = 110;

  originalCanvases.forEach((originalCanvas) => {
    addClassNameTo(originalCanvas, 'fade-out');

    removeElementIn(originalCanvas, 5000);
  });

  canvasesWithParticles.forEach((layerWithParticles, index) => {
    setTimeout(() => {
      animateParticles(
        layerWithParticles,
        getRandomInteger(200),
        getRandomInteger(200, { isNegative: true }),
        chance.integer({ min: -20, max: 20 }),
        6000 + ANIMATION_SPEED_FACTOR * index
      );
    }, ANIMATION_DELAY_FACTOR * index);

    layerWithParticles.animate([{ opacity: '1' }, { opacity: '0', display: 'none' }], {
      delay: ANIMATION_DELAY_FACTOR * index,
      duration: 4000 + ANIMATION_SPEED_FACTOR * index,
      easing: 'cubic-bezier(0.64, 0, 0.78, 0)',
      fill: 'forwards'
    });

    const removeItemDelay =
      ANIMATION_DELAY_FACTOR + 10 * index + (7500 + ANIMATION_SPEED_FACTOR * index);

    if (canvasesWithParticles.length === index + 1) {
      dustSoundElem.volume = 0.1;

      setTimeout(() => {
        dustSoundElem.pause();
        containerElem.innerHTML = '';

        setTimeout(() => addClassNameTo(heartsElem, 'hearts-visible'), 1500);
      }, removeItemDelay);
    }
  });
}

// ***** this func borrowed from https://codepen.io/jhynzar/pen/pBXqgB ******* //

function animateInfiniteGauntlet(callback) {
  if (snapAnimationId) {
    clearInterval(snapAnimationId);
    gauntletSoundElem.currentTime = 0;
  }

  const startPosition = 0;
  let position = startPosition; //start position for the image slicer
  const fullImgWidth = 3840;
  const diff = 80; //diff as a variable for position offset
  const interval = 50; //100 ms of interval for the setInterval() Animation

  gauntletSoundElem.play();
  snapAnimationId = setInterval(() => {
    const areFingerCrossed = position <= fullImgWidth - position;

    inifiniteGauntletElem.style.backgroundPosition = `-${position}px 0px`;

    if (areFingerCrossed) {
      position = position + diff;
    }
    //we increment the position by 256 each time
    else {
      callback();
      clearInterval(snapAnimationId);
    }
    //reset the position to 256px, once position exceeds 1536px
  }, interval); //end of setInterval
}

function hideAndRemoveInfiniteGauntlet() {
  addClassNameTo(inifiniteGauntletElem, 'gauntlet-hide-without-slide');
  removeElementIn(inifiniteGauntletElem, 600);
}
