var app = app || {};

var ColeccionPagos= Backbone.Collection.extend({
	model	: app.ModeloPago,
	url		: 'http://crmqualium.com/api_pagos'
});