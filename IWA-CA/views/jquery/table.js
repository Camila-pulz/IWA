//the code below is available on: https://github.com/mikhail-cct/CA1-In-class-Demo

function draw_table(){
    $("#results").empty();
    $.getJSONuncached = function(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            cache: false,
            success: function(html) {
                $("#results").append(html);
                select_row();
            }
        });
    };
    $.getJSONuncached("/get/html")
};

function select_row()
{
	$("#mediaBucket tbody tr[id]").click(function ()
	{
		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var category = $(this).prevAll("tr").children("td[colspan='8']").length - 1;
		var record = $(this).attr("id") - 1;
		delete_row(category, record);
	})
};

function delete_row(categ, rec)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				category: categ,
				record: rec
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

function validate(){

    var title = document.getElementsByTagName("title");
    var year = document.getElementById("year");

    if(isNaN(year)){
        document.getElementsByName("year").innerHTML="Enter only numbers";
        return false;
    }else{
        return true;
    }
    }

$(document).ready(function(){
    draw_table();
});