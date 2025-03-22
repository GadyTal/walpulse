import { Transaction } from '../../../types/transaction';

export interface UtmSourceAgeGroupNode {
    id: string;
    color?: string;
}

export interface UtmSourceAgeGroupLink {
    source: string;
    target: string;
    value: number;
}

export interface UtmSourceAgeGroupData {
    nodes: UtmSourceAgeGroupNode[];
    links: UtmSourceAgeGroupLink[];
}

export interface UtmSourceAgeGroupChartProps {
    transactions: Transaction[];
} 