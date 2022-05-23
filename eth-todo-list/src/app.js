// import Web3 from 'web3'
App = {
    load: async() => {
        // console.log('app loading...');
        await App.loadWeb3()
        await App.loadAccount()
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
        var accounts = web3.eth.getAccounts()
        console.log(accounts[0])
      }
}

$(() => {
    $(window).load( () => {
        App.load()
    })
})