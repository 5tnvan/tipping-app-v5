import {
  PaymentChange as PaymentChangeEvent,
  SaveSwitchChange as SaveSwitchChangeEvent,
  WithdrawChange as WithdrawChangeEvent
} from "../generated/WildpayEthContract/WildpayEthContract"
import {
  PaymentChange,
  SaveSwitchChange,
  WithdrawChange
} from "../generated/schema"

export function handlePaymentChange(event: PaymentChangeEvent): void {
  let entity = new PaymentChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.receiver = event.params.receiver
  entity.newMessage = event.params.newMessage
  entity.value = event.params.value
  entity.fee = event.params.fee

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSaveSwitchChange(event: SaveSwitchChangeEvent): void {
  let entity = new SaveSwitchChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.wallet = event.params.wallet
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawChange(event: WithdrawChangeEvent): void {
  let entity = new WithdrawChange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.wallet = event.params.wallet
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
