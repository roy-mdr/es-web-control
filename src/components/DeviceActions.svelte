<script>

	/* imports */
	import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';


	/* props */
	export let device; // = {}
  export let lastEvent;
	export let controllersAvailable; // = []


	/* emitters */
	const dispatch = createEventDispatcher();

	function closeDevice() {
		// deviceObj.expanded = true;
		dispatch('device-close');
	}

	function sendAction(action) {
		dispatch('sendAction', {device_id: device._id, action: action});
	}

	function lastEventReceived() {
		dispatch('lastEventReceived');
	}


  


	function updateControllersStatus(controllers) {
		console.log(controllers);

		device.actions.forEach((action) => {
			action.available = controllers.includes(action.controller);
		});

    device = device;
	}


	/* watchers */
	$: updateControllersStatus(controllersAvailable);

  function checkEventTopic(lstEv) {
		if ( typeof lstEv == 'object' ) {
			if ( lstEv.ep.requested == device.ep || lstEv.ep.emitted == device.ep ) {
				gotEvent(lstEv);
			}
		}
	}
	$: checkEventTopic(lastEvent);


  /* data */

	let responses = [];

  function gotEvent(ev) {
    responses.push(ev);
    responses = responses;
    lastEventReceived();
    console.log("RESPONSES gotEvent:", responses);
  }

  function removeResponse(resIndex) {
    responses.splice(resIndex, 1);
    responses = responses;
    console.log("RESPONSES removeResponse:", responses);
  }
</script>



<Modal title={device.name} on:exitModal={closeDevice}>
  {#each device.actions as action}
    <div class:unavailable={ action.available === false }>
        {#if action.details !== undefined}
            {#each Object.entries(action.details) as [det_key, det_val], detIndex (det_key) }
                {#if (typeof det_val === 'string' || det_val instanceof String)}
                  <div>
                    <label>
                      <!-- <span>{det_key}</span> -->
                      <input type="text" placeholder={det_key} class="input_big" on:input={(ev) => { action.details[det_key] = ev.target.value }}>
                    </label>
                  </div>    
                {/if}
            {/each}
        {/if}
        <button type="button" class="btn_grey" on:click={() => { sendAction(action); }}>{action.desc}</button>
    </div>
    <hr>
  {/each}
</Modal>

{#each responses as response, resIx}
  <Modal title={`${device.name}: ${response.e.type}`} on:exitModal={ () => { removeResponse(resIx) } }>
    <pre>
      { response.e.detail == undefined ? "" : JSON.stringify(response.e.detail, null, 2) }
    </pre>
  </Modal>
{/each}
