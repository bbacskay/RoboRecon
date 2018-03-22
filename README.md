# RoboRecon

This is a mobile app developed by Team 3489 (Category 5) to gather scouting data for FIRST Robotics Competition.

## Overview

RoboRecon is an app that runs on Android or iOS devices. This document refers to the devices as "tablets," though you may also be able to use large-screen phones, the app installed on Chromebooks with ChromeOS 53 or later installed, and possibly other devices. 

The app is built on the Ionic technology stack, and uses a MEAN stack on a Raspberry Pi (RPi) as a centralized server to capture and collate data that was entered on the tablets. The tablets are connected to an [8-port network switch](https://www.amazon.com/BLACK-LBS008A-USB-Powered-8-Port-Switch/dp/B0148J50EY) via [microUSB-to-Ethernet cables](https://www.amazon.com/UGREEN-Ethernet-Network-Nintendo-Micro-USB/dp/B00WM9LUN8/ref=sr_1_16), and the app that runs on the tablets connects to the RPi over the closed network. ("Closed network" refers to the fact that there is no Internet connection.)

The RPi hosts a MongoDB database and provides a [REST API](https://www.youtube.com/watch?v=7YcW25PHnAA) that the tablets interact with to push and pull data. A thumb drive is used to transport the data from the stands to the pit.

## History

RoboRecon is the third iteration of the mobile app that started out as [Cat5Scouting](http://cat5scouting.mobi), and then was morphed into [TheHindenburg](https://github.com/CarolinaKinetic/TheHindenburg). The first iteration used SQLite to store data on the six Android tablets that our scouting students used to capture data. That data was then exported to CSV files and imported into a spreadsheet for analysis. The second iteration, which was the first iteration that had students writing code for it, used [Firebase](https://firebase.google.com) to store data.

At the end of the 2017 FRC season, the codebase for TheHindenburg was released to a GitHub open source repository. Feel free to fork this repo if you'd like to try using Firebase as your datastore. Firebase worked well for us at regionals, but when we went to World's in Houston, we couldn't get a strong enough Internet connection and had to fall back to using paper scouting. (Ugh!)

## Open source contributions

One difference between the past two years and this year is that we've open-sourced the application code, and are keeping the application code open source as we move forward for the 2018 season. If you'd like to participate, there are different ways you can do so, including:

* Using the app without contributing code
* Forking the repository and adding your own code for your own use
* Forking the repository and contributing your code back to the code base for all to use

In addition to writing code and optionally contributing it to the code base, you can also:

* Submit bug reports and feature requests on GitHub
* Write or record video for tutorials for other teams to follow for how to set up the environment
* Share the questions that you will set up your copy of the app to ask

## Installation

Install the required dependencies with bower:
bower install

## Contact

To contact the Category 5 app development team to ask questions or provide feedback, there are several avenues:

* Find our contact information on our team web site, http://team3489.org
* Submit bugs and feature requests using our repository on GitHub
* Contact us through the app web site, http://scouting.mobi

