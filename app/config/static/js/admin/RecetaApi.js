
    async function obtenerRecetas() {
        const contenedor = document.getElementById('recipes-container');
        const marcadorDeCarga = document.getElementById('loading-placeholder');

        try {
            const respuesta = await axios.get('/api/recetas');
            const recetas = respuesta.data;

            if (marcadorDeCarga) {
                marcadorDeCarga.remove();
            }

            contenedor.innerHTML = '';
            recetas.forEach(receta => {
                const tarjetaReceta = document.createElement('div');
                tarjetaReceta.className = 'col-md-4 col-sm-6 mb-4';

                const nombre = receta.nombre || 'Sin título';
                const imagen = receta.foto; // Cambia por una imagen por defecto si no hay
                const cocina = receta.categorias?.[0]?.nombre || 'Sin categoría';
                const id = receta.id;

                tarjetaReceta.innerHTML = `
                                <div class="card recipe-card">
                <div class="recipe-actions">
                    <button class="btn btn-edit" title="Editar receta" onclick='editarReceta(${receta.id})'>
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-delete" title="Eliminar receta" onclick="confirmarEliminarReceta(${receta.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <button class="btn btn-edit-photo" title="Editar foto" onclick="abrirModalEditarFoto(${receta.id})">
                         <i class="fas fa-camera"></i>
                    </button>
                </div>
                <img src="../../static/${imagen}" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-mexico">${cocina}</span>
                    </div>
                    <a href="/recetas/${receta.id}" class="btn btn-ver mt-2">Ver</a>
                </div>
            </div>
                `;
                contenedor.appendChild(tarjetaReceta);
            });

            if (recetas.length === 0) {
                contenedor.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <i class="fas fa-book fa-3x mb-3 text-muted"></i>
                        <p>No se encontraron recetas. ¡Agrega una nueva!</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error al cargar recetas:', error);
            contenedor.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-exclamation-circle fa-3x mb-3 text-danger"></i>
                    <p>Ocurrió un error al cargar las recetas.</p>
                </div>
            `;
        }
    }

    async function confirmarEliminarReceta(idReceta) {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará la receta permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
        try {
            await axios.delete(`/api/recetas/${idReceta}`);
            Swal.fire('Eliminada', 'La receta ha sido eliminada correctamente.', 'success');
            obtenerRecetas(); // Recarga las recetas después de eliminar
        } catch (error) {
            console.error('Error al eliminar receta:', error);
            Swal.fire('Error', 'No se pudo eliminar la receta.', 'error');
        }
    }
}
 const categoriasMap = new Map();
    const ingredientesMap = new Map();
    const categoriasAgregadas = new Set();
    const ingredientesAgregados = new Set();

    async function cargarCategoriasEIngredientes() {
      try {
        const response = await axios.get("/api/recetas/categorias_ingredientes");
        const { categorias, ingredientes } = response.data;

        const selectCategoria = document.getElementById("selectCategoria");
        const selectIngrediente = document.getElementById("selectIngrediente");

        categorias.forEach(cat => {
          categoriasMap.set(cat.id, cat.nombre);
          const option = document.createElement("option");
          option.value = cat.id;
          option.textContent = cat.nombre;
          selectCategoria.appendChild(option);
        });

        ingredientes.forEach(ing => {
          ingredientesMap.set(ing.id, ing.nombre);
          const option = document.createElement("option");
          option.value = ing.id;
          option.textContent = ing.nombre;
          selectIngrediente.appendChild(option);
        });
      } catch (error) {
        console.error("Error al cargar categorías e ingredientes:", error);
        Swal.fire("Error", "No se pudieron cargar las categorías e ingredientes", "error");
      }
    }

    function agregarCategoria() {
        const select = document.getElementById("selectCategoria");
        const id = select.value;
        const nombre = categoriasMap.get(Number(id));

    if (id && !categoriasAgregadas.has(id)) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm";
      li.dataset.id = id;

      const span = document.createElement("span");
      span.textContent = nombre;
      span.className = "fw-semibold";

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn btn-sm btn-outline-danger";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.onclick = () => {
        li.remove();
        categoriasAgregadas.delete(id);
      };

      li.appendChild(span);
      li.appendChild(btnEliminar);
      document.getElementById("listaCategorias").appendChild(li);

      categoriasAgregadas.add(id);
    }
  }

  function agregarIngrediente() {
    const select = document.getElementById("selectIngrediente");
    const id = select.value;
    const nombre = ingredientesMap.get(Number(id));

    if (id && !ingredientesAgregados.has(id)) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm";
      li.dataset.id = id;

      const span = document.createElement("span");
      span.textContent = nombre;
      span.className = "fw-semibold";

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn btn-sm btn-outline-danger";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.onclick = () => {
        li.remove();
        ingredientesAgregados.delete(id);
      };

      li.appendChild(span);
      li.appendChild(btnEliminar);
      document.getElementById("listaIngredientes").appendChild(li);

      ingredientesAgregados.add(id);
    }
  }

  const pasosAgregados = [];

  function agregarPaso() {
    const inputPaso = document.getElementById("inputPaso");
    const descripcion = inputPaso.value.trim();

    if (descripcion) {
      const numero = pasosAgregados.length + 1;

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm";
      li.dataset.numero = numero;

      const span = document.createElement("span");
      span.textContent = ` ${descripcion}`;
      span.className = "fw-semibold";

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn btn-sm btn-outline-danger";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.onclick = () => {
        li.remove();
        pasosAgregados.splice(numero - 1, 1);
        actualizarNumerosPasos();
      };

      li.appendChild(span);
      li.appendChild(btnEliminar);
      document.getElementById("listaPasos").appendChild(li);

      pasosAgregados.push({ numero, descripcion });
      inputPaso.value = "";
    }
  }

  function actualizarNumerosPasos() {
    const listaPasos = document.getElementById("listaPasos").children;
    pasosAgregados.forEach((paso, index) => {
      paso.numero = index + 1;
      listaPasos[index].dataset.numero = paso.numero;
      listaPasos[index].querySelector("span").textContent = `${paso.numero}. ${paso.descripcion}`;
    });
  }

  async function agregarReceta(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreReceta").value.trim();
    const es_vegetariano = document.getElementById("vegetariano").checked;
    const es_vegano = document.getElementById("vegano").checked;
    const foto = document.getElementById("fotoReceta").files[0];

    // Asegúrate de convertir a números
    const categorias = Array.from(document.getElementById("listaCategorias").children)
      .map(cat => Number(cat.dataset.id));
    const ingredientes = Array.from(document.getElementById("listaIngredientes").children)
      .map(ing => Number(ing.dataset.id));

    const receta = {
      nombre,
      es_vegetariano,
      es_vegano,
      ingredientes,
      categorias,
      esta_aprobada: true
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(receta));
    formData.append("foto", foto);
    formData.append("pasos", JSON.stringify(pasosAgregados));

    try {
      const response = await axios.post("/api/recetas", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire("Éxito", "Receta agregada correctamente", "success");
      document.getElementById("formAgregarReceta").reset();
      document.getElementById("listaCategorias").innerHTML = "";
      document.getElementById("listaIngredientes").innerHTML = "";
      document.getElementById("listaPasos").innerHTML = "";
      categoriasAgregadas.clear();
      ingredientesAgregados.clear();
      pasosAgregados.length = 0;
      obtenerRecetas();
    } catch (error) {
      console.error("Error al agregar receta:", error);
      Swal.fire("Error", "No se pudo agregar la receta", "error");
    }
  }


     async function editarReceta(id) {
  try {
    // 1. Carga categorías e ingredientes
    await cargarCategoriasEIngredientesEditar();

    // 2. Obtiene la receta por ID
    const response = await axios.get(`/api/recetas/${id}`);
    const receta = response.data;

    // Rellena campos básicos
    document.getElementById('editarIdReceta').value = receta.id;
    document.getElementById('editarNombreReceta').value = receta.nombre;
    document.getElementById('editarVegetariano').checked = receta.es_vegetariano;
    document.getElementById('editarVegano').checked = receta.es_vegano;

    // Rellena pasos
    const listaPasos = document.getElementById('editarListaPasos');
    listaPasos.innerHTML = '';
    receta.pasos.forEach((paso, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm';
      li.dataset.numero = index + 1;

      const span = document.createElement('span');
      span.textContent = ` ${paso.descripcion}`;
      span.className = 'fw-semibold';

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-sm btn-outline-danger';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.onclick = () => li.remove();

      li.appendChild(span);
      li.appendChild(btnEliminar);
      listaPasos.appendChild(li);
    });

    // Rellena categorías
    const listaCategorias = document.getElementById('editarListaCategorias');
    listaCategorias.innerHTML = '';
    receta.categorias.forEach(cat => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm';

      const span = document.createElement('span');
      span.textContent = cat.nombre;
      span.className = 'fw-semibold';

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-sm btn-outline-danger';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.onclick = () => li.remove();

      li.dataset.id = cat.id;
      li.appendChild(span);
      li.appendChild(btnEliminar);
      listaCategorias.appendChild(li);
    });

    // Rellena ingredientes
    const listaIngredientes = document.getElementById('editarListaIngredientes');
    listaIngredientes.innerHTML = '';
    receta.ingredientes.forEach(ing => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm';

      const span = document.createElement('span');
      span.textContent = ing.nombre;
      span.className = 'fw-semibold';

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-sm btn-outline-danger';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.onclick = () => li.remove();

      li.dataset.id = ing.id;
      li.appendChild(span);
      li.appendChild(btnEliminar);
      listaIngredientes.appendChild(li);
    });

    // Finalmente, mostrar el modal
    $('#modalEditarReceta').modal('show');
  } catch (error) {
    console.error('Error al cargar la receta para editar:', error);
    Swal.fire('Error', 'No se pudo cargar la receta para editar', 'error');
  }
}



    async function cargarCategoriasEIngredientesEditar() {
      try {
        const response = await axios.get("/api/recetas/categorias_ingredientes");
        const { categorias, ingredientes } = response.data;

        // Limpia los selects antes de volver a llenar
        const selectsCategoria = [document.getElementById("selectCategoria"), document.getElementById("editarSelectCategoria")];
        const selectsIngrediente = [document.getElementById("selectIngrediente"), document.getElementById("editarSelectIngrediente")];

        categoriasMap.clear();
        ingredientesMap.clear();

        selectsCategoria.forEach(select => {
          if (select) {
            select.innerHTML = '<option value="">Seleccione una categoría</option>';
            categorias.forEach(cat => {
              categoriasMap.set(cat.id, cat.nombre);
              const option = document.createElement("option");
              option.value = cat.id;
              option.textContent = cat.nombre;
              select.appendChild(option);
            });
          }
        });

        selectsIngrediente.forEach(select => {
          if (select) {
            select.innerHTML = '<option value="">Seleccione un ingrediente</option>';
            ingredientes.forEach(ing => {
              ingredientesMap.set(ing.id, ing.nombre);
              const option = document.createElement("option");
              option.value = ing.id;
              option.textContent = ing.nombre;
              select.appendChild(option);
            });
          }
        });

      } catch (error) {
        console.error("Error al cargar categorías e ingredientes:", error);
        Swal.fire("Error", "No se pudieron cargar las categorías e ingredientes", "error");
      }
    }

    function agregarIngredienteEditar() {
  const select = document.getElementById("editarSelectIngrediente");
  const id = select.value;
  const nombre = select.options[select.selectedIndex].text;

  if (!id || document.querySelector(`#editarListaIngredientes li[data-id="${id}"]`)) return;

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm";
  li.dataset.id = id;

  const span = document.createElement("span");
  span.className = "fw-semibold";
  span.textContent = nombre;

  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn btn-sm btn-outline-danger";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(btnEliminar);
  document.getElementById("editarListaIngredientes").appendChild(li);
}

function agregarPasoEditar() {
  const inputPaso = document.getElementById('editarInputPaso');
  const descripcion = inputPaso.value.trim();

  if (descripcion) {
    const lista = document.getElementById('editarListaPasos');
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center mb-2';

    const span = document.createElement('span');
    span.textContent = descripcion; // Se omite el número.

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-sm btn-outline-danger';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = () => li.remove();

    li.appendChild(span);
    li.appendChild(btnEliminar);
    lista.appendChild(li);

    inputPaso.value = '';
  }
}
function agregarCategoriaEditar() {
  const select = document.getElementById("editarSelectCategoria");
  const id = select.value;
  const nombre = select.options[select.selectedIndex].text;

  if (!id || document.querySelector(`#editarListaCategorias li[data-id="${id}"]`)) return;

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm";
  li.dataset.id = id;

  const span = document.createElement("span");
  span.className = "fw-semibold";
  span.textContent = nombre;

  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn btn-sm btn-outline-danger";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(btnEliminar);
  document.getElementById("editarListaCategorias").appendChild(li);
}

async function actualizarReceta(event) {
  event.preventDefault();

  const id = document.getElementById("editarIdReceta").value;
  const nombre = document.getElementById("editarNombreReceta").value;
  const esVegano = document.getElementById("editarVegano").checked;
  const esVegetariano = document.getElementById("editarVegetariano").checked;

  // Pasos
  const pasos = [];
  document.querySelectorAll("#editarListaPasos li").forEach((li, index) => {
    const texto = li.querySelector("span").textContent;
    const descripcion = texto.replace(/^\d+\.\s*/, ""); // Quitar "1. "
    pasos.push({ numero: index + 1, descripcion });
  });

  // Ingredientes (IDs)
  const ingredientes = Array.from(document.querySelectorAll("#editarListaIngredientes li"))
    .map(li => parseInt(li.dataset.id));

  // Categorías (IDs)
  const categorias = Array.from(document.querySelectorAll("#editarListaCategorias li"))
    .map(li => parseInt(li.dataset.id));

  const recetaActualizada = {
    nombre,
    pasos,
    es_vegano: esVegano,
    es_vegetariano: esVegetariano,
    esta_aprobada: true, // Puedes adaptarlo según lo necesites
    ingredientes,
    categorias
  };

  try {
    await axios.put(`/api/recetas/${id}`, recetaActualizada);
    Swal.fire("Actualizado", "La receta fue actualizada exitosamente", "success");

    $('#modalEditarReceta').modal('hide');
    obtenerRecetas();
    // Aquí puedes recargar la tabla/listado si es necesario
  } catch (error) {
    console.error("Error al actualizar receta:", error);
    Swal.fire("Error", "No se pudo actualizar la receta", "error");


  }
}
// Abre modal y precarga información
async function abrirModalEditarFoto(id) {
  try {
    const resp = await axios.get('/api/recetas/' + id);
    document.getElementById('idRecetaFoto').value = resp.data.id;
    document.getElementById('fotoRecetaPreview').src = '../../static/' + resp.data.foto;
    new bootstrap.Modal(document.getElementById('modalEditarFotoReceta')).show();
  } catch (error) {
    console.error('Error al cargar la receta:', error);
    Swal.fire('Error', 'No se pudo cargar la receta', 'error');
  }
}

// Envía la foto actualizada
async function actualizarFotoReceta(event) {
  event.preventDefault();
  const idReceta = document.getElementById('idRecetaFoto').value;
  const fotoInput = document.getElementById('nuevaFotoReceta').files[0];
  const formData = new FormData();
  formData.append('foto', fotoInput);

  try {
    await axios.put('/api/recetas/cambiar_foto_receta/' + idReceta, formData);
    Swal.fire('Exito', 'Foto actualizada', 'success');
    document.getElementById('formEditarFotoReceta').reset();

    // Cierra el modal con jQuery (sin crear una instancia nueva)
    $('#modalEditarFotoReceta').modal('hide');

    obtenerRecetas();
  } catch (error) {
    console.error('Error al actualizar la foto:', error);
    Swal.fire('Error', 'No se pudo actualizar la foto', 'error');
  }
}
    // Ejecutar al cargar la página
    document.addEventListener("DOMContentLoaded", cargarCategoriasEIngredientes);
    obtenerRecetas();
