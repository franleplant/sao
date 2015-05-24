import _, {map, filter, uniq, find} from 'lodash';
import placesRaw from '../scripts/arg_data.json';


var places = uniq( placesRaw, function(locality) {
                    return locality.loc_cpostal + locality.loc_nombre + locality.prv_nombre;
                })
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
    byProvince: (province) => {
        return uniq(
                filter(places, 'prv_nombre', province),
                function(locality) {
                    return locality.loc_cpostal + locality.loc_nombre;
                })
        },
    postalByLoc: (locality) => {
        return find(places, 'loc_nombre', locality).loc_cpostal;
    },

    isValidPostalCode: (pc) => !!find(places, 'loc_cpostal', pc),

    getLocalityByKey: (key) => {
        var [postalCode, localityName] =  key.split('__');
        return find(places, { 'loc_nombre': localityName, 'loc_cpostal': +postalCode});
    }
};



