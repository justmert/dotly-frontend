export interface ITotalTransfers {
    total_count: number;
    received: number;
    sent: number;
}

export interface IRecentTransfers {
  id: string;
  transfer: {
    blockNumber: number;
    timestamp: string;
    extrinsicHash: string;
    from: {
      publicKey: string;
    };
    amount: string;
    success: boolean;
    to: {
      publicKey: string;
    };
  };
  direction: string;
}

interface ChartSeries {
  name: string;
  type: string;
  data: number[];
}

export interface ITransferHistory {
  xAxis: {
    type: string;
    data: string[];
  };
  yAxis: {
    type: string;
  };
  series: ChartSeries[];
}

interface TransactionCount {
  public_id: string;
  count: number;
}

interface TransactionAmount {
  public_id: string;
  amount: number;
}

export interface ITransferRelationship {
  count: {
    senders: TransactionCount[];
    receivers: TransactionCount[];
  };
  amount: {
    senders: TransactionAmount[];
    receivers: TransactionAmount[];
  };
}

export interface ITransferHistoryInterval {
  value: "YEAR" | "MONTH" | "WEEK" | "DAY";
}