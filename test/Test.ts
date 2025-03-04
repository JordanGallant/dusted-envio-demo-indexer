import assert from "assert";
import { 
  TestHelpers,
  PointsRedeemer_Claimed
} from "generated";
const { MockDb, PointsRedeemer } = TestHelpers;

describe("PointsRedeemer contract Claimed event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for PointsRedeemer contract Claimed event
  const event = PointsRedeemer.Claimed.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("PointsRedeemer_Claimed is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await PointsRedeemer.Claimed.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualPointsRedeemerClaimed = mockDbUpdated.entities.PointsRedeemer_Claimed.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedPointsRedeemerClaimed: PointsRedeemer_Claimed = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      user: event.params.user,
      tokenAmount: event.params.tokenAmount,
      totalPointsClaimed: event.params.totalPointsClaimed,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualPointsRedeemerClaimed, expectedPointsRedeemerClaimed, "Actual PointsRedeemerClaimed should be the same as the expectedPointsRedeemerClaimed");
  });
});
