export interface ITransactionExecuter {
    executeTransaction<R>(
      callback: (transactionManager: any) => Promise<R>,
    ): Promise<R>;
  }
  
  // export interface ITransactionExecuter {
  //   executeTransaction: <R>(
  //     callback: (transactionManager: TransactionManager) => R,
  //   ) => Promise<R>;
  // }
  