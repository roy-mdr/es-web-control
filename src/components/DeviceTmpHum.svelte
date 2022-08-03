<script>

	/* imports */
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { lastEvent } from '../stores/eventStore.js';



	/* props */
	export let device = {};



	/* life cycle */
	onMount(() => {
		getLastTmpHum();
		updateTimeAgo();
	});

	onDestroy(() => {
		lastEventUnsubscribe();
	});

	

	/* stores */

	const lastEventUnsubscribe = lastEvent.subscribe(lstEv => {
		if ( typeof lstEv == 'object' ) {
			if ( lstEv.ep.requested == device.ep || lstEv.ep.emitted == device.ep ) {

				lastEvent.reset();

				readDHTData(lstEv.e.detail);
			}
		}
	});



	/* data */

	let timeAgo = "...";

	let lectureError = false;

	let tmpHumData = {
		hum: null,
		tmp: null,
		hic: null,
		lux: null,
		hum_snap: null,
		tmp_snap: null,
		hic_snap: null,
		lux_snap: null,
		date: null
	};

	function readDHTData(data) {
		if (data.error) {
			lectureError = true;
			tmpHumData.date = data.date;
			return;
		}

		tmpHumData = data;
		lectureError = false;
		timeAgo = timeDifference(tmpHumData.date * 1000);
	}

	function getLastTmpHum() {
		fetch(`/test/WeMosServer/getCurrent.php`)
			.then(response => response.json())
			.then(data => readDHTData(data));
	}
	
	function openGraph() {

	}

	function timeDifference(previous, current = Date.now()) {

		let msPerMinute = 60 * 1000;
		let msPerHour = msPerMinute * 60;
		let msPerDay = msPerHour * 24;
		let msPerMonth = msPerDay * 30;
		let msPerYear = msPerDay * 365;

		let elapsed = current - previous;

		if (elapsed < msPerMinute) {
			return Math.round(elapsed/1000) + ' seconds ago';   
		}

		else if (elapsed < msPerHour) {
			return Math.round(elapsed/msPerMinute) + ' minutes ago';   
		}

		else if (elapsed < msPerDay ) {
			return Math.round(elapsed/msPerHour ) + ' hours ago';   
		}

		else if (elapsed < msPerMonth) {
			return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
		}

		else if (elapsed < msPerYear) {
			return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
		}

		else {
			return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
		}
	}



	/* loop */

	function updateTimeAgo() {

		if (tmpHumData.date) {
			timeAgo = timeDifference(tmpHumData.date * 1000);
		}

		setTimeout(() => {
			updateTimeAgo();
		}, 1000);
	}

</script>

	<div class="device_tmpHum square active">

		<div class="icon center noselect">

			{#if lectureError}
			<span>¡ERROR DE LECTURA!</span>
			<span style="font-size: smaller; color: #999;">{timeAgo}</span>
			{:else}
			<div class="iconAndData">
				<img src="./img/thermometer.svg" alt="temperature" class="stat_img">
				<span>{`${tmpHumData.tmp}ºC`}</span>
			</div>
			<div class="iconAndData">
				<img src="./img/humidity.svg" alt="humidity" class="stat_img">
				<span>{`${tmpHumData.hum}%`}</span>
			</div>
			<div class="iconAndData">
				<img src="./img/person.svg" alt="heat index" class="stat_img">
				<span>{`${tmpHumData.hic}ºC`}</span>
			</div>
			<span style="font-size: smaller; color: #999;">{timeAgo}</span>
			{/if}
			
			<span class="title">{device.name}</span>
		</div>

		<button class="btn_main" on:click={openGraph}></button>

	</div>

<style>
	/* ---------- DEVICE_TMPHUM ---------- */

.device_tmpHum {
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

.device_tmpHum.active {
	background-color: white;
}

.device_tmpHum.inactive {
	background-color: #F1F3F4;
}

.device_tmpHum.active:hover {
	box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.1);
}

.device_tmpHum:focus-within {
	border-color: lightblue;
}

.device_tmpHum .icon {
	display: flex;
	flex-direction: column;
	width: 100%;
	/* z-index: 1; */
	pointer-events: none;
}





/* ---------- TEXT ---------- */

.device_tmpHum .title {
	letter-spacing: 0.2em;
	font-weight: bold;
	color: #666;
}





/* ---------- IMAGE ---------- */

.device_tmpHum .stat_img {
	max-width: 24px;
	max-height: 24px;
	margin: 5px;
}

.device_tmpHum .stat_img.hidden {
	display: none;
}

.iconAndData {
	display: flex;
	justify-content: center;
	align-items: center;
}





/* ---------- MAIN BUTTON ---------- */

.device_tmpHum .btn_main {
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

.device_tmpHum.active .btn_main {
	cursor: pointer;
}


</style>