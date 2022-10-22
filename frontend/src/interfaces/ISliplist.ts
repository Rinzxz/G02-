import { BankingInterface } from "./IBanking";
import { PaymentstatusInterface } from "./IPaymentstatus";
import { StudentlistInterface } from "./IStudentlist";

export interface SliplistInterface {
  ID?: number;
  Total: String | null;
  Slipdate: Date | null;
  BankingID?: number;
  Banking?: BankingInterface;
  PayID?: number;
  Pay?: PaymentstatusInterface;
  StudentListID?: number;
  StudentList?: StudentlistInterface;
}