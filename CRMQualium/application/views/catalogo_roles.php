		<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/collapse.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/transition.js'?>">
        </script>
		<section id="catalogo_roles">		    
		  	<h3>Nuevo Rol</h3>
		  	<hr><br>				
			<form id="registro_rol">	        						
				<input id="rol" type="text"  name="nombre" class="form-control" placeholder="Nombre del rol" style="width:85%; display: inline-block;">		
				<div style="display: inline-block;">
					<button id="guardar" type="button" class="btn btn-primary">Guardar</button>
		       	    <button type="button" class="btn btn-default">Cancelar</button>
	            </div>
		    </form><br>
		    <h3>Roles</h3>
		  	<hr><br>	       
	        <input type="search" class="form-control" placeholder="Search" style="width:100%; ">
	        <span id="busqueda_rol" class="glyphicon glyphicon-search"></span>    			
		  	<div class="panel panel-primary" style="width:100%;">
		  		<table class="table table-hover">
    				<tbody id="scroll_roles"></tbody>
				</table>							    	      
            </div>										
		</section>
	</section>
<div>
<script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script>
<script type = "text/plantilla" id="listaRoles">
	
	<td style="width: 1% !important; " class="icon-operaciones">			
		<label for="" name="<%-id %>"><%- nombre %></label>
		<div class="eliminar_permiso">
			<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
		   	<span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
	    </div>			
	</td>

</script>
<!-- Librerias -->
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>">	</script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>">		</script>

<script type="text/javascript">
	var app = app || {};
	app.coleccionDeRoles = <?php echo json_encode($roles)  ?>;
</script>
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloRol.js'?>"></script>
<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionRoles.js'?>"></script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaCatalogoRol.js'?>"></script>