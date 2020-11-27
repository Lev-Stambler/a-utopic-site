<script lang="ts">
	import Router from 'svelte-spa-router'

	import QuestionPage from './page/Question-Page.svelte'
	import WelcomePage from './page/Welcome-Page.svelte'
	// TODO: put back in
	// alert("A quick message: before playing please turn off any popup blockers for this site as they are crucial to this game")
	export let url = "";
	let routes = {
		'/': WelcomePage,
		'/question/1': QuestionPage
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
	}
</style>