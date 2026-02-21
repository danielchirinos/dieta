const modalImportData = new bootstrap.Modal( document.getElementById('modalImportData') );
const titleDataImport = document.getElementById( "title_data_import" )

let entityTypeTitle = entityTypeId = "";

function showModalImportData( type ){

    entityTypeId = type

    switch ( type ) {
        case "food":
            entityTypeTitle = "alimentos"
            titleDataImport.innerHTML = "Alimentos"
        break;
        case "meals":
            entityTypeTitle = "comidas"
            titleDataImport.innerHTML = "Comidas"
        break;
        
        default:
            entityTypeTitle = ""
            titleDataImport.innerHTML = "";
        break;
    }


    modalImportData.show()

}


async function importForCopy(){

    const copyData = document.getElementById("textarea_import_data")
    
    if( !copyData || !copyData.value ){
        showToast( { type: "danger", message: "No existen datos para importar" } )
        return false;
    }
    
    const result = await modalConfirm( `Desea importar los datos de ${entityTypeTitle}, esta accion reemplazara los datos de ${entityTypeTitle} que se tiene actualmente` );

    if( result == 0){
        showToast( { type: "warning", message: "Accion cancelada" } )
        return false;
    }

    switch ( entityTypeId ) {
        case "food":
            localStorage.setItem( "dietaapp", copyData.value );
            getLocalStorage()
            fillTableAlimento()
        break;
        case "meals":
            
            localStorage.setItem( "comidaapp", copyData.value );
            getLocalStorageComida()
            findMeals()
        break;
        
        default:
            entityType = ""
            titleDataImport.innerHTML = "";
        break;
    }

    document.getElementById( "textarea_import_data" ).value = ""
    modalImportData.hide()

    showToast( { type: "success", message: `Datos de ${entityTypeTitle} guardados con éxito` } )
}