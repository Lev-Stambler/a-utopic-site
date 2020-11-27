<script>
  import { push } from "svelte-spa-router";
  import { alertAutoClose } from "../helpers/auto-close-alert";
  export let correct = 0;
  export let question = "my question";
  export let choices = ["Choice 1", "Choice 2", "choice 3", "choice 4"];
  export let nextPage = "/";
  async function choiceMade(choiceInd) {
    if (choiceInd !== correct) {
      await alertAutoClose(
        `I am sorry, the choice ${choices[choiceInd]} is not available. Please try again`,
        "You have no choice",
        500,
        500,
        8000
      );
      push("/");
    } else {
      push(nextPage);
    }
  }
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    justify-items: center;
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

<div class="grid">
  <div class="question">
    <h1>{question}</h1>
  </div>
  {#each choices as choice, i}
    <button class="answer-choices" on:click={() => choiceMade(i)}>
      {choice}
    </button>
  {/each}
</div>
