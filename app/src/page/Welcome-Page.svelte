<script>
  import ContinueBtn from '../components/ContinueBtn.svelte'
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
</style>

<div class="container">
  <h1>Welcome to life</h1>
  <p>asasas as askals aksl</p>
  <br />
  <hr />
  <br />
  <ContinueBtn nextPage="/question/1" />
</div>
