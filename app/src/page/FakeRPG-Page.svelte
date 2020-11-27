<script>
  export let bgX = -2785;
  export let bgY = -90;
  const moveBy = 4;
  const sleepTime = 10;

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
  const steps = [[], [], []];

  function moveToTargNextStep() {}

  setTimeout(async () => {
    await moveDiag(-540, 34)
    await moveDiag(-14, 355)
    await moveDiag(-120, 20)
    await moveDiag(-240, 80)
    await moveDiag(-20, -80)
    await moveDiag(-280, 100)
    await moveDiag(-250, 200)
  }, 1000)
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

<div class="wrapper">
  <div class="wrapper-bg" style={`background-position: ${bgX}px ${bgY}px`} />
  <div class="character"><img src="/static/character.svg" alt="" /></div>
</div>
