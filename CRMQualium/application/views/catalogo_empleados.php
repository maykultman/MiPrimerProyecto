		<script src="js/jquery-ui-1.9.2.custom.min.js"></script>
		 <link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/collapse.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/transition.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/tap.js'?>">
        </script>
        <section>
		<script>
		  $(function() {
		    $( ".datepicker" ).datepicker({
		      changeMonth: true,
		      changeYear: true,
		      yearRange : "1970 : 2000" 
		    });
		  });
		</script>  
		<section id='#catalogo_empleados'>			
			<h3 class="titulo">Empleados</h3> 
			<button id="nuevo_empleado" class="btn btn-primary" data-toggle="modal" data-target="#modal_nuevo_empleado">
			  Nuevo
			</button>		   
			<hr style="margin-top: 0px !important;">			
			<div id="modal_nuevo_empleado" class="modal fade">
			  <div class="modal-dialog">
			    <div class="modal-content">
			        <div class="modal-header">
				        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				        <h4 class="modal-title">Nuevo Empleado</h4>
			        </div>
			        <div class="modal-body">
				        <form id="registro">
				        	<div style="margin-left:85px; ">
								<input  id="nombre"  name="nombre" type="text"  class="form-control" placeholder="Nombre" >
								<select id="puesto"  name="puesto"              class="form-control"                      >
								  
								  <option> Community Manager		</option>
								  <option> Director General			</option>
								  <option> Diseñador Gráfico Sr		</option>
								  <option> Diseñador Gráfico		</option>
								  <option> Diseñador Comercial		</option>
								  <option> Director Administrativo	</option>	  
								  <option> Programador				</option>
								  <option selected disabled>Cargo   </option>

								</select>

								<input name="direccion" 		  type="text"   class="form-control" 			 placeholder="Dirección"		   >
								<input name="movil"     		  type="text"   class="form-control"             placeholder="Telefono Móvil"	   >
								<input name="casa"      		  type="text"   class="form-control"             placeholder="Telefono casa"	   >									
								<input name="correo"    		  type="email"  class="form-control" 			 placeholder="Email"			   >
								<input name="fecha_nacimiento"    type="text"   class="form-control datepicker"  placeholder="Fecha de nacimiento" >
							</div>
						</form>	
				    </div>
			        <div class="modal-footer">
				      	<button id="guardar"  type="button" class="btn btn-primary">Guardar</button>
				        <button id="cancelar" type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>		        
			        </div>
			    </div><!-- /.modal-content -->
			  </div><!-- /.modal-dialog -->
			</div><!-- /.modal --><br>

			<div class="tabbable tabs-right">
		        <ul class="nav nav-tabs">
		          <li class="active"> <a href="#rA" data-toggle="tab">  Directores		    </a> </li>
		          <li class="">		  <a href="#rB" data-toggle="tab">  Gerentes			</a> </li>
		          <li class="">		  <a href="#rC" data-toggle="tab">  Programadores		</a> </li>
		          <li class="">		  <a href="#rD" data-toggle="tab">  Diseñadores		    </a> </li>
		          <li class="">		  <a href="#rE" data-toggle="tab">  Community Managers  </a> </li>
		          <li class="">		  <a href="#rF" data-toggle="tab">  Otros				</a> </li>
		        </ul>
		        <div class="tab-content">
		            <div class="tab-pane active" id="rA">
		            	<div  class="panel-group" id="accordion"><br>   
				            <!-- <h3>Directores</h3>
							<hr> -->
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
								        	<div class="campos_edicion">
												<input type="text" class="form-control ancho_campos2" placeholder="Nombre">
												<label class="icon-uniF479 exito"></label>
												<select class="form-control ancho_campos2">
												  <option>Community Manager</option>
												  <option>Director General</option>
												  <option>Diseñador Gráfico Sr</option>
												  <option>Diseñador Gráfico</option>
												  <option>Diseñador Comercial</option>
												  <option>Director Administrativo</option>	  
												  <option>Programador</option>
												  <option selected disabled>Cargo</option>
												</select>
											</div>
											<div class="campos_edicion">	
												<input type="text"  class="form-control ancho_campos2" placeholder="Dirección">
												<input type="text"  class="form-control ancho_campos2" placeholder="Telefono Móvil">
											</div>
											<div class="campos_edicion">	
												<input type="text"  class="form-control ancho_campos2" placeholder="Email">
												<input class="form-control ancho_campos2 datepicker" type="text" id="" placeholder="Fecha de nacimiento">
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
		          </div>
		          <div class="tab-pane" id="rB">
		          	    <div  class="panel-group" id="accordion"><br>   
				            <!-- <h3>Gerentes</h3>
							<hr> -->			    
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
		          <div class="tab-pane" id="rC">
		          	    <div  class="panel-group" id="accordion"><br>   
			            	<!-- <h3>Programadores</h3>
							<hr> -->
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
		          <div class="tab-pane" id="rD">
		          	    <div  class="panel-group" id="accordion"><br>          	          
			          		<!-- <h3>Diseñadores</h3>
							<hr> -->
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
		          </div>
		          <div class="tab-pane" id="rE">
		          	    <div  class="panel-group" id="accordion"><br>   
			          		<!-- <h3>Community Managers</h3>
							<hr> -->			
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
		          </div>
		          <div class="tab-pane" id="rF">
		          	 <div  class="panel-group" id="accordion"><br>
		          	 </div> 		          		          		 		      	
		          </div>
		        </div>
      		</div>			     
		</section>
	</section>
</div>

<script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script>

<!-- Librerias -->
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>">	</script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>">		</script>
<script type="text/javascript">
	var app = app || {};
	app.coleccionDeEmpleados      	= <?php echo json_encode($empleados) 			?>;
</script>
<!-- MVC -->
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloEmpleado.js'?>">          </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloTelefono.js'?>">          </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionEmpleados.js'?>">  </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionTelefonos.js'?>">  </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaEmpleado.js'?>">            </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaNuevoEmpleado.js'?>">       </script>
<script type="text/javascript">	var app = app || {};												   </script>

