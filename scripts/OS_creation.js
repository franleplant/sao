import Firebase from 'firebase';

var ref = new Firebase('https://luminous-fire-4753.firebaseio.com/');
var OSref = ref.child('OS');


OSref.push({
    name: 'OSDE',
    description: 'Algo sobre Osde'
});

OSref.push({
    name: 'OSDE',
    description: 'Algo sobre Osde'
});

OSref.push({
    name: 'IOMA',
    description: 'Algo sobre Ioma'
});

OSref.push({
    name: 'Swiss Medical',
    description: 'Algo sobre Swiss Medical'
});
