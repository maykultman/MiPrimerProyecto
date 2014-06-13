var app = app || {};
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */
app.VistaServicioProyecto = app.VistaServicio.extend({
	tagName	: 'tr',
	plantillaDefault	: _.template($('#tds_servicio').html()),

	plantillaSeleccionado	: _.template(
		$('#tds_servicio_seleccionado').html()
	),

	events	: {
		'click .checkbox_servicio'	: 'apilarServicio',
	},

	initialize	: function () {
		this.$tbody_servicios_seleccionados 
		= $('#tbody_servicios_seleccionados');
	},

	apilarServicio	: function (elem) {
		/*Desabilitar la seleccion del servicio*/
		$(elem.currentTarget).attr('disabled',true);
		this.$tbody_servicios_seleccionados.append(
			this.plantillaSeleccionado(this.model.toJSON())
		);
		this.$el.css('color','#CCC');
	}
});
/* {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} */


app.VistaNuevoProyecto = Backbone.View.extend({
	el					: '.contenedor_principal_modulos',

	plantillaServicio 	: _.template($('#tds_servicio').html()),
	plantillaArchivo	: _.template($('#tr_archivo').html()),

	events	: {
		'click .eliminarDeTabla_servicios'	: 'eliminarDeTabla',
		'click .eliminarDeTabla_empleados'	: 'eliminarDeTabla',
		'click .btn_eliminarMarcados'		: 'eliminarMarcados',

		'change #fechaEntrega'				: 'calcularDuracion',
		'change #fechaInicio'				: 'calcularEntrega',
		'change #duracion'					: 'calcularEntrega',
		'keyup #duracion'					: 'calcularEntrega',

		'click #btn_guardarProyecto'		: 'guadarProyecto',
		'click #btn_cancelarProyecto'		: '',
		'click #btn_omitir_paso'			: 'formSiguiente',
		'click #btn_guardarRoles'			: 'validarRolesEmpleados',
		'click .btn_regresar'				: 'formAnterior',

		'change .btn_marcarTodos'			: 'marcarTodos',
		'click .cerrar'						: 'cerrarAlerta',

		'click #btn_subirArchivo'			: 'subirArchivo',
		'change #inputArchivos'				: 'cargarArchivos',
		'click #inputArchivos'				: 'eliminarFileList',
		'click .eliminarArchivo'			: 'eliminarArchivo',
		'click #btn_cancelarArchivo'		: 'cancelarArchivos',
		'click #cancelar'					: 'cancelarArchivos',
		'click #continuar'					: 'cancelarArchivos',
	},

	initialize			: function () {
		this.$busqueda			= $('#busqueda');
		this.$hidden_idCliente	= $('#hidden_idCliente');

		this.$tbody_empleados 	= $('#tbody_empleados');
		this.$tbody_servicios 	= $('#tbody_servicios');
		this.cargarClientes();
		this.$fechaInicio       = $('#fechaInicio');
		this.cargarServicios();

		this.$advertencia		= $('#advertencia');
		this.$error 			= $('#error');
		this.$exito 			= $('#exito');

		this.$formNuevoProyecto = $('#formNuevoProyecto');

		this.btn_marcarTodos	= $('.btn_marcarTodos')[0];

		this.$fechaEntrega      = $('#fechaEntrega');
		this.$duracion          = $('#duracion');

		this.$inputArchivos		= $('#inputArchivos');
		this.$section_resp_Paso3 = $('#paso3 .panel-info .panel-body');
		this.$tbody_archivos	= $('#tbody_archivos');
		this.$propietarioArchivo = $('#form_subirArchivos #idpropietario');
		this.$tablaProyecto = $('#form_subirArchivos #tabla');

		this.idProyecto;

		this.array = new Array();
	},
	render				: function () {
		return this;
	},
	cargarClientes		: function () {
		var esto = this;
		this.$busqueda.autocomplete(
			{
				source : app.coleccionClientes.pluck('nombreComercial'),
				select : function( event, ui ) {
					var cliente = app.coleccionClientes.findWhere({nombreComercial:ui.item.value});
					esto.$hidden_idCliente.val(cliente.get('id'));
				}
			}
		);
	},
	cargarServicio		: function (servicio) {
		var vistaServicio = new app.VistaServicioProyecto({ 
			model:servicio 
		});
		this.$tbody_servicios.append( vistaServicio.render().el );
	},
	cargarServicios		: function () {
		app.coleccionServicios.each( this.cargarServicio, this );
	},
	cargarEmpleado		: function (empleado) {
		/*añadimos una nueva propiedad al modelo de empledo para
		tener en cada formulario rol el id del proyecto, de esta 
		manera es más facil enviar los roles a la api de roles de 
		proyecto*/
		empleado.set({idproyecto:this.idProyecto});
		var vistaEmpleado = new app.VistaEmpleado({ model:empleado });
		this.$tbody_empleados.append( vistaEmpleado.render().el );
	},
	cargarEmpleados		: function () {
		app.coleccionEmpleados.each( this.cargarEmpleado, this );
	},
	calcularDuracion	: function (elem) {
		var valorFechaInicio = new Date(this.$fechaInicio.val())
										.valueOf();
		var valorFechaEntrega = new Date(this.$fechaEntrega.val())
										.valueOf();
		this.$duracion.val(
			((valorFechaEntrega-valorFechaInicio)/24/60/60/1000) +1
		);
	},
	calcularEntrega 	: function (elem) {
		var valorFechaInicio = new Date(this.$fechaInicio.val())
										.valueOf();
		
		var valorFechaTermuno = 
			valorFechaInicio 
			+ ( parseInt(this.$duracion.val())*24*60*60*1000 );
		
		var fF = new Date(valorFechaTermuno);

		var fechaEntrega = fF.getFullYear() +'-';

		if ((fF.getMonth() +1) < 10 )
			fechaEntrega += '0'+(fF.getMonth() +1) +'-';
		else
			fechaEntrega += (fF.getMonth() +1) +'-';
		if ((fF.getDate()) < 10 )
			fechaEntrega += '0'+(fF.getDate());
		else
			fechaEntrega += (fF.getDate());

		this.$fechaEntrega.val( fechaEntrega );
	},
	cerrarAlerta		: function (elem) {
		$(elem.currentTarget)
		.parent()
		.toggleClass('oculto');
	},
	eliminarDeTabla		: function (elem) {
		/*Separamos la clase del elem para acceder a la tabla
		del cual queremos eliminar uno de sus tr*/
		var arrayClass = $(elem.currentTarget)
						 .attr('class')
						 .split('_');

		/*Ejemplo de cómo se ve el selector:
		  $(#tbody_servicios #servicio_n).attr('disabled',false);
		  ó
		  $(#tbody_empleados #servicio_n).attr('disabled',false);
		*/
		$( "#tbody_"+arrayClass[1]+" #"
					+$(elem.currentTarget).attr('id') )
					.attr('disabled',false); //activamos el checkbox

		$( "#tbody_"+arrayClass[1]+" #"
					+$(elem.currentTarget).attr('id') )
					.attr('checked',false); //desmarcamos el checkbox

		$( "#tbody_"+arrayClass[1]+" #"
					+$(elem.currentTarget).attr('id') )
					.parents('tr')
					// .removeClass()	//removemos el color del tr
					.css('color','#333'); //Cambiamos color del texto

		$(elem.currentTarget).parents('tr').remove();
	},
	eliminarMarcados	: function (elem) {
		var atributoClass = $(elem.currentTarget)
							.attr('class')
							.split(' ');
		var checkboxTabla = document
							.getElementsByName(atributoClass[3]);
		var array = new Array();
		for (var i = 0; i < checkboxTabla.length; i++) {
			if ($(checkboxTabla[i]).is(':checked')) {
				array.push(checkboxTabla[i]);
			};
		};
		for (var i = 0; i < array.length; i++) {
			$(array[i])
			.parents('tr')
			.children('.icon-eliminar')
			.children()
			.click();
		};
		// /*Restablecemos el boton de Marcar todos*/
		// $(elem.currentTarget)//Utilizamo elem como referencia
		// .parent()//Nos ubicamos en el padre del elem
		// .children('.btn-group')//Nos hubicamos en el hijo especificado
		// .children('.btn')//Nos hubicamos en el hijo del hijo anterios
		// .click('toggle');//Conmutamos el botón
	},
	guadarProyecto		: function (elem) {

		/*Efecto slide de formulario*/
		this.formSiguiente(elem);
		// elem.preventDefault();
		// return;

		var esto = this;
		var modeloProyecto = this.pasarAJson(this.$formNuevoProyecto.serializeArray());

		/******************************/
		var servicios = modeloProyecto.servicios;
		delete modeloProyecto.servicios;
		/******************************/

		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionProyectos.create(
			modeloProyecto,
			{
				wait	: true,
				success	: function (exito) {
					esto.guadarServiciosProyecto(exito.get('id'),servicios);
					/*----------------------------------------------*/
					esto.globalizarIdProyecto(exito);
					/*----------------------------------------------*/
					esto.$exito
						.children('#comentario')
						.html('El proyecto <b>'	+
												exito.get('nombre')
												+'</b> se guardo con exito');
					esto.$exito
						.toggleClass('oculto');
					/*----------------------------------------------*/
					esto.cargarEmpleados();
					/*----------------------------------------------*/
					esto.$propietarioArchivo.val(exito.get('id'));
					esto.$tablaProyecto.val('proyectos');
					return;
				},
				error	: function (error) {
					esto.$error
						.children('#comentario')
						.html('Ocurrio un error al intentar guardar el proyecto');
					esto.$error
						.toggleClass('oculto');
				}
			}
		);
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;

		elem.preventDefault();
	},
	guadarServiciosProyecto	: function (idproyecto,servicios) {
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.coleccionServiciosProyecto.create(
			{ idproyecto:idproyecto, idservicio:servicios },
			{
				wait 	:true,
				success : function (exito) {
					console.log('recordar validar que seleccione servicios para el proyecto');
				},
				error 	: function (error) {
					// console.log(error)
				}
			}
		);
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
	},
	globalizarIdProyecto	: function (modelo) {
		this.idProyecto = modelo.get('id');
	},
/*Funciones para la dinamina de roles de empleados sobre el nuevo proyecto*/
	validarRolesEmpleados			: function (elem) {
		this.formSiguiente(elem);
		// elem.preventDefault();
		// return;

		var forms = $('#paso2 form');
		for (var i = 0; i < forms.length; i++) {
			var modelo = this.pasarAJson(this.$(forms[i]).serializeArray());
			/*Comprobamos si hay roles nuevos*/
			if ( typeof modelo.nombre !== 'undefined' ) {
				/*Aislamos los nuevos roles*/
				var nuevosRoles = {};
				nuevosRoles.nombre = modelo.nombre;

				if (modelo.idrol) {
					console.log(modelo.idrol.length + nuevosRoles.nombre.length);

				} else{
					console.log(nuevosRoles.nombre.length);
				};
				return;
				
				delete modelo.nombre;
				this.guadarRolRecursivo(modelo);
				this.guardarRolesNuevos({
					idproyecto 	: modelo.idproyecto, 
					idpersonal 	: modelo.idpersonal,
					nombre 		: nuevosRoles.nombre
				});
			} else {

				console.log( modelo.idrol.length );
				return;
				
				this.guadarRolRecursivo(modelo);
			};
		};
	},
	guadarRolRecursivo	: function (modelo) {
		if ($.isArray(modelo.idrol)) {
			for (var i = 0; i < modelo.idrol.length; i++) {
				this.guadarRolRecursivo({
					idproyecto:modelo.idproyecto, 
					idpersonal:modelo.idpersonal, 
					idrol:modelo.idrol[i]
				});
			};
		} else{
			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
			app.coleccionRolesProyectos.create(
				modelo,
				{
					wait	: true,
					success	: function (exito) {},
					error	: function (error) {}
				}
			);
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;
		};	
	},
	guardarRolesNuevos	: function (nuevosRoles) {
		var esto = this;

		if ($.isArray(nuevosRoles.nombre)) {
				for (var i = 0; i < nuevosRoles.nombre.length; i++) {
					this.guardarRolesNuevos({
						idproyecto:nuevosRoles.idproyecto, 
						idpersonal:nuevosRoles.idpersonal, 
						nombre:nuevosRoles.nombre[i]
					});
				};
		} else{
			console.log(nuevosRoles);
			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
			app.coleccionRoles.create(
				{nombre:nuevosRoles.nombre},
				{
					wait	: true,
					success : function (exito) {
						esto.guadarRolRecursivo({
							idproyecto:nuevosRoles.idproyecto, 
							idpersonal:nuevosRoles.idpersonal, 
							idrol:exito.get('id')
						});
					},
					error 	: function (error) {
						console.log('error');
					}
				}
			);
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;
		};	
	},
/*Controladores para carga de archivos*/
	cargarArchivos		: function (elem) {
		this.$tbody_archivos.html('');
		this.arrArchivos = new Array();
		// if ( this.arrArchivos == $(elem.currentTarget).prop('files') ) {console.log('Si')} else{console.log('No')};
		var archivos = $(elem.currentTarget).prop('files');
		for (var i = 0; i < archivos.length; i++) {
			this.$tbody_archivos.append( this.plantillaArchivo( {i:i, tipo:(archivos[i].type).split('/')[1], nombre:archivos[i].name, tamaño:(archivos[i].size/1024).toFixed() +' KB'} ) );
		};
	},
	eliminarFileList	: function () {
		delete this.$inputArchivos.val('');
	},
	subirArchivo		: function (elem) {
		elem.preventDefault();
		var archivos = this.$inputArchivos.prop('files');
		
		var esto = this;
		esto.classTr =  archivos.length - 1;
		if (this.arrArchivos) {
			// for (var i = 0; i < archivos.length; i++) {
			for (var i = archivos.length - 1; i >= 0; i--) {
				if ( this.arrArchivos.indexOf(String(i)) == -1 ) {
				this.$tbody_archivos.children('.'+i).children('.icon-eliminar').html('<img src="img/ajax-loader25x25.gif">');
					var formData = new FormData(document.getElementById('form_subirArchivos'));
					// formData.append('tabla','proyectos');
					formData.append('archivo[]',archivos[i]);
					// formData.append('idpropietario',this.idProyecto);
					var resp = $.ajax({
			            url: 'http://crmqualium.com/api_archivos',  
			            type: 'POST',
			            async:true,
			            data: formData,
			            //necesario para subir archivos via ajax
			            cache: false,
			            contentType: false,
			            processData: false,
			            success: function (exito) {
			            	esto.$tbody_archivos.children('.'+esto.classTr).addClass('success');
			            	esto.$tbody_archivos.children('.'+esto.classTr).children('.icon-eliminar').html('<div class="has-success"><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>');
			   				esto.classTr--;
			            },
			            error  : function (error) {
			            	esto.$tbody_archivos.children('.'+esto.classTr).addClass('danger');
			            	esto.$tbody_archivos.children('.'+esto.classTr).children('.icon-eliminar').html('<div class="has-error"><span class="glyphicon glyphicon-remove form-control-feedback"></span></div>');
			   				esto.classTr--;
			            }
			        });
				};
			};
		}			
	},
	guardarArchivo		: function (archivo) {
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		app.COLECCIONDEARCHIVOSPARAPROYECTOS.create(
			{
				idproyecto 	: this.idProyecto,
				direccion	: 'archivos/'+archivo
			},
			{
				wait 	: true,
				success : function (exito) {},
				error 	: function (error) {}
			}
		);
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
	},
	eliminarArchivo		: function (elem) {
		this.arrArchivos.push( $(elem.currentTarget).attr('id') );
		$(elem.currentTarget).parents('tr').remove();
	},
	cancelarArchivos	: function (elem) {
		if ($(elem.currentTarget).attr('id') == 'btn_cancelarArchivo') {
			$('#advertencia #comentario').html('Los archivos a subir seran cancelados');
			$('#advertencia').removeClass('oculto');
		}; 
		if ($(elem.currentTarget).attr('id') == 'cancelar') {
			for (var i = 0; i < $('.eliminarArchivo').length; i++) {
				this.arrArchivos.push(i);
			};
			$('#advertencia').addClass('oculto');
			this.$tbody_archivos.html('');
		};
		if ($(elem.currentTarget).attr('id') == 'continuar') {
			$(elem.currentTarget).parents('div').children('.cerrar').click();
		};
	},
/*Otros controladores*/
	formSiguiente		: function (elem) {
		var next_fs,current_fs,left,opacity,scale,animating;

		if(animating) return false;
		animating = true;
		
		current_fs = $(elem.currentTarget).parent().parent().parent();
		next_fs = $(elem.currentTarget).parent().parent().parent().next();
		
		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("#divSecciones section").index(next_fs)).addClass("active");
		
		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'transform': 'scale('+scale+')'});
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	},
	formAnterior		: function (elem) {
		var previous_fs,current_fs,left,opacity,scale,animating;
		if(animating) return false;
		animating = true;
		
		current_fs = $(elem.currentTarget).parent().parent().parent();
		previous_fs = $(elem.currentTarget).parent().parent().parent().prev();
		
		//de-activate current step on progressbar
		$("#progressbar li").eq($("#divSecciones section").index(current_fs)).removeClass("active");
		
		//show the previous fieldset
		previous_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1-now) * 50)+"%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({'left': left});
				previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	},
	pasarAJson			: function (objSerializado) {
	    var json = {};
	    $.each(objSerializado, function () {
	        if (json[this.name]) {
	            if (!json[this.name].push) {
	                json[this.name] = [json[this.name]];
	            };
	            json[this.name].push(this.value || '');
	        } else{
	            json[this.name] = this.value || '';
	        };
	    });
	    return json;
	},
	marcarTodos 		: function (elem) {
		var checkboxTabla = document
							.getElementsByName(
								$(elem.currentTarget).attr('id')
							 );
		if ($(elem.currentTarget).is(':checked')) {
			for (var i = 0; i < checkboxTabla.length; i++) {
				checkboxTabla[i].checked = true;
			};
		} else{
			for (var i = 0; i < checkboxTabla.length; i++) {
				checkboxTabla[i].checked = false;
			};
		};
	},
});

app.vistaNuevoProyecto = new app.VistaNuevoProyecto();