<script lang="ts">
    import { MyNet } from "$lib/PetriNet";

    let input: number[][] = [ [2, 3, 0, 0], [3, 0, 0, 0] ];
    let output: number[][] = [ [0, 0, 8, 0], [0, 0, 5, 5] ];

    let arg1: number = input.length;
    let arg2: number = input[0].length;

    let inc: number [][];

    let M0: number[] = [10, 6, 0, 0];
    let res:number[];

    MyNet.subscribe(MyClass =>
    {
        if(MyClass.places.length !== 0 && MyClass.transitions.length !== 0)
        {
            console.log('inputs: ');
            MyClass.inputs.forEach((val) => console.log(val));

            console.log('outputs: ');
            MyClass.outputs.forEach((val) => console.log(val));
            
            console.log('incident: ')
            inc = MyClass.CreateIncident();
            console.log(inc);

            console.log('Mk: ')
            res = MyClass.SystemState(M0, inc, 4);
            console.log(res);

            console.log('-----------------------');
        }
    })

    function getMyNet()
    {
        MyNet.update(val =>
        {
            val.Create(arg2, arg1, input, output);
            return val;
        })
    }
</script>

<div>
    <button
    type="button"
    on:click={getMyNet}
    >Тест-Коноль</button>
</div>

