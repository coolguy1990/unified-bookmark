<?php
header('Content-type: text/html; charset=utf-8');

require_once 'vendor/autoload.php';


Class Bookmark
{
    protected $url;

    public function __construct($url)
    {
        $this->url = $url;
    }

    public function xyz()
    {
        $data = file_get_html($this->url);
        $regex = '/^(https?:\/\/)';
        $datas = array();
        $anchors = array();

        foreach($data->find('a') as $d)
        {
            if(substr($d->href, 0, 4) == 'http')
            {
                $datas[$d->innertext] = $d->href;
            }
        }

        return $datas;
    }
}

$data = new Bookmark('path/to/html/file');

var_dump($data->xyz());
