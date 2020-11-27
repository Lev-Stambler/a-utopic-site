<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: 100px 20%;
  }

  .question {
    grid-column-start: 1;
    grid-column-end: 5;
  }

  .question {
    text-align: center;
  }

  .answer-choices {
    grid-column: span 2;
    border-radius: 1rem;
    background: white;
    max-width: 300px;
    padding: 1rem;
    width: 100%;
    min-height: 50px;
    text-align: center;
    cursor: pointer;
  }
</style>
<script>
import { each } from "svelte/internal";


  export let question = "my question"
  export let choices = ["Choice 1", "Choice 2", "choice 3", "choice 4"]
</script>

<div class="grid">
  <div class="question">
    <h1>{question}</h1>
  </div>
  {#each choices as choice}
    <div class="answer-choices">
      {choice}
    </div>
  {/each}
</div>