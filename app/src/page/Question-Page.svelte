<script>
  import { push } from "svelte-spa-router";
  import {location} from 'svelte-spa-router'
  import { alertAutoClose } from "../helpers/auto-close-alert";
  export let correct = 0;
  export let initFn
  export let question = "my question";
  let questionTxt
  export let choices = ["Choice 1", "Choice 2", "choice 3", "choice 4"];
  export let nextPage = "/";
  export let alertMsg;
  if (alertMsg) {
    alert(alertMsg)
  }
  if (typeof question === "string") {
    questionTxt = question
  } else {
    questionTxt = question()
  }
  if (initFn) initFn();
  async function choiceMade(choiceInd) {
    if (choiceInd !== correct && correct !== -1) {
      await alertAutoClose(
        `I am sorry, you made a mistake. The choice ${choices[choiceInd]} is not available. For your mistake, you may be punished. But not to worry, you have a chance to run away!`,
        "You have no choice",
        500,
        500,
        18000
      );
      if ($location !== "/fake-rpg")
        push("/fake-rpg");
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
    <h1>{questionTxt}</h1>
  </div>
  {#each choices as choice, i}
    <button class="answer-choices" on:click={() => choiceMade(i)}>
      {choice}
    </button>
  {/each}
</div>
