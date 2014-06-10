<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include 'api.php';
class  Contacto extends Api {

	public function __construct() 
    {
        parent::__construct();
        $this->load->model('Model_contact', 'contact');             
    }

    public function api() 
    {   
        $metodo = $this->request(); # El metodo request() hace un switch al metodo de petición
        $this->$metodo();           # y la variable $metod según la respuesta del switch es create, get, update, delete
    }

    private function create()
    {
        $query = $this->contact->create(  $this->ipost()  );
        $this->pre_response($query, 'create'); 
    }

    private function get()
    {
        $query = $this->contact->get( $this->id() );
        $this->pre_response($query, 'create'); 
    }

    private function update()
    {
        $query = $this->contact->save(  $this->id(), $this->put()  );
         $this->pre_response($query, 'create');        
    }

    private function delete()
    {
        $query = $this->contact->delete(  $this->id()  ); 
        $this->pre_response($query, 'create');         
    }   
} # Fin de la Clase Api_contacto