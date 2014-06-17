var app = app || {};

var ColeccionPuestos = Backbone.Collection.extend({
	model	: app.ModeloPuesto,

	// localStorage	: new Backbone.LocalStorage('clientes-backbone'),
	url: 'http://crmqualium.com/api_puesto',

	// obtenerTodos : function () {
	// 	return this.filter( function (rol){
	// 		return rol.get('id');
	// 	});
	// },

	// establecerIdSiguiente	: function () {
	// 	if(!this.length){
	// 		return 1;
	// 	}
	// 	return this.last().get('id') + 1;
	// },

	// obtenerUltimoId	: function () {
	// 	return this.last().get('id');
	// },

	// // parse	: function (response) {
	// // 	return response.data;
	// // },

	// obtenerUltimo	: function () {
	// 	return this.last();
	// },

	sync	: function (method, model, options) {
		if (method === 'read') {
			app.busquedaRol.rol.buscarPorNombre(options.data.nombre).done(function (data) {
				// console.log(data); //Debuelbe el objeto [Object]
				options.success(data);
			});
		};
	}
});

app.coleccionPuestos = new ColeccionPuestos(app.coleccionDePuestos);