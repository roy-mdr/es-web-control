<script>
	/* imports */
	import { createEventDispatcher } from 'svelte';
	import { circOut, circIn, circInOut } from 'svelte/easing';

	/* animation */
	let fadedClass = true;

	function intro(node, { mode, init, duration }) {
		return {
			duration,
			css: (t) => {
				let eased;

				if (mode.toLowerCase() == 'in') {
					eased = circOut(t);
				} else if (mode.toLowerCase() == 'out') {
					eased = circIn(t);
				} else {
					eased = circInOut(t);
				}

				return `transform: scale(${init + eased * (1 - init)}); opacity: ${eased};`;
			}
		};
	}

	/* props */
	export let title;

	/* emitters */
	const dispatch = createEventDispatcher();

	function exitModal() {
		dispatch('exitModal');
	}
</script>

<div class="modal-container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="modal-overlay" on:click={exitModal} />

	<div class="modal">
		<div class="modal-close">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="10"
				height="10"
				viewBox="0 0 14 14"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
					fill="black"
				/>
			</svg>
		</div>
		<div class="modal-title">
			<h1>{title}</h1>
		</div>
		<div class="modal-content">
			<slot />
		</div>
	</div>
</div>

<style>
	/* @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"); */

	/* html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
  font-size: 70%;
  line-height: 1.4;
  font-family: "Inter", sans-serif;
  color: #6b7280;
  font-weight: 400;
}
@media only screen and (min-width: 600px) {
  body {
    justify-content: center;
    align-items: center;
    display: flex;
    height: 100vh;
    font-size: 100%;
  }
} */

	/* ---------- BUTTON ---------- */

	.modal-content :global(.btn_grey) {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		border-radius: 5px;
		/*border: 1px solid white;*/
		border: none;
		box-sizing: border-box;
		/*min-width: 20em;*/
		padding: 1em;
		transition: all 0.2s;
		width: 100%;
		background-color: #999;
		color: #eee;
		cursor: pointer;
		letter-spacing: 0.2em;
	}

	.modal-content :global(.btn_grey:hover) {
		background-color: #666;
		box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.1);
	}

	.modal-content :global(.btn_grey:focus) {
		background-color: #666;
		border-color: #f1f2f4;
	}

	.modal-content :global(.btn_grey:active) {
		box-shadow: inset 0px 5px 10px 0 rgba(0, 0, 0, 0.1);
		color: LightBlue;
	}

	.modal {
		background: #ffffff;
		border-radius: 5px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
		left: 50%;
		max-width: 90%;
		pointer-events: none;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 30em;
		text-align: left;
		max-height: 90vh;
		display: flex;
		flex-direction: column;
		/* z-index: 10; */
	}
	.modal .modal-close {
		align-items: center;
		color: #111827;
		display: flex;
		height: 4.5em;
		justify-content: center;
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		width: 4.5em;
	}
	.modal .modal-close svg {
		display: block;
	}
	.modal .modal-title {
		color: #333333;
		padding: 1em 2em;
		pointer-events: all;
		position: relative;
		/* width: min-content; */
		width: fit-content;
		max-width: 70%;
	}
	.modal .modal-title h1 {
		font-size: 1.25rem;
		font-weight: 600;
		line-height: normal;
	}
	.modal .modal-content {
		border-top: 1px solid #e0e0e0;
		padding: 2em;
		pointer-events: all;
		overflow: auto;
	}

	.modal-overlay {
		transition: opacity 0.2s ease-out;
		pointer-events: none;
		background: rgba(0, 0, 0, 0.75);
		position: fixed;
		opacity: 0;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
	}
	.modal-container .modal-overlay {
		pointer-events: all;
		opacity: 0.5;
	}

	.modal-container summary {
		list-style: none;
	}
	.modal-container summary:focus {
		outline: none;
	}
	.modal-container summary::-webkit-details-marker {
		display: none;
	}

	code {
		font-family: Monaco, monospace;
		line-height: 100%;
		background-color: #2d2d2c;
		padding: 0.1em 0.4em;
		letter-spacing: -0.05em;
		word-break: normal;
		border-radius: 5px;
		color: white;
		font-weight: normal;
		font-size: 1.75rem;
		position: relative;
		top: -2px;
	}

	.container {
		text-align: center;
		max-width: 40em;
		padding: 2em;
	}
	.container > h1 {
		font-weight: 700;
		font-size: 2rem;
		line-height: normal;
		color: #111827;
	}
	.container > p {
		margin-top: 2em;
		margin-bottom: 2em;
	}
	.container sup {
		font-size: 1rem;
		margin-left: 0.25em;
		opacity: 0.5;
		position: relative;
	}

	/* .paddme:not(:first-of-type) {
  padding-top: 1em;
} */

	.modal-content :global(hr) {
		height: 1px;
		border: none;
		background-color: #ccc;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	.modal-content :global(.unavailable) {
		opacity: 25%;
		cursor: not-allowed;
	}

	.modal-content :global(.unavailable *) {
		pointer-events: none;
	}

	.modal-content :global(.input_big) {
		padding: 0.5em;
		margin-bottom: 0.5em;
		width: 50%;
	}
</style>
