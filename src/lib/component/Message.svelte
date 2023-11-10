<script>
    import { onMount } from 'svelte';
    import { fade, slide } from 'svelte/transition';

    export let success = null;
    export let message = "";
    export let error = "";
    export let timeout = null;

    $: success, (()=>{
        if (timeout && success != null) {
            setTimeout(() => {
                success = null;
            }, timeout);
        }
    })();

</script>

{#if success}
    <p in:slide={{ duration: 800  }} out:fade={{ duration: 2000 }} class='text-[var(--ac-color)]'>✅ {message}</p>
{:else if success === false}
    <p in:slide={{ duration: 800 }} out:fade={{ duration: 2000 }} class='text-[red]'>❗ {error}</p>
{/if}
