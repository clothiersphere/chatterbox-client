// YOUR CODE HERE:
$(document).ready(function (){
  var app = {};
  var url = 'https://api.parse.com/1/classes/chatterbox';

  app.init = function() {

    app.fetch();
    setInterval(app.clearMessages, 4999);
    setInterval(app.fetch, 5000);

    $('.username').on('click', function (){
      app.addFriend();
    });

    $(".submit").on('submit', function (e){
      e.preventDefault();

      var submittedMessage = $('#message').val();
      var username = $('#user').val();
      console.log(username);
      console.log(submittedMessage);
      app.handleSubmit();
    });

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
    // debugger;
    console.log(message);
    var request = $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(
        message
        // text: message,
        // username: window.location.href.split("username=")[1],
        // roomname: "I'm not Edwin.com"
      ),
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

    var $username = '<div class = "username msg-part"> '+ _.escape(message.username) +  '</div>'
    var $text = '<div class = "messagetext msg-part"> '+ _.escape(message.text) + '</div>'
    var $roomname = '<div class = "roomname msg-part"> '+ _.escape(message.roomname) + '</div>'
    var $message = '<div class = "messagebody">'+ $username + ': ' + $text + ' -- from ' + $roomname + '</div>'
    $('#chats').prepend($('<div>' + $message + '</div>'));

  };

  app.addRoom = function(roomName) {
    $('#roomSelect').append($('<div>' + roomName + '</div>'));
  };

  app.addFriend = function(){
  };

  app.handleSubmit = function (){
    var message = $('#message').val();
    var username = $('#user').val() || "I suck."
    var dataToSend = {};
    dataToSend.text = message;
    dataToSend.username = username;
    dataToSend.roomname = "whatever";

    app.send(dataToSend);
  };

  app.init();
});
