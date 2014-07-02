var app = app || {};
app.ModeloServicioContrato	= Backbone.Model.extend({
	urlRoot	: 'http://crmqualium.com/api_serviciosContrato'
});
var ColeccionServiciosContrato = Backbone.Collection.extend({
	model	: app.ModeloServicioContrato,
	url		: 'http://crmqualium.com/api_serviciosContrato'
});