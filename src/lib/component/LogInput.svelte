<script>
    import { slide, fade } from 'svelte/transition';

    import { getSchema } from '$lib/database/schema';
    import { updateSchema, writeData } from '$lib/log.js';

    import InputList from '$lib/component/InputList.svelte';
    import Message from '$lib/component/Message.svelte';

    let schema;
    let submit_message = [];

    const _getSchema = async ()=>{
        schema = await getSchema('expense_schema');
        Object.entries(schema).forEach(([key, field])=> {
            schema[key].value = eval(`(${field.default})()`);
        });
        return schema;
    };
    _getSchema();

    async function submit(){
        const messages = [
            await updateSchema(schema), 
            await writeData(schema)
        ];

        submit_message = messages.reduce((final,[success,m])=>
            [
                !success?final[0].concat(m):final[0],
                success ?final[1].concat(m):final[1]
            ]
        ,[[],[]]);

        setTimeout(()=>
            submit_message = []
        , 2000);

        if (!submit_message[0].length) _getSchema();
    }
</script>

<div class='w-[100%]'>
    {#if schema}
        {#key schema.ID.value}
            <InputList schema={schema} />
        {/key}
    {/if}
    <button type='submit' on:click={submit} class='sd-button mt-8'>Add</button>
</div>

{#key submit_message.lengt}
{#if submit_message.length}
    <div class='mt-5' 
        in:slide={{ duration: 1000 }}
        out:fade={{ duration: 1000 }}
    >
        {#each submit_message[0] as fail_m }
            <Message message={fail_m} success={false} />
        {/each}
        {#each submit_message[1] as success_m }
            <Message message={success_m} success={true} />
        {/each}
    </div>
{/if}
{/key}
