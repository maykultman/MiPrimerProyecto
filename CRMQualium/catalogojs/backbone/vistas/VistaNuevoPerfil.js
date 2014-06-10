var app = app || {};

app.VistaNuevoPerfil = Backbone.View.extend({
	el : '#catalogo_Perfiles',

	events : {	'click #enviar' : 'guardarPerfil' },

	initialize : function() {

		this.$perfil = $('#perfil'); //Obtengo el input con id = nombre



		this.$el.prepend('<h1>Catalogo de perfiles</h1>');
		
	},

	render : function(){
		return this;
	},

	guardarPerfil : function(elemento){  
		var modeloPerfil = this.obtenerJsonPerfil();
		
		var esto = this;

		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionPerfiles.create
		(
			modeloPerfil,
			{
				wait: true,
				success: function (data){
					esto.$el.append('<p>OK</p>');
					console.log(data);
					esto.$perfil.val('');
				},
				error: function (error) {}
			}
		)

		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;

		elemento.preventDefault(); // Esta función evita que se recargue la pagina
	},

	obtenerJsonPerfil : function () {

		return { perfil : this.$perfil.val().trim()	};
	}

});

app.VistaNuevoPerfil = new app.VistaNuevoPerfil();