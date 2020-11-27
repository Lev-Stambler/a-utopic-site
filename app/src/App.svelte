<script lang="ts">
	import Router from 'svelte-spa-router'
	import {wrap} from 'svelte-spa-router/wrap'

	import QuestionPage from './page/Question-Page.svelte'
	import WelcomePage from './page/Welcome-Page.svelte'
	import StoryPage from './page/Story-Page.svelte'
	// TODO: put back in
	// alert("A quick message: before playing please turn off any popup blockers for this site as they are crucial to this game")
	export let url = "";
	let routes = {
		'/': WelcomePage,
		'/question/1': wrap({
			component: QuestionPage,
			props: {
				question: "What type of family would you like to be born into? A family of ____",
				choices: ["science", "history", "medicine", "beurocrats", "other"],
				correct: 1,
				nextPage: '/story/1'
			}
		}),
		'/story/1': wrap({
			component: StoryPage,
			props: {
				title: "Congratulations! You were born",
				exp: "Congrats, you were born into a family of historians. Your life awaits! You too will grow up and be a historian which will make your parents proud. We are so excited to see what you will do!",
				nextPage: '/question/2'
			}
		})
	}
</script>

<main>
	<Router {routes} />
	<!-- <Router url="{url}">
		<div>
			<Route path="question/1">
				<QuestionPage question="asas" choices={["1", "2"]} />
			</Route>
			<Route path="/"><WelcomePage /></Route>
		</div>
	</Router> -->
</main>

<style>
	main {
		background: black;
		width: 100%;
		height: 100%;
		display: grid;
		align-items: center;
		justify-content: center;
	}
</style>