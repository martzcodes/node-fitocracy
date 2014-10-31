var fito = require('./index.js'),
	config = require('./config.js');
/*
fito.getActivites(config.username,config.password,function(activities){
	console.log('data',activities);
});

fito.getActivityHistory(config.username,config.password,481,function(activity){
	console.log('activity',activity);
});

fito.getUserFriends(config.username, config.password, function(friends){
	console.log('friends',friends);
});

fito.getWorkouts(config.username, config.password, function(workouts){
	console.log('workouts',workouts);
});

fito.getWorkout(config.username, config.password, '2012-09-20', function(workout){
	console.log('workout',workout);
});

fito.getWorkoutDates(config.username, config.password, '2012-09-12', '2012-09-21', function(workouts){
	console.log('workouts',workouts);
});

fito.getUserPoints(config.username, config.password, function(points){
	console.log('points',points);
});

fito.getUserQuests(config.username,config.password,function(quests){
	console.log('quests',quests);
});

fito.getUserAchievements(config.username,config.password,function(achievements){
	console.log('achievements',achievements);
});
*/

fito.getStream(config.username, config.password, function(stream){
	console.log('stream',stream);
});

////////////////////////////////////////////////////////
//INCOMPLETE BELOW HERE
////////////////////////////////////////////////////////

/*
fito.getActivityStream(config.username,config.password,function(activitystream){
	console.log('activitystream',activitystream);
});

fito.getFeed(config.username,config.password,function(feed){
	console.log('feed',feed);
});
*/