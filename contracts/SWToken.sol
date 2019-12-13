pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract SWToken is ERC20, ERC20Detailed{
    constructor () public ERC20Detailed("SWToken", "SWT", 0){
        _mint(msg.sender,100);
    }
}
