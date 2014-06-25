		<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_contratos.css'?>" type="text/css">
		<!-- scrpit de prueba para la fecha y efecto de toggle para mostrar detalles del servicio -->
		<script>
		  $(function() {
		    $( ".datepicker" ).datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
		  });

			$(document).ready(function(){
			  $(".icon_detalles").click(function(){
			    $("#div_info").slideToggle();
			  });
			});		

			$(document).ready(function() {
			    // $("input[name$='options']").click(function() {
			    //     var test = $(this).val();

			    //     $("div.desc").hide();
			    //     $("#Cars" + test).show();
			    // });
				var cont= 1;

				$('.btn-primary').on('change',function (){

					if ( cont==1 ){}


					// console.log($(this).html());
					$('.tabla_visible').toggleClass('tabla_oculto');
				});
			});		
		</script>
		<section>
			<div class="row" >
				<div class="col-md-6">
					<h3>Datos basicos</h3>					
					<hr>
					<div>						  
					<input type="text" id="busqueda" class="form-control input_largo" placeholder="Buscar cliente">
					<input type="hidden" id="hidden_idCliente" name="idcliente">
					<span id="span_buscar" class="icon-search"></span>			
					<input type="text" id="input_Representante" class="form-control input_largo" disabled placeholder="Representante">
					<input type="hidden" id="hidden_idRepresentante" name="idrepresentante">
					<input class="form-control input_largo" disabled  type="text" placeholder="Fecha de creación">
				    </div>
					
					
					<h5 style="display: inline-block"><b>Eliga Tipo de plan:</b></h5>
					<div class="btn-group"  data-toggle="buttons" style="margin-top: -5px;">
						<label for="option1" class="btn btn-primary active">
							<input type="radio" name="options" id="option1" value="" checked>Por Evento
						</label>
						<label for="option2" class="btn btn-primary">
							<input type="radio" name="options" id="option2" value="">Iguala Mensual
						</label>			
					</div>
					  
					
				</div>
				<div class="col-md-6" >	
					<h3>Servicios a contratar</h3>
					<hr>								            
					<div id="tabla_servicios" class="panel panel-primary">
				        <!-- Default panel contents -->
				        <div class="panel-heading">Seleccionar Servicios</div>
				        <!-- Table -->
				        <table class="table">
				        <tbody class="scroll_tbody">
							<tr>
								<td style="width: 580px ">
									<span   class="icon-info icon_detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">Tarjeta de presentación frente</label>
									<div id="div_info">
										<ul>	
											<li>Concepto:&nbsp;<h7>Diseño Gráfivo</h7><li>
											<li>P/Unitario:&nbsp;<h7>$300</h7><li>
											<li>+IVA:&nbsp;<h7>$380</h7><li>
											<li>Realización:&nbsp;<h7>1 día</h7><li>
											<li>Detalles:&nbsp;<h7></h7><li>
									    </ul>
								    </div>
								</td>
							</tr>
							<tr>
								<td>
									<span  class="icon-info icon_detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">Medallón</label>
								</td>
							</tr>
							<tr>
								<td>
									<span  class="icon-info icon_detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">Tríptico</label>
								</td>
							</tr>
							<tr>
								<td>
									<span  class="icon-info icon_detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">díptico</label>
								</td>
							</tr>
							<tr>
								<td>Catálogo</td>
							</tr>
							<tr>
								<td>Tarjeta de presentación frente y vuelta</td>
							</tr>
							<tr>
								<td>Anuncio sencillo</td>
							</tr>
							<tr>
								<td>Menú de restaurante</td>
							</tr>
							<tr>
								<td>Diseño de caja</td>
							</tr>
							<tr>
								<td>Branding Completo</td>
							</tr>
							<tr>
								<td>Logo Animado</td>
							</tr>
							<tr>
								<td>Video Branding</td>
							</tr>
							<tr>
								<td>Campaña</td>
							</tr>
							<tr>
								<td>Aplicaciones de campaña</td>
							</tr>
							<tr>
								<td>Página Web sencilla </td>
							</tr>
							<tr>
								<td>Página Web complicada (Mas de 5 secciones)</td>
							</tr>
							<tr>
								<td>Página Web con sistema interno</td>
							</tr>
							<tr>
								<td>App sencilla</td>
							</tr>
						</tbody>
				      </table>
				    </div>
				</div>    
			</div><br>        			    
		    <table id ="tabla_contrato" class="table table-striped" >
				<thead  style="background-color: #f9f9f9!important;">
					<tr>
						<td></td>
						<td><b>Servicio</b></td>
						<td><b>Descuento</b></td>
						<td><b>Realización</b></td>
						<td><b>Cantidad</b></td>							
						<td><b>P/Unitario</b></td>
						<td><b>Precio</b></td>
						
					    <td></td>					
					</tr>							
				</thead>			
				<tbody>							
					<tr>
						<td style="width: 50px;"><input type="checkbox"></td>
						<td>Tarjeta de presentación frente</td>
						<td><input class="input_descuento" type="text" >&nbsp;%</td>
						<td ><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder=""></td>									
						<td><input class="input_precio" type="text" placeholder="$"></td>
						<td>$12,000</td>
						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>
					</tr>
					<tr>
						<td><input type="checkbox"></td>
						<td>Medallón</td>
						<td><input class="input_descuento" type="text" >&nbsp;%</td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder=""></td>								
						<td><input class="input_precio" type="text" placeholder="$"></td>
						<td>$12,000</td>
						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>				
					</tr>
					<tr>
						<td><input type="checkbox"></td>
						<td>Tríptico</td>
						<td><input class="input_descuento" type="text" >&nbsp;%</td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder="$"></td>								
						<td>$12,000</td>
						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>					
					</tr>
					<tr>
						<td><input type="checkbox"></td>
						<td>díptico</td>
						<td><input class="input_descuento" type="text" >&nbsp;%</td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder=""></td>								
						<td><input class="input_precio" type="text" placeholder="$"></td>
						<td>$12,000</td>
						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>				
					</tr>
					<tr>
						<td><input type="checkbox"></td>
						<td>Catálogo</td>
						<td><input class="input_descuento" type="text" >&nbsp;%</td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						
						<td><input class="input_precio" type="text" placeholder="$"></td>
						<td>$12,000</td>
						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>
					</tr>
					<tr>
						<td><input type="checkbox"></td>
						<td>Aplicacion movil</td>
						<td><input class="input_descuento" type="text" >&nbsp;%</td>
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td><input class="input_precio" type="text" placeholder=""></td>						
						<td><input class="input_precio" type="text" placeholder=""></td>
						<td>$12,000</td>						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>		
					</tr>
					<tr class="warning">
						<td></td>
						<td colspan="5"><b>Importe</b></td>						
						<td><b>$122,323</b></td>						
						<td></td>					
				    </tr>
				    <tr>
						<td></td>
						<td colspan="5"><b>+IVA</b></td>						
						<td><b>$122,323</b></td>						
						<td></td>					
				    </tr>
				    <tr class="info">
						<td></td>
						<td colspan="5"><b>Total Neto</b></td>						
						<td><b>$122,323</b></td>						
						<td></td>					
				    </tr>
				    <tr style="height: 100px">
				    	<td colspan="8">				    		
							<div class="btn-group" data-toggle="buttons">
								<label class="btn btn-default btn-xs">
									<input type="checkbox" id="checkboxServicios" class="btn_marcarTodos"> Marcar todos
								</label>
							</div>
							<button type="button" class="btn btn-danger btn-xs checkboxServicios btn_eliminarMarcados">Eliminar marcados</button>
				    	</td>
					</tr>							    		   										
				</tbody>				
		        <tbody class="tabla_visible tabla_oculto">
				    	<tr >
							<td colspan="8">
								<div class="row">
									<div class="col-md-4">
										<input class="form-control datepicker inputs_planIguala" type="text"  placeholder="Inicio">
									</div>
									<div class="col-md-4">
										<select   class="form-control inputs_planIguala">
										  <option>3 Meses</option>
										  <option>6 Meses</option>
										  <option>12 Meses</option>
										  <option>18 meses</option>
										  <option>24 meses</option>
										   <option>48 meses</option>
										  <option selected disabled>Duración de contrato</option>
										</select>	
									</div>
									<div class="col-md-4">
										<input class="form-control datepicker inputs_planIguala" disabled type="text" placeholder="Vencimiento">
									</div>									
								</div>
							</td>	       									          			         
				        </tr>
				        <tr>
				          <td colspan="2"><b>No. de Pago</b></td>
				          <td colspan="2"><b>Fecha de pago</b></td>
				          <td colspan="2"><b>Renta Mensual</b></td>
				          <td colspan="2"><b>Saldo</b></td>				         
				        </tr>	
				        <tr>
				          <td  colspan="2">1</td>
				          <td  colspan="2">21/06/14</td>
				          <td  colspan="2"><input type="text" name="" value="" class="input_renta" placeholder="$2,000" ></td>
				          <td  colspan="2">$2,000</td>			          
				        </tr>
				        <tr>
				          <td  colspan="2">2</td>
				          <td  colspan="2">22/06/14</td>
				          <td  colspan="2"><input type="text" name="" value="" class="input_renta" placeholder="$2,000"></td>
				          <td  colspan="2">$2,000</td>						         
				        </tr>
				        <tr>
				          <td  colspan="2">3</td>
				          <td  colspan="2">23/06/14 </td>
				          <td  colspan="2"><input type="text" name="" value="" class="input_renta" placeholder="$2,000"></td>
				          <td  colspan="2">$2,000</td>				         
				        </tr>
				</tbody>
				<tbody class="tabla_visible">
				    	<tr>
							<td colspan="8">
								<div class="row">
									<div class="col-md-3">
										<input class="form-control datepicker inputs_planEvento" type="text"  placeholder="Inicio">
									</div>
									<div class="col-md-3">
										<input type="number"  class="form-control inputs_planEvento" name="quantity" min="1" max="" placeholder="Plazo en días">	
									</div>
									<div class="col-md-3">
										<input type="number" class="form-control inputs_planEvento" name="quantity" min="1" max="" placeholder="Numero de Plazos">	
									</div>
									<div class="col-md-3">
										<input class="form-control datepicker inputs_planEvento" disabled type="text" placeholder="Vencimiento">
									</div>									
								</div>
							</td>	       									          			         
				        </tr>
				        <tr>
				          <td colspan="2"><b>No. de Pago</b></td>
				          <td colspan="2"><b>Fecha de pago</b></td>
				          <td colspan="2"><b>Renta Mensual</b></td>
				          <td colspan="2"><b>Saldo</b></td>				         
				        </tr>	
				        <tr>
				          <td  colspan="2">1</td>
				          <td  colspan="2">21/06/14</td>
				          <td  colspan="2"><input type="text" name="" value="" class="input_renta" placeholder="$2,000" ></td>
				          <td  colspan="2">$2,000</td>			          
				        </tr>
				        <tr>
				          <td  colspan="2">2</td>
				          <td  colspan="2">22/06/14</td>
				          <td  colspan="2"><input type="text" name="" value="" class="input_renta" placeholder="$2,000"></td>
				          <td  colspan="2">$2,000</td>						         
				        </tr>
				        <tr>
				          <td  colspan="2">3</td>
				          <td  colspan="2">23/06/14 </td>
				          <td  colspan="2"><input type="text" name="" value="" class="input_renta" placeholder="$2,000"></td>
				          <td  colspan="2">$2,000</td>				         
				        </tr>
				</tbody>		       		       
		    </table>  
		   	<div class="desborde"></div>		 
		   	<button type="button" class="btn btn-default">Aceptar</button>
		   	<button type="button" class="btn btn-primary"><span class="icon-preview"></span> Vista previa</button>
		   	<button type="button" class="btn btn-default">Cancelar</button>
		</section>   	 
	</section>   	                
</div>


<script type="text/javascript">
	var app = app || {};
	app.coleccionDeClientes = <?php echo json_encode($clientes) ?>;
	app.coleccionDeServicios = <?php echo json_encode($servicios) ?>;
	app.coleccionDeRepresentantes = <?php echo json_encode($representantes) ?>;
</script>

<!-- Librerias Backbone -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>"></script>

<!-- modelos -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloCliente.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloRepresentante.js'?>"></script>
<!-- colecciones -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionClientes.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionRepresentantes.js'?>"></script>
<!-- vistas -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaNuevoContrato.js'?>"></script>