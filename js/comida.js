
let comidaArray = [];
let alimentoEnComida = [];
const modalComida = new bootstrap.Modal(document.getElementById('modalComida'));

function showModalComida(){

    const tbody = document.getElementById("tbody_alimento_comida")
    tbody.innerHTML = "";
    fillDropDownAlimento()
    alimentoEnComida = [];
    modalComida.show(); 

}
function crearComida( event ){

    event.preventDefault()

    if( alimentoEnComida.length == 0 ){
        return false;
    }

    const nombreComida = document.getElementById( "txt_nombre_comida" ).value

    data = null;
    detalleComida = [];
    const fecha = new Date().toISOString().split('T')[0];
    for (const alCo of alimentoEnComida) {
        detalleComida.push({
            "kcal": alCo.kcal,
            "proteina": alCo.proteina,
            "carbohidrato": alCo.carbohidrato,
            "grasa": alCo.grasa
        })

    }
    
    data = {
        nombreComida, fecha, detalleComida
    }

    saveLocalStorageComida( data )
    
    alimentoEnComida = []
}

function agregarAlimentoAComida(){

    const alimentoId = document.getElementById("drop_alimento").value
    const gr = document.getElementById("txt_gr").value

    if( !alimentoId || !gr ){
        return false;
    }

    debugger;
    const alimentoAgregadoEnComidaActual = alimentoEnComida.find( co => co.alimentoId == alimentoId )

    if( alimentoAgregadoEnComidaActual &&  alimentoAgregadoEnComidaActual != undefined){
        return false;
    }
    
    const findAlimento = alimentoArray.find( al => al.id == alimentoId )

    const kcal = ( ( gr * findAlimento.kcal )  / 100 )
    const proteina = ( ( gr * findAlimento.proteina )  / 100 )
    const carbohidrato = ( ( gr * findAlimento.carbohidrato )  / 100 )
    const grasa = ( ( gr * findAlimento.grasa )  / 100 )

    alimentoEnComida.push({
        alimentoId, gr, proteina, kcal, carbohidrato, grasa, nombre: findAlimento.alimento
    });

    fillTableAlimentoEnComida()
    
}

function fillTableAlimentoEnComida(){

    const tbody = document.getElementById("tbody_alimento_comida")

    tbody.innerHTML = "";
    for ( const al of alimentoEnComida ) {
        tbody.innerHTML += `
            <tr>
                <td>${al.nombre}</td>
                <td>${al.kcal}</td>
                <td>${al.proteina}</td>
                <td>${al.carbohidrato}</td>
                <td>${al.grasa}</td>
            </tr>
        `
    }

}


function getLocalStorageComida(){

    const dataLocal = localStorage.getItem( "comidaapp" )
    
    if( !dataLocal ){
        return false;
    } 

    comidaArray = []
    comidaArray =  JSON.parse( dataLocal )
}

function saveLocalStorageComida( data ){

    if( comidaArray.length == 0){

        localStorage.setItem( "comidaapp", JSON.stringify( [ data ] ) )

        comidaArray = [...comidaArray, data]
        
        // guarda de una
        // renderizar en la tabla
    }else{

        const dataLocal = localStorage.getItem( "comidaapp" )

        if( !dataLocal ){
            localStorage.setItem( "comidaapp", JSON.stringify( data ) )
        }else{

            getLocalStorageComida()

            // const findInArray = comidaArray.find( co => co.nombre ==  data.alimento )
            comidaArray = [...comidaArray, data]
            localStorage.setItem( "comidaapp", JSON.stringify( comidaArray ) )
        }
    
    }

    fillTableAlimento()
    

}


function fillTableComida(){

    const tbody = document.getElementById("tbody_comida")

    if( comidaArray.length == 0 ){
        return false
    }

    tbody.innerHTML = "";
    for ( const comida of comidaArray ) {

        let kcal = proteina = carbos = grasa = 0
        

        if( comida.detalleComida.length === undefined ){

            kcal = comida.detalleComida.kcal
            proteina = comida.detalleComida.proteina
            carbos =  comida.detalleComida.carbohidrato
            grasa =  comida.detalleComida.grasa

        }else{
            for (const detalle of comida.detalleComida) {
                kcal = kcal + detalle.kcal
                proteina = proteina + detalle.proteina
                carbos = carbos + detalle.carbohidrato
                grasa = grasa + detalle.grasa
            }
        }

        tbody.innerHTML += `
            <tr>
                <td>${comida.nombreComida}</td>
                <td>${kcal}</td>
                <td>${proteina}</td>
                <td>${carbos}</td>
                <td>${grasa}</td>
            </tr>
        `
        
    }


}


function total(){

    let totalCalorias = totalProteina = totalCarbos = totalGrasas = 0;


    for (const comida of comidaArray) {

        if( comida.detalleComida.length === undefined ){

            totalCalorias = totalCalorias + comida.detalleComida.kcal
            totalProteina = totalProteina + comida.detalleComida.proteina
            totalCarbos = totalCarbos + comida.detalleComida.carbohidrato
            totalGrasas = totalGrasas +  comida.detalleComida.grasa

        }else{
            for (const detalle of comida.detalleComida) {
                totalCalorias = totalCalorias + detalle.kcal
                totalProteina = totalProteina + detalle.proteina
                totalCarbos = totalCarbos + detalle.carbohidrato
                totalGrasas = totalGrasas + detalle.grasa
            }
        }
    }


    document.getElementById("total_calorias").innerHTML = Math.round( totalCalorias )
    document.getElementById("total_proteina").innerHTML = Math.round( totalProteina )
    document.getElementById("total_carbos").innerHTML = Math.round( totalCarbos )
    document.getElementById("total_grasas").innerHTML = Math.round( totalGrasas )
    
    
    
    
}
