<script>
	/* imports */
	import CalcTime from '../libs/CalcTime';
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { lastEvent } from '../stores/eventStore.js';

	/* props */
	export let device = {};
	export let controllersAvailable; // = []
	export let connId;

	/* life cycle */
	onMount(() => {
		getLastState();
		updateTimeAgo();

		lastEventUnsubscribe = lastEvent.subscribe((lstEv) => {
			if (typeof lstEv == 'object') {
				if (lstEv.ep.requested == device.ep || lstEv.ep.emitted == device.ep) {
					lastEvent.reset();
					deviceStatus = 1;
					readLevelData(lstEv);
				}
			}
		});
	});

	onDestroy(() => {
		lastEventUnsubscribe();
	});

	/* emitters */
	const dispatch = createEventDispatcher();

	function sendAction(command) {
		device.actions.forEach((action) => {
			if (action.cmd == command) {
				deviceStatus = -1;
				dispatch('sendAction', { device_id: device._id, action: action });
			}
		});
	}

	/* stores */
	let lastEventUnsubscribe;

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

	function onNewConnection(connId) {
		if (deviceStatus != -2) {
			getLastState();
		}
	}
	$: onNewConnection(connId);

	/* data */

	let deviceStatus = -2;

	let timeAgo = '...';

	let levelData = {
		ep: null,
		e: {
			detail: null
		},
		iat: null
	};

	function readLevelData(data) {
		levelData = data;
		timeAgo = CalcTime.timeDifference(levelData.iat);
	}

	function getLastState() {
		fetch(`/controll/get_state.php?device=${device._id}`)
			.then((response) => response.json())
			.then((data) => readLevelData(data));
	}

	function doMeasurement(force = false) {
		if (deviceStatus == 1 || force == true) {
			sendAction('measure');
		}
	}

	/* loop */

	function updateTimeAgo() {
		if (levelData.iat) {
			timeAgo = CalcTime.timeDifference(levelData.iat);
		}

		setTimeout(() => {
			updateTimeAgo();
		}, 1000);
	}
</script>

<div class="device_led square" class:active={deviceStatus >= 0} class:inactive={deviceStatus < 0}>
	<div class="icon center noselect">
		<img src="./img/watertank.svg" alt="Water tank" class="stat_img" />
		<span>{`${levelData.e.detail}%`}</span>
		<span style="font-size: smaller; color: #999;">{timeAgo}</span>
		<span class="title">{device.name}</span>
	</div>

	<button class="btn_main" on:click={doMeasurement} />
</div>

<style>
	/* ---------- DEVICE_LED ---------- */

	.device_led {
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

	.device_led.active {
		background-color: white;
	}

	.device_led.inactive {
		background-color: #f1f3f4;
	}

	.device_led.active:hover {
		box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.1);
	}

	.device_led:focus-within {
		border-color: lightblue;
	}

	.device_led .icon {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* z-index: 1; */
		pointer-events: none;
	}

	/* ---------- TEXT ---------- */

	.device_led .title {
		letter-spacing: 0.2em;
		font-weight: bold;
		color: #666;
		text-align: center;
	}

	/* ---------- IMAGE ---------- */

	.device_led .stat_img {
		max-width: 24px;
		max-height: 24px;
		margin: 5px;
	}

	.device_led .stat_img.hidden {
		display: none;
	}

	/* ---------- MAIN BUTTON ---------- */

	.device_led .btn_main {
		background-color: transparent;
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		border: none;
		transition: all 0.2s;
	}

	.device_led.active .btn_main {
		cursor: pointer;
	}
</style>
