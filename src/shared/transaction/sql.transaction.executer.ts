import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ITransactionExecuter } from './transaction.executer';

@Injectable()
export class SqlTransactionExecuter implements ITransactionExecuter {
  constructor(private readonly dataSource: DataSource) {}

  async executeTransaction<R>(
    callback: (transactionManager: EntityManager) => Promise<R>,
  ): Promise<R> {
    return this.dataSource.transaction(async (manager) => {
      return callback(manager);
    });
  }
}
