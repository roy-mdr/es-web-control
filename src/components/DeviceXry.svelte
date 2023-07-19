<script>
	/* imports */
	import { onMount, createEventDispatcher } from 'svelte';

	/* props */
	export let device = {};
	export let controllersAvailable; // = []

	/* life cycle */
	/* onMount(() => {
		updateControllersStatus(controllersAvailable);
	}); */

	/* emitters */

	const dispatch = createEventDispatcher();

	function expandDevice(deviceObj) {
		dispatch('device-expanded', { device: deviceObj });
	}

	/* watchers */

	function updateControllersStatus(controllers) {
		let disableDevice = true;

		for (let index = 0; index < device.actions.length; index++) {
			const action = device.actions[index];
			if (controllers.includes(action.controller)) {
				disableDevice = false;
			}

			if (index == device.actions.length - 1) {
				if (disableDevice) {
					// This device doesn't have any controller connected
					deviceStatus = -2;
					return;
				}

				// This device have at least one controller connected!
				deviceStatus = 1;
			}
		}
	}
	$: updateControllersStatus(controllersAvailable);

	/* data */
	let deviceStatus = -2;
</script>

<div class="multy_relay square" class:active={deviceStatus >= 0} class:inactive={deviceStatus < 0}>
	<div class="icon center noselect">
		<img
			src="./img/bulb_on.svg"
			alt="Module on"
			class="stat_img"
			class:hidden={deviceStatus != 1}
		/>
		<img
			src="./img/bulb_off.svg"
			alt="Module off"
			class="stat_img"
			class:hidden={deviceStatus != 0}
		/>
		<img
			src="./img/loading.svg"
			alt="Module waiting"
			class="stat_img"
			class:hidden={deviceStatus != -1}
		/>
		<img
			src="./img/bulb_disc.svg"
			alt="Module disconnected"
			class="stat_img"
			class:hidden={deviceStatus != -2}
		/>
		<span class="title">{device.name}</span>
	</div>

	<!-- <button class="btn_main" on:click={toggleDeviceOnOff(device)}></button> -->
	<button class="btn_main" on:click={expandDevice(device)} />
	{#if deviceStatus != -1}
		<button
			class="btn_more center absolute-down"
			style="color: #CCC;"
			on:click={expandDevice(device)}>...</button
		>
	{/if}
</div>

<style>
	/* ---------- MULTY_RELAY ---------- */

	.multy_relay {
		display: flex;
		flex-direction: column;
		margin: 1em;
		border-radius: 5px;
		box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.1);
		justify-content: center;
		align-items: center;
		max-width: 20em;
		position: relative;
		border: none;
		transition: all 0.2s;
		border: 1px solid white;
	}

	.multy_relay.active {
		background-color: white;
	}

	.multy_relay.inactive {
		background-color: #f1f3f4;
	}

	.multy_relay.active:hover {
		box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.1);
	}

	.multy_relay:focus-within {
		border-color: lightblue;
	}

	.multy_relay .icon {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* z-index: 1; */
		pointer-events: none;
	}

	/* ---------- TEXT ---------- */

	.multy_relay .title {
		letter-spacing: 0.2em;
		font-weight: bold;
		color: #666;
		text-align: center;
	}

	/* ---------- IMAGE ---------- */

	.multy_relay .stat_img {
		max-width: 24px;
		max-height: 24px;
		margin: 5px;
	}

	.multy_relay .stat_img.hidden {
		display: none;
	}

	/* ---------- MAIN BUTTON ---------- */

	.multy_relay .btn_main {
		background-color: transparent;
		position: absolute;
		top: 0;
		width: 100%;
		height: 75%;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		border: none;
		transition: all 0.2s;
	}

	.multy_relay.active .btn_main {
		cursor: pointer;
	}

	/* ---------- "MORE" BUTTON ---------- */

	.multy_relay .btn_more {
		background-color: transparent;
		width: 100%;
		height: 25%;
		cursor: pointer;
		border-bottom-right-radius: 5px;
		border-bottom-left-radius: 5px;
		border: none;
		box-shadow: inset 0px 1px 0px 0 rgba(0, 0, 0, 0.1);
		transition: all 0.2s;
	}

	.multy_relay .btn_more:hover {
		box-shadow: inset 0px 1px 5px 0 rgba(0, 0, 0, 0.1);
	}

	.multy_relay .btn_more:focus {
		box-shadow: inset 0px 1px 5px 0 rgba(0, 0, 0, 0.1);
	}

	.multy_relay .btn_more:active {
		color: LightBlue;
	}
</style>
