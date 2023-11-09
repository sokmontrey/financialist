<script>
    import { GetDatabase, Write, Read } from '$lib/database/database.js';
    import { getSchema } from '$lib/database/schema';

    import InputList from '$lib/component/InputList.svelte';

    let schema;
    const _getSchema = async ()=>{
        schema = await getSchema('expense_schema');
    };

    _getSchema();
</script>

<main class='flex px-[5%] py-10 w-full h-[100vh]'>
    <div>
        <h1 class='text-[var(--tx-color)] hd-font text-2xl'>Financialist</h1>
    </div>

    <div class='mx-10 border-l border-1 border-[#ffffff22]'></div>

    <div class='flex-1 rounded-md w-full p-5 pt-0 pl-0'>
        <h2 class='hd-font text-xl'>New Log</h2>
        <hr class='border-[#ffffff22] border-1 my-5'>
        <div class='w-[50%] mx-auto'>
            {#if schema}
                <InputList schema={schema} />
            {/if}
        </div>
    </div>
</main>

