<script>

	/* imports */
	import { onMount } from 'svelte';
	import DeviceActions from './components/DeviceActions.svelte';
	import DeviceLed from './components/DeviceLed.svelte';
	import DevicePC from './components/DevicePC.svelte';
	import DeviceTmpHum from './components/DeviceTmpHum.svelte';
	import dummyData from './dummyData.js';
	import NPS from './libs/NoPollSubscriber.js';
	import { lastEvent } from './stores/eventStore.js';



	/* life cycle */
	onMount(() => {
		fetchData();
		setMayStart(true);
	});



	/* props */
	// export let name;


	
	/* logic */
	let devices = [];
	let controllersAvailable = [];
	let deviceExpanded = null;
	let eventPoints = [];
	
	function fetchData() {

		// DEV:
		/*
		
		devices = dummyData;

		devices.forEach( (device) => {

						if ( !eventPoints.includes(device.ep) ) {
							eventPoints.push(device.ep);
						}

						device.actions.forEach( (action) => {
							const controllerStatusEp = `@CONNECTION@/${action.controller}`;
							if ( !eventPoints.includes(controllerStatusEp) ) {
								eventPoints.push(controllerStatusEp);
							}
						} );

					} );

					eventPoints = eventPoints;
					
					return;
		*/

		// ----------------------------------------------------------

		// return new Promise( (resolve, reject) => {

			fetch(`/controll/get_devices.php`)
				.then( (res) => res.json() )
				.then( (data) => {
					devices = data;

					devices.forEach( (device) => {
						if ( !eventPoints.includes(device.ep) ) {
							eventPoints.push(device.ep);
						}

						device.actions.forEach( (action) => {
							const controllerStatusEp = `@CONNECTION@/${action.controller}`;
							if ( !eventPoints.includes(controllerStatusEp) ) {
								eventPoints.push(controllerStatusEp);
							}
						} );

					} );

					eventPoints = eventPoints;

				} )
				.catch( (er) => { console.error(er); } )
			
		// } );
	}



	function sendAction(ev) {

		if (connId == undefined) {
			console.log("We don't have a connection Id yet. Queeing event:", ev);
			evQuee.push(ev);
			return;
		}

		console.log("Sending event:", ev);
		fetch(`/controll/req.php?device=${ev.detail.device_id}&whisper=${connId}`, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'cors', // no-cors, *cors, same-origin
			// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			// redirect: 'follow', // manual, *follow, error
			// referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(ev.detail.action) // body data type must match "Content-Type" header
		});
	}



	/* Pub Sub Subscription */

	let connId;
	let connSecret;
	let connTimeout;
	let aliveLoop;

	function begginAliveLoop() {

		clearTimeout(aliveLoop);

		aliveLoop = setTimeout(function() {

			if (!connectedToBroker) {
				clearTimeout(aliveLoop);
				return;
			}

			const refreshURL = `${getSubUrl()}alive`;

			fetch(refreshURL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({connid: connId, secret: connSecret})
			})
				.then(response => response.json())
				.then(data => {
					connId      = data.connid;
					connSecret  = data.secret;
					connTimeout = data.timeout;
				});

			begginAliveLoop();

		}, connTimeout - 3000); // timeout - 3 seconds
	}

	let mayStart = false;

	function setMayStart(bool) {
		mayStart = bool;
	}

	$: subOptions = {
		url: getSubUrl(),
		method: "POST",
		data: JSON.stringify({
			clid: 'web_iot_controll',
			ep: eventPoints
		})
	}

	let subscription = new NPS(subOptions,
		sub_OnParsed,
		sub_OnSubscribe,
		sub_OnStateChange
	);

	function startSub(subOptions) {
		if (mayStart) {
			subscription.start(subOptions);
		}
	}
	
	/* watchers */

	$: startSub(subOptions);
	$: console.log(subOptions);
	$: sendQueeEvents(connId);



	function sub_OnParsed(data) {

		console.log("On Parsed: ", data);

		const event = JSON.parse(data);

		

		if ( event.ep.emitted == '@SERVER@' ) {
			connId = event.e.detail.connid;
			connSecret = event.e.detail.secret;
			connTimeout = event.e.detail.timeout;
			begginAliveLoop();
		} else if ( /^@CONNECTION@\/[^\/]+$/.test(event.ep.emitted) ) {

			const controllerClid = event.ep.emitted.split('/')[1];
			if (event.e.detail.clid_instances > 0) {
				// Add controllerId to controllers available
				if ( !controllersAvailable.includes(controllerClid) ) {
					controllersAvailable.push(controllerClid);
					controllersAvailable = controllersAvailable;
				}
			} else {
				// Remove controllerId from controllers available
				let index = controllersAvailable.indexOf(controllerClid);
				if (index !== -1) {
					controllersAvailable.splice(index, 1);
					controllersAvailable = controllersAvailable;
				}
			}

		} else {
			lastEvent.set(event);
		}
	}

	function sub_OnSubscribe(data) {
		console.log("On Subscribe: ", data);
		connectedToBroker = true;
	}

	function sub_OnStateChange(state) {
		console.log("On State Change: ", state);

		notifBrokerState = state.value;

		if (state.value != 2) {
			connectedToBroker = false;
		}
	}

	let connectedToBroker = false;

	let notifBrokerState;

	let evQuee = [];

	function sendQueeEvents(connId) {
		evQuee.forEach( ev => {
			evQuee.shift();
			sendAction(ev);
		})
	}

	function getSubUrl() {
		if ( /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(window.location.host) ) {
			let port = 0;
			let hostNoPort = window.location.host.split(':')[0];
			if ( window.location.protocol == "http:" ) { port = /*1010*/ 1011; }
			if ( window.location.protocol == "https:" ) { port = 1011; }
			return `${window.location.protocol}//${hostNoPort}:${port}/`;

		} else if ( /^localhost/.test(window.location.host) ) {
			let port = 0;
			let hostNoPort = window.location.host.split(':')[0];
			if ( window.location.protocol == "http:" ) { port = 1010 /*1011*/; }
			if ( window.location.protocol == "https:" ) { port = 1011; }
			// return `https://notify.estudiosustenta.myds.me/`;
			return `${window.location.protocol}//${hostNoPort}:${port}/`;
			
		} else {
			return `${window.location.protocol}//notify.${window.location.host}/`;
		}
	}

</script>

<div id="statBar">
	<div id="notifStatus" style="width: 10px; height: 10px; border-radius: 5px; margin-right: 1em;"
	class:wifioff={notifBrokerState == -1}
	class:disconnected={notifBrokerState == 0}
	class:waiting={notifBrokerState == 1}
	class:connected={notifBrokerState == 2}
	></div>

	{#if notifBrokerState === undefined}
	...
	{/if}

	{#if notifBrokerState === -1}
	WiFi Off
	{/if}

	{#if notifBrokerState === 0}
	Disconnected
	{/if}

	{#if notifBrokerState === 1}
	Waiting...
	{/if}

	{#if notifBrokerState === 2}
	Connected
	{/if}
</div>

<div id="deviceContainer">
	{#if connectedToBroker}
		{#each devices as device}

			{#if device.type == "led"}
				<DeviceLed
					{device}
					{controllersAvailable}
					{connId}
					on:sendAction={sendAction}
				/>
			{/if}
					
			{#if device.type == "pc"}
				<DevicePC
					{device}
					{controllersAvailable}
					on:device-expanded={(ev) => { deviceExpanded = ev.detail.device }}
				/>
			{/if}
					
			{#if device.type == "tmphum"}
				<DeviceTmpHum
					{device}
				/>
			{/if}

		{/each}
	{/if}
</div>


<!-- 
<h1>Hello {name}!</h1>
<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
 -->

{#if deviceExpanded !== null}
	<DeviceActions
		device={deviceExpanded}
		{controllersAvailable}
		on:device-close={(ev) => { deviceExpanded = null }}
		on:sendAction={sendAction}
	/>
{/if}

<style>
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}*/

	/* h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	} */

	/*@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */

	#deviceContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
	}

	#statBar {
		display: flex;
		background-color: white;
		width: 100%;
		z-index: 100;
		box-shadow: 0px 1px 1px 0 rgba(0, 0, 0, 0.1);
		padding: 1em;
		align-items: center;
	}

	#notifStatus {
		background-color: #666666;
	}
	#notifStatus.wifioff {
		background-color: #607d8b;
	}
	#notifStatus.disconnected {
		background-color: #f44336;
	}

	#notifStatus.waiting {
		background-color: #ffc107;
	}

	#notifStatus.connected {
		background-color: #ABDBA9;
	}

</style>