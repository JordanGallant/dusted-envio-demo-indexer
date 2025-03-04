/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  PointsRedeemer,
  PointsRedeemer_Claimed,
  PointsRedeemer_ClaimsToggled,
  PointsRedeemer_OwnershipTransferred,
  PointsRedeemer_Withdraw,
  Tipping,
  Tipping_FeeUpdated,
  Tipping_OwnershipTransferred,
  Tipping_TipSent,
} from "generated";

PointsRedeemer.Claimed.handler(async ({ event, context }) => {
  const entity: PointsRedeemer_Claimed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: event.params.user,
    tokenAmount: event.params.tokenAmount,
    totalPointsClaimed: event.params.totalPointsClaimed,
  };

  context.PointsRedeemer_Claimed.set(entity);
});

PointsRedeemer.ClaimsToggled.handler(async ({ event, context }) => {
  const entity: PointsRedeemer_ClaimsToggled = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    enabled: event.params.enabled,
  };

  context.PointsRedeemer_ClaimsToggled.set(entity);
});

PointsRedeemer.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: PointsRedeemer_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.PointsRedeemer_OwnershipTransferred.set(entity);
});

PointsRedeemer.Withdraw.handler(async ({ event, context }) => {
  const entity: PointsRedeemer_Withdraw = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    amount: event.params.amount,
  };

  context.PointsRedeemer_Withdraw.set(entity);
});

Tipping.FeeUpdated.handler(async ({ event, context }) => {
  const entity: Tipping_FeeUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newFee: event.params.newFee,
  };

  context.Tipping_FeeUpdated.set(entity);
});

Tipping.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: Tipping_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.Tipping_OwnershipTransferred.set(entity);
});

Tipping.TipSent.handler(async ({ event, context }) => {
  const entity: Tipping_TipSent = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: event.params.sender,
    recipient: event.params.recipient,
    amount: event.params.amount,
  };

  context.Tipping_TipSent.set(entity);
});
