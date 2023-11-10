<script>
    import Input from './Input.svelte';
    export let schema;
</script>

{#each Object.keys(schema) as schema_key, index}
    <div class='inline-block clear-both align-top pr-3 mt-5 box-border' style={'width:'+schema[schema_key].width+'%;'}>
        <label class='mn-font text-[var(--pm-color)]'>{schema_key}:</label>
        <Input schema={schema} schema_key={schema_key} index={index}/>
    </div>
{/each}
