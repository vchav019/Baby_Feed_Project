# Baby_Feed_Project setup on Ubuntu 20.04


To get access to a video of how to setup the project you can follow the link: https://drive.google.com/file/d/1RjwU7Gz_O6SF9R-ZGgDfkoGxPYDtOcqa/view?usp=sharing


********************************************************************************************************************************************************************

At the moment of doing this guide the latest Ubuntu version is not supported by MongoDB. Ubuntu 20.04 does not have that compatibility issue.  

download ubuntu 20.04:		https://releases.ubuntu.com/20.04.4/?_ga=2.31656056.794909286.1653437146-943425287.1653437146
virtual machine windows:	https://www.vmware.com/go/downloadplayer

********************************************************************************************************************************************************************

to install vs code:


          1. open the terminal (ctrl + alt + t) and run the following code: 	sudo snap install --classic code 
          2. to run sv code on the terminal run:				code

********************************************************************************************************************************************************************

to install jdk:

          1. update the system:		sudo apt update
          2. install default jdk:	sudo apt install default-jdk
          3. to verify jdk version:	java -version


********************************************************************************************************************************************************************


to install mongodb:

            1. open the terminal: ctrl + alt + t
            2. run the following:

              sudo apt update
              sudo apt-get install gnupg
              wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
              echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
              sudo apt update
              sudo apt-get install -y mongodb-org


3. to check the status of MongoDB run the following:	sudo systemctl status mongod



						NOTE: ON THE SCREEN YOU WILL SEE: 

						mongod.service - MongoDB Database Server
						Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor prese>
						Active: inactive (dead)
      					Docs: https://docs.mongodb.org/manual

						NOTE: YOU NEED TO ACTIVE MONGODB.


	
3. to stop the process on the terminal:     ctrl + c

4. to active the mongodb:	      sudo systemctl enable mongod

5. to start mongodb:		  sudo systemctl start mongod

6. to check mongodb status:	      sudo systemctl status mongod

						

						NOTE: ON THE SCREEN YOU WILL SEE:

 						mongod.service - MongoDB Database Server
      					Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor prese>
     				 		Active: active (running) since Mon 2022-05-23 07:43:26 PDT; 22s ago
					      Docs: https://docs.mongodb.org/manual
					   	Main PID: 4858 (mongod)
					     	Memory: 60.3M
					     	CGroup: /system.slice/mongod.service
					             └─4858 /usr/bin/mongod --config /etc/mongod.conf

7. to stop the process on the terminal:     ctrl + c


********************************************************************************************************************************************************************

to install mongodb compass:

1. download MongoDB Compass:	  https://downloads.mongodb.com/compass/mongodb-compass_1.31.3_amd64.deb

2. run on an terminal:		  sudo apt install /home/val0dia/Downloads/mongodb-compass_1.31.3_amd64.deb

						NOTE: YOU NEED TO UPDATE THE PATH FOR YOUR DOWNLOADED FILE.

********************************************************************************************************************************************************************

to install Apache Maven:

1. download the following link:						https://archive.apache.org/dist/maven/maven-3/3.8.1/binaries/apache-maven-3.8.1-bin.tar.gz

2. open a new terminal: (ctrl + alt + t) and unzip the file to /opt: 	sudo tar xf /home/val0dia/Downloads/apache-maven-3.8.1-bin.tar.gz -C /opt


						NOTE: YOU NEED TO UPDATE THE PATH FOR YOUR DOWNLOADED FILE.

	
3. create a file named: maven.sh	

NOTE: IN YOUR COMPUTER YOUR PATH FOR JAVA MIGHT BE DIFFERENT. IN CASE OF THAT, YOU NEED TO UPDATE ACCORDINGLY.

*******************************************************	
	copy the following inside the file maven.sh:

		export JAVA_HOME=/usr/lib/jvm/default-java
		export M2_HOME=/opt/apache-maven-3.8.1 
		export MAVEN_HOME=/opt/apache-maven-3.8.1
		export PATH=${M2_HOME}/bin:${PATH}

***********************************************************

4. copy maven.sh file to the /etc/profile.d directory:	sudo cp /home/val0dia/Desktop/maven.sh /etc/profile.d/maven.sh

						NOTE: YOU NEED TO UPDATE THE PATH FOR YOUR maven.sh FILE.


5. make the script executable with:		sudo chmod 777 /etc/profile.d/maven.sh

6. load the environment variables using the source command:		 source /etc/profile.d/maven.sh

7. check version: 	mvn -version 


********************************************************************************************************************************************************************

to install Nodejs open a terminal and run:  

      1. sudo apt install curl
      2. curl -sL https://deb.nodesource.com/setup_12.x -o /tmp/nodesource_setup.sh
      3. sudo bash /tmp/nodesource_setup.sh
      4. sudo apt install nodejs
      5. node -v

********************************************************************************************************************************************************************

to install Angular open a terminal and run:

      1. sudo npm install -g @angular/cli@7.3

      2. ng --version

********************************************************************************************************************************************************************

to install github:

        1. sudo add-apt-repository ppa:git-core/ppa

        2. sudo apt update

        3. sudo apt install git

        4. git --version

        5. to config your github: 

              1. 	git config --global user.name "your_user_name"
              2. 	git config --global user.email "your_email@example.com"

6. to check the configuration:   git config --list

********************************************************************************************************************************************************************

if you wanna to use vs code's github tool open vs code:   ctrl + shift + g and follow the steps.

********************************************************************************************************************************************************************

install on vs code:

1. to open the Explorer ctrl + shift + E: 

      1. right click on ffq-authentication-service directory and click on Open in integrated Terminal and run ob the terminal: 

                   Note: step a. and b. for install. step b. only for rerunning the project. 

          1. 		npm install
          2. 		npm start  

      2. right click on ffq-food-item-service directory and click on Open in integrated Terminal and run ob the terminal: 
         
                    Note: step a. for install. step b. only for rerunning the project. 
    
          1. 		mvn spring-boot:run -Dspring-boot.run.arguments="mongo.fooditems.load=true"
          2. 		mvn spring-boot:run 

      3. right click on ffq-questionnaire-web directory and click on Open in integrated Terminal and run ob the terminal: 

                    Note: step a. and b. for install. After installing, step b. for rerunning the project. In addition, step c. is a better 
                    option fo rerun the project because it loads the project automatically on a browser.

           1. 		npm install
           2. 		npm start
           3. 		ng serve --open 

      4. right click on ffq-user-service directory and click on Open in integrated Terminal and run ob the terminal: 

                         Note: step a. for install. step b. only for rerunning the project.

            1. 		mvn spring-boot:run -Dspring-boot.run.arguments="mongo.users.load=true"
            2. 		mvn spring-boot:run

      5. right click on ffquestionnaire-service directory and click on Open in integrated Terminal and run ob the terminal: 

                           Note: step a. for install. step b. only for rerunning the project.

            1.		 mvn spring-boot:run -Dspring-boot.run.arguments="mongo.questionnaires.load=true"
            2. 		 mvn spring-boot:run

2. open MongoDbCompass and click on connect to load the database. Some part of the database does not load the data automatically so it needs to be added manually
3. once MongoDB Compass click on conect button.
4. click on database ffq_database and you should have the following collections otherwise most of them are at ffq-user-service\src\main\resources.
5. create the missing collections and add all the file available. You will find collections without any provided data. 

              
              Admin user Collection name: admins
              Clinician user Collection name: clinicians
              Clinic Collection name: clinics
              Parent user Collection name: parents
              Food description collection name: food_description
              Food Item collection name: food_items
              Nutrients Lists collection name: nutrient_lists
              Participants Collection name: participants
              Questionnaire Collection name: questionnaires
              Research institution Collection name: research_institution
              Researchers Collection name: researchers
              Results Collection name: results
              Sys Food Recommendations Collection name: sys_food_recommendations
              Sys Nutrients Recommendations Collection name: sys_nutrients_recommendations


6. The first time because you could not run step 3 => ng serve --open <= in the step 3. you need to open a browser and type the following
address - localhost:4200 -  to load project BabyFeed. 


