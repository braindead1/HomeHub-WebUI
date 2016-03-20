<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

ini_set('max_execution_time', 180);

session_cache_limiter(false);
session_start();

require_once 'app/Config/config.php';

require_once 'vendor/autoload.php';
require_once 'vendor/slim/slim/Slim/Middleware/CacheMiddleware.php';
require_once 'app/Components/autoload.php';

$app = new \Slim\Slim(
    array(
        //'cache' => true,
        'debug' => true,
        'templates.path' => 'app/Views'
    )
);
$app->add(new \CacheMiddleware());

// Include routes
require_once 'app/Routes/import.php';
require_once 'app/Routes/display.php';

$app->run();
