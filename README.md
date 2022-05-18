﻿# task_manage_blockchain
Blockchain Application using Ethereum Smart Contracts and Solidity

steps to run the project:
1) create a new folder named <project_folder_name>
2) run 'truffle init'
3) create 'package.json' file and install dependencies using 'npm install'
4) create a file called '<contract_name>.sol'. This is to create a smart contract
5) add whatever you want in the above file and then compile it using command 'truffle compile'. This creates additional files in build folder if you want to check them out
6) Now we need to migrate the contract onto the blockchain. To do this we need to create a file under the folder 'migrations'. In this folder migrations are done according to the file number so be careful about that.
7) Name the file '2_deploy_contracts.js' and write the code. save it.
8) now in command line type 'truffle migrate'. This will push the contract onto the blockchain and now it is permanent.
9) To check whether you have deployed successfully, use the console of truffle which you can enable by typing 'truffle console' in terminal. example shown below <break>
    todolist = await TodoList.deployed()
    todolist.address
10) if you get some address in Hex that means you have followed all the steps correctly.
11) you can also access other information like number of tasks etc. example shown below<break>
    task = await todoList.taskCount()
    task.toNumber()
12) 