var app = app || {};
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
app.VistaServicioProyecto = app.VistaServicio.extend({
	tagName	: 'li',
	plantillaDefault	: _.template($('#plantillaServicioProyecto').html()),
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
		'click #verInfo'	: 'verInfo',
		'click #btn_editar'	: 'conmutarEdicion',
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
	verInfo				: function () {
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
		// btn_editar
		
		/*Cargar datos en el modal*/
		modal.on('shown.bs.modal',function (){
			esto.cargarServicios();
			esto.cargarRoles();
			esto.cargarArchivos();
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
	eliminar			: function () {
		this.model.destroy();
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
		var conteo = ((((valorFechaEntrega-valorFechaInicio)-((valorFechaEntrega-valorFechaInicio)-(valorFechaEntrega-valorFechaActual)))/24/60/60/1000) +1).toFixed();
		if (conteo == -0) conteo = 0;
		var porcentaje = ( (100 * conteo)/plazo ).toFixed();

		// console.log('plazo: '+plazo, 'conteo: '+conteo, 'porcentaje: '+porcentaje+'%');
		return {
			plazo		:plazo,
			conteo		:conteo,
			porcentaje	:porcentaje
		};
	},
	conmutarEdicion	: function (elem) {
		// this.$('.editar2').toggleClass('editando2');
		if ($(elem.currentTarget)
			.children()
			.attr('class') == 
			'icon-edit2 MO icon-back'
		) {
			$(elem.currentTarget)
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
			$(elem.currentTarget)
				.children()
				.toggleClass('MO icon-back');
			this.$('.editar2').toggleClass('editando2');
		};
	},
});