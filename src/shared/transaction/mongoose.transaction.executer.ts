import { ClientSession, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ITransactionExecuter } from './transaction.executer.interface';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongooseTransactionExecuter implements ITransactionExecuter {
  constructor(@InjectConnection() private readonly connection: Connection) {
  }

  async executeTransaction<R>(
    callback: (transactionManager: ClientSession) => Promise<R>,
  ): Promise<R> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const result = await callback(session);
      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  }
}
