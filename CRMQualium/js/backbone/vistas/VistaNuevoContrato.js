app	= app || {};
app.VistaNuevoContrato = Backbone.View.extend({
	el						: '#contenedor_principal_modulos',
	events					: {
		'keypress #busqueda'	: 'cargarClientes'
	},
	initialize				: function () {
		this.cargarClientes();
	},
	render					: function () {},
	cargarClientes			: function () {
		console.log( $('#busqueda').val() );
		if ( $('#busqueda').val() == '' ) {
			$('#input_Representante').val('');
			return;
		};
		$('#busqueda').autocomplete({
			source : app.coleccionClientes.pluck('nombreComercial'),
			select : function( event, ui ) {
				var coincidencia = app.coleccionClientes.findWhere({nombreComercial:ui.item.value});
				$('#hidden_idCliente').val(coincidencia.get('id'));
					coincidencia = app.coleccionRepresentantes.findWhere({idcliente:coincidencia.get('id')});
				$('#input_Representante').val(coincidencia.get('nombre'));
				$('#hidden_idRepresentante').val(coincidencia.get('id'));
			}
		});
	},
	obtenerRepresentante	: function () {},
	cargarServicio			: function () {},
	cargarServicios			: function () {},
});

app.vistaNuevoContrato = new app.VistaNuevoContrato();