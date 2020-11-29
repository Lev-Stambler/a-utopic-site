<style>
  .modal {
    background: rgb(180, 180, 180);
    border-radius: 20px;
    padding: 2rem;
    max-width: 700px;
  }
</style>
<script>
  import ContinueBtn from '../components/ContinueBtn.svelte'
  export let title = "story time";
  export let exp = "exp";
  export let nextPage = "/";
</script>
<div class="modal">
  <h1>{title}</h1>
  <p>{exp}</p>
  <br />
  <br />
  <ContinueBtn {nextPage} countdown=20 />
</div>