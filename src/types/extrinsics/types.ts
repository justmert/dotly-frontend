interface ChartSeries {
    data: number[];
    type: string;
}

export interface IActivity {
    title: {
      text: string;
    };
    xAxis: {
      type: string;
      data: string[];
    };
    yAxis: {
      type: string;
    };
    series: ChartSeries[];
}

export interface IActivityInterval {
  value: "DAY" | "WEEK" | "MONTH" | "YEAR";
}

export interface IDistribution {
    pallets: {
      [palletName: string]: number;
    };
    calls: {
      [palletName: string]: {
        [callName: string]: number;
      };
    };
}
  
interface SuccessRateSeries {
    name: string;
    value: number;
}

export interface ISuccessRate {
    legendData: string[];
    seriesData: SuccessRateSeries[];
}

export interface ICallActivity {
    title: {
      text: string;
    };
    xAxis: {
      type: string;
      data: string[];
    };
    yAxis: {
      type: string;
    };
    series: ChartSeries[];
}

export interface ICallActivityInterval {
  value: "DAY" | "WEEK" | "MONTH" | "YEAR";
}

export interface IWeeklyTransactionRate {
    last_week_transaction_count: number;
}

export interface ITotalExtrinsics {
    total_count: number;
}

export interface IRecentExtrinsics {
    id: string;
    success: boolean;
    timestamp: string;
    mainCall: {
      callName: string;
      palletName: string;
    };
}
