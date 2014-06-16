 <span class="icon-eye verInfo" data-toggle="modal" data-target="#modal" title="Ver información">    </span>
  <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

      <div class="modal-dialog">

          

          <div id="icon-operaciones2">
              <div class="btn-group-vertical">
                  <button type="button" class="btn btn-primary" id="modal_btn_eliminar"><label class="icon-trash"   data-toggle="tooltip" data-placement="top" title="Eliminar"></label></button>
                  <button type="button" class="btn btn-primary" id="modal_btn_editar"><label class="icon-edit2"  data-toggle="tooltip" data-placement="top" title="Editar"></label></button>
                  <button type="button" class="btn btn-primary" id="btn_verContactos"><label class="icon-friends"  data-toggle="tooltip" data-placement="top" title="Contactos"></label></button>
              </div>
          </div>
          <div class="panel panel-primary">
              <div class="panel-heading">
                  <p class="panel-title"><h4>Información</h4></p>
                  <span id="cerrar_consulta" class="glyphicon glyphicon-remove" style="float:right" data-dismiss="modal" aria-hidden="true"></span>
              </div>
              <table style="margin-left:15px; margin-top:15px;">
                  <tr>
                      <td rowspan="3">
                          <img class="" id="logo_empresa_info" src="<%- foto %>" alt="Imagen-Cliente">
                      </td>
                      <td style="padding:0px 10px 0px 10px; vertical-align: bottom;">
                          <h3 class="editar editando"><b>Proyecto</b></h3>
                          <input type="text" id="nombreComercial" class="form-control editar" name="nombreComercial" value="">
                      </td>
                      <td class="respuesta" style="vertical-align: bottom;"></td>
                  </tr>
                  <tr>
                      <td style="padding:0px 10px 0px 10px;">
                          Representante
                      </td>
                      <td class="respuesta"></td>
                  </tr>
                  <tr>
                      <td style="padding:0px 10px 0px 10px; vertical-align: top;">
                          <a href="#">Informacion Cliente</a>
                      </td>
                      <td class="respuesta" style="vertical-align: top;"></td>
                  </tr>
              </table>

              <div class="panel-body">

                  <small class="editar">Precione la tecla enter para actualizar el campo</small>
                  
                  <!-- -------PRIMERA PAGINA DE INFORMACION DEL CLIENTE------- -->
                  <div class="visible" id="divCliente">
                      <form class="formCliente" method="post">
                          <table class="table table-striped">
                              <tr class="trCliente"> <!--Nombre fical-->
                                  <td class="atributo"><b>Nombre Físcal:</b></td>
                                  <td>
                                      <% if (typeof nombreFiscal != "undefined") { %>
                                          <label class="editar editando">
                                              <%- nombreFiscal %>
                                          </label>
                                          <input type="text" class="form-control editar" name="nombreFiscal" value="<%- nombreFiscal %>">
                                      <% } else{ %>
                                          <label class="editar editando">
                                              No especificado
                                          </label>
                                          <input type="text" class="form-control editar" name="nombreFiscal">
                                      <% }; %>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--RFC-->
                                  <td class="atributo"><b>R.F.C:</b></td>
                                  <td>
                                      <% if (typeof rfc != "undefined") { %>
                                          <label class="editar editando">
                                              <%- rfc %>
                                          </label>
                                          <input type="text" class="form-control editar" name="rfc" value="<%- rfc %>">
                                      <% } else{ %>
                                          <label class="editar editando">
                                              No especificado
                                          </label>
                                          <input type="text" class="form-control editar" name="rfc">
                                      <% }; %>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Giro-->
                                  <td class="atributo"><b>Giro:</b></td>
                                  <td>
                                      <% if (typeof giro != "undefined") { %>
                                          <label class="editar editando">
                                              <%- giro %>
                                          </label>
                                      <% } else{ %>
                                          <label class="editar editando">
                                              No especificado
                                          </label>
                                      <% }; %>
                                      <select class="form-control editar" name="giro"> 
                                          <option> Manufacturera </option> 
                                          <option> Agropecuaria </option> 
                                          <option> Comercial </option> 
                                          <option> Transporte </option> 
                                          <option> Educación </option> 
                                          <option> Servicios públicos </option>
                                          <option> Salud </option> 
                                          <option> Comunicación </option> 
                                          <option selected disabled>Giro</option>
                                          <option value="" disabled style='display:none;'>Giro</option> 
                                      </select>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Dirección-->
                                  <td class="atributo"><b>Dirección:</b></td>
                                  <td>
                                      <% if (typeof direccion != "undefined") { %>
                                          <label class="editar editando">
                                              <%- direccion %>
                                          </label>
                                          <input type="text" class="form-control editar" name="direccion" value="<%- direccion %>">
                                      <% } else{ %>
                                          <label class="editar editando">
                                              No especificado
                                          </label>
                                          <input type="text" class="form-control editar" name="direccion">
                                      <% }; %>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Telófono-->
                                  <td class="atributo">
                                      <b>Telefono:</b>
                                      <!--<button type="button" id="btn_nuevoTelefono" class="btn btn-primary btn-xs editar">Nuevo</button>-->
                                  </td>
                                  <td id="telefonos">
                                      <label class="editar editando">No especificado</label>
                                      <div class="editar" id="formularioTelefono">
                                          <div class="input-group">
                                              <input type="text" id="numeroNuevo" class="form-control" name="numero" maxlength="10" placeholder="Nuevo Teléfono">
                                              <div class="input-group-btn">
                                                  <select id="tipoNuevo" class="btn btn-default" name="tipo">
                                                      <option value="Casa">Casa</option>
                                                      <option value="Fax">Fax</option>
                                                      <option value="Movil" selected>Movil</option>
                                                      <option value="Oficina">Oficina</option>
                                                      <option value="Personal">Personal</option>
                                                      <option value="Trabajo">Trabajo</option>
                                                      <option value="Otro">Otro</option>
                                                      <option selected disabled>Tipo</option>
                                                  </select>
                                                  <button id="enviarTelefono" class="btn btn-default"><label class="icon-save"></label></button>
                                              </div>
                                          </div>
                                      </div>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Correo-->
                                  <td class="atributo"><b>Correo electrónico:</b></td>
                                  <td>
                                      <% if (typeof email != "undefined") { %>
                                          <a class="editar editando" href="#">
                                              <%- email %>
                                          </a>
                                          <input type="text" id="mail" class="form-control editar" name="email" value="<%- email %>">
                                      <% } else { %>
                                          <label class="editar editando">No especificado</label>
                                          <input type="text" id="mail" class="form-control editar" name="email">
                                      <% }; %>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Página-->
                                  <td class="atributo"><b>Página Web:</b></td>
                                  <td>
                                      <% if (typeof paginaWeb != "undefined") { %>
                                          <a class="editar editando" href="#">
                                              <%- paginaWeb %>
                                          </a>
                                          <input type="text" id="url" class="form-control editar" name="paginaWeb" value="<%- paginaWeb %>">
                                      <% } else { %>
                                          <label class="editar editando">No especificado</label>
                                          <input type="text" id="url" class="form-control editar" name="paginaWeb">
                                      <% }; %>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Servicios I-->
                                  <td class="atributo"><b>Servicios de interes:</b></td>
                                  <td id="serviciosInteres">
                                      <div id='contenedor_menus' class="editar">
                                          <div class="menusServicios">
                                              <form>
                                                  <div class='cssmenu' style="margin-right: 0px;">
                                                      <div class="col-lg-6">
                                                          <div class="input-group">
                                                              <input type="text" id="inputBusquedaI" class="form-control" name="serviciosInteres" placeholder="Buscar servicio">
                                                              <span class="input-group-btn">
                                                                  <button type="button" id="btn_agregarI" class="btn btn-default editando">Agregar</button>
                                                              </span>
                                                          </div>
                                                      </div>
                                                      <ul id="I">
                                                          <li class='has-sub'><a href='#'><span>Servicios</span></a>
                                                              <ul id="menuServiciosInteres">
                                                              </ul>
                                                          </li>   
                                                      </ul>
                                                  </div>
                                              </form>
                                              <div class="desborde"></div>
                                              <br>
                                              <ol id="listaInteres" class="list-group"></ol>
                                          </div>
                                      </div>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr class="trCliente"> <!--Servicios I-->
                                  <td class="atributo">
                                      <b>Servicios actuales:</b><br>
                                      <h6>servicios con lo que cuenta actualmente<h6>
                                  </td>
                                  <td id="serviciosCuenta">
                                      <div id='contenedor_menus' class="editar">
                                          <div class="menusServicios">
                                              <form>
                                                  <div class='cssmenu' style="margin-right: 0px;">
                                                      <div class="col-lg-6">
                                                          <div class="input-group">
                                                              <input type="text" id="inputBusquedaC" class="form-control" name="serviciosCuenta" placeholder="Buscar servicio">
                                                              <span class="input-group-btn">
                                                                  <button type="button" id="btn_agregarC" class="btn btn-default editando">Agregar</button>
                                                              </span>
                                                          </div>
                                                      </div>
                                                      <ul id="C">
                                                          <li class='has-sub'><a href='#'><span>Servicios</span></a>
                                                              <ul id="menuServiciosCuenta">
                                                              </ul>
                                                          </li>
                                                      </ul>
                                                  </div>
                                              </form>
                                              <div class="desborde"></div>
                                              <br>
                                              <ol id="listaCuenta" class="list-group"></ol>
                                          </div>
                                      </div>
                                  </td>
                                  <td class="respuesta">
                                       <span class="icon-uniF55C" style="visibility: hidden;"></span>
                                      <!--RESPUESTA-->
                                  </td>
                              </tr>
                              <tr>
                                  <td class="atributo">Comentarios</td>
                                  <td>
                                      <% if (typeof comentarioCliente != "undefined") { %>
                                          <p class="editar editando"><%- comentarioCliente %></p>
                                          <textarea id="comentario" class="form-control editar" name="comentarioCliente" rows="3"><%- comentarioCliente %></textarea>
                                      <% } else { %>
                                          <p class="editar editando">No especificado.</p>
                                          <textarea id="comentario" class="form-control editar" name="comentarioCliente" rows="3"></textarea>
                                      <% }; %>
                                  </td>
                                  <td class="respuesta"><span class="icon-uniF55C" style="visibility: hidden;"></span></td>
                              </tr>
                          </table>
                          <!--<button type="button" id="actualizar" class="btn btn-primary editar">Actualizar</button>-->
                      </form>
                  </div>
                  <!-- -------PRIMERA PAGINA DE INFORMACION DEL CLIENTE------- -->
                  <!-- -------SEGUNDA PAGINA DE INFORMACION DEL CLIENTE------- --> 
                  <div class="visible oculto">
                      <div class="row">
                          <div class="col-md-2 col-md-offset-10">
                              <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modalNuevoContacto<%- id %>">Nuevo</button>
                          </div>
                      </div>
                      
                      <div id="divContactos">
                          <!--AQUÍ VAN LOS CONTACTOS-->
                      </div>
                  </div>
                  <!-- -------SEGUNDA PAGINA DE INFORMACION DEL CLIENTE------- -->                         
              </div>
          </div>
      </div>
  </div>
