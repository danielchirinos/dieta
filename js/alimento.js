
const modalEditarAlimento = new bootstrap.Modal( document.getElementById('modalEditarAlimento') );

let alimentoId = null;


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
                <td>
                    <button class="btn btn-outline-success btn-sm" onclick="showModalEditAlimento('${alimento.id}')">
                        <i class="fa-solid fa-pencil"></i>
                    </button>
                </td>
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



// editar alimento
    function showModalEditAlimento( alimentoIdParam ){

        console.log(alimentoArray);
        if( !alimentoIdParam ){
            return false;
        } 

        alimentoId = alimentoIdParam

        const findInArray = alimentoArray.find( al => al.id ==  alimentoId )

        if( !findInArray ){
            // error
        }else{

            document.getElementById("txt_nombre_alimento_edit").value = findInArray.alimento
            document.getElementById("txt_kcal_edit").value = findInArray.kcal
            document.getElementById("txt_proteina_edit").value = findInArray.proteina
            document.getElementById("txt_carbo_edit").value = findInArray.carbohidrato
            document.getElementById("txt_grasa_edit").value = findInArray.grasa            
        }

        modalEditarAlimento.show()
    }


    function editarAlimento( event ){

        
        event.preventDefault()

        if( !alimentoId ){
            return false;
        }   

        const findInArray = alimentoArray.find( al => al.id ==  alimentoId )

         if( !findInArray ){
            // error
        }else{
        
            findInArray.alimento = document.getElementById("txt_nombre_alimento_edit").value
            findInArray.kcal = document.getElementById("txt_kcal_edit").value
            findInArray.proteina = document.getElementById("txt_proteina_edit").value
            findInArray.carbohidrato =  document.getElementById("txt_carbo_edit").value
            findInArray.grasa =  document.getElementById("txt_grasa_edit").value

        }
        

        localStorage.setItem( "dietaapp", JSON.stringify( alimentoArray ) )

        fillTableAlimento()

        modalEditarAlimento.hide()

        showToast( { type: "success", message: "Alimento guardado con éxito" } )
        
    }
    

    function exportFodd() {
        const data = localStorage.getItem("miAppData");
        
        if (!data) {
            alert("No hay datos para exportar");
            return;
        }

        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "backup-miapp.json";
        a.click();

        URL.revokeObjectURL(url);
    }

    function importData( event ) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            localStorage.setItem("miAppData", e.target.result);
            alert("Datos importados correctamente");
            location.reload();
        };

        reader.readAsText(file);
    }

    function copyFood() {
        const data = localStorage.getItem("dietaapp");
        navigator.clipboard.writeText( data );
        showToast( { type: "success", message: "Datos de alimentos copiados al portapapeles" } )
    }

// fin editar alimento

