import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts";
import {
  YourContract,
  TipChange,
} from "../generated/YourContract/YourContract";
import { Tip, Sender, Receiver } from "../generated/schema";

export function handleTipChange(event: TipChange): void {
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

  let tip = new Tip(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  tip.greeting = event.params.newGreeting;
  tip.sender = Bytes.fromHexString(senderString) ;
  tip.receiver = Bytes.fromHexString(receiverString);;
  tip.value = event.params.value;
  tip.fee = event.params.fee;
  tip.createdAt = event.block.timestamp;
  tip.transactionHash = event.transaction.hash.toHex();

  tip.save();
  sender.save();
  receiver.save();
}