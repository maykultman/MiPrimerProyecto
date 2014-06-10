		<script src="js/jquery-ui-1.9.2.custom.min.js"></script>
		 <link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
		 <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/collapse.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/transition.js'?>">
        </script>
		<script>
		  $(function() {
		    $( ".datepicker" ).datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
		  });
		</script>  
		<section>
			<div>
			<h3 class="titulo">Empleados</h3> 
			<button id="nuevo_empleado" class="btn btn-primary" data-toggle="modal" data-target="#modal_nuevo_empleado">
			  Nuevo
			</button>
		    </div>
			<hr style="margin-top: 0px !important;">			
			<div id="modal_nuevo_empleado" class="modal fade">
			  <div class="modal-dialog">
			    <div class="modal-content">
			        <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				        <h4 class="modal-title">Nuevo Empleado</h4>
			        </div>
			        <div class="modal-body">
				        <form>
				        	<div style="margin-left:85px; ">
								<input type="text"  class="form-control" placeholder="Nombre">
								<select class="form-control">
								  <option>Community Manager</option>
								  <option>Director General</option>
								  <option>Diseñador Gráfico Sr</option>
								   <option>Diseñador Gráfico</option>
								  <option>Diseñador Comercial</option>
								  <option>Director Administrativo</option>	  
								  <option>Programador</option>
								  <option selected disabled>Cargo</option>
								</select>
								<input type="text"  class="form-control" placeholder="Dirección">
								<input type="text"  class="form-control" placeholder="Telefono Móvil">
								<input type="text"  class="form-control" placeholder="Email">
								<input class="form-control datepicker" type="text" id="" placeholder="Fecha de nacimiento">
							</div>
						</form>	
				    </div>
			        <div class="modal-footer">
				      	<button type="button" class="btn btn-primary">Guardar</button>
				        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>		        
			        </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal -->
			
			<div style="margin-top:15px;" class="panel-group" id="accordion">
				<div class="row">
				  	<div class="col-md-6">
					  	<h3>Directores</h3>
						<hr class="linea_x2">
						<div class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
							      <b class="titulo_empleados">Enrique Xacur</b>
							      <span class=" icon-uniF48B flecha_abajo"></span> 
							    </a>
							  </h4>
							</div>
							<div id="collapse1" class="panel-collapse collapse">
							  	<div class="panel-body">
							    	<h4>Datos personales</h4>
							    	<form>
							        	<div>
											<input type="text"  class="form-control" placeholder="Nombre">
											<select class="form-control">
											  <option>Community Manager</option>
											  <option>Director General</option>
											  <option>Diseñador Gráfico Sr</option>
											   <option>Diseñador Gráfico</option>
											  <option>Diseñador Comercial</option>
											  <option>Director Administrativo</option>	  
											  <option>Programador</option>
											  <option selected disabled>Cargo</option>
											</select>
											<input type="text"  class="form-control" placeholder="Dirección">
											<input type="text"  class="form-control" placeholder="Telefono Móvil">
											<input type="text"  class="form-control" placeholder="Email">
											<input class="form-control datepicker" type="text" id="" placeholder="Fecha de nacimiento">
										</div>
									</form>	      
					            </div>
							</div>
						</div>
						<div class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
							      <b class="titulo_empleados">David Arturo Ricalde Ortega</b>
							      <span class=" icon-uniF48B flecha_abajo"></span> 
							    </a>
							  </h4>
							</div>
							<div id="collapse2" class="panel-collapse collapse">
							  	<div class="panel-body">
							    	<h4>Datos personales</h4>
						        </div>
							</div>
						</div>
						<div class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
							      <b class="titulo_empleados">Adriana María Arjona Pinzón</b>
							      <span class=" icon-uniF48B flecha_abajo"></span> 
							    </a>
							  </h4>
							</div>
							<div id="collapse3" class="panel-collapse collapse">
							  	<div class="panel-body">
							    	<h4>Datos personales</h4>      
					            </div>
							</div>
						</div>			  	
				  	</div>
				    <div class="col-md-6">
					  	<h3>Gerentes</h3>
						<hr class="linea_x2">
						<div class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">
							      <b class="titulo_empleados">Jorge Alejandro Puerto Piste</b>
							       <span class=" icon-uniF48B flecha_abajo"></span> 
							    </a>
							  </h4>
							</div>
							<div id="collapse4" class="panel-collapse collapse">
							  	<div class="panel-body">
							    	<h4>Datos personales</h4>						           	
							  	</div>
							</div>
						</div>
				  </div>
				</div>
				<div class="row">
				  	<div class="col-md-6">
				  		<h3>Diseñadores</h3>
						<hr class="linea_x2">
						<div class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse5">
							      <b class="titulo_empleados">Pablo Perez Hernandez</b>
							      <span class=" icon-uniF48B flecha_abajo"></span> 
							    </a>
							  </h4>
							</div>
							<div id="collapse5" class="panel-collapse collapse">
							  	<div class="panel-body">
							    	<h4>Datos personales</h4>
						       	</div>
							</div>
						</div>			  	
				  	</div>
				  	<div class="col-md-6">
					  	<h3>Programadores</h3>
						<hr class="linea_x2">
						<div class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse6">
							      <b class="titulo_empleados">Dante Cervantes</b>
							      <span class=" icon-uniF48B flecha_abajo"></span> 
							    </a>
							  </h4>
							</div>
							<div id="collapse6" class="panel-collapse collapse">
							  	<div class="panel-body">
							    	<h4>Datos personales</h4>      
					            </div>
							</div>
						</div>
				  	</div>
				</div>
				<div class="row">
				  	<div class="col-md-6">
					  	<h3>Community Managers</h3>
						<hr class="linea_x2">
						<div  class="panel panel-default contenedor_empleado">
							<div class="panel-heading">
							  <h4 class="panel-title">
							    <a data-toggle="collapse" data-parent="#accordion" href="#collapse7">
							      <b class="titulo_empleados">Abril Astrid Jimenez Sosa</b>
							      <span class=" icon-uniF48B flecha_abajo"></span>
							    </a>
							  </h4>
							</div>
							<div  id="collapse7" class="panel-collapse collapse">
							    <div class="panel-body">					    	    
						            <h4>Datos personales</h4>
						           					        			    	
							    </div>
							</div>
						</div>							  	
				  	</div>
					<div class="col-md-6">
					  	<h3>Otros</h3>
						<hr class="linea_x2">
					</div>
				</div>				
            </div>			
		</section>
	</section>
</div>