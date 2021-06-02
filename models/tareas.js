const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;

    }

    constructor() {
        this._listado = {};

    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(t => {
            this._listado[t.id] = t
        })

    }


    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    // listadoCompleto(){
    //     console.log('\n');
    //     const tareas = this.listadoArr;
    //     for(let i in tareas){
    //         const estado = (tareas[i].completadoEn 
    //                 ? 'Completada'.green
    //                 : 'Pendiente'.red
    //             ); 
    //         console.log(`${((parseInt(i)+1)+'.').green} ${tareas[i].desc} :: ${estado}`);
    //     }

    // }

    listarPendientesCompletadas(completadas = true, pendientes = true) {

        console.log('\n');
        const tareas = this.listadoArr;
        let idx = 1;
        for (let i in tareas) {
            const estado = (tareas[i].completadoEn
                ? tareas[i].completadoEn.green
                : 'Pendiente'.red
            );
            const flag_imprimir = (!tareas[i].completadoEn && pendientes)
                || (tareas[i].completadoEn && completadas);

            if (flag_imprimir) {
                console.log(`${((idx) + '.').green} ${tareas[i].desc} :: ${estado}`);
                idx++;
            }
        }

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        })

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        })

    }

}


module.exports = Tareas;