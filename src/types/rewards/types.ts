export interface ITotalRewards {
    total_amount: number;
    total_count: number;
}

export interface IRecentRewards {
    amount: number;
    id: string;
    timestamp: string;
    validatorId: string;
    era: number;
}

interface ChartSeries {
  data: number[];
  type: string;
}

export interface IRewardHistory {
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

export interface IRewardHistoryInterval {
  value: "DAY" | "WEEK" | "MONTH" | "YEAR";
}
  
interface ValidatorCount {
    validator_id: string;
    count: number;
}
  
interface ValidatorAmount {
    validator_id: string;
    amount: number;
}

export interface IRewardRelationship {
    count: ValidatorCount[];
    amount: ValidatorAmount[];
}