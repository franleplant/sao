const left = [
    [18,17,16,15,14,13,12,11],
    [55,54,53,52,51],
    [85,84,83,82,81],
    [48,47,46,45,44,43,42,41]
]

const right = [
    [21,22,23,24,25,26,27,28],
    [61,62,63,64,65],
    [71,72,73,74,75],
    [31,32,33,34,35,36,37,38]
]


const TOOTH_STATES = [{
        description: 'Caries / Obt Temporal'
    },{
        description: 'Diente Incluido / Semiincluido'
    },{
        description: 'Superficie Sellada'
    },{
        description: 'Corona adaptada / Acero'
    },{
        description: 'Nucleo'
    },{
        description: 'Amalgama'
    },{
        description: 'Sin erupcionar'
    },{
        description: 'Sellante indicado'
    },{
        description: 'Corona desadaptada'
    },{
        description: 'Pontico'
    },{
        description: 'Ausente'
    },{
        description: 'Endodoncia realizada'
    },{
        description: 'Erosion'
    },{
        description: 'Protesis removible'
    },{
        description: 'Diente Sano'
    },{
        description: 'Exodoncia simple indicada'
    },{
        description: 'Endodoncia a realizar'
    },{
        description: 'Resina / Ionomero'
    },{
        description: 'Resto radicular'
    },{
        description: 'Implante'
    }];


export default {right, left, TOOTH_STATES};
