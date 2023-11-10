<script>
    export let success = null;
    export let message = "";
</script>

{#if success}
    <p class='text-[var(--ac-color)]'>
        <i class="fa-solid fa-check"></i> {message}
    </p>
{:else if success === false}
    <p class='text-[#ff5555]'>
        <i class="fa-solid fa-xmark"></i> {message}
    </p>
{/if}
