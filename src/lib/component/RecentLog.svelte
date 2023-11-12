<script>
    import { GetDatabase, GetCollections, GetIDs, Read } from '$lib/database/database.js';
    import TableRow from '$lib/component/TableRow.svelte';

    let recent_logs;
    let max_limit = 10;
    let chunk = 1;

    const _getRecentLog = async()=>{
        const db = await GetDatabase('expense');
        const collections = await GetCollections(db);
        const last_collection = collections.sort().reverse()[0];
        const ids = await GetIDs(db, last_collection);
        const sorted_ids = ids.sort().reverse();

        recent_logs = new Array(ids.length);
        let chunked_ids = [];
        while (!chunked_ids.length){
            chunk--;
            chunked_ids = sorted_ids.slice(chunk,chunk+max_limit);
        }

        if (chunk < 0) return;

        chunked_ids.forEach(
            async(id,i)=>recent_logs[i]=await Read(db,last_collection,id)
        );
    };
    _getRecentLog();

    function _rowClick(id){
        console.log(id);
    }
</script>

{#if recent_logs && recent_logs[0]}
    <table>
        <thead class='border-bottom border-solid border-gray-600 border-[1px] bg-[var(--pm-color)] text-[var(--bg-color)]'>
            <TableRow list={Object.keys(recent_logs[0])} thead
                th_class='p-3 text-left border-right border-solid border-[1px] border-gray-600'
            /> 
        </thead>
        <tbody>
            {#each recent_logs as log}
            {#if log}
                <TableRow list={Object.values(log).map(
                    (v,i) => {
                        if(Array.isArray(v))
                            return '<div class="max-w-20">'+v.reduce(
                                (ac,v)=>ac+`<p class='inline px-2 py-1 m-1 rounded-sm bg-gray-800'> ${v} </p>`
                            , '')+'</div>';
                        else if(i>=Object.keys(log).length-1)
                            return `<span class='text-gray-500'>${v}</span>`;
                        else if(!i) 
                            return `<span class='text-gray-500'>\$ </span>${v}`;
                        else if(i===5) 
                            return new Date(2000,v-1,1).toLocaleString('default',{month:'long'});
                        else return v;
                    }
                )} 
                    td_class='p-3 border-right border-solid border-[1px] border-gray-600'
                    tr_class='border-[1px] border-bottom border-solid border-gray-600 hover:bg-gray-800 hover:text-[var(--pm-color)] transition-all ease-in-out cursor-pointer'
                    on:click={()=>_rowClick(log.ID)}
                />
            {/if}
            {/each}
        </tbody>
    </table>
{/if}
