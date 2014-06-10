		<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">
		<section>			
		    <div class="contenido_permisos">
			  	<h3>Nuevo Permiso</h3>
				<hr class="linea_x"><br>
				<form>
	        		<div>
						<input type="text"  class="form-control" placeholder="Nombre del permiso"><br>
						<textarea class="form-control" rows="4" placeholder="Comentarios"></textarea>
					</div>
					<div style="margin-top:65px; margin-left:5px;">
						<button type="button" class="btn btn-primary">Guardar</button>
			       	    <button type="button" class="btn btn-default">Cancelar</button>
		            </div>
			    </form>
		    </div>
		    <div class="contenido_permisos">
		    	<h3>Lista de permisos</h3>
				<hr class="linea_x"><br>
		    	<div id="lista_permisos" class="panel panel-primary">		      
			      <div class="panel-heading"></div>		      
			      <table class="table table-hover">
				        <tbody id="scroll_permisos">
							<tr>
								<td style="width: 400px; " class="icon-operaciones">							
									<label for="" name="">crear proyectos</label>
									<div class="eliminar_permiso">
										<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
							            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
						            </div>			
								</td>    
						    </tr>
							<tr>
								<td class="icon-operaciones">							
									<label for="" name="">Consultar proyectos</label>
									<div class="eliminar_permiso">
										<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
							            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
						            </div>	
								</td>
							</tr>
							<tr>
								<td class="icon-operaciones">							
									<label for="" name="">Ver catalogos</label>
									<div class="eliminar_permiso">
										<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
							            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
						            </div>	
								</td>
							</tr>
							<tr>
								<td class="icon-operaciones">							
									<label for="" name="">Agregar clientes</label>
									<div class="eliminar_permiso">
										<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
							            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
						            </div>	
								</td>
							</tr>
							<tr>
								<td class="icon-operaciones">							
									<label for="" name="">crear proyectos</label>
									<div class="eliminar_permiso">
										<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
							            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
						            </div>				
								</td>
							</tr>
							<tr>
								<td class="icon-operaciones">							
									<label for="" name="">Consultar proyectos</label>
									<div class="eliminar_permiso">
										<span class="icon-trash" id="" data-toggle="tooltip" title="Eliminar"></span>
							            <span class="icon-edit" id="" data-toggle="tooltip"  title="Editar"></span>
						            </div>	
								</td>
							</tr>
							<tr>
								<td>							
									<label for="" name="">Ver catalogos</label>
								</td>
							</tr>
							<tr>
								<td>							
									<label for="" name="">Agregar clientes</label>
								</td>
							</tr>							
						</tbody>
			      </table>
	            </div>
		    </div>								
		</section>			
    </section>
</div>		