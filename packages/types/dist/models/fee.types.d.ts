import type { ID, ISODate, SemesterValue, SessionStr, AcademicLevel } from "../shared/primitives";
import type { PaymentStatus, PaymentGateway, TransactionStatus } from "../enums/status.enum";
export interface FeeSchedule {
    id: ID;
    session: SessionStr;
    semester: SemesterValue;
    level: AcademicLevel;
    departmentId: ID;
    amount: number;
    dueDate: ISODate;
    description: string;
    createdAt: ISODate;
}
export interface Invoice {
    id: ID;
    studentId: ID;
    feeScheduleId: ID;
    feeSchedule?: FeeSchedule;
    amount: number;
    amountPaid: number;
    balance: number;
    status: PaymentStatus;
    generatedAt: ISODate;
    paidAt?: ISODate;
    transactions?: Transaction[];
}
export interface Transaction {
    id: ID;
    invoiceId: ID;
    studentId: ID;
    amount: number;
    reference: string;
    gateway: PaymentGateway;
    status: TransactionStatus;
    gatewayRef?: string;
    transactedAt: ISODate;
}
export interface PaymentReceipt {
    transaction: Transaction;
    invoice: Invoice;
    studentName: string;
    matricNo: string;
    department: string;
    session: SessionStr;
    semester: SemesterValue;
    issuedAt: ISODate;
}
//# sourceMappingURL=fee.types.d.ts.map