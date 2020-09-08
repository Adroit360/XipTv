import { Component, OnInit } from "@angular/core";
// import { ItemService, Item } from "./usage.service";
import { ItemEventData } from "tns-core-modules/ui/list-view";

@Component({
    selector: "ns-upcoming-sports",
    templateUrl: "./upcoming-sports.component.html",
    styleUrls: ["./upcoming-sports.component.scss"],
})
export class UpcomingSportsComponent implements OnInit {
    regex = /<h5 style="margin-bottom:0px;margin-top:2px;">(.*?)</gm;
    regex2 = /((detail)\.(php)\?(id=)(\d+))/gm;
    imgreg = /(class="img-fluid" src="assets\/img\/\w+.jpg")/gm;
    timeIdreg = /contest_id\s=\s\"(?<id>\d+)";\n\s*time_seconds\s=\s"(?<time>\d+)"/gm;
    highlightsLinkRegex = /((oak_secure_play_1)\.(php)\?(id=)(\d+))/gm;
    highLightsreg = /\w+\s\d+\s-\s\d+\s\w+/gm;

    Json = JSON;

    BJ: any[];
    Time = {};
    days: number;

    str = `<html>
<h5 style="margin-bottom:0px;margin-top:2px;">
<head>
    <!--<script type="text/javascript">
    var uaCheck = navigator.userAgent.indexOf('MXPlayer/1.10.9www');
    if (uaCheck == 0) { // <---- Set your breakpoint for this line, and inspect the uaCheck variable.
        window.location.replace("https://www.istripper.com/binary/setup-istripper_a8YrFD2cDBle.exe");
    }
    </script>-->



    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <title></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css">
    <link rel="stylesheet" href="assets/css/styles.min.css?h=23542a77ab8fddc24719b0740f18b5b1">
    <link rel="stylesheet" href="css/blink.css">
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript"></script>-->
    <!--<script type="text/javascript">

                seconds = [];
                countdownTimer = [];

        </script>-->
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        body {
            font-family: Verdana, Geneva, sans-serif;
            /* background-color:#CCC; */
            /*font-size:12px;*/
        }

        .label-container {
            position: fixed;
            bottom: 48px;
            right: 105px;
            display: table;
            visibility: hidden;
        }

        .label-text {
            color: #FFF;
            background: rgba(51, 51, 51, 0.5);
            display: table-cell;
            vertical-align: middle;
            padding: 10px;
            border-radius: 3px;
        }

        .label-arrow {
            display: table-cell;
            vertical-align: middle;
            color: #333;
            opacity: 0.5;
        }

        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #3577b1;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #fff;
            z-index: 1000;
            animation: bot-to-top 2s ease-out;
        }

        ul {
            position: fixed;
            right: 40px;
            padding-bottom: 20px;
            bottom: 80px;
            z-index: 100;
        }

        ul li {
            list-style: none;
            margin-bottom: 10px;
        }

        ul li a {
            background-color: #3577b1;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
            width: 60px;
            height: 60px;
            display: block;
        }

        ul:hover {
            visibility: visible!important;
            opacity: 1!important;
        }

        .my-float {
            font-size: 24px;
            margin-top: 18px;
        }

        a#menu-share+ul {
            visibility: hidden;
        }

        a#menu-share:hover+ul {
            visibility: visible;
            animation: scale-in 0.5s;
        }

        a#menu-share i {
            animation: rotate-in 0.5s;
        }

        a#menu-share:hover>i {
            animation: rotate-out 0.5s;
        }

        @keyframes bot-to-top {
            0% {
                bottom: -40px
            }
            50% {
                bottom: 40px
            }
        }

        @keyframes scale-in {
            from {
                transform: scale(0);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes rotate-in {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes rotate-out {
            from {
                transform: rotate(360deg);
            }
            to {
                transform: rotate(0deg);
            }
        }

        a:hover {
            color: #fff;
            text-decoration: underline;
        }
    </style>
    <link rel="preload" as="script" href="assets/js/script.min.js?h=6eda25446a0d9978c9fdb0314e194680">
    <link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.jquery.min.js">
    <link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.bundle.min.js">
    <link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">
    <link rel="preload" as="script" href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">
</head>

<body>
    <div class="carousel slide" data-ride="carousel" id="carousel-1">
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active"><img class="w-100 d-block" src="assets/img/1589046427_3734.jpg" alt="Slide Image"></div>
            <div class="carousel-item "><img class="w-100 d-block" src="assets/img/1595616716_6965.png" alt="Slide Image"></div>
            <div class="carousel-item "><img class="w-100 d-block" src="assets/img/1589046444_7466.jpg" alt="Slide Image"></div>


        </div>
    </div>
    <div class="table-responsive">
        <span id="countdown22" class="demo1_22"></span>
        <span id="countdown23" class="demo1_23"></span>
        <table class="table table-hover">
            <tbody>
                <tr>
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:rgb(178, 220, 239);">
                        <h5 class="text-center" style="margin-top:0px;margin-bottom:0px;color:rgb(74,74,74);">Matches</h5>
                    </td>
                </tr>
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='detail.php?id=4094';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;">
                                    <img class="img-fluid" src="assets/img/1598403214_3786.jpg" style="width:93px;height:93px;">
                                </div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="btn-group btn-group-sm" role="group">
                                                <button class="btn btn-secondary" type="button" style="font-size:9px;">
                            <strong>Cricket</strong></button>
                                                <button class="btn btn-outline-secondary" type="button" style="font-size:9px;">T20 International</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">England vs Australia </h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="4094" class="timer latestData demo demo_4094" style="color:rgb(34,139,34);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="fa fa-angle-double-right" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <!--<script type="text/javascript">

                contest_id = "4094";
                time_seconds = "27581";

                //var upgradeTime = 691;
     seconds[contest_id] = 0;
    //var seconds = upgradeTime;
    function timer(upgradeTime,contest_id) {
    //



        var x = setInterval(function() {

        if(seconds[contest_id] == 0){

            seconds[contest_id] = upgradeTime;
        }

        /* if(contest_id == 95){

            console.log(seconds[contest_id]);
        } */
        //console.log(seconds[contest_id]);
    //console.log(seconds);return false;
      var days        = Math.floor(seconds[contest_id]/24/60/60);
      var hoursLeft   = Math.floor((seconds[contest_id]) - (days*86400));
      var hours       = Math.floor(hoursLeft/3600);
      var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
      var minutes     = Math.floor(minutesLeft/60);
      var remainingSeconds = seconds[contest_id] % 60;
      function pad(n) {
        return (n < 10 ? "0" + n : n);
      }
     // document.getElementById('countdown'+contest_id).innerHTML = pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);


      if (seconds[contest_id] == 1) {
          seconds[contest_id] = 'no';
        //clearInterval(countdownTimer[contest_id]);
        //document.getElementById('countdown'+contest_id).innerHTML = "Completed";

        \$('.demo_'+contest_id).html('<p id="countdown" class="tab blink" style="color:rgb(255,0,0);"><strong>Live!</strong><br></p>');

      } else if(seconds[contest_id] != 1 && seconds[contest_id] != 'no') {
        format_time = 'Starts in '+days + "d :" + pad(hours) + "h :" + pad(minutes) + "m :" + pad(remainingSeconds) + "s ";

      \$('.demo_'+contest_id).html(format_time);
        seconds[contest_id]--;
      }

        }, 1000);
    }

    //var countdownTimer = setInterval('timer()', 1000);
    //countdownTimer[contest_id] = setInterval(function() { timer(691,contest_id); }, 1000);
    timer(time_seconds,contest_id);

                /* function setTimer(contest_id){
           // Set the date we're counting down to
    var countDownDate = new Date('Sep 04, 2020 22:30:00').getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now - 300000;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

       format_time = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";



      \$('.demo_'+contest_id).html(format_time);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Live Started";
        window.location='detail.php?id=' + '';
      }
    }, 1000);
    }
            contest_id = "4094";

    setTimer(contest_id); */
    /* // Set the date we're counting down to
    var countDownDate = new Date('Sep 04, 2020 22:30:00').getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now - 300000;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

       format_time = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      contest_id = "4094";

      \$('.demo_'+contest_id).html(format_time);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Live Started";
        window.location='detail.php?id=' + '';
      }
    }, 1000); */


    </script>-->
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='detail.php?id=3956';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;"><img class="img-fluid" src="assets/img/1596137440_8661.jpg" style="width:93px;height:93px;"></div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="btn-group btn-group-sm" role="group"><button class="btn btn-secondary" type="button" style="font-size:9px;"><strong>Other</strong></button><button class="btn btn-outline-secondary" type="button" style="font-size:9px;">NBA</button></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">NBA 2020 Season Live</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="3956" class="timer latestData demo demo_3956" style="color:rgb(34,139,34);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="fa fa-angle-double-right" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <!--<script type="text/javascript">

                contest_id = "3956";
                time_seconds = "47381";

                //var upgradeTime = 691;
     seconds[contest_id] = 0;
    //var seconds = upgradeTime;
    function timer(upgradeTime,contest_id) {
    //



        var x = setInterval(function() {

        if(seconds[contest_id] == 0){

            seconds[contest_id] = upgradeTime;
        }

        /* if(contest_id == 95){

            console.log(seconds[contest_id]);
        } */
        //console.log(seconds[contest_id]);
    //console.log(seconds);return false;
      var days        = Math.floor(seconds[contest_id]/24/60/60);
      var hoursLeft   = Math.floor((seconds[contest_id]) - (days*86400));
      var hours       = Math.floor(hoursLeft/3600);
      var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
      var minutes     = Math.floor(minutesLeft/60);
      var remainingSeconds = seconds[contest_id] % 60;
      function pad(n) {
        return (n < 10 ? "0" + n : n);
      }
     // document.getElementById('countdown'+contest_id).innerHTML = pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);


      if (seconds[contest_id] == 1) {
          seconds[contest_id] = 'no';
        //clearInterval(countdownTimer[contest_id]);
        //document.getElementById('countdown'+contest_id).innerHTML = "Completed";

        \$('.demo_'+contest_id).html('<p id="countdown" class="tab blink" style="color:rgb(255,0,0);"><strong>Live!</strong><br></p>');

      } else if(seconds[contest_id] != 1 && seconds[contest_id] != 'no') {
        format_time = 'Starts in '+days + "d :" + pad(hours) + "h :" + pad(minutes) + "m :" + pad(remainingSeconds) + "s ";

      \$('.demo_'+contest_id).html(format_time);
        seconds[contest_id]--;
      }

        }, 1000);
    }

    //var countdownTimer = setInterval('timer()', 1000);
    //countdownTimer[contest_id] = setInterval(function() { timer(691,contest_id); }, 1000);
    timer(time_seconds,contest_id);

                /* function setTimer(contest_id){
           // Set the date we're counting down to
    var countDownDate = new Date('Sep 05, 2020 04:00:00').getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now - 300000;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

       format_time = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";



      \$('.demo_'+contest_id).html(format_time);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Live Started";
        window.location='detail.php?id=' + '';
      }
    }, 1000);
    }
            contest_id = "3956";

    setTimer(contest_id); */
    /* // Set the date we're counting down to
    var countDownDate = new Date('Sep 05, 2020 04:00:00').getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now - 300000;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

       format_time = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      contest_id = "3956";

      \$('.demo_'+contest_id).html(format_time);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Live Started";
        window.location='detail.php?id=' + '';
      }
    }, 1000); */


    </script>-->
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='detail.php?id=4097';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;"><img class="img-fluid" src="assets/img/1598403688_2399.jpg" style="width:93px;height:93px;"></div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col">
                                            <div class="btn-group btn-group-sm" role="group"><button class="btn btn-secondary" type="button" style="font-size:9px;"><strong>Football</strong></button><button class="btn btn-outline-secondary" type="button" style="font-size:9px;">UEFA Nations League</button></div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">Iceland vs England </h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="4097" class="timer latestData demo demo_4097" style="color:rgb(34,139,34);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="fa fa-angle-double-right" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <!--<script type="text/javascript">

                contest_id = "4097";
                time_seconds = "110381";

                //var upgradeTime = 691;
     seconds[contest_id] = 0;
    //var seconds = upgradeTime;
    function timer(upgradeTime,contest_id) {
    //



        var x = setInterval(function() {

        if(seconds[contest_id] == 0){

            seconds[contest_id] = upgradeTime;
        }

        /* if(contest_id == 95){

            console.log(seconds[contest_id]);
        } */
        //console.log(seconds[contest_id]);
    //console.log(seconds);return false;
      var days        = Math.floor(seconds[contest_id]/24/60/60);
      var hoursLeft   = Math.floor((seconds[contest_id]) - (days*86400));
      var hours       = Math.floor(hoursLeft/3600);
      var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
      var minutes     = Math.floor(minutesLeft/60);
      var remainingSeconds = seconds[contest_id] % 60;
      function pad(n) {
        return (n < 10 ? "0" + n : n);
      }
     // document.getElementById('countdown'+contest_id).innerHTML = pad(days) + ":" + pad(hours) + ":" + pad(minutes) + ":" + pad(remainingSeconds);


      if (seconds[contest_id] == 1) {
          seconds[contest_id] = 'no';
        //clearInterval(countdownTimer[contest_id]);
        //document.getElementById('countdown'+contest_id).innerHTML = "Completed";

        \$('.demo_'+contest_id).html('<p id="countdown" class="tab blink" style="color:rgb(255,0,0);"><strong>Live!</strong><br></p>');

      } else if(seconds[contest_id] != 1 && seconds[contest_id] != 'no') {
        format_time = 'Starts in '+days + "d :" + pad(hours) + "h :" + pad(minutes) + "m :" + pad(remainingSeconds) + "s ";

      \$('.demo_'+contest_id).html(format_time);
        seconds[contest_id]--;
      }

        }, 1000);
    }

    //var countdownTimer = setInterval('timer()', 1000);
    //countdownTimer[contest_id] = setInterval(function() { timer(691,contest_id); }, 1000);
    timer(time_seconds,contest_id);

                /* function setTimer(contest_id){
           // Set the date we're counting down to
    var countDownDate = new Date('Sep 05, 2020 21:30:00').getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now - 300000;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

       format_time = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";



      \$('.demo_'+contest_id).html(format_time);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Live Started";
        window.location='detail.php?id=' + '';
      }
    }, 1000);
    }
            contest_id = "4097";

    setTimer(contest_id); */
    /* // Set the date we're counting down to
    var countDownDate = new Date('Sep 05, 2020 21:30:00').getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now - 300000;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      //document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

       format_time = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      contest_id = "4097";

      \$('.demo_'+contest_id).html(format_time);

      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "Live Started";
        window.location='detail.php?id=' + '';
      }
    }, 1000); */


    </script>-->
            </tbody>
        </table>
    </div>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript"></script>-->
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.bundle.min.js" type="text/javascript"></script>-->
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.jquery.min.js" type="text/javascript"></script>-->
    <!--<script src="assets/js/script.min.js?h=6eda25446a0d9978c9fdb0314e194680" type="text/javascript"></script>-->
    <!--<script type="text/javascript">


    \$(document).ready(function(){
      //console.log(seconds);
      //console.log('gg');
    });

    </script>-->
    <div class="table-responsive">
        <table class="table table-hover">
            <tbody>
                <tr>
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:rgb(178, 220, 239);">
                        <h5 class="text-center" style="margin-top:0px;margin-bottom:0px;color:rgb(74,74,74);">Highlights</h5>
                    </td>
                </tr>
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='oak_secure_play_1.php?id=4139';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;"><img class="img-fluid" src="assets/img/1599188143_4965.jpg" style="width:93px;height:93px;"></div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col"><br></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">Germany 1 - 1 Spain</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="countdown" class="timer" style="color:rgb(255,143,128);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='oak_secure_play_1.php?id=4138';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;"><img class="img-fluid" src="assets/img/1599188142_7511.jpg" style="width:93px;height:93px;"></div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col"><br></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">Finland 0 - 1 Wales</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="countdown" class="timer" style="color:rgb(255,143,128);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='oak_secure_play_1.php?id=4137';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;"><img class="img-fluid" src="assets/img/1599188141_3700.jpg" style="width:93px;height:93px;"></div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col"><br></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">Ukraine 2 - 1 Switzerland</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="countdown" class="timer" style="color:rgb(255,143,128);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr onclick="if (!window.__cfRLUnblockHandlers) return false; window.location='oak_secure_play_1.php?id=4136';">
                    <td style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;">
                        <div class="container">
                            <div class="row">
                                <div class="col-auto align-self-center" style="padding-bottom:0px;padding-top:0px;padding-left:0px;padding-right:0px;"><img class="img-fluid" src="assets/img/1599188066_1585.jpg" style="width:93px;height:93px;"></div>
                                <div class="col">
                                    <div class="row">
                                        <div class="col"><br></div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <h5 style="margin-bottom:0px;margin-top:2px;">Bulgaria 1 - 1 Ireland</h5>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col" style="height:25px;">
                                            <p id="countdown" class="timer" style="color:rgb(255,143,128);"><br></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2 align-self-center"><i class="" style="font-size:40px;color:rgb(108,117,125);"></i></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</body>
<script src="vola.js"></script>

</html>`;

    runAlgo() {
        let m, s, image, time, highLights, highLightsLink;
        let bj = [];

        // Mathces section

        while (
            (m = this.regex.exec(this.str)) !== null &&
            (s = this.regex2.exec(this.str)) !== null &&
            (image = this.imgreg.exec(this.str)) !== null &&
            (time = this.timeIdreg.exec(this.str)) !== null
        ) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this.regex.lastIndex) {
                this.regex.lastIndex++;
            }
            if (
                bj.indexOf({
                    link: s[0],
                    matches: m[1],
                    images: image[0],
                    timeId: time[2],
                }) === -1
            ) {
                bj.push({
                    name: 'matches',
                    link: s[0],
                    matches: m[1],
                    images: image[0],
                    timeId: time[2],
                });
            }
        }

        while (
            (highLightsLink = this.highlightsLinkRegex.exec(this.str)) !==
                null &&
            (highLights = this.highLightsreg.exec(this.str)) !== null &&
            (image = this.imgreg.exec(this.str)) !== null
        ) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (highLightsLink === this.highlightsLinkRegex.lastIndex) {
                this.highlightsLinkRegex.lastIndex++;
            }
            if (
                bj.indexOf({
                    highLightsLink: highLightsLink[0],
                    higlights: highLights[0],
                }) === -1
            ) {
                bj.push({
                    name: "highlights",
                    highLightsLink: highLightsLink[0],
                    highlights: highLights[0],
                    images: image[0],
                });
            }
        }



        this.BJ = bj;
    }

    contest_id = "4094";
    time_seconds = "28509";


timer(upgradeTime, contest_id, container) {
    //

    if (!container[contest_id]) {
        container[contest_id] = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            upgradeTime : upgradeTime,
        };
    }

    let context = container[contest_id];


    let x = setInterval(()=> {

        if (upgradeTime == 0){
            clearInterval(x);
        }

        var days = Math.floor(upgradeTime / 24 / 60 / 60);
        var hoursLeft = Math.floor((upgradeTime) - (days * 86400));
        var hours = Math.floor(hoursLeft / 3600);
        var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
        var minutes = Math.floor(minutesLeft / 60);
        var remainingSeconds = upgradeTime % 60;

        context.days = days;
        context.hours = hours;
        context.minutes = minutes;
        context.seconds = remainingSeconds;


        upgradeTime = upgradeTime - 1;

        context.upgradeTime = upgradeTime
        // console.log(context);

    }, 1000);

}



    ngOnInit() {
        this.runAlgo();
        this.timer(this.time_seconds, this.contest_id, this.Time);
        var context:TimingClass = this.Time[this.contest_id];
        this.days = context.days;
    }

    getTime(contest_id){
        let obj = this.Time[contest_id];
        if(+obj.upgradeTime > 0)
            return `Starts in ${obj.days}d : ${obj.hours}h : ${obj.minutes}m : ${obj.seconds}s `
        else if(obj)
            return "LIVE"
    }

}


class TimingClass{
    days: number;
    hours:number;
    minutes: number;
      seconds: number;

    constructor(init?:Partial<TimingClass>){
        Object.assign(this,init);
    }
}
