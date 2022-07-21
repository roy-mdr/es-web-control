<script>

	/* imports */
	import { onMount, createEventDispatcher } from 'svelte';


	/* props */
	export let device = {};
	export let lastEvent;
	export let controllersAvailable; // = []
	export let connId;


	/* life cycle */
	/* onMount(() => {
		getLedState();
	}); */


	/* emitters */
	const dispatch = createEventDispatcher();

	function sendAction(command) {
		device.actions.forEach( action => {
			if (action.cmd == command) {
				deviceStatus = -1;
				dispatch('sendAction', {device_id: device._id, action: action});
			}
		});
	}
	
	function lastEventReceived() {
		dispatch('lastEventReceived');
	}


	/* watchers */

	function checkEventTopic(lstEv) {
		if ( typeof lstEv == 'object' ) {
			if ( lstEv.ep.requested == device.ep || lstEv.ep.emitted == device.ep ) {
				gotEvent(lstEv);
			}
		}
	}
	$: checkEventTopic(lastEvent);

	function updateControllersStatus(controllers) {
		let disableDevice = true;

		for (let index = 0; index < device.actions.length; index++) {
			const action = device.actions[index];
			if ( controllers.includes(action.controller) ) {
				disableDevice = false;
			}
			
			if (index == device.actions.length - 1) {
				if (disableDevice) {
					deviceStatus = -2;
				} else if (deviceStatus == -2) {
					getLedState();
				}
			}
		}

		
	}
	$: updateControllersStatus(controllersAvailable);

	function onNewConnection(connId) {
		getLedState();
	}
	$: onNewConnection(connId);

	/* data */

	let deviceStatus = -2;

	function gotEvent(ev) {
			
		if (ev.e.detail == 1) {
			deviceStatus = 1;
		}

		if (ev.e.detail == 0) {
			deviceStatus = 0;
		}

		lastEventReceived();
	}

	function getLedState() {
		sendAction('get_state');
	}
	
	function toggleLed() {

		if (deviceStatus == 0) {
			sendAction('turn_on');
		}

		if (deviceStatus == 1) {
			sendAction('turn_off');
		}
	}

</script>

	<div class="device_led square" class:active={deviceStatus >= 0} class:inactive={deviceStatus < 0}>

		<div class="icon center noselect">
			<img src="./img/bulb_on.svg"   alt="PC on"           class="stat_img" class:hidden={deviceStatus !=  1}>
			<img src="./img/bulb_off.svg"  alt="PC off"          class="stat_img" class:hidden={deviceStatus !=  0}>
			<img src="./img/loading.svg"   alt="PC waiting"      class="stat_img" class:hidden={deviceStatus != -1}>
			<img src="./img/bulb_disc.svg" alt="PC disconnected" class="stat_img" class:hidden={deviceStatus != -2}>
			<span class="title">{device.name}</span>
		</div>

		<button class="btn_main" on:click={toggleLed}></button>

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
	background-color: #F1F3F4;
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