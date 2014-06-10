<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
include 'api.php';
class Escritorio extends Api {

	public function __construct() 
	{
        parent::__construct();
		$this->load->library('form_validation');
        $this->load->model('model_customer', 	     'customer');
        $this->load->model('model_contact', 	     'contacto');
        $this->load->model('modelo_servicios',       'serv');
        $this->load->model('model_phone', 		     'telefono');
        $this->load->model('modelo_representante',   'representa');
        $this->load->model('modelo_proyecto',        'proyecto');
        $this->load->model('modelo_proyectoRoles',   'proyectoRoles');
        $this->load->model('model_serviciosInteres', 'servInteres');
        $this->load->model('model_servicioCliente',  'servCliente');
        $this->load->model('model_rol',              'Roles');
        $this->load->model('modelo_usuarios',        'usuario');
        $this->load->model('modelo_empleado',        'empleado');
        $this->load->model('Model_budget',           'budget');
    }  

	//Vista inicial
	public function index(){  $this->area_Estatica('dashboard_gustavo');	} # Cargamos el dashboard
	public function dashboard(){  $this->area_Estatica('dashboard_gustavo');	} # Cargamos el dashboard
	public function prueba()
	{
		$this->load->view('pruebausuario');
	}

	public function catalogos()
	{
		$this->area_Estatica('modulo_catalogos');

		if($this->ruta() == 'catalogo_Servicios')
		{
			$data['servicios'] = $this->serv->get_s();
			$this->load->view($this->ruta(), $data);	
		}
		if($this->ruta() == 'catalogo_perfiles')
		{
			
			$this->load->view($this->ruta());	
		}
		if($this->ruta() == 'catalogo_permisos')
		{
			
			$this->load->view($this->ruta());	
		}
		if($this->ruta() == 'catalogo_empleados')
		{
			
			$this->load->view($this->ruta());	
		}


	}

	public function clientes()
	{	
		$this->area_Estatica('modulo_Clientes');  # Carga la vista por default + la vista del modulo

		if($this->ruta() == 'modulo_cliente_nuevo')
		{
			$this->datosCliente($this->ruta());
		}
		# TipoCliente= 'cliente o prospecto' y como los dos cargan los mismos datos entonces lo asignamos a una función
		# Y simplemente lo llamamos para que nos cargue los datos y la vista.
		
		if($this->ruta() == 'modulo_consulta_clientes')   {	$this->datosCliente($this->ruta());	}
		if($this->ruta() == 'modulo_consulta_prospectos') {	$this->datosCliente($this->ruta());	}		
	} # Fin del metodo clientes...

	public function datosCliente($vista)
	{
		$data['clientes']		  = $this->customer->get_customers($this->ruta());	# Lista de clientes
		$data['telefonos'] 		  = $this->telefono->get();					    # Lista de telefonos
		$data['servicios'] 		  = $this->serv->get_sNuevoCliente();              	# Lista de Servicios
		$data['serviciosInteres'] = $this->servInteres->get_servInteres();  		# Servicios de interes del cliente
		$data['serviciosCliente'] = $this->servCliente->get_servCliente();  		# servicios con los que cuenta el cliente
		$data['contactos']		  = $this->contacto->get();					# Lista Contactos
		$data['representantes']	  =$this->representa->get();					# List de representantes

		$this->load->view($vista, $data); # Cargamos la vista
	}

	public function proyectos()
	{
		$this->area_Estatica('modulo_proyectos');
		$data['clientes']    = $this->customer->get_customerProyect();	# Lista de clientes
		$data['empleados'] 	 = $this->empleado->get();  	# Proyectos
		$data['servicios'] 	 = $this->serv->get_Servicios_Proyecto();   # Servicios Relacionados con los proyectos
		$data['roles']		 = $this->Roles->get();  				# Lista de Roles.

		if($this->ruta() == 'modulo_proyectos_nuevo'){	$this->load->view($this->ruta(), $data);  }
		
		if($this->ruta() == 'modulo_proyectos_consulta')
		{
			$data['proyectoRoles'] = $this->proyectoRoles->getProyRol();	# Roles del personal en algún proyecto
			$this->load->view($this->ruta(), $data);			
		}
		if($this->ruta() == 'modulo_proyectos_cronograma')
		{
			$this->load->view($this->ruta());			
		}
	}

	public function cotizacion()
	{
		$this->area_Estatica('modulo_cotizaciones');
		$data['clientes']		  = $this->customer->get_customerProyect();	# Lista de clientes
		$data['servicios'] 		  = $this->serv->get_s();  	# Lista de Servicios
		$data['representantes']	  =$this->representa->get();					# List de representantes
		if($this->ruta() == 'modulo_cotizaciones_nuevo')
		{
			$this->load->view($this->ruta(), $data);
		}
		if($this->ruta() == 'modulo_cotizaciones_consulta')
		{   
			$data['cotizaciones'] = $this->budget->get();
			$this->load->view($this->ruta(), $data);
		}
	}

	public function contratos()
	{
		$this->area_Estatica('modulo_contratos');
		$data['clientes']		  = $this->customer->get_customers($this->ruta());	# Lista de clientes
		$data['servicios'] 		  = $this->serv->get_sNuevoCliente();              	# Lista de Servicios
		$data['representantes']	  =$this->representa->get_rep();					# List de representantes
		if($this->ruta() == 'modulo_contratos_nuevo')
		{
			$this->load->view($this->ruta());
		}
		if($this->ruta() == 'modulo_contratos_historial')
		{
			$this->load->view($this->ruta());
		}
	}

	public function post()
	{
		return $this->input->post();
	}

	public function facturas (){
		$this->area_Estatica('modulo_facturas');

	}

	public function actividades(){
		$this->area_Estatica('modulo_actividades');
	}

	public function usuarios(){
		$this->area_Estatica('modulo_usuarios');

		if($this->ruta() == 'modulo_usuarios_nuevo')
		{
			$this->load->view($this->ruta());
		}
		if($this->ruta() == 'modulo_usuarios_consulta')
		{
			$this->load->view($this->ruta());
		}
	}

	public function configuracion(){
		$this->area_Estatica('configuracion');
	}

}//FIN DE LA CLASE...
