<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include 'api.php';
class  Contratos extends Api {

    public function __construct() {
        parent::__construct();
        $this->load->model('Modelo_contract', 'contract');             
    }

    public function api() 
    {
        $metodo = $this->request();
        $this->$metodo();
    }

   private function create()
    {
        $query = $this->contract->create(  $this->ipost()  );
        $this->pre_response($query, 'create');                  
    }

    private function get()
    {
        $query = $this->contract->get( $this->id() ); 
        $this->pre_response($query, 'get'); 
    }

    private function update()
    {
        $query = $this->contract->save(  $this->id(), $this->put()  );
                 $this->pre_response  (  $query, 'update'           );
    }

    private function delete()
    {
        $query = $this->contract->destroy(  $this->id()  ); 
        $this->pre_response($query, 'delete'); 
    }   
} # Fin de la Clase Api_contacto