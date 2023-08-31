<script lang="ts">
    
    class planInList
    {
        private text: string = "Пример";
        private status: boolean = false;
        private visible: boolean = false;

        constructor (text: string, status: boolean, visible: boolean)
        {
            this.text = text;
            this.status = status;
            this.visible = visible;
        }

        setStatus (status:boolean)
        {
            this.status = status;
        }

        getStatus()
        {
            return this.status;
        }

        setVisible (visible:boolean)
        {
            this.visible = visible;
        }

        getVisible()
        {
            return this.visible;
        }

        getText()
        {
            return this.text;
        }
    }

    let plan1 = new planInList("Пример текста", false, false);
    let plan2 = new planInList("Пример текста", true, false);
    
    class plansList
    {
        plans: planInList[] = [plan1, plan2];
        count:number = 0;

         addNewElement()
        {
            if(value !== '')
            {
                const plan = new planInList(value, false, false);

                value = '';
                this.plans = [...this.plans, plan];
            }
        }

        removeFromList(index:number) 
        {
            this.plans.splice(index, 1)
	    	this.plans = this.plans;
            this.trueElements();
        }

        trueElements()
        {
            this.count = 0;
            let i;

            for(i = 0; i < this.plans.length; i++)
            {
                if(this.plans[i].getStatus() === true)
                {
                    this.count++;
                }
            }
        }

        checkedAll()
        {
            let i;

            for(i = 0; i < this.plans.length; i++)
            {
                this.plans[i].setStatus(true);
            }
        }

        clearTasks()
        {
            this.plans = this.plans.filter(value => value.getStatus() === false);
        }

        getCount()
        {
            this.trueElements();
            return this.count;
        }

    }

    let allPlans = new plansList();
    let value:string = '';
    let trueCount:number = 0;
    trueCount = allPlans.getCount();
    
    let Ttags = 
    [
        {text: "Все", status: true, func: allVisible},
        {text: "Активные", status: false, func: activeVisible},
        {text: "Выполненные", status: false, func: inactiveVisible}
    ]

    function enterInput(event:KeyboardEvent)
    {
        if (event.key === 'Enter')
        {
            allPlans.addNewElement();
            allPlans = allPlans;
        }
    }

    function buttonInput(event:MouseEvent)
    {
        allPlans.addNewElement();
        allPlans = allPlans;
    }

    function deleteButton(index: number)
    {
        allPlans.removeFromList(index);
        allPlans = allPlans;
        trueCount = allPlans.getCount();
    }

    function allButton()
    {
        allPlans.checkedAll();
        allPlans = allPlans;
        trueCount = allPlans.getCount();
    }

    function newStatus(index:number)
    {
        allPlans.plans[index].setStatus(!allPlans.plans[index].getStatus());
        allPlans = allPlans;
        trueCount = allPlans.getCount();
    }

    function clearAllButton()
    {
        allPlans.clearTasks();
        allPlans = allPlans;
        trueCount = allPlans.getCount();
    }


    function activeVisible()
    {
        let i;

        for(i = 0; i < allPlans.plans.length; i++)
        {
            if(allPlans.plans[i].getStatus() === true)
            {
                allPlans.plans[i].setVisible(true);
            }
            else
            {
                allPlans.plans[i].setVisible(false);
            }
        }

        Ttags[0].status = false;
        Ttags[1].status = true;
        Ttags[2].status = false;

        allPlans = allPlans;
    }

    function inactiveVisible()
    {
        let i;

        for(i = 0; i < allPlans.plans.length; i++)
        {
            if(allPlans.plans[i].getStatus() === false)
            {
                allPlans.plans[i].setVisible(true);
            }
            else
            {
                allPlans.plans[i].setVisible(false);
            }
        }

        Ttags[0].status = false;
        Ttags[1].status = false;
        Ttags[2].status = true;

        allPlans = allPlans;
    }

    function allVisible()
    {
        let i;

        for(i = 0; i < allPlans.plans.length; i++)
        {
            allPlans.plans[i].setVisible(false);
        }

        Ttags[0].status = true;
        Ttags[1].status = false;
        Ttags[2].status = false;

        allPlans = allPlans;
    }

</script>

<head>
    <title>The best planner for you</title>  
</head>
<body>
    <div>
        <header>
            <h1>Your favorite planner</h1>
        </header>
        <main>
            <div class="planner-input">
                <input on:keydown={enterInput} bind:value type="text" id="myInput" placeholder="Новая задача..."/>
                <button type="button" id="addBtn" on:click={buttonInput}>Добавить</button>
            </div>        
    
            <ul id="plans">
                {#each allPlans.plans as plan, index}
                <li class:visible={plan.getVisible()}>
                        <button class:checked={plan.getStatus()} type="button" id="liStr" on:click={() => newStatus(index)}>{plan.getText()}</button>
                        <button type="button" class="close" on:click={() => deleteButton(index)}>&#10008;</button>
                    </li>
                {/each}
            </ul>       
    
            <button type="button" id="choose-button" on:click={allButton}>Выделить все</button>
            
                
            <p id="quantity-all">Количество выполненных задач: {trueCount}</p>  
                  
            <section class="tags">
                <p>Теги:</p>
                {#each Ttags as tag}
                    <button class:clicked={tag.status} type="button" on:click={tag.func}>{tag.text}</button>
                {/each}
            </section>
            <button type="button" id="clear-button" on:click={clearAllButton}>Очистить выполненные</button>
        </main>
    </div>
</body>


<style lang="scss">
    @import '../lib/style/app.scss';
</style> 