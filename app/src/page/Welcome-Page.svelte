<script>
  import { push } from "svelte-spa-router";
  import { alertAutoClose } from "../helpers/auto-close-alert";
  let countdown = 10;
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
    push("/question/1", {});
  }
  // docountdown();
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  p {
    color: white;
  }
  button {
    padding: 1rem;
  }
</style>

<div class="container">
  <h1>Welcome to life</h1>
  <p>asasas as askals aksl</p>
  <br />
  <hr />
  <br />
  <button on:click={nav}>Click to continue.</button>
  <p>
    If you do not click, no need to worry. We will click for you in
    {countdown}
    seconds
  </p>
</div>
