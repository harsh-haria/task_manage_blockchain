//pragma solidity ^0.8.12; //not working :/
pragma solidity ^0.5.0;
//writing comments to remember stuff :p

contract ManSys{ 
    uint public taskCount = 0; //this represents the state of the smart contract

    struct Task{ //model a task
        uint id;
        string content;
        bool completed;
        // string assigner;
        // int timestamp_assigned;
        // int timestamp_toComplete;
        // string details;
    }
    //now once we have cretated a task, we want it to be stored on the blockchain
    //lets see how to access the storage
    mapping(uint => Task) public tasks;

    constructor() public {
        createTask("This is the first task being put into the blockchain storage");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }


}
