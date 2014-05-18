var color = $(".selected").css("background-color");
var $canvas = $("canvas");
//Select the first, only canvas element. Select the actual HTML element using the array syntax [index], get the 2d context.
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;

//When clicking control list items
$(".controls").on("click", "li", function() {
    //deselect sibling elements
    $(this).siblings().removeClass("selected");
    //select clicked element
    $(this).addClass("selected");
    //cache current color here
    color = $(".selected").css("background-color");
    console.log("selected color = " + color);
});

//When "New Color" is pressed
$("#revealColorSelect").click(function() {
    //show or hide color select
    changeColor();
    $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
    var r = $("#red").val();
    var g = $("#green").val();
    var b = $("#blue").val();
    var a = $("#alpha").val() / 100;

    $("#newColor").css("background-color", "rgba(" + r + "," + g + "," + b + "," + a + ")");
    console.log($("#newColor").css("background-color"));

}

//When color sliders change
$("input").change(changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function() {
    //append the color to the controls ul
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    //select the new color
    $newColor.click();
});

//On mouse events on the canvas
$canvas.mousedown(function(e) {
    lastEvent = e;
    mouseDown = true;

}).mousemove(function(e) {
    if (mouseDown) {
        //Draw lines
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        context.strokeStyle = color;
        context.stroke();
        lastEvent = e;
    }
}).mouseup(function() {
    mouseDown = false;
}).mouseleave(function() {
    $canvas.mouseup();
});