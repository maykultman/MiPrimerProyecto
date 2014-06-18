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
		  $("#infoSC").click(function(){
		    $("#info_servicio").slideToggle();
		  });
		});
		</script>
		<section>	
			<h3>Nuevo Contrato</h3>
			<hr><br>
			<div class="datos_primarios">				  
				<input type="text" class="form-control " placeholder="Buscar cliente">
				<span id="buscar" class="icon-search"></span>			
				<input type="text" class="form-control" disabled placeholder="Representante">
				<input class="form-control " disabled  type="text" placeholder="Fecha de creación">
			</div>
			<div class="datos_primarios">			
				<input class="form-control datepicker" type="text" id="" placeholder="Inicio">
				<select   class="form-control ">
				  <option>3 Meses</option>
				  <option>6 Meses</option>
				  <option>12 Meses</option>
				  <option>18 meses</option>
				  <option>24 meses</option>
				  <option selected disabled>Terminó de contrato</option>
				</select>
				<input class="form-control datepicker" disabled type="text" placeholder="Vencimiento">
			</div>	 
			<div class="desborde"></div><br>
			<h3>Inversión & Tiempo</h3>
			<hr><br>
			<div id="panel_contrato" class="panel panel-primary">
		      <!-- Default panel contents -->
		      <div class="panel-heading">Servicios</div>
		      <!-- Table -->
		      <table class="table">
		        <tbody class="scrollContent2">
					<tr>
						<td style="width: 580px ">
							<span id="infoSC" class="icon-info" data-toggle="tooltip" title="Información"></span>
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
							<span id="infoSC" class="icon-info" data-toggle="tooltip" title="Información"></span>
							<label for="" name="">Medallón</label>
						</td>
					</tr>
					<tr>
						<td>
							<span id="infoSC" class="icon-info" data-toggle="tooltip" title="Información"></span>
							<label for="" name="">Tríptico</label>
						</td>
					</tr>
					<tr>
						<td>
							<span id="infoSC" class="icon-info" data-toggle="tooltip" title="Información"></span>
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
		    </div><br>			
		    <!-- <table id="tbla_services" class="table table-striped">
		    	<thead id="cabecera_serv">
					<tr>						
						<th>Servicios</th>							
					</tr>
				</thead>
				<tbody class="scrollContent2">
					<tr>
						<td><a href="#">Tarjeta de presentación frente</a>
							<button id="bton" type="button" class="btn btn-default"><span class="icon-info" data-toggle="tooltip" title="Información"></span>
							</button>
							<div id="prueba">
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
						<td>Medallón</td>
					</tr>
					<tr>
						<td>Tríptico</td>
					</tr>
					<tr>
						<td>díptico</td>
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
			</table><br>			 -->
			<div id="serv_obtenidos">
			    <form>
				    <table class="table table-striped table-curved" >
						<thead>
							<tr class="color_cabecera">
								<th>&nbsp;&nbsp;&nbsp;&nbsp;</th>
								<th colspan="4" >Tipo de Plan								
								</th>
								<th colspan="8" class="txt">
									<div id="tipo_plan" data-toggle="buttons">			   
									    <label id="radio1" class="btn btn-primary">
									     <input type="radio" name="options" id="option1" data-toggle="buttons">Plan por Evento
									    </label>
									     <label id="radio2"class="btn btn-primary">
									     <input type="radio" name="options" id="option2" data-toggle="buttons">Plan por Iguala
									    </label>									       
								    </div>								
								</th>											
							</tr>
						</thead>			
						<tbody>
							<tr>
								<td><b>Todos</b><input type="checkbox"></td>
								<td><b>Servicio</b></td>
								<td><b>Descuento</b></td>
								<td><b>Realización</b></td>
								<td class="linea"><b>Cantidad</b></td>
								<td><b>P/Unitario</b></td>
								<td class="linea"><b>Precio</b></td>
								<td><b>P/Unitario</b></td>
								<td><b>Precio</b></td>
								<td>
									<select>
										<option>1 mes</option>
				  						<option>2 meses</option>
				  						<option>3 meses</option>
				  						<option>4 meses</option>
				  						<option>5 meses</option>
				  						<option>6 meses</option>
				  						<option>1 año</option>
				  						<option selected disabled>Duración</option> 						
								    </select>
							    </td>
							    <td></td>					
							</tr>
							<tr>
								<td><input type="checkbox"></td>
								<td>Tarjeta de presentación frente</td>
								<td><input class="descuento" type="text" >&nbsp;%</td>
								<td ><input class="precio" type="text" placeholder=""></td>
								<td class="linea"><input class="precio" type="text" placeholder=""></td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td class="linea">$12,00</td>					
								<td><input class="precio" type="text" placeholder="$"></td>
								<td>$12,000</td>
								<td></td>
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
								<td class="linea"><input class="precio" type="text" placeholder=""></td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td class="linea">$12,00</td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td>$12,000</td>
								<td></td>
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
								<td class="linea"><input class="precio" type="text" placeholder=""></td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td class="linea">$12,00</td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td>$12,000</td>
								<td></td>
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
								<td class="linea"><input class="precio" type="text" placeholder=""></td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td class="linea">$12,00</td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td>$12,000</td>
								<td></td>
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
								<td class="linea"><input class="precio" type="text" placeholder=""></td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td class="linea">$12,00</td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td>$12,000</td>
								<td></td>
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
								<td class="linea"><input class="precio" type="text" placeholder=""></td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td class="linea">$12,00</td>
								<td><input class="precio" type="text" placeholder="$"></td>
								<td>$12,000</td>
								<td></td>
								<td class="icon-eliminar">
						        	<div class="eliminar_cliente">
						    			<span class="icon-circledelete"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
						           </div>
					           </td>		
							</tr>
							<tr class="info">
								<td></td>
								<td >Total</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>$122,323</td>
								<td></td>
								<td></td>					
						    </tr>						
						</tbody>
				    </table>
				</form>    
			</div>
		   	<div class="desborde"></div> 
		   	<button type="button" class="btn btn-default">Eliminar varios</button>	
		   	<br><br><br>
		   	<button type="button" class="btn btn-primary">Aceptar</button>
		   	<button type="button" class="btn btn-default"><span class="icon-preview"></span> Vista previa</button>
		   	<button type="button" class="btn btn-danger">Cancelar</button>
		</section>   	 
	</section>   	                
</div>
