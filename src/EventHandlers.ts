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

const createOrUpdateGlobalStats = async (fields: any, context: any) => {
  let globalStats = await context.GlobalStats.get("global");

  if (globalStats) {
    // Update only the fields that exist in the event object
    for (const key in fields) {
      if (fields[key] !== undefined && key in globalStats) {
        globalStats[key] = fields[key];
      }
    }
  } else {
    globalStats = {
      id: "global",
      tippingFee: BigInt(0),
      tippingOwner: "deployer address",
      pointsOwner: "deployer address",
      pointsClaimable: false
    };
  }

  await context.GlobalStats.set(globalStats);

};

const createUser = async (address: string, context: any) => {
  let user = await context.User.get(address)

  if (!user) {
     user = {
       id: address,
       address: address,      
     }
     context.User.set(user);
  } 
} 

PointsRedeemer.Claimed.handler(async ({ event, context }) => {

  const {user, tokenAmount, totalPointsClaimed} = event.params;

  const entity: PointsRedeemer_Claimed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    user: user,
    tokenAmount: tokenAmount,
    totalPointsClaimed: totalPointsClaimed,
  };

  context.PointsRedeemer_Claimed.set(entity);

 await createUser(user, context);

});

PointsRedeemer.ClaimsToggled.handler(async ({ event, context }) => {
  const entity: PointsRedeemer_ClaimsToggled = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    enabled: event.params.enabled,
  };

  context.PointsRedeemer_ClaimsToggled.set(entity);

  await createOrUpdateGlobalStats({pointsClaimable: event.params.enabled}, context);
});

PointsRedeemer.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: PointsRedeemer_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.PointsRedeemer_OwnershipTransferred.set(entity);

  await createOrUpdateGlobalStats({pointsOwner: event.params.newOwner}, context);
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

  await createOrUpdateGlobalStats({tippingFee: event.params.newFee}, context);
});

Tipping.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: Tipping_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.Tipping_OwnershipTransferred.set(entity);

  await createOrUpdateGlobalStats({tippingOwner: event.params.newOwner}, context);
});

Tipping.TipSent.handler(async ({ event, context }) => {

  let {sender, recipient, amount} = event.params;

  const entity: Tipping_TipSent = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    sender: sender,
    recipient: recipient,
    amount: amount,
  };

  context.Tipping_TipSent.set(entity);

  await createUser(sender, context);
});
