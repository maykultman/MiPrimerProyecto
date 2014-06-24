var app = app || {};

app.VistaNuevoPerfil = Backbone.View.extend({
	el : '#contenido_nuevoperfil',

	events : {},

	initialize : function ()
	{
		/* Inicializamos la tabla servicios que es donde esta la lista de servicios a seleccionar*/
        this.$scroll_permisos = this.$('#scroll_permisos');
        /*Invocamos el metodo para cargar y pintar los servicios*/
        this.cargarPermisos();
        this.listenTo( app.coleccionPermisos, 'add', this.cargarServicio );
		this.listenTo( app.coleccionPermisos, 'reset', this.cargarPermisos );     
	},
// 	render : function ()
// 	{
// 		return this;
// 	},

// 	buscarPermiso : function (elemento)
// 	{
// 		var buscando = $(elemento.currentTarget).val();
// 		if(elemento.keyCode===8)
// 		{
// 			app.coleccionPermisos.fetch({
// 				reset:true, data:{nombre: buscando}
// 			});
// 		}
// 		app.coleccionPermisos.fetch({
// 			reset:true, data:{nombre: buscando}
// 		});

// 		this.sinCoincidencias();

// 		this.$scroll_permisos.html('');
// 		this.cargarPermisos();	
// 	},

// 	sinCoincidencias	: function () {
// 		if (app.coleccionPermisos.length == 0) {
// 			app.coleccionPermisos.fetch({
// 				reset:true, data:{nombre: ''}
// 			});
// 		};
// 	},

// 	guardar : function (evento)
// 	{
// 		var modeloPermiso = pasarAJson($('#registroPermiso').serializeArray());
// 		if(modeloPermiso.nombre)
// 		{
// 			Backbone.emulateHTTP = true;
// 			Backbone.emulateJSON = true;
// 			app.coleccionPermisos.create
// 			(
// 				modeloPermiso,
// 				{
// 					wait: true,
// 					success: function (data){},
// 					error: function (error) {}
// 				}
// 			);

// 			Backbone.emulateHTTP = false;
// 			Backbone.emulateJSON = false;
// 		}
		
// 		evento.preventDefault();
// 	},

// 	cargarPermiso : function (permiso)
// 	{
// 		var vistaPermiso = new app.VistaPermiso({model : permiso});		
// 		this.$scroll_permisos.append(vistaPermiso.render().el);
// 	},
// 	cargarPermisos : function ()
// 	{	
// 		app.coleccionPermisos.each(this.cargarPermiso, this);
// 	}
// });

// app.vistaNuevoPermiso = new app.VistaNuevoPermiso();