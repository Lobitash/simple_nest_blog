import { Provider } from '@nestjs/common';
import { ITransactionExecuter } from './transaction.executer.interface'; 
import { MongooseTransactionExecuter } from './mongoose.transaction.executer'; 
import { SqlTransactionExecuter } from './sql.transaction.executer'; 


export const TRANSACTION_EXECUTER = 'TRANSACTION_EXECUTER';

export const TransactionProvider: Provider = {
  provide: TRANSACTION_EXECUTER,
  useClass: process.env.DATABASE_TYPE === 'sql' ? SqlTransactionExecuter : MongooseTransactionExecuter,
};
