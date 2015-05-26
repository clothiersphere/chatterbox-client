// YOUR CODE HERE:
var app = {};
var url = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {
  // debugger;
  $('.username').on('click', function (){
    app.addFriend();

  })
  $("#send").on('submit', function (){
    app.handleSubmit();
  })
};


app.fetch = function (){
  var request = $.ajax({
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: you suck, but you were able to feth - like a dog.');
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

  var $username = '<div class = "username"> '+ message.username +  '</div>'
  var $text = '<div class = "messagetext"> '+ message.text + '</div>'
  var $roomname = '<div class = "roomname"> '+ message.roomname + '</div>'
  var $message = '<div class = "messagebody">'+ $username + $text + $roomname + '</div>'
  $('#chats').append($('<div>' + $message + '</div>'));

};

app.addRoom = function(roomName) {
  $('#roomSelect').append($('<div>' + roomName + '</div>'));
};

app.addFriend = function(){
};

app.handleSubmit = function (){
  // var val = $("input[type=submit][clicked=true]").val()
  var message = $('#message').val();
  debugger;
  app.send(message);


};

