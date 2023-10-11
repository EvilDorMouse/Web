<script lang="ts">
    //import LogExample from "$lib/logExample.svelte";
    import { MyNet } from "$lib/PetriNet";

    let countPlace: number = 0;
    let countTrans: number = 0;
    //let inputList: number[][] = [];
    //let outputList: number[][] = [];

    function buttonClick(event: MouseEvent)
    {
        MyNet.update((val) =>
        {
            val.setPlaces(countPlace);
            val.setTransitions(countTrans);
            return val;
        })
    }
</script>

<!-- <LogExample /> -->

<div>
    <label for="place">Количество узлов:</label>
    <input type="number" id="place" bind:value={countPlace}><br>

    <label for="trans">Количество переходов:</label>
    <input type="number" id="trans" bind:value={countTrans}><br>

    <button type="button" on:click={buttonClick}>Создать сеть Петри</button>

    <br>
    <span>{$MyNet.places}</span>
    <br>
    <span>{$MyNet.transitions}</span>
</div>