import { writable } from 'svelte/store';

function createLastEvent() {

    const emptyEv = {
        iat: 0,
        ep:{
            requested: "",
            emitted: ""
        },
        e:{
            type: "",
            detail: null
        }
    }

	const { subscribe, set, update } = writable(emptyEv);

	return {
		subscribe,
        set,
		reset: () => set(emptyEv)
	};
}

export const lastEvent = createLastEvent();