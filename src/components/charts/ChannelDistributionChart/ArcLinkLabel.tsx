import { animated, SpringValue } from '@react-spring/web';
import { UtmSourceColors } from '../../../constants/UtmSourceColors';
import { Interpolation } from '@react-spring/web';
import { theme } from '../../../styles/StyledComponents';

interface ArcLinkLabelProps {
    datum: {
        value: number;
        [key: string]: any;
    };
    label: string;
    style: {
        opacity: SpringValue<number>;
        linkColor: SpringValue<string>;
        thickness: number;
        path: Interpolation<string>;
        textPosition: Interpolation<string>;
        textAnchor: Interpolation<"start" | "end">;
        textColor: SpringValue<string>;
    };
}

export const ArcLinkLabel = ({ datum, label, style }: ArcLinkLabelProps) => {
    return (
        <animated.g opacity={style.opacity}>
            <animated.path
                fill="none"
                stroke={theme.colors.neutral_50}
                strokeWidth={style.thickness}
                d={style.path}
            />
            <animated.text
                y={-10}
                x={5}
                transform={style.textPosition}
                textAnchor={style.textAnchor}
                dominantBaseline="central"
                style={{
                    fontWeight: 800,
                    fill: UtmSourceColors[label as keyof typeof UtmSourceColors],
                    fontSize: '1.5rem',
                }}
            >
                {datum.value}%
            </animated.text>
            
            <animated.text
                key={`arcLinkLabel_segment_${label}`}
                y={10}
                transform={style.textPosition}
                textAnchor={style.textAnchor}
                dominantBaseline="central"
                style={{
                    fontWeight: 400,
                    fill: style.textColor,
                }}
            >
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </animated.text>
        </animated.g>
    );
}; 