var Browser = require('zombie'),
    assert = require('assert');

var options = {
    waitDuration: '15s',
    loadCSS: false,
    maxRedirects: 30
};

var titlecontent = '';

// Wait until map is loaded
function footerLoaded(window) {
    return window.document.querySelector("#landing-footer");
}

function login(username, password, callback) {
        var browser = Browser.create(options);
        browser.visit('https://www.fitocracy.com/accounts/login/?next=/home/', function(error) {
            browser.on('loaded', function(loadedbrowser) {
                console.log('loaded: ', loadedbrowser.location.href);
            });
            console.log(browser.errors);
            browser.wait(footerLoaded, function() {
                browser
                    .fill('#username-login-username', username)
                    .fill('#username-login-password', password)
                    .fill('input[name="next"]', '/home/')
                    .pressButton('#username-login-submit', function(error2) {
                        browser.wait(10000, function() {
                            titlecontent = JSON.parse(browser.text('body'));
                            //console.log("title content:", titlecontent);
                            //console.log('user id:', titlecontent.id);
                            browser.location.href = 'https://www.fitocracy.com/home/';
                            browser.wait(10000, function() {
                                //console.log('href', browser.location.href);
                                callback(titlecontent.id,browser);
                            });
                        });
                    });
            });
        });

    }
exports.getActivities = function(username, password, callback) {
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/get_user_activities/' + userid;
        browser.wait(10000, function() {
            var activities = JSON.parse(browser.text('body'));
            //console.log('activities body', activities);
            callback(activities);
            browser.close();
        });
    });
};

exports.getActivityHistory = function(username,password,activityid,callback) {
    //'https://www.fitocracy.com/_get_activity_history_json/?activity-id='+activies[X].id
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/_get_activity_history_json/?activity-id=' + activityid;
        browser.wait(10000, function() {
            var activity = JSON.parse(browser.text('body'));
            //console.log('activity body', activity);
            callback(activity);
            browser.close();
        });
    });
};

exports.getUserQuests = function(username,password,callback) {
    //'https://www.fitocracy.com/get-user-quests/?user='+userid  //quests are not in json format
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/get-user-quests/?user=' + userid;
        browser.wait(10000, function() {
            //these are in an html format... need to parse
            console.log('bodytext',browser.text('body'));
            callback(null);
            browser.close();
        });
    });
};

exports.getUserAchievements = function(username,password,callback) {
    //'https://www.fitocracy.com/get-user-achievements/?user='+userid  //achievements are not in json format
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/get-user-achievements/?user=' + userid;
        browser.wait(10000, function() {
            //these are in an html format... need to parse
            console.log('bodytext',browser.text('body'));
            callback(null);
            browser.close();
        });
    });
};

exports.getUserFriends = function(username, password, callback) {
    //'https://www.fitocracy.com/get-user-friends/?user='+username //friends is in json, but uses username, not id
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/get-user-friends/?user=' + username;
        browser.wait(10000, function() {
            var friends = JSON.parse(browser.text('body'));
            console.log('friends body', friends);
            callback(friends);
            browser.close();
        });
    });
};

exports.getActivityStream = function(username,password,callback) {
    //'https://www.fitocracy.com/activity_stream/0/?user_id='+userid+'&types=WORKOUT' //not in json //0 refers to activities?
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/activity_stream/0/?user_id='+userid+'&types=WORKOUT';
        browser.wait(10000, function() {
            //these are in an html format... need to parse
            console.log('bodytext',browser.text('body'));
            callback(null);
            browser.close();
        });
    });
};

exports.getFeed = function(username,password,callback) {
    //'https://www.fitocracy.com/activity_stream/15/?user_id='+userid+'&types=WORKOUT' //not in json //15 refers to feed?
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/activity_stream/15/?user_id='+userid+'&types=WORKOUT';
        browser.wait(10000, function() {
            //these are in an html format... need to parse
            console.log('bodytext',browser.text('body'));
            callback(null);
            browser.close();
        });
    });
};

exports.getWorkouts = function(username, password, callback) {
    //'https://www.fitocracy.com/api/v2/user/'+userid+'/workouts/recent/' //json
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/api/v2/user/'+userid+'/workouts/recent/';
        browser.wait(10000, function() {
            var workouts = JSON.parse(browser.text('body'));
            console.log('workouts body', workouts);
            callback(workouts);
            browser.close();
        });
    });
};

exports.getWorkout = function(username, password, workoutdate, callback) {
    //'https://www.fitocracy.com/api/v2/user/'+userid+'/workouts/2014-10-29/?timezone_offset=-4' //json //workouts from specific day in YYYY-MM-DD format
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/api/v2/user/'+userid+'/workouts/'+workoutdate+'/?timezone_offset=-4';
        browser.wait(10000, function() {
            var workouts = JSON.parse(browser.text('body'));
            console.log('workouts body', workouts);
            callback(workouts);
            browser.close();
        });
    });
};

exports.getWorkoutDates = function(username, password, startdate, enddate, callback) {
    //'https://www.fitocracy.com/api/v2/user/555068/workouts/?start_date=2014-09-28&end_date=2014-11-01&ids_and_names_only=1&timezone_offset=-4'
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/api/v2/user/555068/workouts/?start_date='+startdate+'&end_date='+enddate+'&ids_and_names_only=1&timezone_offset=-4';
        browser.wait(10000, function() {
            var workouts = JSON.parse(browser.text('body'));
            console.log('workouts body', workouts);
            callback(workouts);
            browser.close();
        });
    });
};

exports.getStream = function(username, password, callback) {
    //'https://www.fitocracy.com/stream_facepile/'  //stream, json
    login(username,password,function(userid,browser){
        browser.location.href = 'https://www.fitocracy.com/stream_facepile/';
        browser.wait(10000, function() {
            var stream = JSON.parse(browser.text('body'));
            console.log('stream body', stream);
            callback(stream);
            browser.close();
        });
    });
};