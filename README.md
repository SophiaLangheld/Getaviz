﻿# Getaviz

Getaviz is a toolset for designing, generating, and exploring software visualizations in 2D, 3D, and virtual reality (VR), supporting structural, behavioral and evolutional visualizations. An **online demo** of Getaviz you can find [here](https://home.uni-leipzig.de/svis/getaviz/index.php?setup=web/RD%20freemind&model=RD%20freemind).

## Features
* Supported languages: Java, Ruby, and C#  
* Supported version control systems: git and svn  
* Supported output formats: X3D, X3DOM, A-Frame  
* Supported visualization metaphors: 
  * Recursive Disk
  * City, City Bricks, City Floors, City Panels
  * Plant
  * MultiSphere
  * …
  
An academic publication about Getaviz you can find [here](https://www.researchgate.net/publication/320083290_GETAVIZ_Generating_Structural_Behavioral_and_Evolutionary_Views_of_Software_Systems_for_Empirical_Evaluation).

## Build Status

* Master branch  
![master](https://app.codeship.com/projects/f2dddd10-dab6-0135-41df-0efc1b114958/status?branch=master)

## Development Team

### Main Contributors

Getaviz is developed by the research group [Visual Software Analytics](https://home.uni-leipzig.de/svis/) at Leipzig University. It has been developed over several years and is the basic for many scientific publications. In 2018 we released Getaviz as open source to simplify collaboration and practical use of our research prototype. 

Currently, four developers are contributung actively to Getaviz:
* [Richard Müller](https://github.com/rmllr)
* Jan Schilbach
* Pascal Kovacs
* [David Baum](https://www.wifa.uni-leipzig.de/en/information-systems-institute/se/chair/david-baum.html)

Have a look at our [website](https://home.uni-leipzig.de/svis/) for more information about our research group, visualization examples, and our publications. We are looking for collaborations with researchers and developers/companies. If you are interested, please contact us via email.

### Further Contributors

Many thanks to all the contributors who have improved Getaviz by implementing new features or fixing bugs, especially:

* Denise Zilch
* André Naumann
* [Stefan Faulhaber](https://github.com/StefanFaulhaber)
* [Dan Häberlein](https://github.com/dhaeb)
* Lisa Vogelsberg

## How do I get set up? ###

The recommended way is **not** to clone this repository, but to follow the instructions under [Installation & Setup](../../wiki/Installation-&-Setup).
Each subdirectory of this repository represents a standalone component of Getaviz. It contains a separate README.md with further instructions and documentation.

## Docker ##

Getaviz can also be run via Docker. We provide containers via Docker Hub.
* Evaluation server: https://hub.docker.com/r/getaviz/evaluationserver/
* User Interface: https://hub.docker.com/r/getaviz/ui/

## Wiki

Please have a look at our [Wiki](../../wiki/Home) which contains many additional information. However, documentation is still incomplete. Feel free to open an issue if you have any question!
