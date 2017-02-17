$(() => {
    let socket = io();
    let typingTimeout = 0;

    /**
    * Listeners
    */
    // New connection to chat room
    socket.on("connect", () => {
        socket.on("entered chatroom", (user) => {
            $("#flashes").append($("<li>").text(user + " has joined!"));
            removeFirstFlash();
            const userRecord = $("<li class='list-group-item' id='" + user 
                + "'>");
            $("ul#active-users").append(userRecord.text(user));
        });

        // Get list of current actives (for newly-connected sockets)
        socket.on("populate actives", (activeUsers) => {
            activeUsers.forEach(appendToUserList);
        });

        // forEach helper
        const appendToUserList = (user) => {
            const userRecord = $("<li class='list-group-item' id='" + user 
                + "'>");
            $("#active-users").append(userRecord.text(user));
        };

        // New chat message received
        socket.on("chat message", (msg) => {
            $("#messages").append($("<li>").text(msg));
        });

        // User typing notification
        socket.on("user typing", (user) => {
            $("div#is-typing").show().text(user +  " is typing...");
            clearTimeout(typingTimeout);
            typingTimeout = (setTimeout(() => {
                $("div#is-typing").hide();
            }, 2000));
        });

        // User done typing notification (when form submitted)
        socket.on("typing finished", () => $("div#is-typing").hide());

        // User disconnects from chat room
        socket.on("disconnect notice", (user) => {
            $("#flashes").append($("<li>").text(user + " has left"));
            removeFirstFlash();
            $("ul#active-users li#" + user).remove();
        });

        /* Timeout Helpers */
        // Removes first flash from list in list after 5 seconds
        const removeFirstFlash = () => {
            setTimeout(() => {
                $("#flashes > li:first-child").remove();
                }, 5000);
        };
    });

   /** 
    * Emiters
    */
    // When user's nickname is submitted
    $("form#nickname-form").submit(() => {
        socket.username = $("input#nickname-input").val();
        socket.emit("entered chatroom", socket.username);
        $("div#nickname-div").hide();
        $("div#chat-div").show();
        return false;
    });
    
    // When user's chat message is submitted
    $("form#chat-form").submit(() => {
        socket.emit("done typing", socket.username);
        $("#messages").append($("<li class='right'>").text($("#m").val()));
        socket.emit("chat message", $("#m").val());
        $("#m").val("");
        return false;
    });

    // When user starts typing
    $("form#chat-form").keydown(() => {
        socket.emit("started typing");
        return true;
    });

    // When user stops typing
    $("form#chat-form").keyup(() => {
        socket.emit("finished typing", false);
        return true;
    });
});
