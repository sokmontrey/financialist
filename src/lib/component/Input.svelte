<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import Tags from 'svelte-tags-input';

    export let input_schema;
    export let placeholder;
    let type = input_schema.type;
    let default_func = input_schema.default;
</script>

{#if type === "select"}
    <AutoComplete items={input_schema.choices} inputClassName='pm-input' placeholder={placeholder} />
{:else if type === "multiple-select"}
    <Tags autoComplete={input_schema.choices} addKeys={[13, 188]} placeholder={placeholder}/>
{:else}
    <input type={type} class='pm-input' value={eval(`(${default_func})()`)} placeholder={placeholder}/>
{/if}


