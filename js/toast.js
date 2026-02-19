const toastElement = document.getElementById( "dieta_toast" )
const toast = new bootstrap.Toast( toastElement )

function showToast( params ){

    const title = document.getElementById("toast_title")
    const toastHeader = document.getElementById( "toast_header" )
    toastHeader.classList.remove( "bg-success", "bg-warning", "bg-danger" )

    console.log(params);
    
    switch ( params.type ) {
        case "success":
            title.innerHTML = "Confirmacion";
            toastHeader.classList.add( "bg-success" )
        break;
        case "danger":
            title.innerHTML = "Error";
            toastHeader.classList.add( "bg-danger" )
        break;
        case "warning":
            title.innerHTML = "Advertencia";
            toastHeader.classList.add( "bg-warning" )
        break;
    
        default:
            title.innerHTML = "No definido";
            toastHeader.classList.add( "bg-success" )
        break;
    }
    
    document.getElementById("toast_message").innerHTML = params.message


    
    
    
    
    toast.show( )

}