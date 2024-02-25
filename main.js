song="";
leftWristX = "";
leftWristY="";
rightWristX = "";
rightWristY = "";

scoreLeftWrist=0;
scoreRightWrist=0;

function preload()
{
    song= loadSound("music.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    
    video=createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    
    fill("red");
    stroke("red");

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
    leftWristYNumber=Number(leftWristY);
    remove_decimals=floor(leftWristYNumber);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
    }
    if(scoreRightWrist>0.1)
    {
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100)
        {
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200)
        {
            document.getElementById("speed").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300)
        {
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400)
        {
            document.getElementById("speed").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500)
        {
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function e()
{
    song.pause();
}
function modelLoaded()
{
    console.log("Initialized");
}
function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}
function reset()
{
    song.stop();
    song.setVolume(1);
    song.rate(1);
    document.getElementById("volume").innerHTML="Volume = "+volume;
}