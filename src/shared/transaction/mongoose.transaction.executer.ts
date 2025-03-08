/* eslint-disable @typescript-eslint/only-throw-error */
import { ClientSession, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ITransactionExecuter } from './transaction.executer.interface';
import { InjectConnection } from '@nestjs/mongoose';

// export interface ITransactionExecuter {
//   executeTransaction: <R>(
//     callback: (transactionManager: TransactionManager) => R,
//   ) => Promise<R>;
// }
@Injectable()
export class MongooseTransactionExecuter implements ITransactionExecuter {
  constructor(@InjectConnection() private readonly connection: Connection) {
    console.log('Mongoose Transaction Executer')

  }

  async executeTransaction<R>(
    callback: (transactionManager: ClientSession) => Promise<R>,
  ): Promise<R> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await callback(session);
      //   if (result instanceof Fail) throw result;
      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
      //   if (err instanceof Fail) return err as R;
      //   console.log(err);
      //   throw err;
    }
  }
}
