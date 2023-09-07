<script lang="ts">
    import { Visible, planList } from "$lib/stor";

    const Ttags = [
        { text: "Все", status: true, func: allVisible },
        { text: "Активные", status: false, func: activeVisible },
        { text: "Выполненные", status: false, func: inactiveVisible },
    ];

    function activeVisible() {
        planList.visible(Visible.active);
        Ttags[0].status = false;
        Ttags[1].status = true;
        Ttags[2].status = false;
    }

    function inactiveVisible() {
        planList.visible(Visible.inactive);
        Ttags[0].status = false;
        Ttags[1].status = false;
        Ttags[2].status = true;
    }

    function allVisible() {
        planList.visible(Visible.all);
        Ttags[0].status = true;
        Ttags[1].status = false;
        Ttags[2].status = false;
    }
</script>

<section class="tags">
    <p>Теги:</p>
    {#each Ttags as tag}
        <button
            class:clicked={tag.status}
            type="button"
            on:click={tag.func}
        >
            {tag.text}
        </button>
    {/each}
</section>
