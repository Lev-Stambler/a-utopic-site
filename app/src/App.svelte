<script lang="ts">
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { location } from "svelte-spa-router";

  import QuestionPage from "./page/Question-Page.svelte";
  import WelcomePage from "./page/Welcome-Page.svelte";
  import StoryPage from "./page/Story-Page.svelte";
  import FakeRpg from "./page/FakeRPG-Page.svelte";
  import { alertAutoClose } from "./helpers/auto-close-alert";
	import { yearsWorked } from "./helpers/yearsWorked";
  // TODO: put back in
  // alert("A quick message: before playing please turn off any popup blockers for this site as they are crucial to this game")
  export let url = "";
  let routes = {
    "/": WelcomePage,
    "/question/1": wrap({
      component: QuestionPage,
      props: {
        question:
          "What type of family would you like to be born into? A family of ____",
        choices: ["science", "history", "medicine", "bureaucrats", "other"],
        correct: 1,
        nextPage: "/story/1",
      },
    }),
    "/story/1": wrap({
      component: StoryPage,
      props: {
        title: "Congratulations! You were born",
        exp:
          "Congrats, you were born into a family of historians. Your life awaits! You too will grow up and be a historian which will make your parents proud. We are so excited to see what you will do!",
        nextPage: "/question/2",
      },
    }),
    "/question/2": wrap({
      component: QuestionPage,
      props: {
        question:
          "Wow! The last 13 years really flew by. You now have a choice of what to study in High School! What would you like to specialize in?",
        choices: [
          "Early Roman History",
          "Somewhat Early Roman History",
          "Roman History (with a focus on the Early)",
          "Rome's Infancy",
          "other (but you will still be studying Early Roman History)",
        ],
        correct: -1,
        nextPage: "/story/2",
      },
    }),
    "/story/2": wrap({
      component: StoryPage,
      props: {
        title: "High School is flying by",
        exp:
          "Its such a pleasure watching you go through High School. You are really crushing this Early Roman History stuff. We are truly so proud. Soon, you will be going off to the work force... Can't wait to see what you will end up doing",
        nextPage: "/question/3",
      },
    }),
    "/question/3": wrap({
      component: QuestionPage,
      props: {
        question:
          "Now, you have the option to choose a job! What are you going to chose? We are so curious...",
        choices: [
          "gardener",
          "state mandated slave (don't worry, we are nice masters!)",
          "gula... I mean camp worker",
          "DMV Worker",
          "Early Roman Historian",
        ],
        correct: 2,
        nextPage: "/story/3",
      },
    }),
    "/story/3": wrap({
      component: StoryPage,
      props: {
        title: "Good Choice!",
        exp:
          "We are overjoyed that you choose to be a camp worker. Your train to Siberia takes off tomorrow at 08:00!",
        nextPage: "/question/4",
      },
    }),
    "/question/4": wrap({
      component: QuestionPage,
      props: {
        question:
          "Knowing what you know, will you still take off tomorrow morning?",
        choices: ["Yes", "No"],
        alertMsg:
          'You hear rumors that a "Camp Worker" leads a desperate, painful life. You are starting to reconsider your life\'s choices',
        correct: 0,
        nextPage: "/story/4",
      },
    }),
    "/story/4": wrap({
      component: StoryPage,
      props: {
        title: "Choo choo!",
        exp: "The train takes off. The rest of your life is about to begin",
        nextPage: "/question/5",
      },
    }),
    "/question/5": wrap({
      component: QuestionPage,
      props: {
				initFn: () => yearsWorked.update(curr => curr + 1),
        question:
          () => `Year ${$yearsWorked} of working is done! You can either choose to go back home or continue with us!`,
        choices: [
          "I want to go home!!!",
          "Stay and enjoy another \"fun\" year",
        ],
        correct: 1,
        nextPage: "/story/5",
      },
		}),
		"/story/5": wrap({
      component: StoryPage,
      props: {
        title: "Very nice",
        exp: "We are excited to have you on for another year! Lets look forward to a bright future",
        nextPage: () => $yearsWorked > 5 ? "/story/6" : "/question/5",
      },
		}),
		"/story/6": wrap({
      component: StoryPage,
      props: {
        title: "Congratulations!",
        exp: "You are nearing retirement. To make your life easier, we will retire you! Your life was perfectly well lived. Goodbye.",
        nextPage: "/",
      },
    }),
    "/fake-rpg": wrap({
      component: FakeRpg,
      props: {},
    }),
  };
</script>

<style>
  .player {
    position: absolute;
    top: calc(5% + 10px);
    left: calc(5% + 10px);
    width: 80px;
    height: 80px;
    padding: 1rem;
    background: white;
    border-radius: 50%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .player img {
    display: inline-block;
    height: 100%;
    width: 100%;
  }

  main {
    position: relative;
    background: black;
    width: 100%;
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
  }
</style>

<main>
  {#if $location != '' && $location != '/'}
    <div
      class="player"
      on:click={() => alertAutoClose('Hi, I am Jamjam! Also, you are Jamjam. We are Jamjam. Got it? Good.', 'An introduction', 400, 400, 5000)}>
      <span>Jamjam</span>
      <img src="/static/character.svg" alt="" srcset="" />
    </div>
  {/if}
  <Router {routes} />
</main>
