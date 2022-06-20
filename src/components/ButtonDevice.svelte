<script>
</script>

	<div class={ device.last_state.status < 0 ? 'personal_computer square inactive' : 'personal_computer square active' }>

		<div class="icon center noselect">
			<img src="./img/desk_on.svg"   alt="PC on"           class="stat_img" class:hidden={device.last_state.status !=  1}>
			<img src="./img/desk_off.svg"  alt="PC off"          class="stat_img" class:hidden={device.last_state.status !=  0}>
			<img src="./img/desk_wait.svg" alt="PC waiting"      class="stat_img" class:hidden={device.last_state.status != -1}>
			<img src="./img/desk_disc.svg" alt="PC disconnected" class="stat_img" class:hidden={device.last_state.status != -2}>
			<span class="title">{device.name}</span>
		</div>

		<button class="btn_main" on:click={changeDeviceStatus(device)}></button>
		{#if device.last_state.status != -1}
			<button class="btn_more center absolute-down" style="color: #CCC;" on:click={expandDevice(device)}>...</button>
		{/if}

	</div>

<style>
	/* ---------- PERSONAL_COMPUTER ---------- */

.personal_computer {
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

.personal_computer.active {
	background-color: white;
}

.personal_computer.inactive {
	background-color: #F1F3F4;
}

.personal_computer.active:hover {
	box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.1);
}

.personal_computer:focus-within {
	border-color: lightblue;
}

.personal_computer .icon {
	display: flex;
	flex-direction: column;
	width: 100%;
	z-index: 1;
	pointer-events: none;
}





/* ---------- TEXT ---------- */

.personal_computer .title {
	letter-spacing: 0.2em;
	font-weight: bold;
	color: #666;
}





/* ---------- IMAGE ---------- */

.personal_computer .stat_img {
	max-width: 24px;
	max-height: 24px;
	margin: 5px;
}

.personal_computer .stat_img.hidden {
	display: none;
}





/* ---------- MAIN BUTTON ---------- */

.personal_computer .btn_main {
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

.personal_computer.active .btn_main {
	cursor: pointer;
}





/* ---------- "MORE" BUTTON ---------- */

.personal_computer .btn_more {
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

.personal_computer .btn_more:hover {
	box-shadow: inset 0px 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.personal_computer .btn_more:focus {
	box-shadow: inset 0px 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.personal_computer .btn_more:active {
	color: LightBlue;
}


</style>