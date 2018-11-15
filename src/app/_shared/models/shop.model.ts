
export interface Voucher {
  voucherCode: string;
  userUid: string;
  recipientEmail: string;
  recipientName: string;
  recipientMessage: string;
  recipientDate: Date;
  recipientAddress: string;
  voucherAmount: number;
  voucherType: string;
  optionalAmount: number;
}
