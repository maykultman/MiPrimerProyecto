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
      <tbody id="tbody_proyectos"><!--
       <tr>
         <td><input  type="checkbox"></td>
         <td><img src="img/fotosClientes/cliente3.jpg" alt="" class="img-thumbnail"></td>
         <td>FoodBook</td>                     
         <td>Ivan villamil</td>
         <td ><span  class="badge color_status">45</span></td> 
         <td >04/06/2014</td>                   
         <td class="icon-operaciones">
           <div class="eliminar_cliente">
             <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
           </div>
            <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
            <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
         </td>
       </tr>-->
      </tbody>  
    </table>
    <button type="button" class="btn btn-default">Eliminar varios</button>
    <button type="button" class="btn btn-default">Entregar</button>  
  </div>

  <!-- ---------------------------Modal consulta informacion del cliente---------- -->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <p class="panel-title"><h4>Información</h4></p>
          <span id="cerrar_consulta" class="glyphicon glyphicon-remove close" data-dismiss="modal" aria-hidden="true"></span>
        </div>
        <div id="contenido_cliente" class="panel-body"></div>
      </div>
    </div>
  </div>
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
         <% for (var i = 0; i < meses.length; i++) { %>
             <% if (i == Anio_Mes_dia[1]) { %>
                 <%- meses[i-1] %>
                 <% break; %>
             <% }; %>
         <% }; %>
         <%- Anio_Mes_dia[0] %>
      </td> 
      <td >
         <% Anio_Mes_dia = fechafinal.split('-'); %>
         <%- Anio_Mes_dia[2] %>
         <% for (var i = 0; i < meses.length; i++) { %>
             <% if (i == Anio_Mes_dia[1]) { %>
                 <%- meses[i-1] %>
                 <% break; %>
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
            console.log('plazo: '+plazo,', quedan: '+conteo,', procentaje: '+porcentaje+'%');
         %>
         <% if (porcentaje > 100) { %>
            <span class="badge">
               Comienza en <%- conteo - plazo %> días
            </span>
         <% }; %>
         <% if (porcentaje >= 51 && porcentaje <= 100) { %>
            <span class="badge color_success">
               <%- conteo %> días
            </span>
         <% }; %>
         <% if ( porcentaje >= 15 && porcentaje <= 50) { %>
            <span class="badge color_warning">
               <%- conteo %> días
            </span>
         <% }; %>
         <% if (porcentaje >= 0 && porcentaje <= 14) { %>
            <span class="badge color_error">
               <%- conteo %> días
            </span>
         <% }; %>
         <% if (porcentaje < 0) { %>
            <span class="badge color_error">
               <%- -(conteo) %> días de atraso
            </span>
         <% }; %>
      </td>                  
      <td class="icon-operaciones">
         <div class="eliminar_cliente">
            <span class="icon-trash eliminar"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
         </div>
         <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
         <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
      </td>
  </script>
<!-- <script type="text/javascript" src="<?=base_url().'js/backbone/app.js'?>"></script> -->
<script type="text/javascript">
  var app = app || {};
  app.coleccionDeClientes = [];
</script>
<!-- Utilerias -->
<!-- <script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script> -->
<!-- Librerias Backbone -->
  <script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>"></script>
  <script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>"></script>

<!-- MV* -->
  <!-- modelos -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloProyecto.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloCliente.js'?>"></script>
  <!-- colecciones -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionProyectos.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionClientes.js'?>"></script>
  <!-- vistas -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaProyecto.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaConsultaProyectos.js'?>"></script>