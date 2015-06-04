import React from 'react/addons';

const SIZE = 80;

export default class Odontogram extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var L = SIZE;
        var a = L/2 - L/20;
        var b = (L - a)/2;

        var svgStyle = {
            fill: 'white',
            stroke: 'black',
            strokeWidth:1
        }


        // Template strings to define the path of the 4 poligons that define
        // 4 of 5 tooth sections
        var top = `${0},${0} ${b},${b} ${b+a},${b} ${L},${0}`;
        var left = `${0},${0} ${0},${L} ${b},${b+a} ${b},${b}`;
        var right = `${L},${0} ${b+a},${b} ${b+a},${b+a} ${L},${L}`;
        var bottom = `${0},${L} ${b},${b+a} ${b+a},${b+a} ${L},${L}`;

        return (
            <svg width={L} height={L}>
                <rect x={b} y={b} width={a} height={a} style={{fill: 'white'}}/>

                <polygon points={top} style={svgStyle} />
                <polygon points={left} style={svgStyle} />
                <polygon points={right} style={svgStyle} />
                <polygon points={bottom} style={svgStyle} />

            </svg>
        );
    }
}
