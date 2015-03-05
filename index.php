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

    //getting bookmarks from a html file (chrome)
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


//getting bookmarks from chrome default storage directly
//storage path on linux -> /home/user/.config/google-chrome/Default/Bookmarks
// $data = json_decode(file_get_contents('./Bookmarks'));

// $bookmarks = $data->roots->bookmark_bar->children;

// foreach($bookmarks as $b)
// {
//     $result[$b->name] = $b->url;
// }

// var_dump($result);

//getting bookmarks from firefox default storage
//storage path on linux -> /home/.mozilla/firefox/xxxxx.default/places.sqlite
// $db = new SQLite3('places.sqlite');
// $results = $db->query('Select moz_bookmarks.title, moz_places.url from moz_bookmarks join moz_places on moz_places.id=moz_bookmarks.fk');
// while ($row = $results->fetchArray())
// {
//     if(substr($row['url'], 0, 4) == 'http')
//     {
//         $test[$row['title']] = $row['url'];
//     }
// }

var_dump($test);
