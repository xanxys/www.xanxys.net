
function set_frame(){
    document.getElementById('all').style.height=(window.innerHeight-70)+'px';
}

function markup_line(text){
    console.log(text);
    
    // apply: [[xxx yyy]]
    text=text.replace(/\[\[([^\]]+)\]\]/g,'<span class="dialog">$1</span>');
    
    // apply : [xxx]
    text=text.replace(/\[([^\]]+)\]/g,'<span class="noun">$1</span>');
    
    // apply : {xxx}
    text=text.replace(/{([^}]+)}/g,'<span class="idea">$1</span>');
    
    console.log(text);
    return text;
}

function markup(text){
    var i;
    var ls=text.split('\n');
    
    text='';
    var in_para=false;
    
    for(i=0;i<ls.length;i++){
        if(ls[i].length==0){
            if(in_para) text+='</p>';
            in_para=false;
        }
        else{
            if(!in_para) text+='<p>';
            in_para=true;
            
            text+=markup_line(ls[i]);
        }
    }
    
    return text;
}

function prepare(){
    console.log('prep');
    set_frame();
    
    $('.markup').each(function(i){
        $(this).html(markup($(this).html()));
    });
}


$(document).ready(prepare);
$(window).resize(set_frame);

