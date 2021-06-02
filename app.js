require('colors');

const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorraR,
    confirmar,
    mostrarListadoCheclist
} = require('./helpers/inquirer.js');
const {
    guardarDB,
    leerDB,
} = require('./helpers/guardarArchivo');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

const main = async () => {


    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {

        tareas.cargarTareasFromArray(tareasDB);

    }
    // await pausa()
    let opt = '';
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);

                break;
            case '2': // listar todas
                // console.log(tareas.listadoArr);
                tareas.listarPendientesCompletadas()
                break;
            case '3': // listar completadas
                tareas.listarPendientesCompletadas(true, false)
                break;
            case '4': // listar pendients
                tareas.listarPendientesCompletadas(false, true);
                break;
            case '5': // marcar completadas
                const ids = await mostrarListadoCheclist( tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': // borrar tareas
                const id = await listadoTareasBorraR(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;

        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();

    }
    while (opt !== '0');

}

main();