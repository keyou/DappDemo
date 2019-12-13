// filename: Test.sol
pragma solidity ^0.5.0;

contract Test{
    uint public click_times = 10;
    mapping(address => uint) public times;
    event print(address addr);

    constructor() public {
        click_times = 5;
    }

    function click(uint t) public {
        if(click_times<=0) return;
        click_times -= t;
        times[msg.sender]++;
        emit print(msg.sender);
    }

    function getData() public view returns (uint) {
        return times[msg.sender];
    }
}
