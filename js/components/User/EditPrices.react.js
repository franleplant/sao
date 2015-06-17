import React from 'react/addons';
import ReactMixin from 'react-mixin';
import _ from 'lodash';
import practiceList from '../../../scripts/practiceList.js';
import userResource from '../../userResource.js';
//import UserForm from './UserForm.react.js';
//import userActions from '../../actions/userActions.js';
//import userStore from '../../stores/userStore.js';
//

let normalizePracticeId = practiceId => practiceId.replace('.', '');

export default class EditPrices extends React.Component {
    constructor(props) {
        super(props);

        let prices = {};

        practiceList.forEach((chapter) => {
            chapter.practices.forEach((practice) => {
                prices[practice.practiceId] = {}
            })
        })

        this.state = {
            prices: prices,
            loading: {}
        }

    }

    componentDidMount() {
        userResource
            .getRef()
            .child('prices')
            .once('value', (snapshot) => {
                let prices = this.state.prices;
                let newPrices = snapshot.val();

                _.forOwn(newPrices, (price, priceId) => {
                    prices[price.practiceId] = price;
                    prices[price.practiceId].priceId = priceId;
                })

                this.setState({
                    prices: prices
                })
            })
    }

    onPriceChange(practiceId, event) {
        let price = this.state.prices[practiceId];
        price.price = event.target.value;
        price.practiceId = practiceId;

        this.state.loading[practiceId] = true;

        this.setState({
            prices: this.state.prices,
            loading: this.state.loading
        });

        if (price.priceId) {
            userResource
                .getRef()
                .child('prices')
                .child(price.priceId)
                .update(price, () => {
                    this.state.loading[practiceId] = false;
                    this.setState({
                        loading: this.state.loading
                    });
                });
        } else {
            let priceRef = userResource
                .getRef()
                .child('prices')
                .push(price, () => {

                    setTimeout(() => {
                        price.priceId = priceRef.key();
                        this.state.loading[practiceId] = false;
                        this.setState({
                            prices: this.state.prices,
                            loading: this.state.loading
                        })
                    })
                });
            }
    }

    render() {
        return (
            <div>
                <h1>Editar Precios  </h1>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Numero</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    _.flatten(
                                        practiceList.map((chapter) => {
                                            var chapterId = chapter.chapterNumber;
                                            return chapter.practices.map((practice) => {
                                                    var practiceId = practice.practiceId;
                                                    return (
                                                        <tr key={practiceId}>
                                                            <td>{practiceId}</td>
                                                            <td>{practice.description}</td>
                                                            <td>

                                                                <p>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        value={this.state.prices[practiceId].price || undefined}
                                                                        onChange={this.onPriceChange.bind(this, practiceId)}
                                                                        placeholder="Ingresa el precio"
                                                                        style={{ display: 'inline-block', width: '88%', marginRight: '10px'}}
                                                                        />
                                                                    { this.state.loading[practiceId] ? <i className="fa fa-spinner fa-spin fa-align-left"></i> : null }
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                        })
                                    )
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}
