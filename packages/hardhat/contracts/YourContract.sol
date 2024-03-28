//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * A smart contract that allows sending of payments from a wallet to a wallet
 * @author WildPay
 */
contract YourContract {
	address public immutable owner;
	string public message = "Dare to get paid?";
    mapping(address => uint256) public amountsReceived;
	uint256 public feePercentage;

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
	constructor(address _owner) {
		owner = _owner;
		feePercentage = 3; //default
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	modifier isOwner() {
		require(msg.sender == owner, "Not the Owner");
		_;
	}

	/**
     * Function to set the fee percentage.
     * Can only be called by the owner.
     *
     * @param _percentage The new fee percentage
     */
    function setFeePercentage(uint256 _percentage) public isOwner {
        require(_percentage <= 100, "Fee percentage cannot exceed 100%");
        feePercentage = _percentage;
    }

	/**
	 * Function that allows anyone to send a payment to a receiver, updating the state variables
	 *
	 * @param _receiver (address) - address of the receiver
	 * @param _message (string memory) - optional message associated with the payment
	 */
	function setPayment(address _receiver, string memory _message) public payable {
        require(msg.value > 0, "Payment value must be higher than 0");
        require(_receiver != address(0), "Receiver address cannot be zero");

        // Calculate fee
        uint256 fee = (msg.value * feePercentage) / 100;
        uint256 amountAfterFee = msg.value - fee;

        // Track amounts sent to the contract
        amountsReceived[_receiver] += amountAfterFee;

        // Transfer fee to the owner
        (bool feeTransferSuccess, ) = owner.call{ value: fee }("");
        require(feeTransferSuccess, "Failed to send fee to owner");

        emit PaymentChange(msg.sender, _receiver, _message, amountAfterFee, fee);
    }


	/**
	 * Function that allows the [msg.sender] to withdraw a custom amount of Ether they've received in the contract
	 * The function can only be called by the [msg.sender]
	 * 
	 * @param _amount The amount of Ether to withdraw
	 */
	function withdraw(uint256 _amount) public {
		require(_amount > 0, "Withdrawal amount must be greater than 0");
		require(amountsReceived[msg.sender] >= _amount, "Insufficient balance for withdrawal");

		// Update sender's balance
		amountsReceived[msg.sender] -= _amount;

		// Transfer the specified amount to the sender
		(bool success, ) = msg.sender.call{ value: _amount }("");
		require(success, "Failed to send amount");

		// Emit WithdrawChange event
		emit WithdrawChange(msg.sender, _amount);
	}

	/**
	 * Function that allows the owner to rescue Ether from the contract
	 * The function can only be called by the owner
	 * 
	 * @param _amount The amount of Ether to rescue
	 */
	function saveSwitch(uint256 _amount) public isOwner {
		require(_amount > 0, "Rescue amount must be greater than 0");
		require(address(this).balance >= _amount, "Insufficient balance for rescue");

		(bool success, ) = owner.call{ value: _amount }("");
		require(success, "Failed to send Ether to owner");

		// Emit SaveSwitchChange event
		emit SaveSwitchChange(msg.sender, _amount);
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
