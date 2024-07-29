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
            fetch(`/admin/delete/${pathId}/${imageId}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              credentials: 'same-origin'
            })
            .then(response => {
              if (response.ok) {
                Swal.fire({
                  title: "Eliminado",
                  text: `La noticia ha sido eliminada`,
                  icon: "success"
                }).then(() => {
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