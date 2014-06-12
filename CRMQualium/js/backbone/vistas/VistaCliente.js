var app = app || {};

app.VistaCliente = Backbone.View.extend({
	tagName	: 'tr',
	plantilla : _.template($('#plantilla_td_de_cliente').html()),
	plantillaCliente : _.template($('#modalCliente').html()),
	events	: {
		//Es el boton de eliminar del tr del CLIENTE
			'click #tr_btn_eliminar'		: 'advertenciaEliminar',
		//Boton para accesar rapidamente a la edición del cliente
					'click #tr_btn_editar'	: 'editando',
							'click .verInfo'	: 'verInfo',

		//Es el boton de eliminar la ficha información del CLIENTE
			'click #modal_btn_eliminar'		: 'advertenciaEliminar',
		'click #alertasCliente #eliminar'	: 'visibilidad',
		'click #alertasCliente #cancelar'	: 'cancelar',
		//Es el boton para editar CLIENTE en el MODAL
				'click #modal_btn_editar'	: 'editando',
		//Es el boton para ver CONTACTOS
			'click #modal_btn_contactos'	: 'verContactos',
		/*Evento para nuevo teléfono*/
		'click #divCliente #enviarTelefono'	: 'crearTelefono',


		/*Vaidaciones*/
		// 'blur #divCliente #numeroNuevo'	: 'validarTelefono',

		/*Eventos de atributos*/
		'keypress #divCliente .editando'	: 'actualizarAtributo',
		'change #divCliente .editando'	: 'actualizarAtributo',
		'keydown #divCliente #comentario'	: 'actualizarComentario',
		/*Eventos de servicios*/
		'keypress #divCliente #inputBusquedaI'	: 'agregarNuevoServ',
		'click	#divCliente #btn_agregarI'	: 'agregarNuevoServBoton',
		'keypress #divCliente #inputBusquedaC'	: 'agregarNuevoServ',
		'click	#divCliente #btn_agregarC'	: 'agregarNuevoServBoton',

		'keyup #divCliente #inputBusquedaI'	: 'buscarServicioI',
		'keyup #divCliente #inputBusquedaC'	: 'buscarServicioC',
		'click #divCliente .icon-uniF470'	: 'quitarDeLista',

		/*Eventos para nuevo contacto o representante*/
		'click #btn_nuevoContacto'	: 'nuevoContacto',


		/*Validar telefono y correo del nuevo contacto o representante*/
		'blur #nuevoMail'	: 'validarCorreo',
		'blur #nuevoNumero'	: 'validarTelefono',




		//Eventos para las advertencias
							'click .cerrar'	: 'cerrarAlerta',
	},
	initialize	: function () {
		/*Listener para capturar los CAMBIOS en cada uno de
		los ATRIBUTOS de los modelos*/
		this.listenTo(
			this.model, 
			'change:visibilidad', 
			this.eliminarDelDOM
		);
		
		

		//Otras variables
		this.pasarFiltro = 0;
		this.esperar;
	},
	render	: function () {
		/*Cargar los datos del cliente en la plantilla de underscore
		para luego cargar como html en las etiquetas que hace
		referencia el atributo el. luego esta función sera llamada
		cuendo se instancie esta clase para imprimirlo en pantalla.*/
		this.$el.html(this.plantilla( this.model.toJSON() ));
		/*guardamos los selectores del los botones eliminar y editar
		de la ficha de información del cliente.*/
		this.$btn_eliminar = this.$('#modal_btn_eliminar');
		this.$btn_editar = this.$('#modal_btn_editar');
		this.$btn_contactos = this.$('#modal_btn_contactos');
		/*Guardamos el selector donde seran impresos los contactos
		y el representante, el selector sera utilizado más adelante.*/
		this.$divContactos = this.$('#divContactos');

		/*Selector del formulario para actualizar los datos del 
		cliente*/


		// this.$editarAtributo = this.$('.editar');
		// this.$btn_iconoEditar = this.$('#editar');
		this.$panelBody = this.$('.panel-body');

		this.$telefonos = this.$('#telefonos');

		this.$serviciosInteres = this.$('#serviciosInteres');
		this.$serviciosCuenta = this.$('#serviciosCuenta');
		// var servicios;
		/*servicios = this.model.get('serviciosInteres');
		console.log(servicios);*/
		this.agregarServciciosClienteI(this.$serviciosInteres);
		/*servicios = this.model.get('serviciosCuenta');
		console.log(servicios);*/
		this.agregarServciciosClienteC(this.$serviciosCuenta);

		/*Obtener lo telefonos (modelos) del cliente*/
		this.agregarTelefono(this.model.get('id'),'clientes');
		/*En caso de no haber teléfonos se hace referencia al
		formulario que tiene la plantilla por default*/
		this.$numeroNuevo = this.$('#numeroNuevo');
		this.$tipoNuevo = this.$('#tipoNuevo');

		this.$editarAtributo = this.$('.editar');

		/*A final*/
		// this.$respuesta = this.$('.respuesta'); es el tr de la palomota, no hizo falta

		// {{{{{{{{{{{{{selectores de servicios de interes y actuales}}}}}}}}}}}}}
		this.$menuServiciosInteres	  = this.$('#menuServiciosInteres');
		this.$menuServiciosCuenta	  = this.$('#menuServiciosCuenta');
		// {{{{{{{{{{{{{selectores de servicios de interes y actuales}}}}}}}}}}}}}

		return this;
	},
	//---------------------------------------------
	verInfo	: function () {
		this.$el.append(this.plantillaCliente( this.model.toJSON() ));
		var esto = this;
		var modal = this.$el.find('#cerrar_consulta');
		modal.on('click',function(){
			$(this).parents('#'+esto.model.get('id')).modal('hide').remove();
		});
		
	},
	nuevoContacto	: function (submit) {

		var serializado = this.$formNuevoContacto.serializeArray();

		for (var i = 0; i < serializado.length; i++) {
			if (serializado[i].value == '') {
				this.$('#alertasCliente #error #comentario')
					.html('Llene todos los campos');
				this.$('#alertasCliente #error').toggleClass('oculto');
				submit.preventDefault();
				return;
			};
		};

		if ( this.validarPreenvioCorreo(
			this.$('#nuevoMail').val()
			) == false 
		) {
			/*En caso de que el número no sea correcto,
			  evitamos recargar el botón*/
			submit.preventDefault();
			/*Se evita seguir con la función*/
			return;
		};

		if ( this.validarPreenvioTelefono(
			this.$('#nuevoNumero').val()
			) == false 
		) {
			/*En caso de que el número no sea correcto,
			  evitamos recargar el botón*/
			submit.preventDefault();
			/*Se evita seguir con la función*/
			return;
		};
		
		var modelo = pasarAJson(serializado);

		var persona = modelo.persona;
		delete modelo.persona;

		telefono = {};

		telefono.tipo = modelo.tipo;
		delete modelo.tipo;

		telefono.numero = modelo.numero;
		delete modelo.numero;

		modelo.idcliente = this.model.get('id');

		// console.log(persona,modelo,telefono);
		// this.$('#btn_cerrarNuevoContacto').click();
		// submit.preventDefault();
		// return;

		var esto = this;

		/*Se activan las dos variables globales de Backbone para
		mandar de manera correcta el POST de contactos. Antes de finalizar
		esta función se desactivarán estas dos variables globales
		para que no afecte otras funciónes.*/
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;
		
		if (persona == 'representante') {
			app.coleccionRepresentantes.create(
				modelo,
				{
					wait:true,
					success:function(exito){
						esto.$('#alertasCliente #exito #comentario')
							.html('Se creo el nuevo <strong>representante</strong>');
						esto.$('#alertasCliente #exito').removeClass('oculto');

						Backbone.emulateHTTP = true;
						Backbone.emulateJSON = true;
						app.coleccionTelefonos.create(
							{
								idpropietario:exito.get('id'),
								tabla:'representantes',
								numero:telefono.numero,
								tipo:telefono.tipo
							},
							{wait:true}
						);
						Backbone.emulateHTTP = false;
						Backbone.emulateJSON = false;
						esto.$('#btn_cerrarNuevoContacto').click();
						setTimeout(
							function () {
								esto.agregarRepresentante(exito, esto.model.get('id'), 'Nuevo representante');
							},
							500);
					},
					error:function(){
						esto.$('#alertasCliente #error #comentario')
							.html('Ocurrio un erro al intentar crear al <strong>representante</strong>');
						esto.$('#alertasCliente #error').removeClass('oculto');
					}
				}
			);
		};
		if (persona == 'contacto') {
			app.coleccionContactos.create(
				modelo,
				{
					wait:true,
					success:function(exito){
						esto.$('#alertasCliente #exito #comentario')
							.html('Se creo el nuevo <strong>contacto</strong>');
						esto.$('#alertasCliente #exito').removeClass('oculto');

						Backbone.emulateHTTP = true;
						Backbone.emulateJSON = true;
						app.coleccionTelefonos.create(
							{
								idpropietario:exito.get('id'),
								tabla:'contactos',
								numero:telefono.numero,
								tipo:telefono.tipo
							},
							{wait:true}
						);
						Backbone.emulateHTTP = false;
						Backbone.emulateJSON = false;
						esto.$('#btn_cerrarNuevoContacto').click();
						setTimeout(
							function () {
								esto.agregarContacto(exito, esto.model.get('id'), 'Nuevo contacto');
							},
							500);
					},
					error:function(){
						esto.$('#alertasCliente #error #comentario')
							.html('Ocurrio un erro al intentar crear al <strong>contacto</strong>');
						esto.$('#alertasCliente #error').removeClass('oculto');
					}
				}
			);
		};

		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;

		// window.location.href = "modulo_consulta_clientes";

		submit.preventDefault();
	},
	advertenciaEliminar : function (elemento) {
		// if (elemento.keyCode != 13) {
		    // console.log(elemento);
			// elemento.preventDefault();
		    // return;
			this.$('#alertasCliente #advertencia #comentario')
			.html('¿Deseas eliminar al cliente <strong>'
				+this.model.get('nombreComercial')+'</strong>?');

		    this.$('#alertasCliente #advertencia')
		    .toggleClass('oculto');
		// };
	},
	actualizarAtributo	: function (elemento) {
		/*Cada vez que ocurre el evento keypress este metoso se 
		ejecuta; solo cuando el valos de la propiedad es igual 13 
		equivalente a precionar la tecla enter*/
		if ( 
			(elemento.keyCode === 13 || elemento.type === 'change') && 
			$(elemento.currentTarget).attr('id') != 'comentario' 
		){
			/*El formulario de nuevo telefono esta dentro de un div 
			con class editar que luego cambia a editando. Esto provoca 
			un error en la actualozacion de atributos del cliente 
			porque los inputs para actualiar atributo tambien tienen 
			class editar que cambian a editando. Para ello esta 
			funcion esta preparada para evitar que se ejecute por 
			completo en caso de querer actualizar un telefono que no 
			existe*/
			if ($(elemento.currentTarget)
				.parent()
				.attr('id') == 'telefonos'
			) {
				elemento.preventDefault();
				return;
			};

			var valorJson = $(elemento.currentTarget)
			.serializeArray();

			if (valorJson.length == 0) {
				elemento.preventDefault();
				return;
			};

			if (valorJson.length > 0) {
				if ($(elemento.currentTarget).attr('class') == 
					'serviciosInteres editando' 

					|| $(elemento.currentTarget).attr('class') == 
					'serviciosCuenta editando'
				) {
					this.actualizarServicios(valorJson,elemento);
	            	return;
				};
	        };

	        if ($(elemento.currentTarget).attr('id') == 'mail') {
	        	if (this.validarCorreo(elemento) == false) {
	        		elemento.preventDefault();
	        		return;
	        	};
	        };

	        if ($(elemento.currentTarget).attr('id') == 'url') {
	        	if (this.validarPaginaWeb(elemento) == false) {
	        		elemento.preventDefault();
	        		return;
	        	};
	        };

			/*Enviamos la propiedad que deseamos actualizar mediante
			la funcion save de modelo (cliente) actual.*/
			this.model.save(
				/*La función pasarAJson obtiene el nuevo valor y la
				propiedad que queremos actualizar en formato json,
				pero antes los datos en el htmo se serializan para
				obtener un array con las propiedades name y value.*/
				pasarAJson(valorJson),
				{
					wait	: true,//Esperamos respuesta del server
					patch	: true,//Evitamos enviar todo el modelo
					success	: function (exito) {//Encaso del exito
						$(elemento.currentTarget)//Selector
						//Salimos del elemento
						.blur()
						//Nos hubicamos en el padre del selector
						.parents('tr')
						//Buscamos al hijo con la clase especificada
						.children('.respuesta')
						//Removemos su atributo class
						.html('<label class="icon-uniF479 exito"></label>');
					},
					error	: function (error) {//En caso de error
						$(elemento.currentTarget)//Selector
						//Salimos del elemento
						.focus()
						//Nos hubicamos en el padre del selector
						.parents('tr')
						//Buscamos al hijo con la clase especificada
						.children('.respuesta')
						//Sustituimos html por uno nuevo
						.html('<label class="icon-uniF478 error"></label>');
					}
				}
			);
			elemento.preventDefault();
		};
	},
	crearTelefono	: function (elemento) {
		if (this.$numeroNuevo.val() 
			!= '' && this.$tipoNuevo.val() != ''
		) {
			/*Antes de guardar el nuevo telefono se valida
			  nuevamente que el número sea correcto*/
			if ( this.validarPreenvioTelefono(
				this.$numeroNuevo.val()
				) == false 
			) {
				/*En caso de que el número no sea correcto,
				  evitamos recargar el botón*/
				elemento.preventDefault();
				/*Se evita seguir con la función*/
				return;
			};

			var json1 = pasarAJson(
				this.$numeroNuevo.serializeArray()
			);

			var json2 = pasarAJson(
				this.$tipoNuevo.serializeArray()
			);
			json1.tipo = json2.tipo;
			json1.idpropietario = this.model.get('id');
			json1.tabla = 'clientes';
			
			var esto = this;

			Backbone.emulateHTTP = true;
			Backbone.emulateJSON = true;
			app.coleccionTelefonos.create(
				json1,
				{
					wait	: true,//Esperamos respuesta del server
					// patch	: true,//Evitamos enviar todo el modelo
					success	: function (exito) {//Encaso del exito
						$(elemento.currentTarget)//Selector
						//Salimos del elemento
						.blur()
						//Nos hubicamos en el padre del selector
						.parents('tr')
						//Buscamos al hijo con la clase especificada
						.children('.respuesta')
						//Removemos su atributo class
						.html('<label class="icon-uniF479 exito"></label>');
						//Borrar el contenido del td para telefonos
						esto.$telefonos.html('');
						//Imprimir el formulario para nuevo telefono
						esto.$telefonos.html('<div class="editar"><div class="input-group"><input type="text" id="numeroNuevo" class="form-control" name="numero" maxlength="10" placeholder="Nuevo Teléfono"><div class="input-group-btn"><select id="tipoNuevo" class="btn btn-default" name="tipo"><option value="Casa">Casa</option><option value="Fax">Fax</option><option value="Movil" selected>Movil</option><option value="Oficina">Oficina</option><option value="Personal">Personal</option><option value="Trabajo">Trabajo</option><option value="Otro">Otro</option><option selected disabled>Tipo</option></select><button id="enviarTelefono" class="btn btn-default"><label class="glyphicon glyphicon-send"></label></button></div></div></div>');
						//Obtener nuevamente los telefonos del cliente
						esto.agregarTelefono(esto.model.get('id'), 'clientes');

						esto.$editarAtributo.toggleClass('editando');
						esto.$editarAtributo = esto.$('.editar');
						esto.$editarAtributo.toggleClass('editando');
					},
					error	: function (error) {//En caso de error
						$(elemento.currentTarget)//Selector
						//Salimos del elemento
						.focus()
						//Nos hubicamos en el padre del selector
						.parents('tr')
						//Buscamos al hijo con la clase especificada
						.children('.respuesta')
						//Sustituimos html por uno nuevo
						.html('<label class="icon-uniF478 error"></label>')
					}
				}
			);
			Backbone.emulateHTTP = false;
			Backbone.emulateJSON = false;
		} else{
			this.$('#alertasCliente #error #comentario')
			.html('Escriba un teléfono correcto y seleccione su tipo');

			this.$('#alertasCliente #error').toggleClass('oculto');
			this.$numeroNuevo.focus();
		};
		elemento.preventDefault();
	},
	actualizarServicios	: function (servicio, elemento) {
		/*Esta función se ejecuta cuando se agregan servicios que
		ya existen los cuales pueden interesarles al cliente o son
		puede que cuente con ellos*/
		var json = pasarAJson(servicio);
		var modeloServicio = {};
		modeloServicio.idcliente = this.model.get('id');
		
		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;

		if ($(elemento.currentTarget).attr('class') == 
			'serviciosInteres editando'
		) {
			/*restarle 100 para guardar el id verdadero del servico.
			En la listade servicios actuales se le aumenta 100 para
			no generar conflictos en la otra lista de servicios*/
			modeloServicio.idservicio = json.nameServiciosInteres;
			app.coleccionServiciosClientesI.create(modeloServicio,{
				wait	:true,
				success	: function (exito) {
					$(elemento.currentTarget)//Selector
					//Nos hubicamos en el padre del selector
					.parents('tr')
					//Buscamos al hijo con la clase especificada
					.children('.respuesta')
					//Removemos su atributo class
					.html('<label class="icon-uniF479 exito"></label>');
				},
				error 	: function (error) {
					$(elemento.currentTarget)//Selector
					//Nos hubicamos en el padre del selector
					.parents('tr')
					//Buscamos al hijo con la clase especificada
					.children('.respuesta')
					//Sustituimos html por uno nuevo
					.html('<label class="icon-uniF478 error"></label>');
				}
			});
		};
		if ($(elemento.currentTarget).attr('class') == 
			'serviciosCuenta editando'
		) {
			/*restarle 100 para guardar el id verdadero del servico.
			En la listade servicios actuales se le aumenta 100 para
			no generar conflictos en la otra lista de servicios*/
			modeloServicio.idservicio = 
			(parseInt(json.nameServiciosCuenta)-100);

			app.coleccionServiciosClientesC.create(modeloServicio,{
				wait	:true,
				success	: function (exito) {
					$(elemento.currentTarget)//Selector
					//Nos hubicamos en el padre del selector
					.parents('tr')
					//Buscamos al hijo con la clase especificada
					.children('.respuesta')
					//Removemos su atributo class
					.html('<label class="icon-uniF479 exito"></label>');
				},
				error 	: function (error) {
					$(elemento.currentTarget)//Selector
					//Nos hubicamos en el padre del selector
					.parents('tr')
					//Buscamos al hijo con la clase especificada
					.children('.respuesta')
					//Sustituimos html por uno nuevo
					.html('<label class="icon-uniF478 error"></label>');
				}
			});
		};
		
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
	},
	actualizarComentario	: function (elemento) {
		$(elemento.currentTarget).parents('tr').children('.respuesta').html('<img src="img/ajax-loader.gif" width="14" height="14">');
		clearTimeout(this.esperar);
		var modelo = this.model;

		this.esperar = setTimeout(
			function () {
				var valorJson = $(elemento.currentTarget)
								.serializeArray();
				modelo.save(
					/*La función pasarAJson obtiene el nuevo valor y la
					propiedad que queremos actualizar en formato json,
					pero antes los datos en el htmo se serializan para
					obtener un array con las propiedades name y value.*/
					pasarAJson(valorJson),
					{
						wait	: true,//Esperamos respuesta del server
						patch	: true,//Evitamos enviar todo el modelo
						success	: function (exito) {//Encaso del exito
							$(elemento.currentTarget)//Selector
								//Nos hubicamos en el padre del selector
								.parents('tr')
								//Buscamos al hijo con la clase especificada
								.children('.respuesta')
								//Removemos su atributo class
								.html('<label class="icon-uniF479 exito"></label>');
						},
						error	: function (error) {//En caso de error
							$(elemento.currentTarget)//Selector
								//Nos hubicamos en el padre del selector
								.parents('tr')
								//Buscamos al hijo con la clase especificada
								.children('.respuesta')
								//Sustituimos html por uno nuevo
								.html('<label class="icon-uniF478 error"></label>');
						}
					}
				);
			},
			3000
		);
	},
	agregarTelefono	: function (idPropietario, tabla) {
		var telefonos = app.coleccionTelefonos.where({
				idpropietario:idPropietario, 
				tabla:tabla
			});
		/*Pasa el filtro del if solo si el arreglo de telefonos
		contiene por almenos un valor*/
		if (telefonos.length > 0) {
			/*Limpiamos el td de la tabla para los telefonos*/
			this.$telefonos.children('label').remove();
			for (var i = 0; i < telefonos.length; i++) {
				/*Instanciar un objeto telefono*/
				var vistaTelefono = new app.VistaTelefono({
					model:telefonos[i]
				});
				/*Agregar td que contentran los telefonos
				de este cliente*/
				this.$telefonos.prepend(vistaTelefono.render().el);
			};
		};
	},
	agregarServciciosClienteI	: function (id) {
		var sI = app.coleccionServiciosClientesI.where({
				idcliente:this.model.get('id'), 
				status:'1'
			});
		if (sI.length > 1) {
			for (var i = 0; i < sI.length; i++) {
				if (typeof sI[i] != "undefined") {
					var vSC = new app.VistaServicioCliente({
							model:sI[i]
						});
					$(id).append(vSC.render().el);
				}
			};
		} else{
			if (typeof sI[0] != "undefined") {
				var vSC = new app.VistaServicioCliente({model:sI[0]});
				$(id).append(vSC.render().el);
			}
		};
		this.$editarAtributo = this.$('.editar');
	},
	agregarServciciosClienteC	: function (id) {
		var sC = app.coleccionServiciosClientesC.where({
			idcliente:this.model.get('id'), status:'1'
		});

		if (sC.length > 1) {
			for (var i = 0; i < sC.length; i++) {
				if (typeof sC[i] != "undefined") {
					var vSC = new app.VistaServicioCliente({
							model:sC[i]
						});
					$(id).append(vSC.render().el);
				}
			};
		} else{
			if (typeof sC[0] != "undefined") {
				var vSC = new app.VistaServicioCliente({model:sC[0]});
				$(id).append(vSC.render().el);
			}
		};
		this.$editarAtributo = this.$('.editar');
	},
	buscarServicioI	: function (elemento) {
		
		var buscando = $(elemento.currentTarget).val();
		app.coleccionServicios.fetch({
			reset:true, data:{nombre: buscando}
		});

		this.sinCoincidencias();

		this.$menuServiciosInteres.html('');
		this.cargarServiciosI();
	},
	buscarServicioC	: function (elemento) {
		
		var buscando = $(elemento.currentTarget).val();
		app.coleccionServicios.fetch({
			reset:true, data:{nombre: buscando}
		});

		this.sinCoincidencias();

		this.$menuServiciosCuenta.html('');
		this.cargarServiciosC();
	},
	sinCoincidencias	: function () {
		if (app.coleccionServicios.length == 0) {
			app.coleccionServicios.fetch({
				reset:true, data:{nombre: ''}
			});
		};
	},
	/*Las funciones cargarServicioI y cargarServicioC agregar los
	  servicios dentro de menus desplegables especificados por los 
	  selectores menuServiciosInteres y menuServiciosCuenta. Se 
	  realizan una sola vez; para que se agreguenTodos los servicios 
	  se necesitan las las dos funciones que seguien a estas. para 
	  cada funcion se instancia un nuevo objeto de la clase 
	  VistaServicioIteres y VistaServicioCuenta ejecutando tras ello 
	  las funciones render() pasando la devolucion de render() al 
	  elemento contenido en la propiedad el de dicha clase instanciada
	*/	
	cargarServicioI	: function (servicio) {
		var vistaServicioI = new app.VistaServicioInteres({
			model:servicio
		});
		this.$menuServiciosInteres.append(vistaServicioI.render().el);
	},
	cargarServicioC	: function (servicio) {
		var vistaServicioC = new app.VistaServicioCuenta({
			model:servicio
		});
		this.$menuServiciosCuenta.append(vistaServicioC.render().el);
	},
	cargarServiciosI	: function () {
		this.$menuServiciosInteres.html('');
		app.coleccionServicios.each(this.cargarServicioI, this);
	},
	cargarServiciosC	: function () {
		this.$menuServiciosCuenta.html('');
		app.coleccionServicios.each(this.cargarServicioC, this);
	},
	quitarDeLista	: function (elemento) {
		/*Esta funcion recibe un parametro al y se ejecuta al momento 
		de ejecutarse el evento para quitar de la lista uno de los 
		servicios. El parametro es un objeto del DOM.

		En la variable arrayServicios se almacenan los objetos que 
		coincidan con el mismo atributo name.*/
		var arrayServicios = document
							.getElementsByName(
								$(elemento.currentTarget)
								.attr('name')
							);

		/*En la variable servicio almacenamos el id del elemento que 
		se quiere quitar de la lista.*/
		var servicio = $(elemento.currentTarget).parent().attr('id');

		/*Mediante el ciclo for se itera sobre los elementos del arreglo
		arrayServicios hasta encontrar una coincidencia de id espeficicada
		en la condición if. se establece como falso y se rompe el ciclo.
		Esto se hace para no desactivar todos los alementos de la lista
		que se han agregado para el cliente. Hay un checkbox oculto con 
		cada elemento de la lista*/
		for (var i = 0; i < arrayServicios.length; i++) {
			if ($(arrayServicios[i]).attr('id') == servicio) {
				$(arrayServicios[i]).prop('checked', false);
				break;
			};
		};

		/*Finalmente se remueve del DOM el servicio que ya no se 
		quiera ver en ella*/
		$(elemento.currentTarget).parent().remove();
	},
	agregarNuevoServ	: function (elemento) {
		var esto = this;

		Backbone.emulateHTTP = true;
		Backbone.emulateJSON = true;

        if (
        	(this.pasarFiltro == 1 || elemento.keyCode === 13)
        	&& $(elemento.currentTarget).attr('id') == 'inputBusquedaI'
        ) {
        	this.pasarFiltro = 0;
        	if ($(elemento.currentTarget).val() != '') {
        		var idCliente = this.model.get('id');
        		app.coleccionServicios.create(
        			{ nombre : $(elemento.currentTarget).val() },
        			{
        				wait:true,
        				success : function (exito) {
		        			$('#listaInteres').append('<li class="list-group-item">'+exito.get('nombre') +'<label class="icon-uniF470" style="float: right;"><span></span></label><input type="checkbox" class="check_posicion" name="serviciosInteres" value="'+exito.get('id')+'" checked></li>');
		        			$(elemento.currentTarget).val('');
							Backbone.emulateHTTP = true;
							Backbone.emulateJSON = true;
		        		  	app.coleccionServiciosClientesI.create(
		        		  		{idcliente:idCliente,idservicio:exito.get('id')},
		        		  		{
		        		  			wait:true,
		        		  			success:function () {
			        		  			$(elemento.currentTarget)
			        		  			//Nos hubicamos en el padre del selector
										.parents('tr')
										//Buscamos al hijo con la clase especificada
										.children('.respuesta')
										//Removemos su atributo class
										.html('<label class="icon-uniF479 exito"></label>');
									},
									error:function () {
										$(elemento.currentTarget)
										//Nos hubicamos en el padre del selector
										.parents('tr')
										//Buscamos al hijo con la clase especificada
										.children('.respuesta')
										//Sustituimos html por uno nuevo
										.html('<label class="icon-uniF478 error"></label>');
			        		  		}
			        		  	}
			        		);
							Backbone.emulateHTTP = false;
							Backbone.emulateJSON = false;
        				}
        			}
        		);
			}
			elemento.preventDefault();
        };

        if (
        	(this.pasarFiltro == 1 || elemento.keyCode === 13)
        	&& $(elemento.currentTarget).attr('id') == 'inputBusquedaC'
        ) {
        	this.pasarFiltro = 0;
        	if ($(elemento.currentTarget).val() != '') {
        		var idCliente = this.model.get('id');
        		app.coleccionServicios.create(
        			{ nombre : $(elemento.currentTarget).val() },
        			{
        				wait:true,
        				success : function (exito) {
		        			$('#listaCuenta').append('<li class="list-group-item">'+ exito.get('nombre')+'<label class="icon-uniF470" style="float: right;"><span></span></label><input type="checkbox" class="check_posicion" name="serviciosCuenta" value="'+exito.get('id')+'" checked></li>');
		        			$(elemento.currentTarget).val('');
		        			Backbone.emulateHTTP = true;
							Backbone.emulateJSON = true;
		        		  	app.coleccionServiciosClientesC.create(
		        		  		{idcliente:idCliente,idservicio:exito.get('id')},
		        		  		{
		        		  			wait:true,
		        		  			success:function () {
			        		  			$(elemento.currentTarget)
			        		  			//Nos hubicamos en el padre del selector
										.parents('tr')
										//Buscamos al hijo con la clase especificada
										.children('.respuesta')
										//Removemos su atributo class
										.html('<label class="icon-uniF479 exito"></label>');
										// esto.agregarServciciosClienteC(esto.$serviciosCuenta);
									},
									error:function () {
										$(elemento.currentTarget)
										//Nos hubicamos en el padre del selector
										.parents('tr')
										//Buscamos al hijo con la clase especificada
										.children('.respuesta')
										//Sustituimos html por uno nuevo
										.html('<label class="icon-uniF478 error"></label>')
			        		  		}
			        		  	}
			        		);
							Backbone.emulateHTTP = false;
							Backbone.emulateJSON = false;
        				}
        			}
        		);
			}
			elemento.preventDefault();
        };
        
		Backbone.emulateHTTP = false;
		Backbone.emulateJSON = false;
    },
    agregarNuevoServBoton	: function (elemento) {
		if ($(elemento.currentTarget).attr('id') == 'btn_agregarI') {
    		this.pasarFiltro = 1;
    		this.$('#inputBusquedaI').trigger('keypress');
		};
		if ($(elemento.currentTarget).attr('id') == 'btn_agregarC') {
			this.pasarFiltro = 1;
			this.$('#inputBusquedaC').trigger('keypress');
		};
    },
	editando	: function () {
		if (this.$btn_editar
			.children()
			.attr('class') == 
			'icon-edit2 MO icon-back'
		) {
			this.$btn_editar.children().toggleClass('MO icon-back');
			this.$editarAtributo.toggleClass('editando');
			this.$('#cerrar_consulta').click();
			this.render();
			this.$('.icon-eye').click();
		} 
		else{
			console.log('else');
			this.cargarServiciosI();
			this.cargarServiciosC();
			this.$btn_editar.children().toggleClass('MO icon-back');
			this.$editarAtributo.toggleClass('editando');
		};
	},
	eliminarDelDOM	: function () {
		this.$el.remove();
	},
	visibilidad	: function() {
		// if (confirm('¿Deseas eliminar al cliente?')) {
			//El cierre del modal lo realiza bootstrap
			// console.log();
			this.model.cambiarVisibilidad();
			this.$('#cerrar_consulta').click();
			this.$el.remove();
		// };
	},
	cancelar	: function (elemento) {
		$(elemento.currentTarget)
		.parents('#advertencia')
		.children('.close')
		.click();
	},

	validarTelefono	: function (elemento) {
		// if(isNaN($(elemento.currentTarget).val().trim()) && $(elemento.currentTarget).val().trim() != '' ) {
		if(!(/^\d{10}$/.test($(elemento.currentTarget).val().trim()))) {// && $(elemento.currentTarget).val().trim() != '' 
			if ($(elemento.currentTarget).val() == '') return;
	        this.$('#alertasCliente #error #comentario')
	        .html('No ingrese letras u otros símbolos<br>Escriba 10 números<br>Establezca un tipo de teléfono');
	        this.$('#alertasCliente #error').removeClass('oculto');
	        $(elemento.currentTarget).focus();
	    	return true;
	    } else{
	    	// this.$tipoNuevo.focus();
	    };
	},
	validarPreenvioTelefono	: function (numero) {
		if( !(/^\d{10}$/.test(numero))) {
			this.$('#alertasCliente #error #comentario')
				.html('No ingrese letras u otros símbolos<br>Escriba 10 números<br>Establezca un tipo de teléfono');
			this.$('#alertasCliente #error').toggleClass('oculto');
			// this.$numeroNuevo.focus();
	    	return false;
	    }
	},
	validarPreenvioCorreo	: function (correo) {
		if( !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(correo)) ) {
			this.$('#alertasCliente #error #comentario')
				.html('No es un correo valido');
			this.$('#alertasCliente #error').toggleClass('oculto');
			// this.$numeroNuevo.focus();
	    	return false;
	    }
	},
	validarCorreo	: function (elemento) {
		// console.log('validación ',$(elemento.currentTarget).val());
		if( !(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(elemento.currentTarget).val().trim())) ) {
			this.$('#alertasCliente #error #comentario')
				.html('No es un correo valido');
			this.$('#alertasCliente #error').removeClass('oculto');
			// $(elemento.currentTarget).focus();
			return false;
	    };
	},
	validarPaginaWeb	: function (elemento) {
		// console.log($(elemento.currentTarget).attr('id'));
		if (!(this.$(elemento.currentTarget).val().trim().match(/^[a-z0-9\.-]+\.[a-z]{2,4}/gi)) ) {
		//   /\.[a-z0-9\.-]+\.[a-z]{2,4}/gi
		//   /^(http|https)\:\/\/[a-z0-9\.-]+\.[a-z]{2,4}/gi
			this.$('#alertasCliente #error #comentario')
				.html('URL invalida');
	        this.$('#alertasCliente #error').removeClass('oculto');
	        $(elemento.currentTarget).focus();
			return false;
		};
	},
	cerrarAlerta	: function (elemento) {
		$(elemento.currentTarget).parent().addClass('oculto');
	},



	
	verContactos	: function () {
		/*Desabilitamos los botones de eliminar y editar
		  para que el usuario entienda que ahora solo 
		  podrá editar a los contactos*/
		this.$btn_eliminar.toggleClass('disabled');
		this.$btn_editar.toggleClass('disabled');

		if (this.$divContactos.parent().attr('class') == 
			'visible oculto'
		) {
			// this.$divContactos.html(''); //Para el boton
			//CAMBIA LA IMAGEN DEL BOTON
			this.$btn_contactos.children().toggleClass('MO icon-back');
			/*Cargamos el dentro del contenedor mediante la
			  funcion agregarContactos solo si la clase del
			  contenedor es la especificada en la condición*/
			this.agregarContactos();
			this.agregarRepresentantes();
			/*Quitamos la clase oculto del contenedor para
			  que solo quede como visible mediante el 
			  toogleClass*/
			this.$panelBody.children().toggleClass('oculto');
		} else{
			//CAMBIA LA IMAGEN DEL BOTON
			this.$btn_contactos.children().toggleClass('MO icon-back');
			/*Limpiar el contenedor debido a la funcion append
			  que se ejecuta en la funcion agregarContacto()*/
			this.$divContactos.html('');
			/*Se agrega la clase oculto al contenedor para
			  regresar al conenedor del cliente*/
			this.$panelBody.children().toggleClass('oculto');
		};	
	},
	agregarContacto	: function (tipo, esDe, etiqueta) {
		var vista = new app.VistaContacto({model:tipo});
		this.$divContactos.prepend(vista.render().el);
		vista.establecerEtiqueta(etiqueta);
	},
	agregarContactos	: function () {
		/*Solo cuando se requiere ver los contactos
		  esto se crean. No al momento de crear al cliente*/
		var contactos = app.coleccionContactos.where( {
			idcliente:this.model.get('id')
		});		
		if (contactos != undefined) {
			this.recursividadContactos(contactos, 'Contacto');
		};

		// //OBTENER EL "title" DEL BOTON "conmutar"
		// var title = this.$btn_contactos.children().attr('title');
		
		// //CAMBIA EL "title"
		// if (title == 'Contactos') {
		// 	this.$btn_contactos.children().attr(
		// 		'title',
		// 		'Información'
		// 	);	
		// } else {
		// 	this.$btn_contactos.children().attr(
		// 		'title',
		// 		'Contactos'
		// 	);
		// };

		/*Formulario para nuevo contacto*/
		this.$formNuevoContacto = this.$('#formNuevoContacto');

		//Activar visibilidad de contenedor de contactos
		// this.$panelBody.children().toggleClass('oculto');
	},
	recursividadContactos	: function (tipo, etiqueta) {
		if (tipo.length) {
			for (var i = 0; i < tipo.length; i++) {
				this.recursividadContactos(tipo[i], etiqueta);
			};
		} else{
			if (tipo != '') {
				this.agregarContacto(
					tipo,
					tipo.get('idcliente'),
					etiqueta
				);
			};
		};
	},


	agregarRepresentante	: function (tipo, esDe, etiqueta) {
		var vista = new app.VistaRepresentante({model:tipo});
		this.$divContactos.prepend(vista.render().el);
		vista.establecerEtiqueta(etiqueta);
	},
	agregarRepresentantes	: function () {

		var representante = app.coleccionRepresentantes.where( {
			idcliente:this.model.get('id')
		});
		if (representante != undefined) {
			this.recursividadRepresentantes(representante,'Representante');
		};

		// //OBTENER EL "title" DEL BOTON "conmutar"
		// var title = this.$btn_contactos.children().attr('title');
		
		// //CAMBIA EL "title"
		// if (title == 'Contactos') {
		// 	this.$btn_contactos.children().attr(
		// 		'title',
		// 		'Información'
		// 	);	
		// } else {
		// 	this.$btn_contactos.children().attr(
		// 		'title',
		// 		'Contactos'
		// 	);
		// };

		/*Formulario para nuevo contacto*/
		this.$formNuevoContacto = this.$('#formNuevoContacto');

		//Activar visibilidad de contenedor de contactos
		// this.$panelBody.children().toggleClass('oculto');
	},
	recursividadRepresentantes	: function (tipo, etiqueta) {
		if (tipo.length) {
			for (var i = 0; i < tipo.length; i++) {
				this.recursividadRepresentantes(tipo[i], etiqueta);
			};
		} else{
			if (tipo != '') {
				this.agregarRepresentante(
					tipo,
					tipo.get('idcliente'),
					etiqueta
				);
			};
		};
	},

});


app.VistaClienteProyecto = app.VistaCliente.extend({
	tagName	: 'option',
	plantilla : _.template($('#plantilla_td_de_cliente').html()),
});
