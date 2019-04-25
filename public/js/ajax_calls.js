function clear() {
    $.ajax({
        url: '/',
        type: 'DELETE',
        success: function (response) {
            console.log(response);
        }
    });
}

function scrape() {
    $.get("/scrape", (err, result)=>{
        console.log(result)
    })
}

$("#scrape").on("click", (event)=>{
    console.log("click")
    scrape();    
})
$("#clear").on("click", (event)=>{
    console.log("click")
    clear();
})