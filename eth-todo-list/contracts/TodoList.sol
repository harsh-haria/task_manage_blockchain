pragma solidity ^0.5.0;

contract TodoList{
    uint public taskCount = 0;

    struct Task{
        uint id;
        string content;
        bool completed;
        // string assignee;
        // string assigned_to;
        // uint timestamp;
        // uint deadline;
        // uint timeRemaining;
    }

    mapping (uint=> Task) public tasks;

    constructor() public{
        createTask("This is a first test case");
    }

    function createTask(string memory _content) public{
        tasks[++taskCount] = Task(taskCount,_content,false);
    }

}