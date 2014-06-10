<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include 'api.php';
class  Facturas extends Api {

	public function __construct() {
        parent::__construct();
        $this->load->model('Model_factura', 'factura');             
    }

    public function api() {

        # Con esta funcion obtnemos el id de la petición.
        # get(), update(), delete()
        $id = $this->uri->segment(2);      

    	switch ($this->metodo()) {
    		case 'post':
    			$this->insert_factura();
    			break;
    		case 'get':
    			$this->get_facturas($id);
    			break;	
    		case 'put':
                 $this->update_factura($id);
    			break;	
    		case 'delete':
    			$this->delete_factura($id);
    			break;
    		default:
    			$this->response('',405);
    			break;
    	}

    }
    
    private function insert_factura(){

        # Con $this->inpost() recuperamos las variables post y lo enviamos al modelo...
        $post = $this->ipost();         
        $query = $this->phone->insert_fact($post);
        # $query regresa true o false y con esto enviamos un codigo de respuesta al cliente...
        ($query) ? $this->response($query, 201) : $this->response($query, 406);
    }

    private function get_facturas($id){

    	$query = $this->phone->get_fact($id);                        
    	($query) ? $this->response($query, 302) : $this->response($query, 404);
    	
    }

    private function update_factura($id){

        $put = $this->put();
    	$query = $this->phone->update_fact($id, $put);
        ($query) ? $this->response($query, 200) : $this->response($query, 204);        
    }

    private function delete_factura($id){

    	$query = $this->phone->delete_fact($id);    	
        ($query)? $this->response($query, 200) : $this->response($query, 406);        
    }

} # Fin de la Clase Facturas