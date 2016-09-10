var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2","brunofin","comster404"];
var base='https://api.twitch.tv/kraken/';

function setup()
{
  $("#entry").html("");
  var status="";
  var pre="";
  channels.forEach(function(val){
    pre=""
    $.ajax({
      url: base+"streams/"+val+'?callback=?',
      dataType:'json',
      async:false,
      success: function(data){
      if(data.stream===null)
        {
          status="off";
          pre="Offline";
        }
      else if(data.stream===undefined)
        {
          status="off";
          pre="Account Closed";
          
        }
      else
        {
          status="on";
          pre=data.stream.game;
        }
         
    }
   
      
    });
   
    $.ajax({
     url: base+"channels/"+val+'?callback=?',
      dataType: 'json',
      async:false,
      success: function(data){
        logo = data.logo == null ? "https://www.publicdomainpictures.net/pictures/40000/nahled/question-mark.jpg" : data.logo;
        urlstr=data.url;
        name = data.display_name != null ? data.display_name : val;
        description = status === "on" ? ': ' + data.status : "";
      var st="";
      if(status==="on")
      {
      st='style="background-color:#3D9970;color:#001f3f;"';
    }
           
        material='<li class="'+status+'"><a href="'+urlstr+'" '+st+'target="_blank"><div class="row"><div class="col-xs-3"><img class="logo" src=" '+logo+'"></div><div class="col-xs-3 title">'+name+'</div><div class="col-xs-6 des">'+pre+'<span class="hidden-xs">'+description+'</span></div></div></a></li>';
        
        if(status==="on")
        $("#entry").prepend(material);
        else
        $("#entry").append(material);
        
        
      }
           
     
    });
    
    
  })
}
$("document").ready(function(){
  setup();
 $("#alltv").on("click",function(){
      $("#a").addClass("active");
      $("#b").removeClass("active");
      $("#c").removeClass("active");
   $(".off, .on").removeClass("hidden");
   
 });
  $("#ontv").on("click",function(){
       $("#b").addClass("active");
      $("#a").removeClass("active");
      $("#c").removeClass("active");
   $(".off").addClass("hidden");
    $(".on").removeClass("hidden");
   
 });
  $("#offtv").on("click",function(){
     $("#c").addClass("active");
      $("#b").removeClass("active");
      $("#a").removeClass("active");
       $(".on").addClass("hidden");
    $(".off").removeClass("hidden");
   
   
 });
  $("#retv").on("click",function(){
      
   setup();
   
 });
  
  
});