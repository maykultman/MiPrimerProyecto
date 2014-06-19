var app = app || {};
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
app.VistaServicioProyecto = app.VistaServicio.extend({
	tagName	: 'li',
	plantillaDefault	: _.template($('#plantillaServicioProyecto').html()),
	events	: {
		'click .btn_eliminar'	: 'conmutarStatus'
	},
	conmutarStatus	: function () {
		alert('hola');
	}
});
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
app.VistaRolProyecto = app.VistaRolPrincipal.extend({
	tagName	: 'li',
	plantillaDefault	: _.template($('#plantillaRolProyecto').html()),
	render	: function () {
		this.model.set( {nombreRol:app.coleccionRoles.get(this.model.get('idrol')).get('nombre')} );
		this.model.set( {nombrePersonal:app.coleccionEmpleados.get(this.model.get('idpersonal')).get('nombre')} );
		this.$el.html( this.plantillaDefault( this.model.toJSON() ) );
		return this;
	}
});
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */

app.VistaProyecto = Backbone.View.extend({
	tagName	: 'tr',
	plantilla_tr		: _.template($('#plantilla_tr_proyecto').html()),
	plantillaModal	: _.template($('#plantillaModalProyecto').html()),
	events				: {
		'click .eliminar'	: 'eliminar',
		'click #tr_btn_editar'	: 'editando',
		'click #verInfo'	: 'verInfo',
		'click #btn_editar'	: 'editando',
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
	verInfo				: function (callback) {
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
		this.$div_serviciosProyecto = this.$el.find('#serviciosProyecto');
		this.$div_rolesProyecto		= this.$el.find('#rolesProyecto');
		this.$archivos_proy			= this.$el.find('#archivos_proy');
		/*Cacheamos el id del boton editar del modal para luego 
		  cambiar su icono en cuanto se haga click en etidar tando en
		  el tr o el modal*/
		this.$btn_editar			= this.$el.find('#btn_editar');
		
		/*Cargar datos en el modal*/
		modal.on('shown.bs.modal',function (){
			/* Cargar información del proyecto */
				esto.cargarServicios();
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
			/* En la edición se podran agregar servicios al proyecto */
				var list = '<% _.each(servicios, function(servicio) { %> <option value="<%- servicio.id %>"><%- servicio.nombre %></option> <% }); %>';
				$('#select_servicios').
				append(_.template(list, {
					servicios: app.coleccionDeServicios 
				}));
				$('#select_servicios').on('change', function (){
					// console.log(pasarAJson( $(this).serializeArray() )); return;
					esto.guadarServicio( pasarAJson( $(this).serializeArray() ) );
				});
		});
		/*Escuchamos el evento que hace que se esconda el modal
		para luego eliminarlo*/
		modal.on('hidden.bs.modal', function(){
			/*this es la variable modal. removemos el elem DOM
			de todo el documento (DOM general)*/
			$(this).remove();
			esto.render(); //Actualiza la vista al cerrar el modal
		});

		// if (callback) {
			callback();
		// };
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
	guadarServicio	: function (dato) {
		dato.idproyecto = this.model.get('id');
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionServiciosProyecto.create( dato, {
			wait 	:true,
			success : function (exito) {
				console.log('Se guardo el nuevo servicio del proyecto');
			},
			error 	: function (error) {
				console.log('No se guardo el servicio');
			}
		});
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
		console.log(app.coleccionServiciosProyecto.toJSON());
	},
	eliminar			: function () {
		this.model.destroy();
	},
	editando	: function () {
		var esto = this;
		this.verInfo(function () {
			if (esto.$btn_editar
				.children()
				.attr('class') == 
				'icon-edit2 MO icon-back'
			) {
				esto.$btn_editar
					.children()
					.toggleClass('MO icon-back');
				esto.$('.editar2').toggleClass('editando2');
				//Cierra el modal
					esto.$('#cerrar_consulta').click();
				//Actualiza los datos
					esto.render();
				//Abre nuevamente el modal
					esto.$('.icon-eye').click();
			} else{
				esto.$btn_editar
					.children()
					.toggleClass('MO icon-back');
				esto.$('.editar2').toggleClass('editando2');
			};
		});
	},
	cargarServicio		: function (servicio) {
		var vista = new app.VistaServicioProyecto({ model:servicio });
		this.$div_serviciosProyecto.append(vista.render().el);
	},
	cargarServicios		: function () {
		var servicios = app.coleccionServiciosProyecto.where({idproyecto:this.model.get('id')});
		for (var i = 0; i < servicios.length; i++) {
			this.cargarServicio(servicios[i]);
		};
	},
	cargarRol			: function (rol) {
		var vista = new app.VistaRolProyecto({ model:rol });
		this.$div_rolesProyecto.append(vista.render().el);
	},
	cargarRoles			: function () {
		var roles = app.coleccionRolesProyectos.where({idproyecto:this.model.get('id')});
		for (var i = 0; i < roles.length; i++) {
			this.cargarRol(roles[i]);
		};
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
		var porcentaje = ( (100 * queda)/plazo ).toFixed();

		// console.log('plazo: '+plazo, 'queda: '+queda, 'porcentaje: '+porcentaje+'%');
		return {
			plazo		:plazo,
			queda		:queda,
			porcentaje	:porcentaje
		};
	},
});