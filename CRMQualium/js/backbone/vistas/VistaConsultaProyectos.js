var app = app || {};

app.VistaConsultaProyectos = Backbone.View.extend({
	el	: '.contenedor_principal_modulos',
	events	: {},
	initialize	: function () {
		this.$tbody_proyectos = this.$('#tbody_proyectos');
		this.listenTo( app.coleccionProyectos, 'add', this.cargarProyecto );
		app.coleccionClientes.fetch();
		app.coleccionProyectos.fetch();
		// this.cargarProyectos();
	},
	render	: function () {},
	cargarProyecto	: function (modeloProyecto) {
		var propietario = app.coleccionClientes.get({id:modeloProyecto.get('idcliente')});
		if (typeof propietario != 'undefined') {
			modeloProyecto.set({propietario:propietario.get('nombreComercial')});
			var vistaProyecto = new app.VistaProyecto( {model:modeloProyecto} );
			this.$tbody_proyectos.append( vistaProyecto.render().el );
		};
	},
	// cargarProyectos	: function () {
	// 	app.coleccionProyectos.each( this.cargarProyecto, this );
	// },
	// porcentaje 	: function (plazo, conteo) {
	// 	return (100 * conteo)/plazo;
	// }
});

app.vistaConsultaProyectos = new app.VistaConsultaProyectos();