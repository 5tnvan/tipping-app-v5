//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
//import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows sending of payments from a wallet to a wallet
 * @author WildPay
 */
contract YourContract {
	// State Variables
	address public immutable owner;
	string public message = "Dare to get paid?";
    mapping(address => uint256) public amountsReceived;  // Mapping to track amounts sent to each receiver

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event PaymentChange(
		address indexed sender,
		address indexed receiver,
		string newMessage,
		uint256 value,
        uint256 fee
	);

	// Constructor: Called once on contract deployment
	// Check packages/hardhat/deploy/00_deploy_your_contract.ts
	constructor(address _owner) {
		owner = _owner;
	}

	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {

		require(msg.sender == owner, "Not the Owner");
		_;
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

        // Calculate 3% fee
        uint256 fee = (msg.value * 3) / 100;
        uint256 amountAfterFee = msg.value - fee;

        // Track amounts sent to the contract
        amountsReceived[_receiver] += amountAfterFee;

        // Transfer 3% fee to the owner
        (bool feeTransferSuccess, ) = owner.call{ value: fee }("");
        require(feeTransferSuccess, "Failed to send fee to owner");

        emit PaymentChange(msg.sender, _receiver, _message, amountAfterFee, fee);
    }


	/**
	 * Function that allows the [msg.sender] to withdraw all the Ether they've received in the contract
	 * The function can only be called by the [msg.sender]
	 */

    function withdraw() public {
        uint256 amount = amountsReceived[msg.sender];
        require(amount > 0, "No amount to withdraw");

        amountsReceived[msg.sender] = 0;
        (bool success, ) = msg.sender.call{ value: amount }("");
        require(success, "Failed to send amount");

    }

	/**
	 * Function that allows the owner to rescue all the Ether in the contract
	 * The function can only be called by the owner
	 */

    function saveSwitch() public isOwner {
		(bool success, ) = owner.call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
