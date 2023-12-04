const controller = {};

controller.obtenerMes = (mes) =>{
    let numMes;
    switch(mes){
        case 'Enero': numMes = 1; break;
        case 'Febrero': numMes = 2; break;
        case 'Marzo': numMes = 3; break;
        case 'Abril': numMes = 4; break;
        case 'Mayo': numMes = 5; break;
        case 'Junio': numMes = 6; break;
        case 'Julio': numMes = 7; break;
        case 'Agosto': numMes = 8; break;
        case 'Septiembre': numMes = 9; break;
        case 'Octubre': numMes = 10; break;
        case 'Noviembre': numMes = 11; break;
        case 'Diciembre': numMes = 12; break;
    }
    return numMes;
};

module.exports = controller;