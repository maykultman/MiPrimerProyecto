<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include 'api.php';
class  ServicioCotizado extends Api {

    public function __construct() 
    {
        parent::__construct();
        $this->load->model('Modelo_servicioCotizado', 'servCotizado');
    }

    public function api() 
    {
        $metodo = $this->request();
        $this->$metodo();
    }

    private function create()
    { 
        # La función ipost()... Recupera todos los post que viene desde la petición        
        $query = $this->servCotizado->insert_servicioCotizado($this->ipost());
        $this->pre_response($query, 'create');                  
    }

    private function get()
    {
       $query = $this->servCotizado->get_servicioCotizado($this->id()); 
       $this->pre_response($query, 'get'); 
    }

    // private function update($id)
    // {   
    //     $query = $this->servCotizado->patch_customer($id, $this->put());
    //     $this->pre_response($query, 'update');         
    // }

    // private function delete($id)
    // {
    //     $query = $this->servCotizado->delete_customer($id);
    //     $this->pre_response($query, 'delete'); 
    // }

} # Fin de la Claase Api_cliente

