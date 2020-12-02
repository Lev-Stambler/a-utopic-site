<script>
  import ContinueBtn from "../components/ContinueBtn.svelte";
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  p {
    color: white;
  }

  .exp-container {
    max-width: 600px;
    padding: 1rem;
    background: rgb(255, 255, 255);
    border-radius: 10px;
  }
  .exp-container p {
    color: black
  }
</style>

<div class="container">
  <h1>Welcome to life</h1>
  <div class="exp-container">
    <p>
      Hello, we are the game lords! As you play through the game, your character
      will experience a perfect life. By the way, your name is Jamjam. Why you
      may ask? Well, because we are living in The Utopic Society. Everything
      is perfect and as it should be!
    </p>
    <p>Enjoy the game</p>
  </div>
  <br />
  <hr />
  <br />
  <ContinueBtn nextPage="/question/1" countdown=30/>
</div>
