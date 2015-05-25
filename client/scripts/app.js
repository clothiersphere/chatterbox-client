// YOUR CODE HERE:
var app = {};
var url = 'https://api.parse.com/1/classes/chatterbox';

app.init = function() {
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
