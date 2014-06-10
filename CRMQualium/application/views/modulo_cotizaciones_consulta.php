	<section class="contenedor_principal_modulos">
    <table id="tabla_cotizaciones" class="table table-striped table-curved">
		<thead>
		 <tr id="color_titulos">
			<th style="text-align:center;">Todos<input type="checkbox"></th>
			<th>
				<input class="form-control" type="text" placeholder="Cliente">
			    <span class="icon-search busqueda"></span>
			</th>
			<th>
				<input class="form-control" type="text" placeholder="Relizado por"><span class="icon-search busqueda"></span>
			</th>
				<th>&nbsp;Costo</th>
				<th>&nbsp;&nbsp;Fecha</th>
				<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Operaciones</th>
		    </tr>					
		</thead>
		<tbody id="lista_cotizaciones">							
			<tr>
				<td><input type="checkbox"></td>
				<td><a href="#">Fulano Sultano Mengano</a></td>
				<td><a href="#">Diego</a></td>
				<td>$45,000</td>
				<td>12/12/2014</td>
				<td class="iconos-operaciones">
					<span class="icon-trash"  data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
					<span class="icon-preview"  data-toggle="tooltip" data-placement="top" title="Ver cotización"></span>
					<span class="icon-uniF7D5"  data-toggle="tooltip" data-placement="top" title="Descargar PDF"></span>
					<span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
					<span class="icon-uniF5E2"  data-toggle="tooltip" data-placement="top" title="Realizar contrato"></span>
				</td>
			</tr>
		</tbody>		
	</table>
		<button type="button" class="btn btn-danger">Eliminar varios</button>
		<button type="button" class="btn btn-default">Marcar todos</button>
		<button type="button" class="btn btn-default">Desmarcar todos</button>
	</section>
</div>

<script type="text/javascript">
	$(document).on('ready',function(){
		$('.icon-trash').on('click',function(){
			window.confirm('Estas seguro de eliminar la cotización');
		});
	});
</script>

<script type = "text/plantilla" id="tabla_Cotizacion">
	<td><input type="checkbox" class="checkCot"/>
	<td><a href="#"><%-idcliente  %></a></td>
	<td><a href="#"><%-idempleado %></a></td>
	<td>$5000</td>
	<td><%- fecha %></td>
	<td class="iconos-operaciones">
		<span class="icon-trash"    data-toggle="tooltip" data-placement="top" title="Eliminar">		  </span>
		<span class="icon-preview"  data-toggle="tooltip" data-placement="top" title="Ver cotización">	  </span>
		<span class="icon-uniF7D5"  data-toggle="tooltip" data-placement="top" title="Descargar PDF">	  </span>
		<span class="icon-edit2"    data-toggle="tooltip" data-placement="top" title="Editar">			  </span>
		<span class="icon-uniF5E2"  data-toggle="tooltip" data-placement="top" title="Realizar contrato"> </span>
	</td>

</script>

<!-- Librerias -->
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/jquery.js'?>">		</script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>">	</script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>">		</script>
<script type="text/javascript">
	var app = app || {};
	app.coleccionDeCotizaciones   = <?php echo json_encode($cotizaciones)   ?>;
	app.coleccionDeServicios      = <?php echo json_encode($servicios)      ?>;
	app.coleccionDeClientes       = <?php echo json_encode($clientes)       ?>;
	app.coleccionDeRepresentantes = <?php echo json_encode($representantes) ?>;
</script>
<!-- MVC -->
<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloCotizacion.js'?>">			 </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionCotizaciones.js'?>"> </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaCotizacion.js'?>">			 </script>
<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaConsultaCotizaciones.js'?>">  </script>
<script type="text/javascript">	var app = app || {};													 </script>