
const modalConfirmacion = new bootstrap.Modal(document.getElementById('modalConfirmacion'));

function modalConfirm( mensaje ){

    document.getElementById( "label_mensaje_confirmacion" ).innerHTML = mensaje
    
    modalConfirmacion.show()
    return new  Promise((resolve, reject) => {
        document.getElementById("btn_ok").addEventListener("click", function () {
            modalConfirmacion.hide();
            resolve(1);
        });

        document.getElementById("btn_cancelar").addEventListener("click", function () {
            modalConfirmacion.hide();
            resolve(0)

        });
    })
}