var app = app || {};
/* ---------------------------------------------------------------- */
app.VistaServicioProyecto = app.VistaServicio.extend({
	tagName	: 'li',
	className	: 'list-group-item',
	plantillaDefault	: _.template($('#plantillaServicioProyecto').html()),
	events	: {
		'click .btn_eliminar'	: 'conmutarStatus'
	},
	initialize		: function () {
		this.listenTo(this.model, 'change:status', this.remove);
		this.bloquearSeleccionado();
	},
	conmutarStatus	: function () {
		var esto = this;
		this.model.conmutarStatus(function (){
			$('#select_servicios').children('#'+esto.model.get('idservicio')).attr('disabled',false);
		});
	},
	bloquearSeleccionado	: function () {
		$('#select_servicios').children('#'+this.model.get('idservicio')).attr('disabled',true);
	},
});
/* ---------------------------------------------------------------- */
app.VRolProyEmpleado = app.VistaRolPrincipal.extend({
	tagName				: 'li',
	className			: 'list-group-item',
	plantillaDefault	: _.template($('#plantillaRolProyecto').html()),
	events				: {
		'click .btn_eliminar'	: 'eliminarRol'
	},
	render				: function () {
		this.model.set( {nombreRol:app.coleccionRoles.get(this.model.get('idrol')).get('nombre')} );
		this.model.set( {nombrePersonal:app.coleccionEmpleados.get(this.model.get('idpersonal')).get('nombre')} );
		this.$el.html( this.plantillaDefault( this.model.toJSON() ) );
		return this;
	},
	eliminarRol			: function () {
		console.log(this.model.toJSON());
	},
});
/* ---------------------------------------------------------------- */

app.VistaProyecto = Backbone.View.extend({
	tagName	: 'tr',
	plantilla_tr		: _.template($('#plantilla_tr_proyecto').html()),
	plantillaModal	: _.template($('#plantillaModalProyecto').html()),
	plantillaRol : _.template($('#input_rol').html()),
	events				: {
		'click .eliminar'				: 'eliminar',
		'click #tr_btn_editar'			: 'verInfo',
		'click #tr_btn_verInfo'			: 'verInfo',
		'click #btn_editar'				: 'editando',

		'click #btn_agregarServicio' 	: 'guadarServicio',

		'change #select_rol'			: 'agregarRol',
		'click .btn_eliminarRol'		: 'eliminarRol'
	},
	initialize	: function () {
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render				: function () {
		/*Creamos nueva propiedad duracion para calculos con fechas*/
		this.model.set( {duracion:this.carcularDuracion()} );
		this.$el.html( this.plantilla_tr(this.model.toJSON()) );
		return this;
	},
	verInfo				: function (elem) {
		var esto = this;
		
		/* ---Añade el nombre de los representantes del cliente--- */
			var representantes = 
				app.coleccionRepresentantes
				.where({
					idcliente:this.model.get('idcliente')
				});
			var nombres = [];
			for (var i = 0; i < representantes.length; i++) {
				nombres.push(' '+representantes[i].toJSON().nombre);
			};
			this.model.set( {representante:nombres} );		
		/* ------------------------------------------------------- */

		this.$el.append( this.plantillaModal(this.model.toJSON()) );
		/*La variable modal guarda el elem DOM del modal junto
		después de creado en el DOM general*/
		var modal = this.$el.find('#modal'+this.model.get('id'));
		this.$ul_serviciosProyecto 	= this.$el.find('#serviciosProyecto');
		this.$ul_rolesProyecto		= this.$el.find('#rolesProyecto');
		this.$archivos_proy			= this.$el.find('#archivos_proy');
		this.$select_servicios		= this.$el.find('#select_servicios');
		this.$select_empleados		= this.$el.find('#select_empleados');
		/*Cacheamos el id del boton editar del modal para luego 
		  cambiar su icono en cuanto se haga click en etidar tando en
		  el tr o el modal*/
		this.$btn_editar			= this.$el.find('#btn_editar');

		/* -Crea los tags de nuevo rol----------------------------- */
			var text_nuevoRol 		= this.$el.find('.text_nuevoRol');
			var btn_nuevoRol 		= this.$el.find('.btn_nuevoRol');

			btn_nuevoRol.on('click', function () {
				var nuevoRol = text_nuevoRol.val().trim();
				if (nuevoRol !== '') {
					$('#form_roles').append(esto.plantillaRol({id:nuevoRol, nombre:nuevoRol, name:'nombre'}));
					text_nuevoRol.val('');
				};
				text_nuevoRol.val('');
			});

			text_nuevoRol.on('keypress', function (e) {
				if (e.keyCode === 13 && $(this).val() !== '') {
					$('#form_roles').append(esto.plantillaRol({id:$(this).val(), nombre:$(this).val(), name:'nombre'}));
					$(this).val('');
				};
			});
		/* -------------------------------------------------------- */

		/*Cargar datos en el modal*/
		modal.on('shown.bs.modal',function (){
			/* ------------------------------------------------ */
				var list = '<% _.each(servicios, function(servicio) { %> <option id="<%- servicio.id %>" value="<%- servicio.id %>"><%- servicio.nombre %></option> <% }); %>';
				$('#select_servicios').
				append(_.template(list, 
					{ servicios : app.coleccionDeServicios }
				));
			/* ------------------------------------------------ */
				var list = '<% _.each(roles, function(rol) { %> <option id="<%- rol.id %>" value="<%- rol.id %>"><%- rol.nombre %></option> <% }); %>';
				$('#select_rol').
				append(_.template(list, 
					{ roles : app.coleccionDeRoles }
				));
			/* ------------------------------------------------ */
				var list = '<% _.each(empleados, function(empleado) { %> <option id="<%- empleado.id %>" value="<%- empleado.id %>"><%- empleado.nombre %></option> <% }); %>';
				esto.$select_empleados.
				append(_.template(list, 
					{ empleados : app.coleccionDeEmpleados }
				));
				esto.$select_empleados.on('change', function (){







					console.log(app.coleccionRolesProyectos.where({idempleado:$(this).children(':selected').val()}));








					
				});
			/* Cargar información del proyecto */
				esto.cargarServicios(function () {
					esto.
						$ul_serviciosProyecto.
						children().
						children('.editando2').
						toggleClass('editando2');
				});
				esto.cargarRoles();
				esto.cargarArchivos();
			/* plugin Datepicker jQueryUI */
				$( ".datepicker" ).datepicker({
					yearRange : "1970 : 2000" ,
					dateFormat: 'yy-mm-dd'
				});
			/* Evento para el obtener la fecha del calendario */
				$( ".datepicker" ).on('change', function (){
					/*Serializamos la fecha (fecha de inicio o final 
					segun el caso). Lo pasamos como parametro a la 
					función que  actualiza los atributos del modelo 
					proyecto*/
					esto.actualizarAtributo( $(this).serializeArray() );
					/*Creamos un array sobre la fecha seleccionada
					para volverla a mostrar en el input*/
					var fecha = $(this).val().split('-');
					/*Formateamos la fecha seleccionada a la forma 
					día/mes/año y la establecemos en el input*/
					$(this).val(fecha[2]+'/'+fecha[1]+'/'+fecha[0]);
				});
			
			/*Puede ocurrir que desde el tr del proyecto se quiera
			  abrir el modal en modo edición. Esta condición ejecuta
			  la funcion editando para activar todos los campo en los 
			  que se puede editar*/
				if ($(elem.currentTarget).attr('id') == 'tr_btn_editar') {
					esto.editando();
				};
		});
		/*Escuchamos el evento que hace que se esconda el modal
		  para luego eliminarlo*/
		modal.on('hidden.bs.modal', function(){
			/*this es la variable modal. removemos el elem DOM
			de todo el documento (DOM general)*/
			$(this).remove();
			esto.render(); //Actualiza la vista al cerrar el modal
		});
	},
	actualizarAtributo	: function (dato) {
		if (dato[0].value != '') {
			/*Pasamos el dato al formato key:value con la función 
			pasarAJson()*/
			this.model.save(pasarAJson(dato), { 
				wait	: true,
				patch	: true,
				success	: function (exito) {
					console.log('actualizado');
				},
				error	: function (error) {
					console.log('error actualización');
				}
			});
		} else{
			console.log('dato no valido');
		};
	},
	guadarServicio		: function () {
		var esto = this,
			dato = pasarAJson(this.$select_servicios.serializeArray()),
			nombreServicio = 	this.
								$select_servicios.
								children('option:selected').
								text();
		if (dato.nombre !== '') {
			dato.idproyecto = this.model.get('id');
			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
			app.coleccionServiciosProyecto.create( dato, {
				wait 	:true,
				success : function (exito) {
					dato.nombre = nombreServicio;
					dato.status = '1';
					app.coleccionServiciosProyecto.last().set(dato);
					esto.cargarServicios(function () {
						/*Pasamos un callback sin instrucciones*/
					});
					console.log('Se guardo el nuevo servicio del proyecto');
				},
				error 	: function (error) {
					console.log('No se guardo el servicio');
				}
			});
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;
		} else{
			console.log('No has seleccionado servicio');
		};
	},
	eliminar			: function () {
		this.model.destroy();
	},
	editando			: function () {
		if (this.$btn_editar
			.children()
			.attr('class') == 
			'icon-edit2 MO icon-back'
		) {
			this.$btn_editar
				.children()
				.toggleClass('MO icon-back');
			this.$('.editar2').toggleClass('editando2');
			//Cierra el modal
				this.$('#cerrar_consulta').click();
			//Actualiza los datos
				this.render();
			//Abre nuevamente el modal
				this.$('.icon-eye').click();
		} else{
			this.$btn_editar
				.children()
				.toggleClass('MO icon-back');
			this.$('.editar2').toggleClass('editando2');
		};	
	},
	cargarServicio		: function (servicio) {
		var vista = new app.VistaServicioProyecto({ model:servicio });
		this.$ul_serviciosProyecto.append(vista.render().el);
	},
	cargarServicios		: function (callback) {
		this.$ul_serviciosProyecto.html('');
		var servicios = app.coleccionServiciosProyecto.where({idproyecto:this.model.get('id'), status:'1'});
		for (var i = 0; i < servicios.length; i++) {
			this.cargarServicio(servicios[i]);
		};
		callback();
	},
	cargarRol			: function (rol) {
		var vista = new app.VRolProyEmpleado({ model:rol });
		this.$ul_rolesProyecto.append(vista.render().el);
	},
	cargarRoles			: function () {
		var roles = app.coleccionRolesProyectos.where({idproyecto:this.model.get('id')});
		for (var i = 0; i < roles.length; i++) {
			this.cargarRol(roles[i]);
		};
	},
	agregarRol	: function (elem) {
		$('#form_roles').append(this.plantillaRol( { id:$(elem.currentTarget).val(), nombre:$(elem.currentTarget.selectedOptions).text(), name:'idrol' } ));
		$(elem.currentTarget.selectedOptions).attr('disabled',true);	
	},
	eliminarRol 	: function (elem) {
		$('#select_rol').children('#'+$(elem.currentTarget).attr('value')).attr('disabled',false);
		$(elem.currentTarget).parents('.tag_rol').remove();
		elem.preventDefault();
	},
	cargarArchivo		: function (archivo) {
		var vista = new app.V_A_ConsultaProyecto({ model:archivo });
		this.$archivos_proy.append(vista.render().el);
	},
	cargarArchivos		: function () {
		var archivo = app.coleccionArchivos.where({idpropietario:this.model.get('id'), tabla:'proyectos'});
		for (var i = 0; i < archivo.length; i++) {
			this.cargarArchivo(archivo[i]);
		};
	},
	carcularDuracion	: function () {
		var valorFechaInicio = new Date(this.model.get('fechainicio')).valueOf();
		var valorFechaEntrega = new Date(this.model.get('fechafinal')).valueOf();
		var valorFechaActual = new Date().valueOf();
		var plazo = ((((valorFechaEntrega-valorFechaInicio))/24/60/60/1000) + 1).toFixed();
		var queda = ((((valorFechaEntrega-valorFechaInicio)-((valorFechaEntrega-valorFechaInicio)-(valorFechaEntrega-valorFechaActual)))/24/60/60/1000) +1).toFixed();
		if (queda == -0) queda = 0;
		var porcentaje = (100 * queda)/plazo;

		// console.log('plazo: '+plazo, 'queda: '+queda, 'porcentaje: '+porcentaje+'%');
		return {
			plazo		:plazo,
			queda		:queda,
			porcentaje	:porcentaje
		};
	},
});