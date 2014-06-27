var app = app || {};

//*****************************************************//
app.VistaSelectPerfil = Backbone.View.extend({
	tagName : 'option',
	
	plantilla  : _.template($('#selectperfil').html()),

	events : {},

	initialize : function () 
	{
		this.$el.attr('value', this.model.get('id'));
		this.$el.attr('id', this.model.get('id'));			
	}, 

	render : function()
	{
		this.$el.html(this.plantilla(this.model.toJSON()));
		return this;
	}
});

app.VistaPermisoPerfil = Backbone.View.extend({
	tagName : 'label',
	className : 'chek',

	plantilla : _.template($('#Permisos').html()),
	events : {},

	initialize : function(){},

	render : function ()
	{
		var permi = app.coleccionPermisosPerfil.where({ idpermiso : this.model.get('id'), idperfil : this.model.get('idperfil') });
		if (typeof permi[0] != 'undefined') {
			this.$el.css('background','#ddffdd');
			this.$el.css('border-radius','5px');
			this.model.set({palomita:'checked'});
		}
		else{
			this.model.set({palomita:''})
		};
		this.$el.html(this.plantilla(this.model.toJSON()));
		return this;
	},
});

app.VistaNuevoUsuario = Backbone.View.extend({
	el : '#datosUsuario',

	events : {
		'click #guardar'    : 'guardar',
		'click #empleado'   : 'buscarEmpleado',
		'blur  #empleado'   : 'Aidempleado',
		'change #idperfil'  : 'mostrarPermisos',
		'change #idpermiso' : 'marcarTodos'
	},

	initialize : function ()
	{
		this.$Perfiles = this.$('#idperfil');
        this.cargarSelectPerfiles();

		this.$ListaPermisos = this.$('#ListaPermisos');
        this.cargarPermisos();	
	},

	render : function()	{	return this; },

	cargarPermiso : function (permiso)
	{
		var vistaPermiso = new app.VistaPermisoPerfil({model : permiso});		
		this.$ListaPermisos.append(vistaPermiso.render().el);
	},
	cargarPermisos : function (elemento)
	{	$('#ListaPermisos').html('');
		app.coleccionPermisos.each(this.cargarPermiso, this);
	},
	
	cargarSelectPerfil : function (perfil)
	{
		var vistaPerfil = new app.VistaSelectPerfil({ model : perfil});		
	    this.$Perfiles.append(vistaPerfil.render().el);
	},

	cargarSelectPerfiles : function ()
	{	
		app.coleccionPerfiles.each(this.cargarSelectPerfil, this);
	},

	mostrarPermisos : function(idperfil)
	{
		var self = this;
		$('#ListaPermisos').html('');
		app.coleccionPermisos.each(function(model){
			model.set({idperfil:$(idperfil.currentTarget).val()});
			self.cargarPermiso(model);
		}, this);
	},

	Aidempleado : function()
	{
		var busca=0;
		
		for(e in this.empleado)
	    {
	      	if($('#empleado').val()==this.empleado[e])
	      	{
	       		$('#hempleado').val(this.empleado[busca+1]);
	       	}
	       	busca++;
	    }
	},

	buscarEmpleado : function (elemento)
	{
        this.empleado = new Array();  var cont  = 0; 
        for(i in app.coleccionDeEmpleados)
        {
            this.empleado[cont] = app.coleccionDeEmpleados[i].nombre; cont++;
            this.empleado[cont] = app.coleccionDeEmpleados[i].id; 	  cont++;
        };
        $('#empleado').autocomplete({ source: this.empleado});
	},

	marcarTodos : function(elemento)
	{
		// console.log($(elemento.currentTarget).attr('id'));
		var checkboxTabla = document.getElementsByName($(elemento.currentTarget).attr('id'));
		
		if ($(elemento.currentTarget).is(':checked')) 
		{
 	 		for (var i = 0; i < checkboxTabla.length; i++) 
 	 		{
				checkboxTabla[i].checked = true;
			}
 	 	}
        else
        {
        	for (var i = 0; i < checkboxTabla.length; i++) 
        	{
				checkboxTabla[i].checked = false;
			}
        }        
	},

	guardar : function (evento)
	{
		var modeloUsuario = pasarAJson($('#registroUsuario').serializeArray());
		modeloUsuario = limpiarJSON(modeloUsuario);	
		var permisos = modeloUsuario.idpermiso;
		var self = this;

		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionUsuarios.create
		(
			{
				idempleado : modeloUsuario.idempleado,
				idperfil   : modeloUsuario.idperfil,
				usuario    : modeloUsuario.usuario,
				contrasenia : modeloUsuario.contrasenia
			},
			{
				wait	: true,
				success : function (exito) {
					$('#registroUsuario')[0].reset();
					self.cargarPermisos();

					Backbone.emulateHTTP = true;
					Backbone.emulateJSON = true;
					for(i in modeloUsuario.idpermiso)
					{
						app.coleccionPermisosUsuario.create
						(
							{
								idusuario :  exito.get('id'),
								idpermiso  : modeloUsuario.idpermiso[i],							
							},
							{
								wait	: true,
								success : function (exito) {
									console.log('exito');
								},
								error 	: function (error) {}
							}
						);

					} /*...for...*/
					
					Backbone.emulateHTTP = false;
					Backbone.emulateJSON = false;
				},
				error 	: function (error) {}
			}
		);
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
		evento.preventDefault();
	}, /*... Fin de la función guardar ...*/

	// -----obtenerFoto------------------------------- 
	// obtenerFoto	: function () {
	//     $("#input_foto").hide();
	//     //queremos que esta variable sea global
	//     this.fileExtension = "";
	//         //obtenemos un array con los datos del archivo
	//         var file = $("#input_foto").files;
	//         //obtenemos el nombre del archivo
	//         var fileName = file.name;
	//         //obtenemos la extensión del archivo
	//         this.fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
	//         //obtenemos el tamaño del archivo
	//         var fileSize = file.size;
	//         //obtenemos el tipo de archivo image/png ejemplo
	//         var fileType = file.type;
	//         //mensaje con la información del archivo
	//         showMessage("<span class='info'>Foto a subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
	// },
});

app.vistaNuevoUsuario = new app.VistaNuevoUsuario();