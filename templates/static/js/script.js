(function () {
    'use strict'
  
    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    var forms = document.querySelectorAll('.needs-validation')
  
    //procedemos a verificar los datos del formulario a fin de verificar si existe un dato mal ingresado
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else {
              alert('Datos enviados!')
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()