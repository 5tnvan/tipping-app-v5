//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
		// State Variables
	address public immutable owner;
	string public greeting = "Building Unstoppable Apps!!!";
    mapping(address => uint256) public amountsReceived;  // Mapping to track amounts sent to each receiver

	// Events: a way to emit log statements from smart contract that can be listened to by external parties
	event TipChange(
		address indexed sender,
		address indexed receiver,
		string newGreeting,
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
		// msg.sender: predefined variable that represents address of the account that called the current function
		console.log(msg.sender);
		console.log(owner);

		require(msg.sender == owner, "Not the Owner");
		_;
	}

	/**
 * Function that allows anyone to send a tip to a receiver, updating the state variables
 *
 * @param _receiver (address) - address of the receiver
 * @param _greeting (string memory) - optional greeting associated with the tip
 */
function setTip(address _receiver, string memory _greeting) public payable {
        require(msg.value > 0, "Tip value must be higher than 0");
        require(_receiver != address(0), "Receiver address cannot be zero");

        // Calculate 3% fee
        uint256 fee = (msg.value * 3) / 100;
        uint256 amountAfterFee = msg.value - fee;

        // Print data to the hardhat chain console. Remove when deploying to a live network.
        // Print data to the hardhat chain console. Remove when deploying to a live network.
		console.log("Sending tip '%s' from %s to %s", _greeting, msg.sender, _receiver);
		console.log("Amount After Fee: %s, Fee: %s", amountAfterFee, fee);

        // Track amounts sent to the contract
        amountsReceived[_receiver] += amountAfterFee;

        // Transfer 1.99% fee to the owner
        (bool feeTransferSuccess, ) = owner.call{ value: fee }("");
        require(feeTransferSuccess, "Failed to send fee to owner");

        emit TipChange(msg.sender, _receiver, _greeting, amountAfterFee, fee);
    }


	/**
	 * Function that allows the owner to withdraw all the Ether in the contract
	 * The function can only be called by the owner of the contract as defined by the isOwner modifier
	 */

    function withdrawAmount() public {
        uint256 amount = amountsReceived[msg.sender];
        require(amount > 0, "No amount to withdraw");

        amountsReceived[msg.sender] = 0;
        (bool success, ) = msg.sender.call{ value: amount }("");
        require(success, "Failed to send amount");

    }

	/**
	 * Function that allows the contract to receive ETH
	 */
	receive() external payable {}
}
