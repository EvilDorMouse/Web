<script lang="ts">
    //import action from "/action.js";

    let allPlans = [{text: "example", status: false, visible: false}];
    let Ttags = 
    [
        {text: "Все", status: true, func: allVisible},
        {text: "Активные", status: false, func: activeVisible},
        {text: "Выполненные", status: false, func: inactiveVisible}
    ]
    let value = '';
    let trueCount = 0;
   
    function addNewElement()
    {
        if(value !== '')
        {
            const plan = 
            {
                text: value,
                status: false,
                visible:false
            };

            value = '';
            allPlans = [...allPlans, plan];
        }
    }

    function enterInput(event)
    {
        if (event.key === 'Enter')
        {
            addNewElement();
        }
    }

    function removeFromList(index) 
    {
		allPlans.splice(index, 1)
		allPlans = allPlans;
        trueElements();
    }

    function newStatus(index)
    {
        allPlans[index].status = !allPlans[index].status;
        trueElements();
    }

    function trueElements()
    {
        trueCount = 0;
        let i;

        for(i = 0; i < allPlans.length; i++)
        {
            if(allPlans[i].status === true)
            {
                trueCount++;
            }
        }
    }

    function checkedAll()
    {
        let i;

        for(i = 0; i < allPlans.length; i++)
        {
            allPlans[i].status = true;
        }

        trueCount = allPlans.length;
    }

    function activeVisible()
    {
        let i;

        for(i = 0; i < allPlans.length; i++)
        {
            if(allPlans[i].status === true)
            {
                allPlans[i].visible = true;
            }
            else
            {
                allPlans[i].visible = false;
            }
        }

        Ttags[0].status = false;
        Ttags[1].status = true;
        Ttags[2].status = false;
    }

    function inactiveVisible()
    {
        let i;

        for(i = 0; i < allPlans.length; i++)
        {
            if(allPlans[i].status === false)
            {
                allPlans[i].visible = true;
            }
            else
            {
                allPlans[i].visible = false;
            }
        }

        Ttags[0].status = false;
        Ttags[1].status = false;
        Ttags[2].status = true;
    }

    function allVisible()
    {
        let i;

        for(i = 0; i < allPlans.length; i++)
        {
                allPlans[i].visible = false;
        }

        Ttags[0].status = true;
        Ttags[1].status = false;
        Ttags[2].status = false;
    }

    function clearTasks()
    {
        allPlans = allPlans.filter(value => value.status === false);
        trueElements();
    }
</script>

<head>
    <title>The best planner for you</title>

    <link href="style.css" rel="stylesheet" type="text/css">

    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Kalam:wght@300&display=swap" rel="stylesheet">
</head>
<body>
    <div>
        <header>
            <h1>Your favorite planner</h1>
        </header>
        <main>
            <div class="planner-input">
                <input on:keydown={enterInput} bind:value type="text" id="myInput" placeholder="Новая задача..."/>
                <button type="button" id="addBtn" on:click={addNewElement}>Добавить</button>
            </div>        
    
            <ul id="plans">
                {#each allPlans as plan, index}
                    <li class:visible={plan.visible}>
                        <button class:checked={plan.status} type="button" id="liStr" on:click={() => newStatus(index)}>{plan.text}</button>
                        <button type="button" class="close" on:click={ () => removeFromList(index)}>&#10008;</button>
                    </li>
                {/each}
            </ul>       
    
            <button type="button" id="choose-button" on:click={checkedAll}>Выделить все</button>
                
            <p id="quantity-all">Количество выполненных задач: {trueCount}</p>  
                  
            <section class="tags">
                <p>Теги:</p>
                {#each Ttags as tag}
                    <button class:clicked={tag.status} type="button" on:click={tag.func}>{tag.text}</button>
                {/each}
            </section>
            <button type="button" id="clear-button" on:click={clearTasks}>Очистить выполненные</button>
        </main>
    </div>
</body>    

<style>
*
{
    margin: 0px;
    padding: 0px;

    box-sizing: border-box;
}

*:focus {outline:none !important}

 body
{
    width: 855px;
    min-height: 900px;
    height: fit-content;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
}

div
{
    padding: 60px;
    padding-top: 20px;
}

header
{
    width: 735px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    background-color: rgb(147, 253, 218);
    
    padding: 5px;
    border-width: 10px;
    border-style: solid;
    border-color: rgb(147, 253, 218);
    border-radius: 20px;

    text-align: center;
    font-size: 20px;
    font-family: 'Dancing Script', cursive;  
}

input, button
{
    padding: 5px;

    font-family: 'Kalam', cursive;
    font-size: 15px;
}

button
{
    border-radius: 20px;
}

input, #addBtn
{
    height: 40px;

    margin: 15px 0;
    border: 2px solid #d9d9d9;
    box-shadow: 0 0 10px 4px rgba(0,0,0,0.05);

    transition: .3s;
}

input
{
    width: 75%;
    float: left;
    border-radius: 20px 0 0 20px;
    padding-left: 10px;
}

input:hover, input:focus
{
    box-shadow: 0 0 20px 4px rgba(46, 229, 157, .4);
    border: 2px solid #2EE59D; 
}

#addBtn 
{
    width: 25%;
    float: right;
    border-radius: 0 20px 20px 0;

    background: #d9d9d9;
    color: #555;
    text-align: center;
    cursor: pointer;
}

#addBtn:hover 
{
    background-color: #bbb;
    border-color: #bbb;
}

.planner-input:after 
{
    content: "";
    display: table;
    clear: both;
}

button
{
    width: 100%;
    background-color: white;
    box-shadow: 0 0 20px 4px rgba(0, 0, 0, 0.05);
    border: 2px solid #eee;

    transition: .3s;
}

#plans
{
    margin-top: 30px;
    margin-bottom: 60px;
}

#liStr, p
{
    font-family: 'Kalam', cursive;
}

li
{
    list-style-type: none;
}

#liStr
{
    width: 92%;
    height: 38px;
    margin: 0;
    border: 0;
    padding: 5px 5px 5px 40px;
    box-shadow: none;
    border-radius: 0;
    background-color: none;
    position: relative;
    border-bottom: 1px solid #eee;


    text-align: left;
    transition: 0.2s;
}

#liStr:hover
{
    background-color: #eeeaea;
} 

#choose-button, #clear-button
{
    margin-top: 10px;
    padding: 5px;
    height: 40px;
}

#choose-button:hover, #clear-button:hover
{
    background: #2EE59D;
    box-shadow: 0 15px 20px rgba(46, 229, 157, .4);
    color: white;
    border: 0;
    transform: translateY(-7px);
}

#quantity-all
{
    margin-top: 50px;
    text-align: right;
    vertical-align: bottom;
    border-bottom: 1px solid #eee;
}

.tags
{
    margin-top: 20px;
    margin-bottom: 20px;
}

.tags button
{
    width: min-content;
}

.clicked
{
    background: #2EE59D;
    border: 2px solid #2EE59D; 
}

.checked 
{
    border: 0;
    background: #888;
    color: #fff;
    text-decoration: line-through; 
}

.checked::before 
{
    content: '';
    position: absolute;
    border-color: #fff;
    border-style: solid;
    border-width: 0 2px 2px 0;
    top: 5px;
    left: 15px;
    transform: rotate(45deg);
    height: 15px;
    width: 7px;
}

.close 
{
    margin: 0;
    border: 0;
    border-radius: 0;

    right: 0;
    top: 0;
    box-shadow: none;
  
    width: 8%;
    float: right;
    height: 38px;

    background-color: #eeeaea;
    border-top: 1px solid #eeeaea;
    border-bottom: 1px solid rgb(206, 206, 206);
    text-align: center;
}

.close:hover 
{
    background-color: #f44336;
    border-color: #f44336;
    color: white;
}

.visible
{
    display: none;
}

</style>