pragma solidity ^0.5.0;

contract TodoList{
    uint public taskCount = 0;

    struct Task{
        uint id;
        string content;
        bool completed;
        //need to be updated
        string assigner;
        string assigned_to;
        string deadline;
        // uint timestamp;
        // uint timeRemaining;
    }

    mapping (uint=> Task) public tasks;

    event TaskCreated(
        uint id,
        string content,
        bool completed,
        string assigner,
        string assigned_to,
        string deadline
    );

    event TaskCompleted(
        uint id,
        bool completed
    );

    constructor() public{
        createTask("Task #0","harsh","meet","23 June 2022");
        // createTask("harsh 2");
    }

    function createTask(string memory _content, string memory _assigner,string memory _assignedTo, string memory _deadline) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount,_content,false,_assigner,_assignedTo,_deadline);
        emit TaskCreated(taskCount,_content,false,_assigner,_assignedTo,_deadline);
    }

    function toggleCompleted (uint _id) public{
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }

}