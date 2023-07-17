<script>
	/* imports */
	import { onMount } from 'svelte';

	/* props */
	export let controller = {};

	/* life cycle */
	onMount(() => {
		getControllerInfo();
	});

	/* data */

	let controllerInfo = new Promise(() => {});
	let unavailable = false;

	function getControllerInfo() {
		fetch(`http://${controller.ipv4_interface}/info`, {
			referrerPolicy: 'unsafe-url',
			credentials: 'omit',
			mode: 'no-cors'
		})
			.then((res) => res.json())
			.then((data) => {
				controllerInfo = Promise.resolve(data);
			})
			.catch((er) => {
				// unavailable = true; // UNCOMMENT THIS LINE WHEN THE /info ENDPOINT IS WORKING ON THE ESP8266
				console.error(er);
				controllerInfo = Promise.reject(er);
			});
	}
</script>

<div class:unavailable>
	<a href={`http://${controller.ipv4_interface}/`} class="btn_grey" target="_blank"
		>{controller._id}</a
	>
</div>

<style>
	a {
		padding: 0.5em !important;
		margin-top: 0.5em !important;
		display: block;
		justify-content: space-between;
		text-align: center;
		text-decoration: none;
	}
</style>
