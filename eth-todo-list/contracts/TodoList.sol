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

    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    constructor() public{
        createTask("harsh 1");
        // createTask("harsh 2");
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);
        emit TaskCreated(taskCount,_content,false);
    }

}