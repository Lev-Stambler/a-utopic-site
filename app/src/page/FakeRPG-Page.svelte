<script>
  import { fade } from "svelte/transition";
  import { alertAutoClose } from "../helpers/auto-close-alert";

  export let bgX = -2785;
  export let bgY = -90;
  let townsPeopleVis = false;
  const moveBy = 4;
  const sleepTime = 10;
  // alert(
  //   "Looks like you may be in trouble. Use your arrow keys and try to escape this town!"
  // );

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function moveRight(amount) {
    let left = Math.abs(amount);
    while (left > moveBy) {
      bgX -= moveBy * (amount < 0 ? -1 : 1);
      left -= moveBy;
      await sleep(sleepTime);
    }
    bgX += left * (amount < 0 ? -1 : 1);
  }
  async function moveDown(amount) {
    let left = Math.abs(amount);
    while (left > moveBy) {
      bgY -= moveBy * (amount < 0 ? -1 : 1);
      left -= moveBy;
      await sleep(sleepTime);
    }
    bgX += left * (amount < 0 ? -1 : 1);
  }
  async function moveDiag(xDiff, yDiff) {
    const hypot = Math.sqrt(yDiff * yDiff + xDiff * xDiff);
    const xRatio = Math.abs(xDiff) / hypot;
    const yRatio = Math.abs(yDiff) / hypot;
    let xMoveStep = moveBy * xRatio;
    let yMoveStep = moveBy * yRatio;
    let leftX = Math.abs(xDiff);
    let leftY = Math.abs(yDiff);
    while (leftX > xMoveStep && leftY > yMoveStep) {
      bgY -= yMoveStep * (yDiff < 0 ? -1 : 1);
      bgX -= xMoveStep * (xDiff < 0 ? -1 : 1);
      leftY -= yMoveStep;
      leftX -= xMoveStep;
      await sleep(sleepTime);
    }
    bgY -= leftY;
    bgX -= leftX;
  }

  let currStep = 0;
  const steps = [
    [-540, 34],
    [-14, 355],
    [-120, 20],
    [-240, 80],
    [-20, -80],
    [-280, 100],
    [-250, 200],
  ];
  function splitStep(step) {
    let x = step[0];
    let y = step[1];
    let diagMoveLen = 100;
    let diag = Math.sqrt(x * x + y * y);
    let numbStepsNoParse = Math.floor(diag / diagMoveLen);
    let newSteps = new Array(numbStepsNoParse)
      .fill(0)
      .map((val) => [x / numbStepsNoParse, y / numbStepsNoParse]);
    if (numbStepsNoParse === 0) newSteps.push([x, y]);
    return newSteps;
  }
  const stepsSplit = steps.map(splitStep).flat();
  let stepInd = 0;
  // from 0 to 1
  let moving = false;

  function popup_towns_people() {
    townsPeopleVis = true;
    alertAutoClose(
      "An angry mob has over taken you for your mistake! Looks like you will have to try the game of life again...",
      "You have no control",
      500,
      600
    );
  }

  async function moveChar() {
    if (moving) return;
    if (stepInd >= stepsSplit.length) {
      popup_towns_people();
      return;
    }
    let moveX = stepsSplit[stepInd][0];
    let moveY = stepsSplit[stepInd][1];
    moving = true;
    await moveDiag(moveX, moveY);
    stepInd++;
    moving = false;
  }

  let timer;

  function moveSetting() {
    if (timer) return;
    timer = setInterval(moveChar, 100);
  }

  function stopmove() {
    clearInterval(timer);
    timer = null;
  }
  /**
   * The goal is to get from the top right of the map to the 30 30 point
   */
</script>

<style>
  .character {
    position: absolute;
    top: 42%;
    left: 48%;
    width: 4%;
    height: 4%;
    min-width: 50px;
    min-height: 50px;
    z-index: 10;
  }
  .towns-people {
    z-index: 11;
    position: absolute;
    top: 40%;
    left: 40%;
    right: 40%;
    bottom: 40%;
  }

  .towns-people img {
    width: 100%;
    transition: transform 100ms ease-in;
  }
  .character img {
    width: 100%;
    height: 100%;
  }
  .wrapper {
    position: relative;
    height: 720px;
    width: 1080px;
  }
  .wrapper-bg {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url("/static/city-map.jpg");
    z-index: 0;
    background-size: 5000px;
  }
</style>

<svelte:window on:keydown={() => moveSetting()} on:keyup={() => stopmove()} />

<div class="wrapper">
  <div class="wrapper-bg" style={`background-position: ${bgX}px ${bgY}px`} />
  {#if townsPeopleVis}
    <div class="towns-people">
      <img transition:fade src="/static/town-people.png" alt="" />
    </div>
  {/if}
  <div class="character"><img src="/static/character.svg" alt="" /></div>
</div>
