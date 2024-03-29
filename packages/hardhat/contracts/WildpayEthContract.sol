//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * A smart contract that allows sending of payments from a wallet to a wallet
 * @author WildPay
 */
contract WildpayEthContract is Ownable, Pausable, ReentrancyGuard {

    // States variables
    uint256 public feePercentage = 3;
    mapping(address => uint256) public amountsReceived;
	
    // Emit events
	event PaymentChange(
		address indexed sender,
		address indexed receiver,
		string newMessage,
		uint256 value,
        uint256 fee
	);

	event WithdrawChange(
		address wallet,
		uint256 value
	);

	event SaveSwitchChange(
		address wallet,
		uint256 value
	);

	// Constructor: Called once on contract deployment
	constructor() Ownable() {}

    // Pause, unpause contract
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

	/**
     * Function to set the fee percentage.
     * Can only be called by the owner.
     *
     * @param _percentage The new fee percentage
     */
    function setFeePercentage(uint256 _percentage) public onlyOwner {
        require(_percentage <= 50, "Fee percentage cannot exceed 50%");
        feePercentage = _percentage;
    }

	/**
	 * Function that allows any wallet to send ETH to a receiver wallet, updating the amountsReceived variable
	 *
	 * @param _receiver (address) - address of the receiver
	 * @param _message (string memory) - optional message associated with the payment
	 */
	function setPayment(address _receiver, string memory _message) public payable whenNotPaused nonReentrant {
        require(msg.value > 0, "Payment value must be higher than 0");
        require(_receiver != address(0), "Receiver address cannot be zero");

        // Calculate fee
        uint256 fee = (msg.value * feePercentage) / 100;
        uint256 amountAfterFee = msg.value - fee;

        // Track amounts sent to the contract
        amountsReceived[_receiver] += amountAfterFee;

        // Transfer fee to the owner
        payable(owner()).transfer(fee);

        emit PaymentChange(msg.sender, _receiver, _message, amountAfterFee, fee);
    }


	/**
	 * Function that allows the [msg.sender] to withdraw a custom amount of Ether they've received in the contract
	 * The function can only be called by the [msg.sender]
	 * 
	 * @param _amount The amount of Ether to withdraw
	 */
	function withdraw(uint256 _amount) public whenNotPaused nonReentrant {
		require(_amount > 0, "Withdrawal amount must be greater than 0");
		require(amountsReceived[msg.sender] >= _amount, "Insufficient balance for withdrawal");

		// Update wallet owner balance
		amountsReceived[msg.sender] -= _amount;

		// Transfer the specified amount to the wallet owner
        payable(msg.sender).transfer(_amount);

		emit WithdrawChange(msg.sender, _amount);
	}

	/**
	 * Function that allows the owner to rescue Ether from the contract
	 * The function can only be called by the owner
	 * 
	 * @param _amount The amount of Ether to rescue
	 */
	function saveSwitch(uint256 _amount) public onlyOwner {
		require(_amount > 0, "Rescue amount must be greater than 0");
		require(address(this).balance >= _amount, "Insufficient balance for rescue");

		(bool success, ) = owner().call{ value: _amount }("");
		require(success, "Failed to send Ether to owner");

		emit SaveSwitchChange(msg.sender, _amount);
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
