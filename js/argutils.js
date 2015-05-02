import _, {map, filter, uniq, find} from 'lodash';
import places from '../scripts/arg_data.json';

/*
  # Ejemplo de un elemento en la coleccion de places

```javascript
{
    loc_nombre: 'Zanjon Del Pescado',
    loc_cpostal: 9015,
    prv_nombre: 'Santa Cruz'
}
```

*/
const provinces = uniq(map(places, 'prv_nombre'));

export default {
    provinces: provinces,
    locByProvince: (province) => {
        return map(filter(places, 'prv_nombre', province), 'loc_nombre');
    },
    postalByLoc: (locality) => {
        return find(places, 'loc_nombre', locality).loc_cpostal;
    },

    isValidPostalCode: (pc) => !!find(places, 'loc_cpostal', pc)
};
