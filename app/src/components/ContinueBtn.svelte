<script>
  import { push } from "svelte-spa-router";
  import { alertAutoClose } from "../helpers/auto-close-alert";
  export let nextPage;

  export let countdown = 10;
  let stopped = false;
  async function docountdown() {
    if (countdown == 0) {
      await alertAutoClose(
        "You are now going to be moved onto the next screen",
        "You have no choice",
        500,
        500,
        3000
      );
      nav();
      return;
    }
    if (stopped) {
      return;
    }
    setTimeout(() => {
      countdown--;
      docountdown();
    }, 1000);
  }
  function nav() {
    stopped = true;
    push(nextPage, {});
  }
  // docountdown();
</script>

<style>
  p {
    color: white;
  }
  button {
    padding: 1rem;
    max-width: 200px;
  }
  .container {
    display: grid;
    align-items: center;
    justify-content: center;
    justify-items: center;
  }
</style>

<div class="container">
  <button on:click={nav}>Click to continue.</button>
  <p>
    If you do not click, no need to worry. We will click for you in
    {countdown}
    seconds
  </p>
</div>
