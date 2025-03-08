import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { ITransactionExecuter } from './transaction.executer.interface';

@Injectable()
export class SqlTransactionExecuter implements ITransactionExecuter {
  constructor(private readonly dataSource: DataSource) {
    console.log('SQL Transaction Executer')

   }


  async executeTransaction<R>(
    callback: (transactionManager: QueryRunner) => Promise<R>,
  ): Promise<R> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  // async executeTransaction<R>(
  //   callback: (transactionManager: EntityManager) => Promise<R>,
  // ): Promise<R> {
  //   return this.dataSource.transaction(async (manager) => {
  //     return callback(manager);
  //   });
  // }
}

