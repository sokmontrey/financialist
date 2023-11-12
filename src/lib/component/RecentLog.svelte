<script>
    import { GetDatabase, GetCollections, GetIDs, Read } from '$lib/database/database.js';

    let recent_logs;
    let max_limit = 10;

    const _getRecentLog = async()=>{

        const db = await GetDatabase('expense');
        const collections = await GetCollections(db);
        const last_collection = collections.sort().reverse()[0];
        const ids = await GetIDs(db, last_collection);

        recent_logs = new Array(ids.length);
        ids.sort().reverse().slice(0, max_limit).forEach(
            async(id, i) => recent_logs[i]=await Read(db,last_collection,id)
        );
        console.log(recent_logs)
    };

    _getRecentLog();
</script>

{#if recent_logs && recent_logs[0]}
    <table>
        <tr>
            {#each Object.keys(recent_logs[0]) as key }
                <td>{key}:</td>
            {/each}
        </tr>

        {#each recent_logs as log}
        {#if log}
            <tr>
                {#each Object.values(log) as value}
                    <td>{value}</td>
                {/each}
            </tr>
        {/if}
        {/each}
    </table>
{/if}
