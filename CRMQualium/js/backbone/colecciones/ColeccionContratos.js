var app = app || {};

var ColeccionContratos = Backbone.Collection.extend({
	model	: app.ModeloContrato,
	url		: 'http://crmqualium.com/api_contratos'
});