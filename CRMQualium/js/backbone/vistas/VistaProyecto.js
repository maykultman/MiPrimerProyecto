var app = app || {};
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
app.VistaServicioProyecto = app.VistaServicio.extend({
	tagName	: 'li',
	plantillaDefault	: _.template($('#plantillaServicioProyecto').html()),
});
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
app.VistaRolProyecto = app.VistaRolPrincipal.extend({
	tagName	: 'p',
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
	plantillaProyecto		: _.template($('#plantilla_tr_proyecto').html()),
	plantillaModalProyecto	: _.template($('#plantillaModalProyecto').html()),
	events	: {
		'click .eliminar'	: 'eliminar',
		'click #verInfo'	: 'verInfo'
	},
	initialize	: function () {
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render					: function () {

		this.$el.html( this.plantillaProyecto(this.model.toJSON()) );
		return this;
	},
	verInfo					: function () {
		var esto = this;
		var representantes = app.coleccionRepresentantes.where({idcliente:this.model.get('idcliente')});
		for (var i = 0; i < representantes.length; i++) {
			// this.model.set({representante:representantes[i].toJSON()});
			console.log(this.model.toJSON());
		};
		this.$el.append( this.plantillaModalProyecto(this.model.toJSON()) );
		/*La variable modal guarda el elem DOM del modal junto
		después de creado en el DOM general*/
		var modal = this.$el.find('#modal'+this.model.get('id'));
		this.$div_serviciosProyecto = this.$el.find('#serviciosProyecto');
		this.$div_rolesProyecto		= this.$el.find('#rolesProyecto');
		
		modal.on('shown.bs.modal',function (){
			esto.cargarServiciosProyecto();
			esto.cargarRolesProyecto();
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
	eliminar				: function () {
		this.model.destroy();
	},
	cargarServicioProyecto	: function (servicioProyecto) {
		var vistaServicioProyecto = new app.VistaServicioProyecto({ model:servicioProyecto });
		this.$div_serviciosProyecto.append(vistaServicioProyecto.render().el);
	},
	cargarServiciosProyecto	: function () {
		var serviciosProyecto = app.coleccionServiciosProyecto.where({idproyecto:this.model.get('id')});
		for (var i = 0; i < serviciosProyecto.length; i++) {
			this.cargarServicioProyecto(serviciosProyecto[i]);
		};
	},
	cargarRolProyecto	: function (rolProyecto) {
		var vistaRolProyecto = new app.VistaRolProyecto({ model:rolProyecto });
		this.$div_rolesProyecto.append(vistaRolProyecto.render().el);
	},
	cargarRolesProyecto	: function () {
		var rolesProyecto = app.coleccionRolesProyectos.where({idproyecto:this.model.get('id')});
		for (var i = 0; i < rolesProyecto.length; i++) {
			this.cargarRolProyecto(rolesProyecto[i]);
		};
	},
});