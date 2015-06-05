import React from 'react/addons';

const SIZE = 60;

export default class Tooth extends React.Component {
    constructor(props) {
        super(props);

        this.activeZone = props.activeZone;
        this.toothNumber = props.toothNumber;
    }

    componentWillReceiveProps(nextProps) {
        this.activeZone = nextProps.activeZone;
        this.toothNumber = nextProps.toothNumber;
    }

    onClick(zone, event) {
        this.props.onClick(zone);
    }

    render() {
        var L = SIZE;
        var a = L/2 - L/20;
        var b = (L - a)/2;

        // Template strings to define the path of the 4 poligons that define
        // 4 of 5 tooth sections
        var top = `${0},${0} ${b},${b} ${b+a},${b} ${L},${0}`;
        var left = `${0},${0} ${0},${L} ${b},${b+a} ${b},${b}`;
        var right = `${L},${0} ${b+a},${b} ${b+a},${b+a} ${L},${L}`;
        var bottom = `${0},${L} ${b},${b+a} ${b+a},${b+a} ${L},${L}`;

        return (
            <div style={{width: `${L}px`}} className="tooth-wrapper">
                <span>{this.toothNumber}</span>
                <svg width={L} height={L} className="tooth">
                    <rect
                        x={b}
                        y={b}
                        width={a}
                        height={a}
                        onClick={this.onClick.bind(this, 'center')}
                        className={this.activeZone === 'center' ? 'active' : null}
                        />

                    <polygon
                        points={top}
                        onClick={this.onClick.bind(this, 'top')}
                        className={this.activeZone === 'top' ? 'active' : null}
                        />

                    <polygon
                        points={left}
                        onClick={this.onClick.bind(this, 'left')}
                        className={this.activeZone === 'left' ? 'active' : null}
                        />

                    <polygon
                        points={right}
                        onClick={this.onClick.bind(this, 'right')}
                        className={this.activeZone === 'right' ? 'active' : null}
                        />

                    <polygon
                        points={bottom}
                        onClick={this.onClick.bind(this, 'bottom')}
                        className={this.activeZone === 'bottom' ? 'active' : null}
                        />

                </svg>
            </div>
        );
    }
}


// Prop Types
Tooth.propTypes = {
    activeZone: React.PropTypes.string,
    onClick: React.PropTypes.func,
    toothNumber: React.PropTypes.number.isRequired
};

// Default props
Tooth.defaultProps = {
    activeZone: '',
    onClick: function() {}
};
