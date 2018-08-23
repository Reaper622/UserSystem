$(document).ready(function(){
    //显示用户名
    getUserName();
    getMainData();
    getData();
    //加载窗口实时消失
	$('.loading').fadeOut();

});

function showStuDir(DirNum){

	//画布大小
    var width = 500+100;  
    var height = 500;  

	var svg = d3.select("#StuDir")
	.append("svg")
	.attr("id","showStuDir")
	.attr("width",width)
	.attr("height",height);
        var dataset=[["前端",DirNum[0]],["后台",DirNum[1]],["算法",DirNum[2]],["安卓",DirNum[3]],["Python",DirNum[4]]];
        var newdata = dataset.filter(function(item){
            return item[1] !=0
        });
        dataset = newdata;
          
        var outerRadius = 150; //外半径  
            var innerRadius = 0; //内半径，为0则中间没有空白  
        var arc = d3.svg.arc() //弧生成器  
                .innerRadius(innerRadius) //设置内半径  
                .outerRadius(outerRadius); //设置外半径  
        var color = d3.scale.category20();//构造20种颜色的序数比例尺，索引值可以是字符串或数字  
        var pie = d3.layout.pie()   //饼图布局  
            .sort(null)             //不排序，不写则会从大到小，顺时针排序。  
            .value(function(d){  return d[1]});     //设置value值为上面的2二维数组中的数字  
        var piedata=pie(dataset);  
  
         var arcs=svg.selectAll(".arc")               
            .data(piedata) //返回是pie(data0)  
            .enter().append("g")  
            .attr("class", "arc")  
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")   //将圆心平移到svg的中心  
            .append("path")  
            .attr("fill", function(d, i) {  
                return color(i);            //根据下标填充颜色  
            })  
            .attr("d", function(d, i) {  
                return arc(d);              ///调用上面的弧生成器  
            });  
  
         var text=svg.selectAll(".text")  
            .data(piedata) //返回是pie(data0)  
            .enter().append("g")  
            .attr("class", "text")  
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")  
            .append("text")  
            .style('text-anchor', function(d, i) {  
                //根据文字在是左边还是右边，在右边文字是start，文字默认都是start。  
                return (d.startAngle + d.endAngle)/2 < Math.PI ? 'start' : 'end';  
            })  
            .attr('transform', function(d, i) {  
                var pos = arc.centroid(d);      //centroid(d)计算弧中心  
                pos[0]=outerRadius*((d.startAngle+d.endAngle)/2<Math.PI?1.4:-1.4)  
                pos[1]*=2.1;                    //将文字移动到外面去。  
                return 'translate(' + pos + ')';  
            })  
            .attr("dy",".3em")              //将文字向下便宜.3em  
            .text(function(d) {             //设置文本  
                return d.data[0];     
            })  
  
         var text2=svg.selectAll(".text2")  
            .data(piedata) //返回是pie(data0)  
            .enter().append("g")  
            .attr("class", "text")  
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")  
            .append("text")  
            .style('text-anchor',"middle")  
            .attr('transform', function(d, i) {  
                var pos = arc.centroid(d);          //将数字放在圆弧中心  
                return 'translate(' + pos + ')';  
            })  
            .text(function(d) {  
                return d.data[1];  
            })  
             var line = svg.selectAll(".line")      //添加文字和弧之间的连线  
                .data(piedata) //返回是pie(data0)  
                .enter().append("g")  
                .attr("class", "line")  
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")  
                .append("polyline")  
                .attr('points', function(d, i) {  
                    var pos1= arc.centroid(d),pos2= arc.centroid(d),pos3= arc.centroid(d);  
                    pos1[0]*=2,pos1[1]*=2;  
                    pos2[0]*=2.1,pos2[1]*=2.1  
                    pos3[0]=outerRadius*((d.startAngle+d.endAngle)/2<Math.PI?1.4:-1.4)  
                    pos3[1]*=2.1;  
                    //pos1表示圆弧的中心边缘位置，pos2是网上稍微去了一下，pos3就是将pos2平移后得到的位置  
                    //三点链接在一起就成了线段。  
                    return [pos1,pos2,pos3];  
                })  
                .style('fill', 'none')  
                .style('stroke',function(d,i){  
                    return color(i);  
                })  
                .style('stroke-width', "3px")  
                .style('stroke-dasharray',"5px")  
  
             var label=svg.selectAll('.label')      //添加右上角的标签  
                    .data(piedata)  
                    .enter()  
                    .append('g')  
                    .attr("transform","translate("+(width-50)+","+10+")")  
                    ;     
                label.append('rect')        //标签中的矩形  
                    .style('fill',function(d,i){  
                        return color(i);  
                    })  
                    .attr('x',function(d,i){  
                        return 0;  
                    })  
                    .attr("y",function(d,i){  
                        return 10+i*30;  
                    })  
                    .attr('rx','5')     //rx=ry 会出现圆角  
                    .attr('ry','5')  
                    .attr('width',50)  
                    .attr('height',20)  
                    ;  
                label.append('text')            //标签中的文字  
                    .attr('x',function(d,i){  
                        return 25;              //因为rect宽度是50，所以把文字偏移25,在后面再将文字设置居中  
                    })  
                    .attr("y",function(d,i){          
                        return 15+10+i*30;  
                    })  
                    .text(function(d){  
                        return d.data[0];  
                    })  
                    .style({  
                        "font-size":"10px",  
                        "text-anchor":"middle",  
                        'fill':"white",  
                        "font-weight":600  
                    })  
            function changeData(){  
                random()  
                var pie2=pie(dataset);  
                piedata.forEach(function(d,i){  
                    d.laststartAngle=d.startAngle;  
                    d.lastendAngle=d.endAngle;  
                    d.startAngle=pie2[i].startAngle;  
                    d.endAngle=pie2[i].endAngle;  
                })  
                arcs.data(piedata)  
                    .transition().duration(800)  
                    .attrTween("d", tweenArc(function(d, i) {  
                    return {  
                        startAngle: d.laststartAngle,  
                        endAngle: d.lastendAngle,  
                    };  
                }))  
                text.data(piedata)  
                    .transition().duration(800)  
                    .style('text-anchor', function(d, i) {  
                        //圆的中心位置在哪里，在右边文字是start  
                        return (d.startAngle + d.endAngle)/2 < Math.PI ? 'start' : 'end';  
                    })  
                    .attr('transform', function(d, i) {  
                        console.log(d);  
                        var pos = arc.centroid(d);  
                        pos[0] = outerRadius * ((d.startAngle + d.endAngle)/2 < Math.PI ? 1.4 : -1.4)  
                        pos[1] *= 2;  
                        return 'translate(' + pos + ')';  
                    });  
                text2.data(piedata)  
                    .transition().duration(800)  
                    .attr('transform', function(d, i) {  
                        var pos = arc.centroid(d);  
                        return 'translate(' + pos + ')';  
                    }).text(function(d) {  
                        return d.data[1];  
                    });  
                line.data(piedata)  
                    .transition().duration(800)  
                    .attr('points', function(d, i) {  
                    var pos1= arc.centroid(d),pos2= arc.centroid(d),pos3= arc.centroid(d);  
                    pos1[0]*=2,pos1[1]*=2;  
                    pos2[0]*=2.1,pos2[1]*=2.1  
                    pos3[0]=outerRadius*((d.startAngle+d.endAngle)/2<Math.PI?1.4:-1.4)  
                    pos3[1]*=2.1;  
                    console.log(pos1);  
                    return [pos1,pos2,pos3];  
                })  
            }   
             function tweenArc(b) {  
                return function(a, i) {  
                    var d = b.call(this, a, i),  
                        i = d3.interpolate(d, a);  
                    return function(t) {  
                        return arc(i(t));  
                    };  
                };  
             }  
}
function getData(){ 
    //定义一个存放数据的数组
    var DirNum = Array(5);
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/backstageManagement/study_directionAmount",
        dataType:"json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        contentType: "application/json",
        beforeSend:function(xhr){
        },
        success:function(json){
            DirNum[0] = json.frontNum;
            DirNum[1] = json.bgNum;
            DirNum[2] = json.algNum;
            DirNum[3] = json.androidNum;
            DirNum[4] = json.PyNum; 
            showStuDir(DirNum);
        }
    });
}

function getMainData(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/backstageManagement/mainAmount",
        dataType:"json",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        contentType: "application/json",
        beforeSend:function(xhr){
        },
        success:function(json){
            $("#todayAccess").html(json.todayAccess);
            $("#totalAccess").html(json.totalAccess);
            $("#members").html(json.userAmount);
            $("#admin").html(json.adminAmount);
        },
        complete:function(json){
            $(".loading").hide();
        }
    });
}
