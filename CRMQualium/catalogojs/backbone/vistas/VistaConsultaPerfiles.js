var app = app || {};

app.VistaConsultaPerfiles = Backbone.View.extend({
	el : '#consulta_Perfiles',

	events : {},

	initialize : function (){

		this.$perfiles = this.$('#perfiles'); //apuntamos a la tabla con el id perfiles

		this.listenTo(app.coleccionPerfiles, 'add', this.cargarPerfil);
		this.listenTo(app.coleccionPerfiles, 'reset', this.cargarPerfil);

		app.coleccionPerfiles.fetch();
	},
	render : function () {},

	cargarPerfil : function (perfil){
		var vistaPerfil = new app.VistaPerfil( {model:perfil} );
		this.$perfiles.append( vistaPerfil.render().el);
	},

	cargarPerfiles : function () {

		app.coleccionPerfiles.each(this.cargarPerfil, this);
	}

});

app.vistaConsultaPerfiles = new app.VistaConsultaPerfiles();