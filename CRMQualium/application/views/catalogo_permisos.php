		<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
<<<<<<< HEAD
          <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/collapse.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/transition.js'?>">
        </script>
		<section>			
=======
		<section id="catalogoPermisos">			
>>>>>>> origin/master
		    <div class="contenido_permisos">
			  	<h3>Nuevo Permiso</h3>
				<hr class="linea_x">
				<form id="registroPermiso">
	        		<div>
<<<<<<< HEAD
						<input type="text"  class="form-control" placeholder="Nombre del permiso">
						<textarea class="form-control" rows="4" placeholder="Comentarios"></textarea>
=======
						<input id="permiso" type="text"  name="nombre" class="form-control" placeholder="Nombre del permiso">
						<textarea id="comentario" name="comentario" class="form-control" rows="4" placeholder="Comentarios"></textarea>
>>>>>>> origin/master
					</div>
					<div style="margin-top:15px; margin-left:0px;">
						<button id="guardar" type="button" class="btn btn-primary">Guardar</button>
			       	    <button type="button" class="btn btn-default">Cancelar</button>
		            </div>
			    </form>
		    </div>
		    <div class="contenido_permisos">
<<<<<<< HEAD
		    	<!-- <h3>Lista de permisos</h3>
				<hr class="linea_x"><br> -->
				<div class="panel panel-default" style="margin-top: 25px; width:600px; ">
					<div class="panel-heading">
					  <h4 class="panel-title">
					    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
					      <b>Lista de permisos</b>
					      <span class=" icon-uniF48B flecha_abajo"></span> 
					    </a>
					  </h4>
					</div>
					<div id="collapse1" class="panel-collapse collapse">
					  	<div class="panel-body">
					  		<table class="table table-hover">
		        				<tbody id="scroll_permisos">
									<tr>
										<td style="width: 560px; " class="icon-operaciones">							
											<label for="" name="">crear proyectos</label>
											<div class="eliminar_permiso">
												<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
						            			<span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
				            				</div>			
										</td>    
				    				</tr>
									<tr>
										<td class="icon-operaciones">							
											<label for="" name="">Consultar proyectos</label>
											<div class="eliminar_permiso">
												<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
									            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
								            </div>	
										</td>
									</tr>
									<tr>
										<td class="icon-operaciones">							
											<label for="" name="">Ver catalogos</label>
											<div class="eliminar_permiso">
												<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
									            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
								            </div>	
										</td>
									</tr>
									<tr>
										<td class="icon-operaciones">							
											<label for="" name="">Agregar clientes</label>
											<div class="eliminar_permiso">
												<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
									            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
								            </div>	
										</td>
									</tr>
									<tr>
										<td class="icon-operaciones">							
											<label for="" name="">crear proyectos</label>
											<div class="eliminar_permiso">
												<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
									            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
								            </div>				
										</td>
									</tr>
									<tr>
										<td class="icon-operaciones">							
											<label for="" name="">Consultar proyectos</label>
											<div class="eliminar_permiso">
												<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
									            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
								            </div>	
										</td>
									</tr>
									<tr>
										<td>							
											<label for="" name="">Ver catalogos</label>
										</td>
									</tr>
									<tr>
										<td>							
											<label for="" name="">Agregar clientes</label>
										</td>
									</tr>							
								</tbody>
	      					</table>							    	      
			            </div>
					</div>
				</div>		    	
=======
		    	<h3>Lista de permisos</h3>
				<hr class="linea_x">
		    	<div id="lista_permisos" class="panel panel-primary">		      
			      <div class="panel-heading"></div>		      
			      <table id="listadoPermiso" class="table table-hover">
				        <tbody id="scroll_permisos">
																									
						</tbody>
			      </table>
	            </div>
>>>>>>> origin/master
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
