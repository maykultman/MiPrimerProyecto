		<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
		<section id="catalogoPermisos">			
		    <div class="contenido_permisos">
			  	<h3>Nuevo Permiso</h3>
				<hr class="linea_x">
				<form id="registroPermiso">
	        		<div>
						<input id="permiso" type="text"  name="nombre" class="form-control" placeholder="Nombre del permiso">
						<textarea id="comentario" name="comentario" class="form-control" rows="4" placeholder="Comentarios"></textarea>
					</div>
					<div style="margin-top:15px; margin-left:0px;">
						<button id="guardar" type="button" class="btn btn-primary">Guardar</button>
			       	    <button type="button" class="btn btn-default">Cancelar</button>
		            </div>
			    </form>
		    </div>
		    <div class="contenido_permisos">
		    	<h3>Lista de permisos</h3>
				<hr class="linea_x">
		    	<div id="lista_permisos" class="panel panel-primary">		      
			      <div class="panel-heading"></div>		      
			      <table id="listadoPermiso" class="table table-hover">
				        <tbody id="scroll_permisos">
																									
						</tbody>
			      </table>
	            </div>
		    </div>								
		</section>			
    </section>
</div>
<!-- Utilerias -->
    <script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script>
<script type = "text/plantilla" id="listarPermisos">

	<td style="width: 400px; " class="icon-operaciones"><label for="<%- id %>"><%- nombre %></label>
	<div class="eliminar_permiso">
		<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
		<span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>										
	</div></td>

</script>

<!-- Librerias -->
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js' ?>"></script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'   ?>"></script>


<script type="text/javascript">
var app = app || {};
app.coleccionDePermisos = <?=json_encode($permisos)?>

</script>

<!-- MVC -->
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloPermiso.js'	    ?>"> </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionPermisos.js'?>"> </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaPermiso.js'		    ?>"> </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaNuevoPermiso.js'		?>"> </script>
<script type="text/javascript">	var app = app || {};		 </script>