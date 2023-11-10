<script>
    import AutoComplete from 'simple-svelte-autocomplete';
    import Tags from 'svelte-tags-input';

    export let schema;
    export let schema_key;
    export let index;

    let this_schema = schema[schema_key];
    let type = this_schema.type;
</script>

{#if type === "select"}
    <AutoComplete items={this_schema.choices} bind:selectedItem={this_schema.value} onCreate={(new_v)=>{
        this_schema.choices = [...this_schema.choices, new_v]
        return new_v;
    }} create inputClassName='pm-input' placeholder={schema_key} />
{:else if type === "multiple-select"}
    <Tags autoComplete={this_schema.choices} bind:tags={this_schema.value} addKeys={[13, 188]} placeholder={schema_key}/>
{:else if type === "number"}
    <input type="number" autofocus={!index} class='pm-input' bind:value={this_schema.value} placeholder={schema_key}/>
{:else if type === "text"}
    <input type="text" autofocus={!index} class='pm-input' bind:value={this_schema.value} placeholder={schema_key}/>
{/if}


