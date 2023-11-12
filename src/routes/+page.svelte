<script>
    import LogInput from '$lib/component/LogInput.svelte';
    import RecentLog from '$lib/component/RecentLog.svelte'; 
</script>

<main class='flex px-5 py-5 w-full h-[100vh]'>
    <div class='w-[40%]'>
        <h1 class='text-[var(--ac-color)] hd-font text-4xl'>Financialist</h1>
        <h2 class='text-xl opacity-50 hd-font'>Create Logs:</h2>

        <LogInput />
    </div>

    <div class='mx-3 border-l border-1 border-[#ffffff22]'></div>

    <div class='rounded-md w-full p-5 pt-0 pl-0'>
        <h2 class='hd-font text-xl opacity-50 pl-5 mb-5'>Recent Logs</h2>
        <RecentLog />
    </div>
</main>

