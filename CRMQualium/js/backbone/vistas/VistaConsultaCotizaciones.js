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

	 cargarCotizacion : function (modelocotizacion){

	 	var cliente = app.coleccionClientes.where({ id : modelocotizacion.get('idcliente') }); 
	 	console.log(cliente); return;
	 	// // modelocotizacion.set({'nombre' : cliente.nombreComercial});
	 	// var vistaCotizacion = new app.VistaCotizacion({model : modelocotizacion});
	 	
	 	// console.log(vistaCotizacion);
	 	// // this.$tablaCotizaciones.append( vistaCotizacion.render().el);
	 },

	 cargarCotizaciones : function (){

	 	app.coleccionCotizaciones.each(this.cargarCotizacion, this);
	 },

	 establecerNombres : function (){
	 	
	 	var coleccionDeEmpleados = app.coleccionDeEmpleados();
	 	
	 }

});

app.vistaConsultaCotizaciones = new app.VistaConsultaCotizaciones();