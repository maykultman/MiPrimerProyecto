<link rel="stylesheet" href="<?=base_url().'css/estilos_modulo_usuarios.css'?>" 
          type="text/css">

        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/collapse.js'?>">
        </script>
        <script type="text/javascript" src="<?=base_url().'css/bootstrap-3.1.1-dist/js/transition.js'?>">
        </script>
		<section id="catalogoPuestos">	   
		  	<h3>Nuevo Puesto</h3>
			<hr>
			<form id="registroPuesto">        		
				<input id="puesto" type="text"  name="nombre" class="form-control" placeholder="Nombre del puesto" style="width:85%; display: inline-block;">
				<div style="display: inline-block;">
					<button id="guardar" type="button" class="btn btn-primary">Guardar</button>		       	    
	            </div>
		    </form>
		    <h3>Lista de puestos</h3>
			<hr>
			<input id="buscar_puesto" type="search" class="form-control" placeholder="Busqueda" style="width:100%; ">
	        <span id="busqueda_icono" class="glyphicon glyphicon-search"></span>  					
		  	<div class="panel panel-primary" style="width:100%;">
		  		<table class="table table-hover">
    				<tbody id="scroll_puestos">																									
					</tbody>									
				</table>
			</div>	        
		</section>			
     </section> <!--Esta fin de sección pertenece al menú principal del contenido de esta página. -->
</div>


<!-- Librerias -->
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/underscore.js' ?>"></script>
<script type="text/javascript" src="<?=base_url().'js/backbone/lib/backbone.js'   ?>"></script>
<script type="text/javascript" src="<?=base_url().'js/funcionescrm.js'?>"></script>
<!-- MVC -->

