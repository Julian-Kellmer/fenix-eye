function deleteConfirmationMessage(imageId, pathId){
    console.log(imageId, pathId)
    Swal.fire({
        title: "Estas seguro?",
        text: "Momentaneamente no existen backups",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            
            const form = document.getElementById('delete-form');
            const action = form.action;
    
            // Hacer una solicitud AJAX con fetch
            fetch(`/admin/delete/${pathId}/${imageId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              credentials: 'same-origin' // Incluir cookies en la solicitud
            })
            .then(response => {
              if (response.ok) {
                Swal.fire({
                  title: "Eliminado",
                  text: `La noticia ha sido eliminada`,
                  icon: "success"
                }).then(() => {
                  // Redirigir o recargar la página después de la eliminación
                  window.location.reload();
                });
              } else {
                Swal.fire({
                  title: "Error",
                  text: "There was an error deleting the file.",
                  icon: "error"
                });
              }
            })
        }
    });
}