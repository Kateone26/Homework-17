
let mainwrapperpost = document.getElementById('post-block');
let overlaycontent = document.getElementById('overlay');
let closeoverlay = document.getElementById('close');
let content = document.getElementById('content');
let addbutton = document.getElementById('add');
let postoverlay = document.getElementById('postoverlay');
let form = document.getElementById('form');



function ajax(url, callback){
    let request = new XMLHttpRequest();
    request.open('GET', url );
    request.addEventListener('load', function(){
        let data = JSON.parse(request.responseText);
        callback(data);

    });

    request.send();
}
ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printdata(data);
});



function printdata(data){
    data.forEach(element => {
        createpost(element);
    });
}


function createpost(item){
    let divwrapper = document.createElement('div');
    divwrapper.classList.add('posts');
    divwrapper.setAttribute('data-id', item.id );

    let h2tag = document.createElement('h2');
    h2tag.innerText = item.id;

    let h3tag = document.createElement('h3');
    h3tag.innerText = item.title;

    let deletebutton = document.createElement('button');
    deletebutton.innerText = 'delete';
    deletebutton.setAttribute('data-id', item.id);



    divwrapper.appendChild(h2tag);
    divwrapper.appendChild(h3tag);
    divwrapper.appendChild(deletebutton);

    divwrapper.addEventListener('click', function(event){
        let id = event.target.getAttribute('data-id');
        openoverlay(id);
    })

    deletebutton.addEventListener('click', function(event){
        divwrapper.classList.add('delete-div'); 
        let id = event.target.getAttribute('data-id');
        deletepost(id);
        event.stopPropagation();
        

    })

    mainwrapperpost.appendChild(divwrapper);

    console.log(divwrapper);

}

function deletepost(id){
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
        method: 'delete',
    })
}

function openoverlay(id){
    overlaycontent.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data){
        overlayfunction(data);
    })
    console.log(id);
}

function overlayfunction(item){
    let description = document.createElement('p');
    description.innerText = item.body;

    let titlepost = document.createElement('h3');
    titlepost.innerText = item.title;

    content.appendChild(titlepost);
    content.appendChild(description);



}

closeoverlay.addEventListener('click', function(){
    overlaycontent.classList.remove('active');
    content.innerHTML = ' ';
})

addbutton.addEventListener('click', function(){
    postoverlay.classList.add('active-add');
})






// 



addbutton.addEventListener('click', function(item){
    let creatediv = document.createElement('div');
    creatediv.classList.add('posts');
    creatediv.setAttribute('data-id', item.id);




    let h2tag = document.createElement('h2');
    h2tag.innerText = item.id;

    let h3tag = document.createElement('h3');
    h3tag.innerText = item.title;

    let deletebutton = document.createElement('button');
    deletebutton.innerText ='delete post';
    deletebutton.setAttribute('data-id', item.id);

 
    creatediv.appendChild(h2tag);
    creatediv.appendChild(h3tag);
    creatediv.appendChild(deletebutton)

    creatediv.addEventListener('click', function(event){
        let id = event.target.getAttribute('data-id');
        openoverlay(id);
        
    })

    deletebutton.addEventListener('click', function(event){
        creatediv.classList.add('delete-div'); 
        event.stopPropagation();
        let id = event.target.getAttribute('data-id');
        deletepost(id);
    })


    mainwrapperpost.appendChild(creatediv);


    console.log(creatediv);

})




// 






form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(event.target);

    let formdata = {
        title: event.target[0].value,
        description: event.target[1].value
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method:'post',
        body: JSON.stringify(formdata),
        headers: {
           'Content-type': 'application/json; charset=UTF-8', 
        },
    })
    .then((response)=> response.json())
    .then((json)=> console.log(json));
    postoverlay.classList.remove('active-add');
    

   

    console.log(formdata);
})

