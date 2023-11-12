<script>
    export let list = [];
    export let thead = false;
    export let tr_class = '';
    export let th_class = '';
    export let td_class = '';
</script>

{#if list.length}
    <tr class={tr_class} on:click>
        {#each list as ele}
        {#if thead}
            <th class={th_class}>
                {ele}
            </th>
        {:else}
            <td class={td_class}>{@html ele}</td>
        {/if}
        {/each}
    </tr>
{/if}

