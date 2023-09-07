<script lang="ts">
    import { planList } from "$lib/stor";
    import { onMount } from "svelte";
    import TagsWidget from "$lib/TagsWidget.svelte";

    let value: string = "";

    onMount(() => {
        planList.add({ text: "Пример 1", status: false, visible: false });
        planList.add({ text: "Пример 2", status: false, visible: false });
        planList.add({ text: "Пример 3", status: false, visible: false });
    });

    function enterInput(event: KeyboardEvent) {
        if (event.key === "Enter") {
            planList.add({ text: value, status: false, visible: false });
        }
    }
</script>

<div class="planner-input">
    <input
        on:keydown={enterInput}
        bind:value
        type="text"
        id="myInput"
        placeholder="Новая задача..."
    />
    <button
        type="button"
        id="addBtn"
        on:click={() => {
            planList.add({
                text: value,
                status: false,
                visible: false,
            });
        }}
    >
        Добавить
    </button>
</div>

<ul id="plans">
    {#each $planList.list as plan, index}
        <li class:visible={plan.visible}>
            <button
                class:checked={plan.status}
                type="button"
                id="liStr"
                on:click={() => planList.check(index)}
            >
                {plan.text}
            </button>
            <button
                type="button"
                class="close"
                on:click={() => planList.del(index)}
            >
                &#10008;
            </button>
        </li>
    {/each}
</ul>

<button type="button" id="choose-button" on:click={planList.checkAll}>
    Выделить все
</button>

<p id="quantity-all">
    Количество выполненных задач:
    {$planList.active}
</p>

<TagsWidget />

<button type="button" id="clear-button" on:click={planList.clr}>
    Очистить выполненные
</button>
