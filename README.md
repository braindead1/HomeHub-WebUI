# HomeHub (Build 25)
HomeHub is an alternative frontend for Homematic. It's main focus is to give an overview of the used components and to give the possibility to quickly use components like shutters and heating.

## How to use HomeHub
HomeHub requires an installed XML-API on your CCU.

1. Copy HomeHub to a webserver in your LAN.
2. Check that $homematicIp in app/Config/config.php is correct.
3. Check that the folders app/Config and cache have 777 rights.
4. Open http://IP_OF_YOUR_SERVER/HomeHub in a browser.
5. A click on Import fetches all your devices, programs and systemvariables from your CCU.

## Requirements
* XML-API
* PHP 5
* libxml extension
* JavaScript

## Supported HomeMatic components (at least read)
* HM-CC-RT-DN
* HM-CC-SCD
* HM-CC-TC (to be validated)
* HM-CC-VD
* HM-Dis-TD-T (to be validated)
* HM-Dis-WM55
* HM-ES-PMSw1-Pl
* HM-ES-TX-WM
* HM-LC-Bl1-FM
* HM-LC-Bl1-SM (to be validated)
* HM-LC-Bl1PBU-FM
* HM-LC-Dim1PWM-CV (to be validated)
* HM-LC-Dim1T-CV (to be validated)
* HM-LC-Dim1T-FM
* HM-LC-Dim1T-Pl
* HM-LC-Dim1TPBU-FM
* HM-LC-RGBW-WM
* HM-LC-Sw1-Ba-PCB
* HM-LC-Sw1-FM
* HM-LC-Sw1-PB-FM
* HM-LC-Sw1-Pl-2
* HM-LC-Sw1-Pl-CT-R1
* HM-LC-Sw1-Pl-DN-R1 (to be validated)
* HM-LC-Sw1-Pl
* HM-LC-Sw1-SM (to be validated)
* HM-LC-Sw1PBU-FM
* HM-LC-Sw2-FM
* HM-LC-Sw4-Ba-PCB
* HM-LC-Sw4-DR (to be validated)
* HM-LC-Sw4-PCB
* HM-LC-Sw4-SM
* HM-LC-Sw4-WM
* HM-MOD-EM-8 (to be validated)
* HM-MOD-Re-8 (to be validated)
* HM-OU-CFM-Pl (to be validated)
* HM-OU-CM-PCB
* HM-OU-LED16
* HM-PB-2-FM (to be validated)
* HM-PB-2-WM
* HM-PB-2-WM55-2
* HM-PB-2-WM55 (to be validated)
* HM-PB-4-WM (to be validated)
* HM-PB-4Dis-WM
* HM-PB-6-WM55 (to be validated)
* HM-PBI-4-FM
* HM-RC-19-B
* HM-RC-19-SW
* HM-RC-19
* HM-RC-4-2 (to be validated)
* HM-RC-4-B
* HM-RC-4
* HM-RC-Dis-H-x-EU
* HM-RC-Key3-B (to be validated)
* HM-RC-Key4-2
* HM-RC-P1
* HM-RCV-50
* HM-SCI-3-FM
* HM-Sec-Key-S
* HM-Sec-Key
* HM-Sec-MDIR-2 (to be validated)
* HM-Sec-MDIR
* HM-Sec-RHS
* HM-Sec-SC-2
* HM-Sec-SC (to be validated)
* HM-Sec-SCo
* HM-Sec-SD-Team
* HM-Sec-SFA-SM
* HM-Sec-TiS (to be validated)
* HM-Sec-WDS (to be validated)
* HM-Sec-WDS-2
* HM-Sec-Win
* HM-Sen-DB-PCB (to be validated)
* HM-Sen-EP
* HM-Sen-MDIR-O-2 (to be validated)
* HM-Sen-MDIR-O (to be validated)
* HM-Sen-MDIR-SM (to be validated)
* HM-Sen-MDIR-WM55 (to be validated)
* HM-Sen-RD-O
* HM-Sen-Wa-Od
* HM-SwI-3-FM (to be validated)
* HM-TC-IT-WM-W-EU (to be validated)
* HM-WDC7000
* HM-WDS10-TH-O
* HM-WDS100-C6-O (to be validated)
* HM-WDS30-OT2-SM (to be validated)
* HM-WDS30-T-O (to be validated)
* HM-WDS40-TH-I-2
* HM-WDS40-TH-I (to be validated)
* HMW-IO-12-FM (to be validated)
* HMW-IO-12-Sw14-DR
* HMW-IO-12-Sw7-DR
* HMW-IO-4-FM
* HMW-LC-Bl1-DR
* HMW-LC-Dim1L-DR
* HMW-Sen-SC-12-DR
* Programs
* System variables

## Supported CUxD devices (at least read)
* CUX2801
* CUX2803
* CUX4000 (not fully supported)
* CUX9002

## Supported custom devices
* Tagesschau in 100 Sekunden
* Webcam (INSTAR IN5905HD)
* Audio (Radio Erft) NEW
* iFrame (HomeMatic-Forum) NEW

## How to configure the menu and the associated components in HomeHub
* In app/Config/categories.json you can configure the menu on the left hand side.
* app/Config/mapping.json is used to map component types like HM-CC-RT-DN to menu items.
* In app/Config/custom.json you can map specific components like HM-CC-RT-DN in your living rooom to menu items.

## How to change the look of HomeHub
If you want to change the look and feel of HomeHub you can change it by editing assets/css/custom.css.

It is also possible to change the complete layout for a specific category by creating a HTML file for that category and save it as app/Views/lowercase_category_name.html.