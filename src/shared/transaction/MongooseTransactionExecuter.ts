// /* eslint-disable @typescript-eslint/only-throw-error */
// import { ClientSession, Connection } from 'mongoose';

// export interface ITransactionExecuter {
//   executeTransaction: <R>(
//     callback: (transactionManager: TransactionManager) => R,
//   ) => Promise<R>;
// }

// export class MongooseTransactionExecuter implements ITransactionExecuter {
//   constructor(private readonly connection: Connection) {}

//   async executeTransaction<R>(
//     callback: (transactionManager: ClientSession) => R,
//   ) {
//     const session = await this.connection.startSession();
//     session.startTransaction();
//     try {
//       const result = await callback(session);
//       if (result instanceof Fail) throw result;
//       await session.commitTransaction();
//       await session.endSession();
//       return result;
//     } catch (err) {
//       await session.abortTransaction();
//       await session.endSession();
//       if (err instanceof Fail) return err as R;
//       console.log(err);
//       throw err;
//     }
//   }
// }
