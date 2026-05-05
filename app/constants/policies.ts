export const policyConfig = {
  updatedAt: "۱۴۰۴/۱۲/۰۸",
  cancellation: {
    freeCancellationWindowHours: 24,
    // TODO(business): Set the actual late cancellation fee percent.
    cancellationFeePercent: null as number | null,
    // TODO(business): Set the maximum refund amount in toman for guarantee cases.
    refundMaxToman: null as number | null,
    noShowRefundPercent: 0,
    providerCancellationRefundPercent: 100,
  },
} as const;
