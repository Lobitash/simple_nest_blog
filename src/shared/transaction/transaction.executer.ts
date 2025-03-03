import { Injectable } from "@nestjs/common";
import { ITransactionExecuter } from "./transaction.executer.interface";

@Injectable()
export class TransactionManager implements ITransactionExecuter {

  async executeTransaction<R>(
    callback: (transactionManager: any) => Promise<R>,
  ): Promise<R> {
    return callback(null)
  }

}