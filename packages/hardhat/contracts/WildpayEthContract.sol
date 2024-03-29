//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract WildpayEthContract is Pausable, ReentrancyGuard {
	address public immutable owner;
    uint256 public feePercentage = 3;
    mapping(address => uint256) public amountsReceived;
	
	event PaymentChange( address indexed sender, address indexed receiver, string newMessage, uint256 value, uint256 fee);
	event WithdrawChange(address wallet, uint256 value);
	event SaveSwitchChange(address wallet, uint256 value);

	constructor(address _owner) { owner = _owner; }

	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

    function pause() public isOwner { _pause(); }
    function unpause() public isOwner { _unpause(); }

    function setFeePercentage(uint256 _percentage) external isOwner {
        feePercentage = _percentage;
    }

	function setPayment(address _receiver, string memory _message) external payable whenNotPaused nonReentrant {
        require(msg.value > 0, "Payment value must be higher than 0");
        require(_receiver != address(0), "Receiver address cannot be zero");
        uint256 fee = (msg.value * feePercentage) / 100;
        uint256 amountAfterFee = msg.value - fee;
        amountsReceived[_receiver] += amountAfterFee;
        payable(owner).transfer(fee);
        emit PaymentChange(msg.sender, _receiver, _message, amountAfterFee, fee);
    }

	function withdraw(uint256 _amount) external whenNotPaused nonReentrant {
		require(_amount > 0, "Withdrawal amount must be greater than 0");
		require(amountsReceived[msg.sender] >= _amount, "Insufficient balance for withdrawal");
		amountsReceived[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
		emit WithdrawChange(msg.sender, _amount);
	}

	function saveSwitch(uint256 _amount) external isOwner {
		require(address(this).balance >= _amount, "Insufficient balance for rescue");
		(bool success, ) = owner.call{ value: _amount }("");
		require(success, "Failed to send Ether to owner");
		emit SaveSwitchChange(msg.sender, _amount);
	}

	receive() external payable {}
}
