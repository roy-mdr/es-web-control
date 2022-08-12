<script>

    /* imports */
    import { onMount, createEventDispatcher } from 'svelte';
    import Modal from './Modal.svelte';
    import ControllerFound from './ControllerFound.svelte';


    /* life cycle */
    onMount(() => {
        findControllers();
    });


	/* emitters */
	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}


    /* data */

    let foundControllers = new Promise( () => {} );


    function findControllers() {
        fetch(`/controll/get_controllers.php`)
            .then( (res) => res.json() )
            .then( (data) => {
                foundControllers = Promise.resolve(data);
            } )
            .catch( (er) => {
                console.error(er);
                foundControllers = Promise.reject(er);
                /*
                foundControllers = Promise.resolve([
                    {_id:"ctrl_wemos0001",ipv4_interface:"192.168.1.72"},
                    {_id:"tulepera",ipv4_interface:"192.168.1.72"},
                    {_id:"delapapaya",ipv4_interface:"192.168.1.72"},
                    {_id:"papoy",ipv4_interface:"192.168.1.72"},
                ]);
                */
            } )
    }

</script>


<Modal title="Controllers in here" on:exitModal={closeModal}>
    {#await foundControllers}
        <div class="flex-center">
            <img src="./img/loading_rings.svg" alt="loading"/>
        </div>
    {:then controlers}
        {#if controlers.length > 0}
            {#each controlers as controller}
                <ControllerFound {controller}/>
            {/each}
        {:else}
            <div class="flex-center">
                <span class="info-text">No controllers found in this network...</span>
            </div>
        {/if}
    {:catch error}
        <div class="flex-center">
            <span class="error-text">{error.message}</span>
        </div>
    {/await}
    
</Modal>



<style>
    .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info-text {
        color: #666;
        font-style: italic;
    }

    .error-text {
        color: indianred;
        font-style: italic;
    }
</style>