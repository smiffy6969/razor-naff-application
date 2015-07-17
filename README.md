# Razor NAFF Application


__Browser Support__ - IE9+, Chrome, FF, Safari, Opera


Razor NAFF Application is a default application setup, a nice place to start when creating an application using naff and naff-components. This is supposed to help you in starting a complete new JS application complete with routing.


## Installation  


Download this zip, then run


```
bower install
```


This will pull in naff and all required dependencies, storing them in the correct location (components), alternatively alter the bower.json file to configure your app name etc.


## Usage


The folder structure is set to make it easier to separate your application from components you add in. Application folder is for your app, keep logic and style close to html using same names as per modular components, sorting your own app components and partials into their directories. Assets like json, configs and images can be placed inside assets, whilst components is purely for installed components (bower installs here). The main entry point is the index.html file, which subsequantly pulls in main app logic and style from application folder. From here on in, all other stuff can be pulled in via partials (in subs or flat), pulling in the deps as needed or in one swoop from index.html.


For more information on wahts next, please see razor-naff, razor-naff-components, and rivets...
