var app = app || {};
app.ModeloPago	= Backbone.Model.extend({
	urlRoot	: 'http://qualium.mx/sites/crmqualium/api_pagos'
});
var ColeccionPagos= Backbone.Collection.extend({
	model	: app.ModeloPago,
	url		: 'http://qualium.mx/sites/crmqualium/api_pagos'
});