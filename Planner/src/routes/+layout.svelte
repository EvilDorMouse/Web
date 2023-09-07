<script lang="ts">
    import "$lib/style/app.scss";
</script>

<svelte:head>
    <title>The best planner for you</title>
</svelte:head>

<div>
    <header>
        <h1>Your favorite planner</h1>
    </header>
    <main>
        <slot />
    </main>
</div>
