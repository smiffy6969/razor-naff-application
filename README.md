# Razor NAFF Application


__Browser Support__ - IE9+, Chrome, FF, Safari, Opera


Razor NAFF Application is a default application setup, a nice place to start when creating an application using naff and naff-components. This is supposed to help you in starting a complete new JS application complete with routing, backend DB (using RARS), authentication and basic tools for managing users via login authentication by registering users.


## Installation  


Download the latest release of this repository, extract to a place you wish to install razorNAFF.


Next go to [https://github.com/smiffy6969/rars] and download the latest release of the RARS PHP resource server, extract this to the same location as above (should be placed in a folder called 'rars').


Once you have these two things setup (naff-application for JS UI and rars for backend services), run the following in command line in the directory you unzipped the files to...


```
bower install
```


This will pull in naff JS files and all required dependencies, storing them in the correct location (components), alternatively alter the bower.json file to configure your app name etc.


The end result is razor-naff, razor-naff-components and required dependencies for JS UI and RARS for backend services (via REST/JSON to DB)


In order to use the RARS server, you will need to configure the index.php file in rars folder, setting all the config options to configure your DB, email settings etc, and then ensure the connecting DB has the correct required tables and columns as found in the RARS README file.


## Usage


The folder structure is set to make it easier to separate your application from components you add in. Application folder is for your app, keep logic and style close to html using same names as per modular components, sorting your own app components and partials into their directories. Assets like json, configs and images can be placed inside assets, whilst components is purely for installed components (bower installs here). The main entry point is the index.html file, which subsequantly pulls in main app logic and style from application folder. From here on in, all other stuff can be pulled in via partials (in subs or flat), pulling in the deps as needed or in one swoop from index.html.


For more information on wahts next, please see razor-naff, razor-naff-components, and rivets...
