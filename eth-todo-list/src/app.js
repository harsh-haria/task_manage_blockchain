// import Web3 from 'web3'
App = {
    contract: {},

    load: async() => {
        // console.log('app loading...');
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
    },
    loadWeb3: async () => {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
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
      },

      loadAccount: async() => {
        App.account = await ethereum.request({ method: 'eth_accounts' });
        // console.log(App.account);
        // console.log('test print');
      },

      loadContract: async () => {
        // create a JS version of the contracts
        // var contract = required("truffle-contract");

        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)
        // console.log(todoList);

        // Hydrate the smart contract with values from the blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    },

}

$(() => {
    $(window).load( () => {
        App.load()
    })
})