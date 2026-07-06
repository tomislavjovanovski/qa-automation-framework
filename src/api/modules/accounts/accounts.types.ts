export interface AccountDetails {
  id: string;
  iban: string;
  currency: string;
  balance: number;
  status: "ACTIVE" | "BLOCKED" | "CLOSED";
}

export interface CreatePaymentRequest {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  currency: string;
  idempotencyKey: string;
}

export interface PaymentResponse {
  paymentId: string;
  status: "PENDING" | "BOOKED" | "REJECTED";
}

