import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PaymentChange,
  SaveSwitchChange,
  WithdrawChange
} from "../generated/YourContract/YourContract"

export function createPaymentChangeEvent(
  sender: Address,
  receiver: Address,
  newMessage: string,
  value: BigInt,
  fee: BigInt
): PaymentChange {
  let paymentChangeEvent = changetype<PaymentChange>(newMockEvent())

  paymentChangeEvent.parameters = new Array()

  paymentChangeEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  paymentChangeEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  paymentChangeEvent.parameters.push(
    new ethereum.EventParam("newMessage", ethereum.Value.fromString(newMessage))
  )
  paymentChangeEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  paymentChangeEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return paymentChangeEvent
}

export function createSaveSwitchChangeEvent(
  wallet: Address,
  value: BigInt
): SaveSwitchChange {
  let saveSwitchChangeEvent = changetype<SaveSwitchChange>(newMockEvent())

  saveSwitchChangeEvent.parameters = new Array()

  saveSwitchChangeEvent.parameters.push(
    new ethereum.EventParam("wallet", ethereum.Value.fromAddress(wallet))
  )
  saveSwitchChangeEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return saveSwitchChangeEvent
}

export function createWithdrawChangeEvent(
  wallet: Address,
  value: BigInt
): WithdrawChange {
  let withdrawChangeEvent = changetype<WithdrawChange>(newMockEvent())

  withdrawChangeEvent.parameters = new Array()

  withdrawChangeEvent.parameters.push(
    new ethereum.EventParam("wallet", ethereum.Value.fromAddress(wallet))
  )
  withdrawChangeEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return withdrawChangeEvent
}
