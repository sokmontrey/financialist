<script>
    import Input from './Input.svelte';
    export let schema;
</script>

{#each Object.keys(schema) as schema_key}
    <div class='inline-block clear-both align-top pr-3 mt-5 box-border' style={'width:'+schema[schema_key].width+'%;'}>
        <p class='mn-font mb-1 text-[var(--pm-color)]'>{schema_key}:</p>
        <Input input_schema={schema[schema_key]} placeholder={schema_key} />
    </div>
{/each}
