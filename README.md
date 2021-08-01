# TollRoad
## Final Project in Big Data course

To run the program on the localhost in Windows:

1. install npm.
2. install from [redis site](https://hub.docker.com/_/redis) the redis image.
3. run Redis image on Docker with the 6379 port.
4. run command `$ node app.js` or `$ npm start` in the program terminal.
5. go to http://localhost:3000 and have fun 😊🚗

• The system will enable the management of sections of the toll road, 5 sections in which vehicles enter and exit regularly.

We built a simulator that simulates a toll road with details of vehicles that enter and exit the road,
such as: entrance section, type of vehicle, day of the week, etc ..

The simulator sends the data to Kafka who creates a message queue of the vehicles, Kafka routes the information to MongoDB and Redis,
When the Redis shows us the vehicles that are in real time on the road and their movement and the MongoDB keeps all the vehicles driving on the road in total.

In the dashboard we will display the information taken from the Redis that run on the Docker.

The data from MongoDB will be taken and saved in a csv file that will be sent to bigML which we will use to create a learning model which will give us the prediction of the exit section of each vehicle.

http://localhost:3000/fetch will be create a new csv file for a new model.

• At any moment you can know the number of vehicles in each section.

![image](https://user-images.githubusercontent.com/57085913/127770248-096ded91-5bc3-457f-97a5-f3e0c97d3c01.png)

• The system display on a dashboard the current number of vehicles and will allow you to request a breakdown of the list of vehicles.

![image](https://user-images.githubusercontent.com/57085913/127770272-c264840e-84c8-4267-b7e3-65d0d4e62eaf.png)

• There is also an option to see how many vehicles there are on the road by brands at any given moment.

![image](https://user-images.githubusercontent.com/57085913/127770345-98955cce-9967-4573-a7b1-9dafe6b026a5.png)

• There is also an option to see how many vehicles there are on the road by types at any given moment.

![image](https://user-images.githubusercontent.com/57085913/127770413-f9b08169-e685-43a5-9124-2e5f0670bc7d.png)

• There is also an option to see how many vehicles there are on the road by days at any given moment.

![image](https://user-images.githubusercontent.com/57085913/127770429-ad96b118-d470-40de-ba26-2a615a0096c0.png)

• Kafka (example):

![image](https://user-images.githubusercontent.com/57085913/126963582-74a6c34f-77ae-46aa-8390-c2c7e2cafd50.png)

• MongoDB (examle):

![image](https://user-images.githubusercontent.com/57085913/126963373-3e81fdf1-60e5-43da-8909-b6264629e12d.png)


• The system build a decision model based on a decision tree with bigML: given the details of the road section, brand of the vehicle, day of the week and time
vehicle entry, a prediction will be made about which section the vehicle will exit. 

• bigML decision tree:

![image](https://user-images.githubusercontent.com/57085913/126952343-d7b91dd5-7f71-48ed-a84b-19d70c8c59b0.png)

 • Matrix Confusion:
 
![image](https://user-images.githubusercontent.com/57085913/126952507-9dfa142a-7acc-4451-9938-d7b476b8fe32.png)

## Diagram showing technological mapping of the system:

![image](https://user-images.githubusercontent.com/57085913/126953012-dc549c5c-d52e-4acd-8ffe-5f3297b9a4a4.png)

