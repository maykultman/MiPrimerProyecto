var app = app || {};

app.VistaConsultaCotizaciones = Backbone.View.extend({
	 el : '#tabla_cotizaciones',

	 events : {},

	 initialize : function (){
	 	this.$tablaCotizaciones = this.$('#lista_cotizaciones');
	 	this.cargarCotizaciones(); 
	 	this.listenTo( app.coleccionCotizaciones, 'add', this.cargarCotizacion );
		this.listenTo( app.coleccionCotizaciones, 'reset', this.cargarCotizaciones);

	 	app.coleccionCotizaciones.fetch();
	 },

	 render : function (){},

	 cargarCotizacion : function (modeloc){
	 	
	 	var vistaCotizacion = new app.VistaCotizacion({model : modeloc});
	 	this.$tablaCotizaciones.append( vistaCotizacion.render().el);
	 },

	 cargarCotizaciones : function (){

	 	app.coleccionCotizaciones.each(this.cargarCotizacion, this);
	 },

	 establecerNombres : function (){
	 	var coleccionDeClientes = app.coleccionDeClientes();
	 	var coleccionDeEmpleados = app.coleccionDeEmpleados();
	 	var coleccionCotizaciones = app.coleccionCotizaciones();
	 }

});

app.vistaConsultaCotizaciones = new app.VistaConsultaCotizaciones();