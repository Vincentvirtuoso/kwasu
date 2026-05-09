export var AnnouncementStatus;
(function (AnnouncementStatus) {
    AnnouncementStatus["DRAFT"] = "draft";
    AnnouncementStatus["PENDING"] = "pending";
    AnnouncementStatus["APPROVED"] = "approved";
    AnnouncementStatus["REJECTED"] = "rejected";
})(AnnouncementStatus || (AnnouncementStatus = {}));
export var ClearanceStatus;
(function (ClearanceStatus) {
    ClearanceStatus["NOT_APPLIED"] = "not-applied";
    ClearanceStatus["PENDING"] = "pending";
    ClearanceStatus["APPROVED"] = "approved";
    ClearanceStatus["REJECTED"] = "rejected";
})(ClearanceStatus || (ClearanceStatus = {}));
export var SiwesStatus;
(function (SiwesStatus) {
    SiwesStatus["NOT_STARTED"] = "not-started";
    SiwesStatus["ONGOING"] = "ongoing";
    SiwesStatus["COMPLETED"] = "completed";
    SiwesStatus["APPROVED"] = "approved";
    SiwesStatus["REJECTED"] = "rejected";
})(SiwesStatus || (SiwesStatus = {}));
export var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "open";
    TicketStatus["IN_PROGRESS"] = "in-progress";
    TicketStatus["RESOLVED"] = "resolved";
    TicketStatus["CLOSED"] = "closed";
})(TicketStatus || (TicketStatus = {}));
export var TicketCategory;
(function (TicketCategory) {
    TicketCategory["ACADEMIC"] = "academic";
    TicketCategory["FINANCE"] = "finance";
    TicketCategory["HOSTEL"] = "hostel";
    TicketCategory["PORTAL"] = "portal";
    TicketCategory["SIWES"] = "siwes";
    TicketCategory["CLEARANCE"] = "clearance";
    TicketCategory["OTHER"] = "other";
})(TicketCategory || (TicketCategory = {}));
export var ElectionStatus;
(function (ElectionStatus) {
    ElectionStatus["UPCOMING"] = "upcoming";
    ElectionStatus["OPEN"] = "open";
    ElectionStatus["CLOSED"] = "closed";
    ElectionStatus["RESULTS"] = "results";
})(ElectionStatus || (ElectionStatus = {}));
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["UNPAID"] = "unpaid";
    PaymentStatus["PARTIAL"] = "partial";
    PaymentStatus["PAID"] = "paid";
})(PaymentStatus || (PaymentStatus = {}));
export var PaymentGateway;
(function (PaymentGateway) {
    PaymentGateway["REMITA"] = "remita";
    PaymentGateway["PAYSTACK"] = "paystack";
    PaymentGateway["FLUTTERWAVE"] = "flutterwave";
})(PaymentGateway || (PaymentGateway = {}));
export var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["SUCCESS"] = "success";
    TransactionStatus["FAILED"] = "failed";
})(TransactionStatus || (TransactionStatus = {}));
export var HostelGender;
(function (HostelGender) {
    HostelGender["MALE"] = "male";
    HostelGender["FEMALE"] = "female";
    HostelGender["MIXED"] = "mixed";
})(HostelGender || (HostelGender = {}));
export var MaterialType;
(function (MaterialType) {
    MaterialType["PDF"] = "pdf";
    MaterialType["DOC"] = "doc";
    MaterialType["PPT"] = "ppt";
    MaterialType["VIDEO"] = "video";
    MaterialType["IMAGE"] = "image";
    MaterialType["OTHER"] = "other";
})(MaterialType || (MaterialType = {}));
export var Semester;
(function (Semester) {
    Semester["FIRST"] = "first";
    Semester["SECOND"] = "second";
})(Semester || (Semester = {}));
export var Grade;
(function (Grade) {
    Grade["A"] = "A";
    Grade["B"] = "B";
    Grade["C"] = "C";
    Grade["D"] = "D";
    Grade["E"] = "E";
    Grade["F"] = "F";
})(Grade || (Grade = {}));
//# sourceMappingURL=status.enum.js.map