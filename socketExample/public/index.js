$(() => {
    var socket = io();

    /** 
    * Emiters
    */
    // When user's nickname is submitted
    $("form#nickname-form").submit(() => {
        socket.emit("entered chatroom", $("input#nickname-input").val());
        $("div#nickname-div").hide();
        $("div#chat-div").show();
        return false;
    });
    
    // When user's chat message is submitted
    $("form#chat-form").submit(() => {
        $("#messages").append($("<li class='right'>").text($("#m").val()));
        socket.emit("chat message", $("#m").val());
        $("#m").val("");
        return false;
    });

    // When user starts typing
    $("form#chat-form").keydown(() => {
        socket.emit("typing", "user is typing...");
        return true;
    });

    /**
    * Listeners
    */
    // New chat message received
    socket.on("chat message", (msg) => {
        $("#messages").append($("<li>").text(msg));
    });

    // New connection to chat room
    socket.on("entered chatroom", (msg) => {
        $("#flashes").append($("<li>").text(msg));
        setTimeout(() => {
        $("#flashes > li").remove();
        }, 5000);            
    });
});