import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  YourContract,
  PaymentChange,
  WithdrawChange,
  SaveSwitchChange
} from "../generated/YourContract/YourContract";
import { Payment, Withdraw, SaveSwitch } from "../generated/schema";

export function handlePaymentChange(event: PaymentChange): void {
  let payment = new Payment(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  payment.sender = event.params.sender;
  payment.receiver = event.params.receiver;
  payment.message = event.params.newMessage;
  payment.value = event.params.value;
  payment.fee = event.params.fee;
  payment.createdAt = event.block.timestamp;
  payment.transactionHash = event.transaction.hash.toHex();
  payment.save();
}

export function handleWithdrawChange(event: WithdrawChange): void {
  let withdraw = new Withdraw(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  withdraw.wallet = event.params.wallet;
  withdraw.value = event.params.value;
  withdraw.createdAt = event.block.timestamp;
  withdraw.transactionHash = event.transaction.hash.toHex();
  withdraw.save();
}

export function handleSaveSwitchChange(event: SaveSwitchChange): void {
  let saveSwitch = new SaveSwitch(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
  saveSwitch.wallet = event.params.wallet;
  saveSwitch.value = event.params.value;
  saveSwitch.createdAt = event.block.timestamp;
  saveSwitch.transactionHash = event.transaction.hash.toHex();
  saveSwitch.save();
}
