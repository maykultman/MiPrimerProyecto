		<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_contratos.css'?>" type="text/css">
		<script src="js/jquery-ui-1.9.2.custom.min.js"></script>
		<!-- scrpit de prueba para la fecha y efecto de toggle para mostrar detalles del servicio -->
		

		<script>
		  $(function() {
		    $( ".datepicker" ).datepicker({
		      changeMonth: true,
		      changeYear: true
		    });
		  });

		$(document).ready(function(){
		  $(".detalles").click(function(){
		    $("#info_servicio").slideToggle();
		  });
		});

		

		$(document).ready(function() {
		    // $("input[name$='options']").click(function() {
		    //     var test = $(this).val();

		    //     $("div.desc").hide();
		    //     $("#Cars" + test).show();
		    // });
			$('.btn-primary').on('change',function (){
				$("input[name$='options']").click(function() {
		      var test = $(this).val();

		      $("div.desc").hide();
		         $("#Cars" + test).show();
		     });
			});
		});
		

		</script>
		<section>
			<div class="row" >
				<div class="col-md-6">
					<h3>Datos basicos</h3>					
					<hr>
					<div>						  
					<input type="text" class="form-control largo" placeholder="Buscar cliente">
					<span id="buscar" class="icon-search"></span>			
					<input type="text" class="form-control largo" disabled placeholder="Representante">
					<input class="form-control largo" disabled  type="text" placeholder="Fecha de creación">
				    </div>
					
					
					<h5 style="display: inline-block"><b>Eliga Tipo de plan:</b></h5>
					<div class="btn-group"  data-toggle="buttons" style="margin-top: -5px;">
					  <label class="btn btn-primary">
					    <input   type="radio" name="options" id="option1" value="2" >Por Evento
					  </label>
					  <label class="btn btn-primary">
					    <input type="radio" name="options" id="option2" value="3">Iguala Mensual
					  </label>			
					</div>
					  <div id="Cars2" class="desc" style="display: none;">
					       por evento
					    </div>
					    <div id="Cars3" class="desc" style="display: none;">
					        iguala mensual
					    </div>    
					
				</div>
				<div class="col-md-6" >	
					<h3>Servicios a contratar</h3>
					<hr>								            
					<div id="tbla_de_servicios" class="panel panel-primary">
				      <!-- Default panel contents -->
				      <div class="panel-heading">Seleccionar Servicios</div>
				      <!-- Table -->
				      <table class="table">
				        <tbody class="scrollContent2">
							<tr>
								<td style="width: 580px ">
									<span   class="icon-info detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">Tarjeta de presentación frente</label>
									<div id="info_servicio">
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
									<span  class="icon-info detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">Medallón</label>
								</td>
							</tr>
							<tr>
								<td>
									<span  class="icon-info detalles" data-toggle="tooltip" title="Información"></span>
									<label for="" name="">Tríptico</label>
								</td>
							</tr>
							<tr>
								<td>
									<span  class="icon-info detalles" data-toggle="tooltip" title="Información"></span>
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
		    <table id ="servicios_elegidos" class="table table-striped" >
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
						<td><input class="descuento" type="text" >&nbsp;%</td>
						<td ><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder=""></td>									
						<td><input class="precio" type="text" placeholder="$"></td>
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
						<td><input class="descuento" type="text" >&nbsp;%</td>
						<td><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder=""></td>								
						<td><input class="precio" type="text" placeholder="$"></td>
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
						<td><input class="descuento" type="text" >&nbsp;%</td>
						<td><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder="$"></td>								
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
						<td><input class="descuento" type="text" >&nbsp;%</td>
						<td><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder=""></td>								
						<td><input class="precio" type="text" placeholder="$"></td>
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
						<td><input class="descuento" type="text" >&nbsp;%</td>
						<td><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder=""></td>
						
						<td><input class="precio" type="text" placeholder="$"></td>
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
						<td><input class="descuento" type="text" >&nbsp;%</td>
						<td><input class="precio" type="text" placeholder=""></td>
						<td><input class="precio" type="text" placeholder=""></td>						
						<td><input class="precio" type="text" placeholder=""></td>
						<td>$12,000</td>						
						<td class="icon-eliminar">
				        	<div class="eliminar_cliente">
				    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
				           </div>
			           </td>		
					</tr>
					<tr class="warning">
						<td></td>
						<td>Importe</td>
						<td></td>
						<td></td>
						<td></td>						
						<td></td>
						<td>$122,323</td>						
						<td></td>					
				    </tr>
				    <tr>
						<td></td>
						<td>+IVA</td>
						<td></td>
						<td></td>
						<td></td>						
						<td></td>
						<td>$122,323</td>						
						<td></td>					
				    </tr>
				    <tr class="info">
						<td></td>
						<td>Total Neto</td>
						<td></td>
						<td></td>
						<td></td>						
						<td></td>
						<td>$122,323</td>						
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
		        <tbody class="planes">
				    	<tr >
							<td colspan="8">
								<div class="row">
									<div class="col-md-4">
										<input class="form-control datepicker input_fecha" type="text"  placeholder="Inicio">
									</div>
									<div class="col-md-4">
										<select   class="form-control input_fecha">
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
										<input class="form-control datepicker input_fecha" disabled type="text" placeholder="Vencimiento">
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
				<tbody class="planes">
				    	<tr>
							<td colspan="8">
								<div class="row">
									<div class="col-md-4">
										<input class="form-control datepicker input_fecha" type="text"  placeholder="Inicio">
									</div>
									<div class="col-md-4">
										<select   class="form-control input_fecha">
										  <option>3 Meses</option>
										  <option>6 Meses</option>
										  <option>12 Meses</option>
										  <option>18 meses</option>
										  <option>24 meses</option>
										   <option>48 meses</option>
										  <option selected disabled>soy plan por evento</option>
										</select>	
									</div>
									<div class="col-md-4">
										<input class="form-control datepicker input_fecha" disabled type="text" placeholder="Vencimiento">
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
