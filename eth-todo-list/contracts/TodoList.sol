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

    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public{
        createTask("Task #0");
        // createTask("harsh 2");
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false);
        emit TaskCreated(taskCount,_content,false);
    }

    function toggleCompleted (uint _id) public{
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

}