<script>
	import { createEventDispatcher } from 'svelte';

	export let target;

	const dispatch = createEventDispatcher();
</script>

<div
	class="small_toggle square-small"
	class:active={target.status >= 0}
	class:inactive={target.status < 0}
>
	<div class="icon center noselect">
		<img src="./img/bulb_on.svg" alt="Led on" class="stat_img" class:hidden={target.status != 1} />
		<img
			src="./img/bulb_off.svg"
			alt="Led off"
			class="stat_img"
			class:hidden={target.status != 0}
		/>
		<img
			src="./img/loading.svg"
			alt="Led waiting"
			class="stat_img"
			class:hidden={target.status != -1}
		/>
		<img
			src="./img/bulb_disc.svg"
			alt="Led disconnected"
			class="stat_img"
			class:hidden={target.status != -2}
		/>
		<span class="title">{target.name}</span>
	</div>

	<button
		class="btn_main"
		on:click={() => {
			if (target.status >= 0) {
				dispatch('toggle');
			}
		}}
	/>
</div>

<style>
	/* ---------- SMALL_TOGGLE ---------- */

	.small_toggle {
		display: flex;
		flex-direction: column;
		margin: 0.5em;
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

	.small_toggle.active {
		background-color: white;
	}

	.small_toggle.inactive {
		background-color: #f1f3f4;
	}

	.small_toggle.active:hover {
		box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.1);
	}

	.small_toggle:focus-within {
		border-color: lightblue;
	}

	.small_toggle .icon {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* z-index: 1; */
		pointer-events: none;
	}

	/* ---------- TEXT ---------- */

	.small_toggle .title {
		letter-spacing: 0.2em;
		font-weight: bold;
		color: #666;
		text-align: center;
	}

	/* ---------- IMAGE ---------- */

	.small_toggle .stat_img {
		max-width: 24px;
		max-height: 24px;
		margin: 5px;
	}

	.small_toggle .stat_img.hidden {
		display: none;
	}

	/* ---------- MAIN BUTTON ---------- */

	.small_toggle .btn_main {
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

	.small_toggle.active .btn_main {
		cursor: pointer;
	}
</style>
