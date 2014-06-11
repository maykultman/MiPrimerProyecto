var app = app || {};

var ColeccionPermisos = Backbone.Collection.extend({
	url: 'http://crmqualium.com/api_permisos',
	model	: app.ModeloPermiso,

});

app.coleccionPermisos = new ColeccionPermisos(app.coleccionDePermisos);
	
