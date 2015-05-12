import _, {map, values, findKey} from 'lodash';

var osHash;
var namesCache;

var getOsList = () => osHash;
var setOsList = (list) => osHash = list;

var names = () => {
    namesCache = namesCache || map(values(osHash), 'name');
    return namesCache;
}

var idByName = (name) => findKey(osHash, 'name', name);
var nameById = (id) => osHash[id].name;
var isValidName = (name) => names().indexOf(name) !== -1;

export default {
    names,
    getOsList,
    setOsList,
    idByName,
    nameById,
    isValidName
};
