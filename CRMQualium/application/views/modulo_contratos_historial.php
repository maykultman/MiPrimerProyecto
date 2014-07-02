 <link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_contratos.css'?>" type="text/css">
 <div id="posicion_infotd">
    <table id="tbla_cliente" class="table table-striped">      
        <tr>
	        <th style="text-align:center;">Todos<br><input type="checkbox"></th>           
	    	<th>
				<input class="form-control" type="text" placeholder="Cliente">
				<span class="icon-search busqueda"></span>
	        </th>
	        <th>
				<input class="form-control" type="text" placeholder="Realizado por">
				<span class="icon-search busqueda"></span>
	        </th>
	        <th>
				<input class="form-control" type="text" placeholder="Fecha de realización">
				<span class="icon-search busqueda"></span>
	        </th>
	        <th>Vencimiento</th>  
	        <th>Operaciones</th>
        </tr>
        <tbody id="tbody_contratos"><!-- PLANTILLAS DE CONTRATOS --></tbody>
       <!--  <tr>
	        <td><input  type="checkbox"></td>
	        <td>Qualium</td>
	        <td>Rodrigo Viana</td>                     
	        <td>04/06/2014</td>
	        <td>04/06/2014</td>                            
	        <td class="icon-operaciones">
	            <div class="eliminar_cliente">
	                <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
	            </div>
	            <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>               
	            <span class="icon-preview" data-toggle="modal" data-target="#myModal" title="Ver contrato"></span>
	            <span class="icon-uniF7D5" data-toggle="modal" data-target="#myModal" title="Descargar"></span>
	        </td>
        </tr> -->
        <!-- <tr>
			<td><input type="checkbox"></td>
			<td>Coliseo Yucatán</td>
			<td>Geyser Ramirez Sanchez</td>                    
			<td>04/06/2014</td>
			<td>04/06/2014</td>
			<td class="icon-operaciones">
			    <div class="eliminar_cliente">
			        <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
			    </div>
			    <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>               
			    <span class="icon-preview" data-toggle="modal" data-target="#myModal" title="Ver contrato"></span>
			    <span class="icon-uniF7D5" data-toggle="modal" data-target="#myModal" title="Descargar"></span>
			</td>              
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td>Star Medical</td>
            <td>jose alberto canul may</td>
            <td>04/06/2014</td>
            <td>04/06/2014</td>           
            <td class="icon-operaciones">
                <div class="eliminar_cliente">
                <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
                </div>
                <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>               
                <span class="icon-preview" data-toggle="modal" data-target="#myModal" title="Ver contrato"></span>
                <span class="icon-uniF7D5" data-toggle="modal" data-target="#myModal" title="Descargar"></span>
            </td>
        </tr> -->
    </table>
    <button type="button" class="btn btn-danger">Eliminar varios</button>
    <button type="button" class="btn btn-default">Entregados</button>  
  </div>
</div>

<script type="text/template">
	<td><input type="checkbox"></td>
	<td><%- nombreComercial %></td>
	<td>(sin sesiones)</td>                     
	<td><%- fechacreacion %></td>
	<td><%- fechafinal %></td>                            
	<td class="icon-operaciones">
		<div class="eliminar_cliente">
			<span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
		</div>
		<span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>               
		<span class="icon-preview" data-toggle="modal" data-target="#myModal" title="Ver contrato"></span>
		<span class="icon-uniF7D5" data-toggle="modal" data-target="#myModal" title="Descargar"></span>
	</td>
</script>

<script type="text/javascript" src="<?=base_url().'js/backbone/app.js'?>"></script>
<script type="text/javascript">
    var app = app || {};
    app.coleccionDeClientes     = <?php echo json_encode($clientes) ?>;
    app.coleccionDeServicios    = <?php echo json_encode($servicios) ?>;
    app.coleccionDeRepresentantes   = <?php echo json_encode($representantes) ?>;
    app.coleccionDeContratos = <?=json_encode($contratos)?>;
    app.coleccionDeServiciosContrato = <?=json_encode($serviciosDeContrato)?>;
    app.coleccionDePagos = <?=json_encode($pagos)?>;
</script>
<!-- Utilerias -->
    <script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script>
<!-- Librerias Backbone -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>"></script>
<!-- modelos -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloCliente.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloRepresentante.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloServicio.js'?>"></script>
<!-- colecciones -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionClientes.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionRepresentantes.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionServicios.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionContratos.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionServiciosContrato.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionPagos.js'?>"></script>
    <script type="text/javascript">
        app.coleccionContratos = new ColeccionContratos(app.coleccionDeContratos);
        app.coleccionServiciosContrato = new ColeccionServiciosContrato(app.coleccionDeServiciosContrato);
        app.coleccionPagos = new ColeccionPagos(app.coleccionDePagos);
    </script>
<!-- vistas -->
  <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaServicio.js'?>"></script> <!-- Heredamos la clase VistaServicio -->
  <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaContrato.js'?>"></script>
  <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaConsultaContrato.js'?>"></script>