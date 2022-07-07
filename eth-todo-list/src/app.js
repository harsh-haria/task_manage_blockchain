//https://stackoverflow.com/questions/67204850/intermediate-value-tobignumber-is-not-a-function
App = {
    contracts: {},
    loading: false,

    load: async () => {
        await App.loadWeb3();
        await App.loadAccounts();
        await App.loadContract();
        await App.render();
    },
   
      // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
         window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            console.log("Loaded....")
            try {
                // Request account access if needed
                await ethereum.enable();
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */});
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
        });
    },

    loadAccounts: async () => {
        // connect to all the accounts, we want index 0 since, its the first account
        // the account we are connected to
        App.account = await ethereum.request({ method: 'eth_accounts' });
        console.log(App.account);
    },

    loadContract: async () => { //server issue fixed
        // create a JS version of the contracts
        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
        console.log(todoList);

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async () => {
        //prevent double render
        if (App.loading) {
            return;
        }

        // // Update app loading state
        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)

        // Render Tasks
        await App.renderTasks()

        // // Update loading state
        App.setLoading(false)
        },


    renderTasks: async () => {
        //here we have 3 jobs
        //0) Load all the tasks from the blockchain
        //1) render tasks from our Application blockchain
        //2) Show all the tasks accordingly

    //     // load all the tasks from the blockchain
        const taskCount = await App.todoList.taskCount();
        const $tackTemplate = $(".taskTemplate");

    //     // render each of the tasks
        for (var i = 1; i <= taskCount; i++){
            const task = await App.todoList.tasks(i);
            const task_id = task[0].toNumber();
            const task_content = task[1];
            const task_completed = task[2];
            const task_assigner = task[3];
            const task_assigned_to = task[4];
            const task_deadline = task[5];
            // const task_timestamp = task[5];
            // const task_timeRemaining = task[7];


    //         // Create the html for the task
            const $newTaskTemplate = $tackTemplate.clone()
            $newTaskTemplate.find('.content').html(task_id+' -> '+task_content+' -> '+ task_assigner+ ' -> '+task_assigned_to+' -> '+task_deadline)
            // $newTaskTemplate.find('.content').html(<ul><li>task_id</li></ul>)
            $newTaskTemplate.find('input')
                            .prop('name', task_id)
                            .prop('checked', task_completed)
                            .prop('assigner',task_assigner)
                            .on('click', App.toggleCompleted)
    
    //         // Put the task in the correct list
            if (task_completed) {
                $('#completedTaskList').append($newTaskTemplate)
            } else {
                $('#taskList').append($newTaskTemplate)
            }
    
    //         // Show the task
            $newTaskTemplate.show()
        }

    },


    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        if (boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    },


    createTask: async () => {
        App.setLoading(true);
        const content = $('#newTask').val();
        const senderBox = $('#newAssigner').val();
        const recv = $('#newAssignedTo').val();
        const deadline = $('#newDeadline').val();
        // await App.todoList.createTask(content,{from:App.account[0]});
        await App.todoList.createTask(content,senderBox,recv,deadline,{from:App.account[0]});
        // await App.todoList.createTask(content,sender,recv,deadline);
        window.location.reload();
    },


    toggleCompleted: async (e) => {
        App.setLoading(true)
        const taskId = e.target.name
        await App.todoList.toggleCompleted(taskId, { from: App.account[0] });
        window.location.reload()
    },
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})