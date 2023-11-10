<script>
    import { GetDatabase, Write, Read } from '$lib/database/database.js';
    import { getSchema, updateSchemaChoices } from '$lib/database/schema';
    import InputList from '$lib/component/InputList.svelte';
    import Message from '$lib/component/Message.svelte';

    let schema;
    let is_update_choices = null;
    let is_write_data = null;

    const _getSchema = async ()=>{
        schema = await getSchema('expense_schema');
        Object.entries(schema).forEach(([key, field])=> {
            schema[key].value = eval(`(${field.default})()`);
        });
        return schema;
    };
    _getSchema();

    const unionArray = (arr1, arr2)=>[...new Set(arr1.concat(arr2))]; 
    async function submit(){
        is_update_choices = !!await updateSchemaChoices('expense_schema',
            Object.entries(schema)
                //get only the schema with choices
                .filter( ([key, {choices}])=>!!choices )
                //unionize choices with new one and remove duplciate
                .map( ([key, field])=>[key,{...field, choices: unionArray(field.choices, field.value)}] )
        );

        const data = Object.fromEntries(
            Object.entries(schema).map(([key, {value}])=>[key, value])
        );

        is_write_data = !!await Write( await GetDatabase('expense'), `${data.Year}-${data.Month}`, data.ID, data);

        _getSchema();
    }
</script>

<main class='flex px-5 py-5 w-full h-[100vh]'>
    <div class='w-[40%]'>
        <h1 class='text-[var(--tx-color)] hd-font text-2xl'>Financialist</h1>
        <h2>Create Logs:</h2>
        <form class='w-[100%]'>
            {#if schema}
                {#key schema.ID.value}
                    <InputList schema={schema} />
                {/key}
            {/if}
            <button on:click={submit} class='sd-button mt-8'>Add</button>
        </form>

        <div class='mt-5'>
            <Message message="Updated tags" error="Cannot Update tags" bind:success={is_update_choices} timeout={3000}/>
            <Message message="Saved Log" error="Cannot Save Log" bind:success={is_write_data} timeout={3000}/>
        </div>
    </div>

    <div class='mx-3 border-l border-1 border-[#ffffff22]'></div>

    <div class='rounded-md w-full p-5 pt-0 pl-0'>
        <h2 class='hd-font text-xl pl-5'>Recent Logs</h2>
    </div>
</main>

