import { ResponsiveSankey } from '@nivo/sankey';
import { UtmSourceAgeGroupChartProps } from './UtmSourceAgeGroupChart.types';
import { theme } from '../../../styles/StyledComponents';
import { capitalizeFirstLetter } from '../../../utils/stringFormatters';
import { useUtmSourceAgeGroupData } from './hooks/useUtmSourceAgeGroupData';

export const UtmSourceAgeGroupChart = ({ transactions }: UtmSourceAgeGroupChartProps) => {
    const data = useUtmSourceAgeGroupData(transactions);

    return (
        <div style={{ height: 700 }}>
            <ResponsiveSankey
                data={data}
                margin={{ top: 20, right: 80, bottom: 0, left: 80 }}
                align="justify"
                colors={{ datum: 'color' }}
                nodeThickness={20}
                nodeSpacing={15}
                nodeBorderWidth={0}
                nodeOpacity={1}
                nodeHoverOpacity={0.7}
                nodeHoverOthersOpacity={0.5}
                linkOpacity={0.3}
                linkHoverOpacity={0.7}
                linkHoverOthersOpacity={0.55}
                enableLinkGradient={true}
                labelPosition="outside"
                labelPadding={10}
                labelTextColor={theme.colors.neutral_600}
                label={(node) => capitalizeFirstLetter(node.id)}
                animate={true}
                linkTooltip={() => null}
                nodeTooltip={() => null}
                sort={'input'}
            />
        </div>
    );
}; 