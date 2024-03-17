import { PaymentChange as PaymentChangeEvent } from "../generated/contractsepolia/contractsepolia"
import { PaymentChange } from "../generated/schema"

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
