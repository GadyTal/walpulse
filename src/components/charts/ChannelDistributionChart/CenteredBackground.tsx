interface CenteredBackroundProps {
    centerX: number;
    centerY: number;
    radius: number;
}

export const CenteredBackround = ({ centerX, centerY, radius }: CenteredBackroundProps) => {
    const newRadius = radius * 1.4;
    const svgSize = (newRadius * 2);
    const svgX = centerX - newRadius;
    const svgY = centerY - newRadius;

    return (
        <svg
            width={svgSize}
            height={svgSize}
            viewBox="0 0 316 316"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={svgX}
            y={svgY}
        >
            <g filter="url(#filter0_d_6_406)">
                <ellipse cx="157.763" cy="155.501" rx="127.735" ry="127.5" fill="white" />
            </g>
            <defs>
                <filter id="filter0_d_6_406" x="0.027832" y="0.400854" width="315.47" height="315" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="2.4" />
                    <feGaussianBlur stdDeviation="15" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_406" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_406" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}