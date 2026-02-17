


function crearAlimento( event ){

    event.preventDefault()
    
    const id = crypto.randomUUID();
    const alimento = document.getElementById("txt_nombre_alimento").value
    const kcal = document.getElementById("txt_kcal").value
    const proteina = document.getElementById("txt_proteina").value
    const carbohidrato = document.getElementById("txt_carbo").value
    const grasa = document.getElementById("txt_grasa").value

    data = {
        id, alimento, kcal, proteina, carbohidrato, grasa
    }

    saveLocalStorage( data )
}

function fillTableAlimento(){

    const tbody = document.getElementById("tbody_alimento")

    if( alimentoArray.length == 0 ){
        return false
    }

    tbody.innerHTML = "";
    for ( const alimento of alimentoArray ) {
        tbody.innerHTML += `
            <tr>
                <td>${alimento.alimento}</td>
                <td>${alimento.kcal}</td>
                <td>${alimento.proteina}</td>
                <td>${alimento.carbohidrato}</td>
                <td>${alimento.grasa}</td>
            </tr>
        `
    }

}


function getLocalStorage(){

    const dataLocal = localStorage.getItem( "dietaapp" )
    if( !dataLocal ){
        return false;
    } 

    alimentoArray = []
    alimentoArray =  JSON.parse( dataLocal )
}

function saveLocalStorage( data ){

    if( alimentoArray.length == 0){

        localStorage.setItem( "dietaapp", JSON.stringify( [ data ] ) )

        alimentoArray = [...alimentoArray, data]
        
        // guarda de una
        // renderizar en la tabla
    }else{


        const dataLocal = localStorage.getItem( "dietaapp" )

        if( !dataLocal ){
            localStorage.setItem( "dietaapp", JSON.stringify( data ) )
        }else{

            getLocalStorage()

            const findInArray = alimentoArray.find( al => al.alimento ==  data.alimento )

            if( findInArray ){
                // error
            }else{
                alimentoArray = [...alimentoArray, data]
                localStorage.setItem( "dietaapp", JSON.stringify( alimentoArray ) )
            }
        }
    
    }

    fillTableAlimento()
    

}

function fillDropDownAlimento(){

    const select = document.getElementById("drop_alimento");
    select.options.length = 0;

    const option1 = document.createElement("option");
    option1.value = "";
    option1.textContent = "Seleccione un alimento";
    select.appendChild(option1);

    for ( const alimento of alimentoArray ) {
        const option2 = document.createElement("option");
        option2.value = alimento.id;
        option2.textContent = alimento.alimento;
    
        select.appendChild(option2);
    }
    
    
}

