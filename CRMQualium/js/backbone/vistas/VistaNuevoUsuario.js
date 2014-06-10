var app = app || {};

app.VistaNuevoUsuario = Backbone.View.extend({

	el : '#datosUsuario',

	events : {

		'click #empleado' : 'buscarEmpleado'
	},

	initialize : function()
	{
		this.$empleado 	  = this.$('#empleado');
		this.$perfil 	  = this.$('#perfil');
		this.$usuario 	  = this.$('#usuario');
		this.$contrasenia = this.$('#contrasenia');
	},

	render : function(){
		return this;
	},

	cargarPermiso : function(){
		
	},

	cargarPermisos : function(){
		
	}





});