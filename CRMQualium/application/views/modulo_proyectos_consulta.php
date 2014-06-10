  <div id="posicion_infotd">
   <table id="tbla_cliente" class="table table-striped">
      <thead>
        <tr id="color_titulos">
          <th style="text-align:center;">Todos<input type="checkbox"></th>
          <th></th>
          <th>
            <!-- <input type="text" class="form-control" placeholder="Proyecto"> -->
            <!-- <span class="icon-search busqueda"></span> -->
            Proyecto
          </th>  
          <!--<th><input type="text" class="form-control" placeholder="Rsponsable">
            <span class="icon-search busqueda"></span>
          </th>
          <th>Status</th>-->
          <th>Entrega</th>           
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
       </tr>
       <tr>
         <td><input type="checkbox"></td>
         <td><img src="img/fotosClientes/cliente4.png" alt="" class="img-thumbnail"></td>
         <td>Kiper </td>                    
         <td>jose alberto canul may</td>
         <td><span  class="badge color_status1">50</span></td>
         <td>04/06/2014</td>            
         <td class="icon-operaciones">
            <div class="eliminar_cliente">
              <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
            </div>
            <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
            <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
         </td>
        </tr>
        <tr>
          <td><input type="checkbox"></td>
          <td><img src="img/fotosClientes/cliente4.png" alt="" class="img-thumbnail"></td>
          <td>Kiper </td>
          <td>jose alberto canul may</td>
          <td><span class="badge color_status1">50</span></td>           
          <td>04/06/2014</td>    
          <td class="icon-operaciones">
           <div class="eliminar_cliente">
              <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
           </div>
            <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
            <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
          </td>
        </tr>
        <tr>
         <td><input type="checkbox"></td>
         <td><img src="img/fotosClientes/cliente4.png" alt="" class="img-thumbnail"></td>
         <td>Kiper </td>
         <td>jose alberto canul may</td>
         <td><span class="badge color_status">50</span></td>           
         <td>04/06/2014</td>    
         <td class="icon-operaciones">
            <div class="eliminar_cliente">
              <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
            </div>
            <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
            <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
         </td>
        </tr>
        <tr>
         <td><input type="checkbox"></td>
         <td><img src="img/fotosClientes/cliente4.png" alt="" class="img-thumbnail"></td>
         <td>Kiper </td>
         <td>jose alberto canul may</td>
         <td><span  class="badge color_status2">50</span></td>           
         <td>04/06/2014</td>    
         <td class="icon-operaciones">
           <div class="eliminar_cliente">
             <span class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span>
           </div>
           <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
           <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
         </td>
        </tr>
        <tr>
         <td><input type="checkbox"></td>
         <td><img src="img/fotosClientes/cliente4.png" alt="" class="img-thumbnail"></td>
         <td>Kiper </td>
         <td>jose alberto canul may</td>
         <td><span  class="badge color_status2">50</span></td>           
         <td>04/06/2014</td>    
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

<!-- plantillas -->
  <script type="text/template" id="plantilla_tr_proyecto">
    <td><input  type="checkbox"></td>
    <td><img src="img/imgProyectos/holamundo.png" alt="" class="img-thumbnail"></td>
    <td><%- nombre %></td>                     
    <!--<td>Responsable</td>
    <td ><span  class="badge color_status">45</span></td> -->
    <td ><%- f_final %></td>                   
    <td class="icon-operaciones">
      <div class="eliminar_cliente">
        <span class="icon-trash eliminar"   data-toggle="tooltip" data-placement="top" title="Eliminar"></span> 
      </div>
      <span class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></span>
      <span class="icon-eye"  data-toggle="modal" data-target="#myModal" title="Ver proyecto"></span>
    </td>
  </script>

<!-- Librerias Backbone -->
  <script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js'?>"></script>
  <script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'?>"></script>
  <script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.localStorage.js'?>"></script>

<!-- MV* -->
  <!-- modelos -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/modelos/ModeloProyecto.js'?>"></script>
  <!-- colecciones -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/colecciones/ColeccionProyectos.js'?>"></script>
  <!-- vistas -->
    <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaProyecto.js'?>"></script>
    <script type="text/javascript" src="<?=base_url().'js/backbone/vistas/VistaConsultaProyectos.js'?>"></script>