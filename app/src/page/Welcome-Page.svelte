<script>
  import { not_equal } from "svelte/internal";
  import { alertAutoClose } from "../helpers/auto-close-alert";
  let countdown = 10;

  function docountdown() {
    if (countdown == 0) {
      alertAutoClose("You are now going to be moved onto the next screen", "You have no choice", 500, 500, 3000)
      return;
    }
    setTimeout(() => {
      countdown--;
      docountdown();
    }, 1000);
  }
  docountdown()
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
  <button> Click to continue. </button>
  <p>
    If you do not click, no need to worry. We will click for you in
    {countdown}
    seconds
  </p>
</div>
