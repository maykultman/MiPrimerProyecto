        <link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/collapse.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/transition.js'?>">
        </script>
        <section>
	    	<h3 class="titulo">Perfiles</h3>
	    	<button id="perfil_nuevo" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Nuevo Perfil
			</button>
			<hr style="margin-top: 0px !important"><br>			
			<!-- <div style="margin-top:15px;" class="panel-group" id="accordion"> -->
				
				<div class="panel panel-default">
					<div class="panel-heading">
					  <h4 class="panel-title">
					    <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">
					      <b>Gerente Administrativo</b>
					      <span class=" icon-uniF48B flecha_abajo"></span> 
					    </a>
					  </h4>
					</div>
					<div id="collapse5" class="panel-collapse collapse">
					  	<div class="panel-body">
					    	<h4>Permisos</h4>				            
			            	<div class="row">
							  	<div class="col-md-3">
							  	    <div class="checkbox">
									    <label>
									      <input class="chek" type="checkbox">Ver contratos
									    </label>
									</div>
									
							 	</div>
							  	<div class="col-md-3">
							  	    <div class="checkbox">
									    <label>
									      <input class="chek" type="checkbox">Ver contratos
									    </label>
									</div>									
							  	</div>
							  	<div class="col-md-3">
							  	    <div class="checkbox">
									    <label>
									      <input class="chek" type="checkbox">Ver contratos
									    </label>
									</div>									
							    </div>
						     	<div class="col-md-3">
							  	    <div class="checkbox">
									    <label>
									      <input class="chek" type="checkbox">Ver contratos
									    </label>
									</div>									
						        </div>
							</div>	
					  	</div>
					</div>
				</div>
           <!--  </div> -->
            <!-- Modal NUEVO PERFIL-->
            <div  class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"        
			 aria-labelledby="myLargeModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-lg">

					<div id="contenido_nuevoperfil"  class="modal-content">
					    <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					        <h4 class="modal-title">Nuevo Perfil</h4>
					    </div>					    
				        <div class="modal-body">
                            <form>
					            <input  type="search" class="form-control" placeholder="Nombre del perfil"><br>
						        

						        <div id="ListaPermisos" style="width:850px; " class="panel panel-primary permisos">  
						            <div class="panel-heading">Asignar Permisos</div>           
					            	<div class="row">
									  	<div class="col-md-4">
									  	    <div class="checkbox">
											    <label>
											      <input class="chek" type="checkbox">Ver contratos
											    </label>
											</div>											
									  	</div>
									  	<div class="col-md-4">
										  	<div class="checkbox">
											    <label>
											      <input class="chek" type="checkbox">Ver contratos
											    </label>
											</div>											
									   </div>
									   <div class="col-md-4">
									  		<div class="checkbox">
											    <label>
											      <input class="chek" type="checkbox">Ver contratos
											    </label>
											</div>											
									    </div>
									</div>								   
						        </div>



					            <button  class="btn btn-default" type="button">Marcar Todos
					            </button><br><br>
					            <div id="btnes">				            
						            <button type="button" class="btn btn-primary">Guardar</button>
						            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
					            </div>
					        </form>    
				        </div>					       
		            </div><!-- /.modal-content -->


		        </div><!-- /.modal-dialog -->
	        </div><!-- /.modal -->
        </section>    
    </section>
</div>


<script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script>

<!-- Librerias -->
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>">	</script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>">		</script>
<script type="text/javascript">
	var app = app || {};
	app.coleccionDePerfiles = <?php echo json_encode($perfiles) ?>;
	app.coleccionDePermisos = <?php echo json_encode($permisos) ?>;	
</script>
<!-- MVC -->
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloPerfil.js'?>">          </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloPermiso.js'?>">          </script>

<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionPerfiles.js'?>">  </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionPermisos.js'?>">  </script>

<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaNuevoPerfil.js'?>">	   </script>