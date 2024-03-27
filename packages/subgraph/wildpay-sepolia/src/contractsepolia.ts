import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import { PaymentChange as PaymentChangeEvent } from "../generated/contractsepolia/contractsepolia"
import { Payment, Sender, Receiver } from "../generated/schema";

export function handlePaymentChange(event: PaymentChangeEvent): void {
  let senderString = event.params.sender.toHexString();
  let receiverString = event.params.receiver.toHexString();

  let sender = Sender.load(senderString);
  let receiver = Receiver.load(receiverString);

  if (sender === null) {
    sender = new Sender(senderString);
    sender.address = event.params.sender;
    sender.createdAt = event.block.timestamp;
  } 

  if (receiver === null) {
    receiver = new Receiver(receiverString);
    receiver.address = event.params.receiver;
    receiver.createdAt = event.block.timestamp;
  } 

  let payment = new Payment(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  payment.message = event.params.newMessage;
  payment.sender = Bytes.fromHexString(senderString) ;
  payment.receiver = Bytes.fromHexString(receiverString);;
  payment.value = event.params.value;
  payment.fee = event.params.fee;
  payment.createdAt = event.block.timestamp;
  payment.transactionHash = event.transaction.hash.toHex();

  payment.save();
  sender.save();
  receiver.save();
}
