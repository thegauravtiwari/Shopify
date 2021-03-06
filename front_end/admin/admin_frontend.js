function getItems(callback) {
    $.get(
        './task/getItems',
        (data)=>{
            console.log("success");
            callback(data);
        },'json'
    )
}

function postItem(title,price,description,callback) {

    let fd=new FormData($('#addForm')[0]);


    $.ajax({
        url:'./task/addItem',
        method:"POST",
        data:fd,
        async:true,
        timeout:60000,
        processData: false,
        contentType: false,
        success:function (data) {
            console.log("Posted")
            callback(data);
        },
        error:function (err) {
            console.log(err);
        }
    })

}

function deleteItem(title,imagepath,callback) {

    $.post(
        './task/deleteItem',
        {
            title:title,
            imagePath:imagepath
        },
        (data)=>{
            console.log('deleted');
            callback(data);
    }
    )
}



$(()=>{
    let ab=$('#ab')
    let itemBox=$('#cardDeck');
    let title=$('#title');
    let price=$('#price');
    let form=$('#addForm')
    let description=$('#des');

    let refreshItems=(items)=>{
        if(items.length===0)
        {
            ab.hide();
        }
        else
        {
            ab.show();
        }
        itemBox.empty();
            for (item of items) {
                let card = $(`
        <div class="  col-sm-12 col-lg-4 ">
             <div class="card m-md-4">
            <img class="card-img-top" src="${item.imagePath}" alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-text">${item.des}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated at ${(item.updatedAt).substring(0, 10)} ${(item.updatedAt).slice(11, 19)}</small><br>
                 <div data-id="${item.title}" data-im="${item.imagePath}" onclick="deleteI(this)"><i class="fas fa-trash"></i></div>
            </div>
            </div>
        </div>
           `);

                itemBox.append(card);

            }
    }

    getItems(refreshItems);

    window.deleteI=(element)=>{
        let title=$(element).attr('data-id');
        let imagepath=$(element).attr('data-im');
        console.log(title);
        deleteItem(title,imagepath,refreshItems);
    }

    form.submit((e)=>{
        e.preventDefault();
        postItem(title.val(),price.val(),description.val(),refreshItems);
        form.trigger('reset');
    })
    
});