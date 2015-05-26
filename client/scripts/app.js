// YOUR CODE HERE:
$(document).ready(function (){
  var app = {};
  var url = 'https://api.parse.com/1/classes/chatterbox';

  app.init = function() {

    app.fetch();
    setInterval(app.clearMessages, 400000);
    setInterval(app.fetch, 500000);



    $(".submit").on('submit', function (e){
      e.preventDefault();

      var submittedMessage = $('#message').val();
      var username = $('#user').val();
      app.handleSubmit();
    });

    app.currentRoom = undefined;
    app.friends = [];

  };


  app.fetch = function (){
    $.ajax({
        type: 'GET',
        url: url,
        contentType: 'application/json',
        success: function(data) {
          console.log(data.results);
          _.each(data.results,function(message){app.addMessage(message)});
          console.log('chatterbox: you suck, but you were able to fetch - like a dog.');
        },
        error: function (data) {
          console.error('chatterbox: You failed - fetch is not a thing');
        }
    });
  };

  app.send = function(message) {
    var request = $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: you suck, but message was sent');
        console.log(data)
      },
      error: function (data) {
        console.error('chatterbox: You failed - at life');
      }

    });
  };

  app.clearMessages = function() {
    $('#chats').html('');
  };

  app.addMessage = function(message) {

    var username = '<div class = "username msg-part">'+ _.escape(message.username) +  '</div>'
    var text = '<div class = "messagetext msg-part">'+ _.escape(message.text) + '</div>'
    var roomname = '<div class = "roomname msg-part">'+ _.escape(message.roomname) + '</div>'
    var $message = $('<div class = "messagebody">'+ username + ': ' + text + ' -- from ' + roomname + '</div>');

    $message.find('.username').on('click', function (e){
      e.stopPropagation();
      var friendname = $(this).text();
      app.addFriend(friendname);
    });

    if (app.currentRoom){
      if (message.roomname !== app.currentRoom){
        $message.hide();
      }
    }
    if (_.contains(app.friends, message.username)) {
      $message.addClass('friend');
    };
    $('#chats').prepend($message);

  };

  app.addRoom = function(roomName) {
    $('#roomSelect').append($('<div>' + roomName + '</div>'));
  };

  app.addFriend = function(friendName){
    app.friends.push(friendName);
    app.refresh();
  };

  app.refresh = function(){
    app.clearMessages();
    app.fetch();
  };

  app.handleSubmit = function (){
    var message = $('#message').val();
    var username = $('#user').val() || "I suck."
    var roomname = $('#roomname').val();
    var dataToSend = {};
    dataToSend.text = message;
    dataToSend.username = username;
    dataToSend.roomname = roomname;
    app.currentRoom = roomname;




    app.send(dataToSend);
    app.refresh();
  };

  app.init();
});
