import { ResponsivePie } from '@nivo/pie'
import { Transaction } from '../../../types/transaction'
import { useChannelDistributionData } from './hooks/useChannelDistributionData';
import { ArcLinkLabel } from './ArcLinkLabel';
import { theme } from '../../../styles/StyledComponents';
import { CenteredBackround } from './CenteredBackground';

interface ChannelDistributionChartProps {
    transactions: Transaction[];
}


export const ChannelDistributionChart = ({ transactions }: ChannelDistributionChartProps) => {
    const data = useChannelDistributionData(transactions);

    return (
        <div style={{ height: 320, width: '100%' }}>
            <ResponsivePie
                layers={[CenteredBackround, 'arcs', 'arcLabels', 'arcLinkLabels', 'legends',]}
                data={data}
                margin={{ top:40, right: 120, bottom: 40, left: 120 }}
                innerRadius={0.55}
                padAngle={2.5}
                cornerRadius={8}
                activeOuterRadiusOffset={8}
                sortByValue={true}
                borderWidth={0}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                colors={{ datum: 'data.color' }}
                enableArcLabels={false}
                arcLinkLabelsOffset={7}
                arcLinkLabelsTextColor={theme.colors.neutral_600}
                // arcLinkLabelsDiagonalLength={48}
                arcLinkLabelsStraightLength={36}
                arcLinkLabelsTextOffset={16}
                arcLinkLabelsThickness={1}
                arcLinkLabelComponent={(props) => (
                    <ArcLinkLabel
                        datum={props.datum}
                        label={props.label}
                        style={props.style}
                    />
                )}
                tooltip={() => null}
                activeInnerRadiusOffset={5}
            />
        </div>
    )
} 