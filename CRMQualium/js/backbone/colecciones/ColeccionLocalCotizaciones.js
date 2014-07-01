var app = app || {};

var ColeccionCotizaciones = Backbone.Collection.extend({
	url   : 'http://crmqualium.com/api_cotizaciones',
	model : app.ModeloCotizacion,
});

app.coleccionCotizaciones = new ColeccionCotizaciones(app.coleccionDeCotizaciones);