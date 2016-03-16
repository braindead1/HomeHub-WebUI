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

$app->get('/Import', function () use ($app) {
    global $homematicIp;

    // Delete Cache
    $files = glob('cache/*');
    if(is_array($files)) {
        foreach($files as $file){
            if(is_file($file)) {
                unlink($file);
            }
        }
    }
    
    $exportFile = 'app/Config/export.json';

    // Create a backup of the existing export.json file
    if(file_exists($exportFile)) {
        if (!copy($exportFile, 'app/Config/export.json.bak')) {
            echo "copy $file schlug fehl...\n";
        }

        // Clear export.txt
        unlink($exportFile);
    }

    touch($exportFile);

    $export = array();
    
    $devicelistCgi = file_get_contents('http://' . $homematicIp . '/config/xmlapi/devicelist.cgi?show_internal=1');
    $devicesXml = simplexml_load_string($devicelistCgi);

    $statelistCgi = file_get_contents('http://' . $homematicIp . '/config/xmlapi/statelist.cgi?show_internal=1');
    $statesXml = simplexml_load_string($statelistCgi);

    $sysvarlistCgi = file_get_contents('http://' . $homematicIp . '/config/xmlapi/sysvarlist.cgi');
    $sysvarsXml = simplexml_load_string($sysvarlistCgi);

    $programlistCgi = file_get_contents('http://' . $homematicIp . '/config/xmlapi/programlist.cgi');
    $programsXml = simplexml_load_string($programlistCgi);

    // Devices
    foreach ($devicesXml->device as $device) {
        $dummy = array();
        foreach($device->attributes() as $attribute => $value) {
            $dummy[strval($attribute)] = strval($value);            
        }
        
        $statesXmlDevice = $statesXml->xpath('//device[@ise_id="' . strval($device['ise_id']) . '"]');
        if($statesXmlDevice[0]) {
            foreach($statesXmlDevice[0]->attributes() as $attribute => $value) {
                $dummy[strval($attribute)] = strval($value);
            }
        }

        $export['devices'][] = $dummy;
    }
    
    // Virtuelle Fernbedienung
    $device = $statesXml->xpath('//device[contains(@name, "HM-RCV-50")]');
    if(count($device) > 0) {
        $device = $device[0];
        
        $dummy = array(
            'name' => strval($device['name']),
            'address' => 'BidCos-RF',            
            'ise_id' => strval($device['ise_id']),
            'interface' => 'BidCos-RF',
            'device_type' => 'HM-RCV-50'
        );

        $export['devices'][] = $dummy;
    }
    
    // Channels
    $channelDevicesXml = $devicesXml->xpath('//channel');
    foreach ($channelDevicesXml as $channel) {
        $device = $devicesXml->xpath('//device[@ise_id="' . strval($channel['parent_device']) . '"]');
        $device = $device[0];
        
        $dummy = array();
        
        if(strval($device['interface']) <> 'CUxD') {
            $dummy['component'] = strval($device['device_type']);
        } else {
            $dummy['component'] = substr(strval($device['address']), 0, 7);
        }
        $dummy['parent_device_type'] = strval($device['device_type']);
        $dummy['parent_device_interface'] = strval($device['interface']);
        
        foreach($channel->attributes() as $attribute => $value) {
            $dummy[strval($attribute)] = strval($value);            
        }
        
        $channelStatesXml = $statesXml->xpath('//channel[@ise_id="' . strval($channel['ise_id']) . '"]');
        if($channelStatesXml[0]) {
            foreach($channelStatesXml[0]->attributes() as $attribute => $value) {
                $dummy[strval($attribute)] = strval($value);
            }

            foreach($channelStatesXml[0]->datapoint as $datapoint) {
                $dummy2 = array();
                foreach($datapoint->attributes() as $attribute => $value) {
                    $dummy2[strval($attribute)] = strval($value);
                }

                $dummy['datapoints'][] = $dummy2;
            }
        }

        $export['channels'][] = $dummy;
    }
    
    // Channels Virtuelle Fernbedienung
    $device = $statesXml->xpath('//device[contains(@name, "HM-RCV-50")]');
    if(count($device) > 0) {
        $device = $device[0];
        
        $channelXml = $statesXml->xpath('//device[@ise_id="' . strval($device['ise_id']) . '"]/channel');
        foreach ($channelXml as $channel) {
            $dummy = array();
            $dummy['component'] = 'HM-RCV-50';
            $dummy['parent_device_type'] = 'HM-RCV-50';
            $dummy['parent_device_interface'] = 'BidCos-RF';
            
            foreach($channel->attributes() as $attribute => $value) {
                $dummy[strval($attribute)] = strval($value);
            }

            foreach ($channel->datapoint as $datapoint) {
                $dummy2 = array();
                foreach($datapoint->attributes() as $attribute => $value) {
                    $dummy2[strval($attribute)] = strval($value);
                }

                $dummy['datapoints'][] = $dummy2;
            }

            $export['channels'][] = $dummy;
        }
    }
    
    // Systemvariablen
    foreach ($sysvarsXml->systemVariable as $sysvar) {
        $dummy = array();
        $dummy['component'] = 'SysVar';
        
        foreach($sysvar->attributes() as $attribute => $value) {
            $dummy[strval($attribute)] = strval($value);
        }
        $export['systemvariables'][] = $dummy;
    }
    
    // Programme
    foreach ($programsXml->program as $program) {
        $dummy = array();
        $dummy['component'] = 'Program';
        
        foreach($program->attributes() as $attribute => $value) {
            // Unstimmigkeit in der XML-API korrigieren
            if(strval($attribute) == 'id') {
                $dummy['ise_id'] = strval($value);
            } else {
                $dummy[strval($attribute)] = strval($value);
            }
        }
        $export['programs'][] = $dummy;
    }
    
    file_put_contents($exportFile, json_encode($export, JSON_UNESCAPED_UNICODE));
    
    $app->flashNow('info', 'Import done');
    $app->flashKeep();
    $app->redirect($app->request()->getRootUri());
});

$app->get('/(:selectedCat)', function ($selectedCat = 'Home') use ($app) {
    global $homematicIp;
    global $timerPeriod;
    global $channelNamePattern;
    global $channelNameReplacement;

    $appBase = $app->request()->getRootUri();
    if(substr($appBase, -9) <> 'index.php') {
        $appBase = $app->request()->getRootUri().'/index.php';
    }

    $customCss = false;
    if(file_exists('assets/css/custom.css')) {
        $customCss = true;
    }
    
    $customJs = false;
    if(file_exists('assets/js/custom.js')) {
        $customJs = true;
    }

    // json_decode Config files
    $categories = array();
    $menu = array();    
    if(file_exists('app/Config/categories.json')) {
        $str = file_get_contents('app/Config/categories.json');
        $json = json_decode($str, true);
        
        $menu = $json['categories'];
        
        $categories[] = array(
            'name' => $selectedCat,
            'display_name' => $selectedCat
        );
        $key = array_search($selectedCat, array_column($json['categories'], 'name'));
        if(is_int($key) && isset($json['categories'][$key]['subcategories'])) {
            foreach($json['categories'][$key]['subcategories'] as $subCategory) {
                // Display Name?
                if(!is_array($subCategory)) {
                    $categories[] = array(
                        'name' => $subCategory,
                        'display_name' => $subCategory
                    );
                } else {
                    if(!isset($subCategory['display_name'])) {
                        $categories[] = array(
                            'name' => $subCategory['name'],
                            'display_name' => $subCategory['name']
                        );
                    } else {
                        $categories[] = array(
                            'name' => $subCategory['name'],
                            'display_name' => $subCategory['display_name']
                        );
                    }
                }
            }
        }
    }
    
    $custom = array();
    if(file_exists('app/Config/custom.json')) {
        $str = file_get_contents('app/Config/custom.json');
        $json = json_decode($str, true);
        
        if(isset($json['custom'])) {
            $custom = $json['custom'];
        }
    }

    $mapping = array();
    if(file_exists('app/Config/mapping.json')) {
        $str = file_get_contents('app/Config/mapping.json');
        $json = json_decode($str, true);
        
        if(isset($json['mapping'])) {
            $mapping = $json['mapping'];
        }
    }
    
    $export = array();
    if(file_exists('app/Config/export.json')) {
        $str = file_get_contents('app/Config/export.json');
        $export = json_decode($str, true);
    }
    
    // Komponenten einlesen
    $components = array();
    if(count($export) > 0) {
        foreach($categories as $category) {
            // Custom?
            if(isset($custom[$category['name']])) {
                foreach($custom[$category['name']] as $customEntry) {
                    // Custom Komponente?
                    if(isset($customEntry['component'])) {
                        $components[$category['display_name']][] = $customEntry;
                    }

                    // Channel?
                    $key = array_search($customEntry['name'], array_column($export['channels'], 'name'));
                    if(is_int($key)) {
                        if($export['channels'][$key]['visible'] == true && isset($export['channels'][$key]['datapoints'])) {
                            $channel = $export['channels'][$key];                        
                            foreach($channel['datapoints'] as $datapoint) {
                                $channel[$datapoint['type']] = $datapoint['ise_id'];
                            }
                            unset($channel['datapoints']);

                            if(isset($customEntry['display_name']) && $customEntry['display_name'] <> '') {
                                $channel['name'] = $customEntry['display_name'];
                            }
                            $components[$category['display_name']][] = array_merge($customEntry, $channel);
                        }
                    }

                    // SysVar?
                    $key = array_search($customEntry['name'], array_column($export['systemvariables'], 'name'));
                    if(is_int($key)) {
                        if($export['systemvariables'][$key]['visible'] == true) {
                            $sysVar = $export['systemvariables'][$key];
                            
                            if(isset($customEntry['display_name']) && $customEntry['display_name'] <> '') {
                                $sysVar['name'] = $customEntry['display_name'];
                            }
                            $components[$category['display_name']][] = array_merge($customEntry, $sysVar);
                        }
                    }

                    // Program?
                    $key = array_search($customEntry['name'], array_column($export['programs'], 'name'));
                    if(is_int($key)) {
                        if($export['programs'][$key]['visible'] == true) {
                            $program = $export['programs'][$key];
                            
                            if(isset($customEntry['display_name']) && $customEntry['display_name'] <> '') {
                                $program['name'] = $customEntry['display_name'];
                            }                            
                            $components[$category['display_name']][] = array_merge($customEntry, $program);
                        }
                    }
                }
            }

            // Mapping?
            if(isset($mapping[$category['name']])) {
                foreach($mapping[$category['name']] as $mappingEntry) {
                    $mappingChannels = array_filter($export['channels'], function($channel) use ($mappingEntry) {
                        if($channel['component'] == $mappingEntry['name']) {
                            if(isset($channel['visible']) && $channel['visible'] === 'true') {
                                if(isset($channel['datapoints'])) {
                                    return true;
                                }
                            }
                        }
                    });
                    foreach($mappingChannels as $mappingChannel) {
                        foreach($mappingChannel['datapoints'] as $datapoint) {
                            $mappingChannel[$datapoint['type']] = $datapoint['ise_id'];
                        }
                        unset($mappingChannel['datapoints']);
                        $components[$category['display_name']][] = array_merge($mappingEntry, $mappingChannel);
                    }

                    $mappingSysVars = array_filter($export['systemvariables'], function($systemvariable) use ($mappingEntry) {
                        if($systemvariable['component'] == $mappingEntry['name']) {
                            if(isset($systemvariable['visible']) && $systemvariable['visible'] === 'true') {
                                return true;
                            }
                        }
                    });
                    foreach($mappingSysVars as $mappingSysVar) {
                        $components[$category['display_name']][] = array_merge($mappingEntry, $mappingSysVar);
                    }

                    $mappingPrograms = array_filter($export['programs'], function($program) use ($mappingEntry) {
                        if($program['component'] == $mappingEntry['name']) {
                            if(isset($program['visible']) && $program['visible'] === 'true') {
                                return true;
                            }
                        }
                    });
                    foreach($mappingPrograms as $mappingProgram) {
                        $components[$category['display_name']][] = array_merge($mappingEntry, $mappingProgram);
                    }
                }

                // Alphabetisch sortieren
                if(isset($components[$category['display_name']]) && count($components[$category['display_name']]) > 0) {
                    usort($components[$category['display_name']], function($a, $b) {
                        return strcmp($a['name'], $b['name']);
                    });
                }
            }
        }
    }
    
    $app->view()->set('selectedCat', $selectedCat);
    $app->view()->set('homematicIp', $homematicIp);
    $app->view()->set('timerPeriod', $timerPeriod);
    $app->view()->set('appBase', $appBase);
    $app->view()->set('customCss', $customCss);
    $app->view()->set('customJs', $customJs);
    $app->view()->set('menu', $menu);

    if(file_exists('app/Views/custom/'.strtolower($selectedCat).'.html')) {
        $app->render('custom/'.strtolower($selectedCat).'.html', array('components' => $components));
    } else {
        $app->render('index.html', array('components' => $components));
    }
});

$app->run();
