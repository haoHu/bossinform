!function(){IX.ns("Hualala.Global");var a=Hualala.Global,b=a.APIMappingUrls;_.each(b,function(b){var c=b[0];a[c]=function(a){return function(b,c){var d=IX.isFn(c)?c:IX.emptyFn();setTimeout(function(){switch(a){case"loadAppData":d({resultcode:"000",resultmsg:"",data:Test.GroupList});break;case"genAuthCode":d({resultcode:"000",resultmsg:"",data:{code:"http://mu.shop.hualala.com/randomImage.jsp?Rand="+1e4*Math.random()}});break;case"getShopQuerySchema":d({resultcode:"000",resultmsg:"",data:Test.getShopQuerySchema()});break;case"getGroupStatistic":d({resultcode:"000",resultmsg:"",data:Test.getGroupStatistic(b)});break;default:d({resultcode:"000",resultmsg:null})}},200)}}(c)})}();