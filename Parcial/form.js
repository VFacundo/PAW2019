function addAlumno() {
  var nodoForm = document.getElementById('formulario');
  var nuevoNodo = document.createElement('div');

  nuevoNodo.innerHTML =   '<label>Alumno: </label>'+
                          '<input type="text" name="nombre[]" placeholder="Nombre Alumno" required>'+
                          '<input type="text" name="apellido[]" placeholder="Apellido Alumno"required>'+
                          '<input type="email" name="email[]" placeholder="Email Alumno"required>'+
                          '<input type="number" name="nota1[]" min="1" max="10" placeholder="Nota 1"required>'+
                          '<input type="number" name="nota2[]" min="1" max="10" placeholder="Nota 2"required>'+
                          '<input type="number" name="nota3[]" min="1" max="10" placeholder="Nota 3"required>'
  nodoForm.insertBefore(nuevoNodo, nodoForm.querySelector('#anadirAlumno'));
}
