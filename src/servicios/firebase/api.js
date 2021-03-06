import { db } from './'

//ESTO ES DE TORNEOS
export async function createTorneo(data) {
    return await db
        .collection('torneos')
        .doc()
        .set(data);
}

//Seleccionamios a cual borrar
export async function deleteTorneo(id) {
    return await db
        .collection('torneos')
        .doc(id)
        .delete();
}

//Con SET sobre escribimos los datos
export async function updateTorneo(id, data) {
    return await db
        .collection('torneos')
        .doc(id)
        .update(data);
}


export async function realizarSorteo(id) {
    // Obtener torneo y jugadores del torneo.
    const torneo = db.collection('torneos').doc(id).get();
    const jugadores = db.collection('jugadores').where("torneo", "==", id).get();

    // Obtener tipo y número de participantes.
    const tipo = (await torneo).data().tipo;
    const iterator = (await torneo).data().participantes;
    
    console.log(tipo, iterator);

    var ronda = '';
    if( iterator == 8 ) { ronda = 'Cuartos' }
    if( iterator == 16 ) { ronda = 'Octavos' }
    if( iterator == 32 ) { ronda = 'Dieciseisavos' }

    // Llenar arr auxiliar de jugadores.
    var arr = [];
    (await jugadores).docs.map(element => {
        arr.push(element.data());
    });;

    // Ordenar por ranking.
    arr.sort( function (a, b) {
        if (a.ranking > b.ranking) {
          return 1;
        }
        if (a.ranking < b.ranking) {
          return -1;
        }
        return 0;
    });

    console.log(arr);

    // Registrar enfrentamiento. 
    var lim = (iterator / 2);
    console.log(lim);
    for (var i=0; i<lim; i++) {
        if(tipo == 'Simple') {
            const data = {
                torneo: id,
                fecha: null,
                ganador: 0,
                hora: null,
                local: arr[0].nombre+' '+arr[0].apellido,
                nombre: 'Partido '+(i+1),
                puntos_local: 0,
                puntos_visita: 0,
                ronda: ronda,
                visita: arr[arr.length-1].nombre+' '+arr[arr.length-1].apellido
            };
            arr.pop();
            arr.shift();

            await db
            .collection('partidos')
            .doc()
            .set(data)

            await db
            .collection('torneos')
            .doc(id)
            .update({ sorteo: true })
        }
    }
}

//PAARTIDOS
//PARTIDOS

//Sin id para generarlo automaticamente
//SET sobre escribe los datos si tiene id
export async function createPartido(data) {
    return await db
        .collection('partidos')
        .doc()
        .set(data);
}

//Seleccionamios a cual borrar
export async function deletePartido(id) {
    return await db
        .collection('partidos')
        .doc(id)
        .delete();
}

//Con SET sobre escribimos los datos
export async function updatePartido(id, data) {
    return await db
        .collection('partidos')
        .doc(id)
        .update(data);
}