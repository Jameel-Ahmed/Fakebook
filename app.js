"use strict"

function Helper() {
    var d = {};

    d.Call = function (url, type, data, callback) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: callback
        });
    }

    d.log = function (m) {
        console.log(m);
    }

    return d;

}


$(function () {
    var helper = Helper();

    var i;
   
        helper.Call('https://jsonplaceholder.typicode.com/posts', 'GET', {}, function (response) {

            helper.Call('https://jsonplaceholder.typicode.com/photos', 'GET', {}, function (result) {

                helper.Call('https://jsonplaceholder.typicode.com/comments', 'GET', {}, function (comments) {
    
                var template = '';
    
                    $.each(response,function(i,item){
                    var img  = result.filter(function(image){
                        return image.id === item.id;
                    });

                    var comment  = comments.filter(function(cmnt){
                        return cmnt.postId === item.id;
                    });
                    var imgurl = img[0].url;
                    template += `
                    <div class="card" style="width:100%">
                        <img class="card-img-top" height="200px" src="${imgurl}">
                        <div class="card-body">
                            <h4 class="card-title"></h4>
                            <article class="card-text">${item.body}</article>`;
                            
                                template += `<li class="list-group-item .list-group-flush">${comment[0].body.substring(0,30) + '...'}</li>`;
                                
                           
                 template += `<input type="text" class="form-control" placeholder="comment something ...">
                        </div>
                    </div>
                    `;
                });
    
                $('#app').html(template);

                $('article').readmore();

            });
    
            });
    
        });
});







