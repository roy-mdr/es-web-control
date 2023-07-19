<script>
	/* imports */
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import Modal from './Modal.svelte';
	import SmallToggle from './SmallToggle.svelte';
	import { lastEvent } from '../stores/eventStore.js';

	/* props */
	export let device; // = {}
	export let controllersAvailable; // = []
	export let relayQuantity; // = 0

	/* life cycle */

	onMount(() => {
		initRyObjs();

		lastEventUnsubscribe = lastEvent.subscribe((lstEv) => {
			if (typeof lstEv == 'object') {
				if (lstEv.ep.requested == device.ep || lstEv.ep.emitted == device.ep) {
					lastEvent.reset();

					console.log('DeviceXryActions gotEvent:', lstEv);

					if (
						lstEv.e.type == 'read_all' ||
						lstEv.e.type == 'read_one' ||
						lstEv.e.type == 'change'
					) {
						setRyStatusByResponseObj(lstEv.e.detail);
					}
				}
			}
		});
	});

	onDestroy(() => {
		lastEventUnsubscribe();
	});

	/* emitters */
	const dispatch = createEventDispatcher();

	function closeDevice() {
		// deviceObj.expanded = true;
		dispatch('device-close');
	}

	function sendAction(command) {
		device.actions.forEach((action) => {
			if (action.cmd == command) {
				dispatch('sendAction', {
					device_id: device._id,
					action: action
				});
			}
		});
	}

	/* stores */
	let lastEventUnsubscribe;

	/* watchers */

	function updateControllersStatus(controllers) {
		if (!ryObjects.length) return;

		let disableDevice = true;

		for (let index = 0; index < device.actions.length; index++) {
			const action = device.actions[index];
			if (controllers.includes(action.controller)) {
				disableDevice = false;
			}

			if (index == device.actions.length - 1) {
				if (disableDevice) {
					// This device doesn't have any controller connected
					setAllRyStatus(-2);
					return;
				}

				// This device have at least one controller connected!
				setAllRyStatus(-1);
				getCurrentState();
			}
		}
	}
	$: updateControllersStatus(controllersAvailable);

	/* data */

	let ryObjects = [];

	function getCurrentState() {
		sendAction('get_state-all');
	}

	function initRyObjs() {
		// Create relay-objects based on the number of relays given in relayQuantity
		for (let ix = 0; ix < relayQuantity; ix++) {
			const ryId = `ry${ix + 1}`;

			ryObjects.push({
				name: device.alias[ryId] || `Relay ${ix + 1}`,
				status: -2
			});
		}
		ryObjects = ryObjects;

		updateControllersStatus(controllersAvailable);
	}

	function setAllRyStatus(status) {
		ryObjects.forEach((ry) => {
			ry.status = status;
		});
		ryObjects = ryObjects;
	}

	function setRyStatusByResponseObj(statusObj) {
		ryObjects.forEach((ry, ix) => {
			const ryValue = statusObj[`ry${ix + 1}`];

			if (ryValue === 0 || ryValue === 1) {
				ry.status = ryValue;
			}
		});
		ryObjects = ryObjects;
	}

	function toggleRelay(ryIndex) {
		switch (ryObjects[ryIndex].status) {
			case 0:
				ryObjects[ryIndex].status = -1;
				sendAction(`turn_on-${ryIndex + 1}`);
				break;

			case 1:
				ryObjects[ryIndex].status = -1;
				sendAction(`turn_off-${ryIndex + 1}`);
				break;

			default:
				ryObjects[ryIndex].status = -2;
				console.error('Invalid relay status');
				break;
		}

		ryObjects = ryObjects;
	}
</script>

<Modal title={device.name} on:exitModal={closeDevice}>
	<div class="toggle-container">
		{#each ryObjects as relay, ryIx}
			<SmallToggle target={relay} on:toggle={() => toggleRelay(ryIx)} />
		{/each}
	</div>
</Modal>

<style>
	.toggle-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
</style>
