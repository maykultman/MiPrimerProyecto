var app = app || {};

var ColeccionCotizaciones = Backbone.Collection.extend({
	url   : 'http://crmqualium.com/api_cotizaciones',
	model : app.ModeloCotizacion,
	

	// parse : function (response) {
	// 	//Se ejecuta cuando se hace un fetch a la colección
	// 	return response;
	// }
	sync	: function (method, model, options) {
		if (method === 'read') {
			app.busquedaCotizacion.cotizacion.buscarPorNombre(options.data.idcliente).done(function (data) {				
				// console.log(data); //Debuelbe el objeto [Object]
				options.success(data);
			});
		};
	}
});

app.coleccionCotizaciones = new ColeccionCotizaciones(app.coleccionDeCotizaciones);