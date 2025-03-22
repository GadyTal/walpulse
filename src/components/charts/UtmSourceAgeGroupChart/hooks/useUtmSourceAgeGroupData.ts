import { useMemo } from "react";
import { AgeGroupColors } from "../../../../constants/AgeGroupColors";
import { UtmSourceColors } from "../../../../constants/UtmSourceColors";
import { Transaction, UtmSource, AgeGroup } from "../../../../types/transaction";
import { UtmSourceAgeGroupData, UtmSourceAgeGroupNode } from "../UtmSourceAgeGroupChart.types";

const AGE_GROUPS = ['Under 15', '15-19', '20-29', '30-39', '40-49', '50+'] as const;

const calculateAgeGroup = (birthdayTime: number): string => {
    if (!birthdayTime || birthdayTime <= 0) return '30-39'; // Default to middle age group for invalid data
    const now = Date.now();
    const age = Math.floor((now - birthdayTime) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (age < 15) return 'Under 15';
    if (age < 20) return '15-19';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    return '50+';
};

export const useUtmSourceAgeGroupData = (transactions: Transaction[]): UtmSourceAgeGroupData => {
    return useMemo(() => {
        // Create nodes for each UTM source that has transactions
        // Each node has a unique ID and color from the UtmSourceColors mapping
        const utmNodes: UtmSourceAgeGroupNode[] = Object.values(UtmSource)
            .filter(source => transactions.some(t => t.utm_source === source))
            .map(source => ({
                id: source as string,
                color: UtmSourceColors[source as UtmSource]
            }));

        // Create nodes for each age group
        // These will be the target nodes in the Sankey diagram
        const ageNodes: UtmSourceAgeGroupNode[] = AGE_GROUPS.map(group => ({
            id: group,
            color: AgeGroupColors[group as AgeGroup]
        }));

        // Calculate the flow between UTM sources and age groups
        // Uses a Map to efficiently count connections between sources and targets
        const linkMap = new Map<string, number>();
        transactions.forEach(transaction => {
            const source = transaction.utm_source;
            const target = calculateAgeGroup(transaction.customer_metadata.birthday_time);
            // Use a separator that won't appear in the age group names
            const key = `${source}::${target}`;
            linkMap.set(key, (linkMap.get(key) || 0) + 1);
        });

        // Transform the link map into the format required by the Sankey diagram
        // Each link has a source, target, and value (number of transactions)
        const links = Array.from(linkMap.entries()).map(([key, value]) => {
            const [source, target] = key.split('::');
            return { source, target, value };
        });

        // Filter out nodes that have no connections
        // This prevents orphaned nodes in the visualization
        const filteredUtmNodes = utmNodes.filter(node => links.some(link => link.source === node.id));
        const filteredAgeNodes = ageNodes.filter(node => links.some(link => link.target === node.id));

        // Validate that all nodes referenced in links exist
        // This prevents runtime errors in the Sankey diagram
        const allNodeIds = new Set([...filteredUtmNodes, ...filteredAgeNodes].map(node => node.id));
        const invalidLinks = links.filter(link => !allNodeIds.has(link.source) || !allNodeIds.has(link.target));
        
        if (invalidLinks.length > 0) {
            console.error('Invalid links found:', invalidLinks);
            console.error('Available nodes:', Array.from(allNodeIds));
        }

        return {
            nodes: [...filteredUtmNodes, ...filteredAgeNodes],
            links: links.filter(link => allNodeIds.has(link.source) && allNodeIds.has(link.target))
        };
    }, [transactions]);
}; 