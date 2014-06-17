<style type="text/css">
	#color_titulos hr {
		line-height: 10px;
	}
</style>
	<div id="posicion_infotd">
		<table id="tbla_cliente" class="table table-striped">
			<thead>
		        <tr id="color_titulos">
					<th style="text-align:center;">Todos<!-- <input type="checkbox"> --></th>
					<th>
				        <input type="text" class="form-control" placeholder="Clientes">
				        <!-- Cliente -->
					</th>
					<th>
						<input type="text" class="form-control" placeholder="Proyecto">
						<span class="icon-search busqueda"></span>
						<!-- Proyecto -->
					</th>  
					<!-- <th><input type="text" class="form-control" placeholder="Rsponsable">
						<span class="icon-search busqueda"></span>
					</th> -->
					<th>Inicio</th>
					<th>Entrega</th>     
					<th>Status</th>         
					<th>Operaciones</th>
		        </tr>
			</thead>      
			<tbody id="tbody_proyectos">
			</tbody> 
	    </table>
	    <button type="button" class="btn btn-default">Eliminar varios</button>
	    <button type="button" class="btn btn-default">Entregar</button>  
	</div>

	<!-- ---------------------------Modal consulta informacion del cliente---------- -->
	<!-- <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<p class="panel-title"><h4>Información</h4></p>
					<span id="cerrar_consulta" class="glyphicon glyphicon-remove close" data-dismiss="modal" aria-hidden="true"></span>
				</div>
				<div id="contenido_cliente" class="panel-body"></div>
			</div>
		</div>
	</div> -->
</div>

<script type="text/javascript">
	var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
</script>
<!-- plantillas -->
	<script type="text/template" id="plantilla_tr_proyecto">
		<td><input  type="checkbox"></td>
		<td><%- propietario %></td>
		<td><%- nombre %></td>                     
		<!-- <td>Responsable</td> -->
		<td >
			<% var Anio_Mes_dia = fechainicio.split('-'); %>
			<%- Anio_Mes_dia[2] %>
			<% for (var i = 0; i < meses.length+1; i++) { %>
	         <% if (i == Anio_Mes_dia[1]) { %>
	             <%- meses[i-1] %>
	         <% }; %>
			<% }; %>
			<%- Anio_Mes_dia[0] %>
		</td> 
		<td >
			<% Anio_Mes_dia = fechafinal.split('-'); %>
			<%- Anio_Mes_dia[2] %>
			<% for (var i = 0; i < meses.length+1; i++) { %>
	         <% if (i == Anio_Mes_dia[1]) { %>
	             <%- meses[i-1] %>
	         <% }; %>
			<% }; %>
			<%- Anio_Mes_dia[0] %>
		</td> 
		<td >
			<%
		        var valorFechaInicio = new Date(fechainicio).valueOf();
		        var valorFechaEntrega = new Date(fechafinal).valueOf();
		        var valorFechaActual = new Date().valueOf();
		        var plazo = ((((valorFechaEntrega-valorFechaInicio))/24/60/60/1000) + 1).toFixed();
		        var conteo = ((((valorFechaEntrega-valorFechaInicio)-((valorFechaEntrega-valorFechaInicio)-(valorFechaEntrega-valorFechaActual)))/24/60/60/1000) +1).toFixed();
		        var porcentaje = ( (100 * conteo)/plazo ).toFixed();
		        // console.log('plazo: '+plazo, 'conteo: '+conteo, 'porcentaje: '+porcentaje+'%');
			%>
			<% if (porcentaje >= 100) { %>
				<span class="badge">
					Comienza en <%- (conteo - plazo) + 1 %> <%= ((conteo - plazo) + 1) === 1 ? 'día' : 'días' %>
				</span>
			<% }; %>
			<% if (porcentaje >= 51 && porcentaje < 100) { %>
				<span class="badge color_success">
					<%- conteo %> <%= conteo === 1 ? 'día' : 'días' %>
				</span>
			<% }; %>
			<% if ( porcentaje >= 15 && porcentaje <= 50) { %>
				<span class="badge color_warning">
					<%- conteo %> <%= conteo === 1 ? 'día' : 'días' %>
				</span>
			<% }; %>
			<% if (porcentaje >= 0 && porcentaje <= 14) { %>
				<span class="badge color_error">
					<%- conteo %> <%= conteo === 1 ? 'día' : 'días' %>
				</span>
			<% }; %>
			<% if (porcentaje < 0) { %>
				<span class="badge color_error">
					<%- -(conteo) %> <%= -(conteo) === 1 ? 'día' : 'días' %> de atraso
				</span>
			<% }; %>
		</td>                  
		<td class="icon-operaciones">
			<div class="eliminar_cliente">
	     		<span class="icon-trash eliminar"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
			</div>
			<span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
			<span id="verInfo" class="icon-eye"  data-toggle="modal" data-target="#modal<%- id %>" title="Ver proyecto"></span>
		</td>
	</script>

	<script type="text/template" id="plantillaModalProyecto">
		<div class="modal fade" id="modal<%- id %>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<p class="panel-title"><h4>Información</h4></p>
						<span id="cerrar_consulta" class="glyphicon glyphicon-remove close" data-dismiss="modal" aria-hidden="true"></span>
					</div>
					<div id="contenido_cliente" class="panel-body">
						<div class="jumbotron">
							<h1>Datos proyecto</h1>
							<p>	<b>id 			:</b>	<%- id 			%>	</p>
							<p>	<b>idcliente 	:</b>	<%- idcliente 	%>	</p>
							<p>	<b>nombre 		:</b>	<%- nombre 		%>	</p>
							<p>	<b>propietario	:</b>	<%- propietario %>	</p>
							<p>	<b>fechainicio	:</b>	<%- fechainicio %>	</p>
							<p>	<b>fechafinal 	:</b>	<%- fechafinal 	%>	</p>
							<p>	<b>descripcion	:</b>	<%- descripcion %>	</p>
						</div>
						<div id="serviciosProyecto" class="jumbotron">
							<h1>Servicios proyecto</h1>
						</div>
						<div id="rolesProyecto" class="jumbotron">
							<h1>Roles de proyecto</h1>
						</div>
					</div>
				</div>
			</div>
		</div>
	</script>
	<script type="text/template" id="plantillaServicioProyecto">
		<%- nombre %>
	</script>
	<script type="text/template" id="plantillaRolProyecto">
		<p><b><%- nombreRol %></b> <%- nombrePersonal %></p>
	</script>


<!-- <script type="text/javascript" src="<?=base_url().'js/backbone/app.js'?>"></script> -->
<script type="text/javascript">
	var app = app || {};
	app.coleccionDeClientes       = <?php echo json_encode($clientes)       ?>;
	app.coleccionDeProyectos      = <?php echo json_encode($proyectos)      ?>;
	app.coleccionDeRoles          = <?php echo json_encode($roles)          ?>;
	app.coleccionDeServicios      = <?php echo json_encode($servicios)      ?>;
	app.coleccionDeEmpleados      = <?php echo json_encode($empleados)      ?>;
	app.coleccionDeProyectoRoles  = <?php echo json_encode($proyectoRoles)  ?>;
	app.coleccionServicosProyecto = <?php echo json_encode($servicios_proy) ?>;
</script>
<!-- Utilerias -->
<!-- <script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script> -->
<!-- Librerias Backbone -->
	<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>"></script>
	<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>"></script>
<!-- MV* -->
	<!-- modelos -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloCliente.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloProyecto.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloRol.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloServicio.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloEmpleado.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloRolProyecto.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloServicioProyecto.js'?>"></script>
	<!-- colecciones -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionClientes.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionProyectos.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionRoles.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionServicios.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionEmpleados.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionRolesProyectos.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionServiciosProyecto.js'?>"></script>
	<!-- vistas -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaServicio.js'?>"></script> <!-- Solo heredamos la clase -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaRol.js'?>"></script> <!-- Solo heredamos la clase -->
		<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaProyecto.js'?>"></script>
		<script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaConsultaProyectos.js'?>"></script>