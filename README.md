# task_manage_blockchain
Blockchain Application using Ethereum Smart Contracts and Solidity to manage tasks given to members of a team.

<!-- steps to run the project:
1) create a new folder named <project_folder_name>
2) run 'truffle init'
3) create 'package.json' file and install dependencies using 'npm install'
4) create a file called '<contract_name>.sol'. This is to create a smart contract
5) add whatever you want in the above file and then compile it using command 'truffle compile'. This creates additional files in build folder if you want to check them out
6) Now we need to migrate the contract onto the blockchain. To do this we need to create a file under the folder 'migrations'. In this folder migrations are done according to the file number so be careful about that.
7) Name the file '2_deploy_contracts.js' and write the code. save it.
8) Now in command line type 'truffle migrate'. This will push the contract onto the blockchain and now it is permanent. Make sure you have ganache running before you try this step or else it wont work.
9) To check whether you have deployed successfully, use the console of truffle which you can enable by typing 'truffle console' in terminal. example shown below <br><br>
    todolist = await TodoList.deployed()<br>
    todolist.address<br><br>
10) if you get some address in Hex that means you have followed all the steps correctly.
11) you can also access other information like number of tasks etc. example shown below<br><br>
    task = await todoList.taskCount()<br>
    task.toNumber()<br><br>
12) if you have created a constructor in the file 'TodoList.sol', We will also see some tasks inside the blocks.
13) you can access them by using command 'task = await todolist.task(<id>)' in truffle console.
this will return some data. If you want some specific field in struct task then you can use command 
'task.content'. this example returns the content of the specific task of that particular id.  -->
