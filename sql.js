$(function () {
    $.ajax({
        url: "sql.php",
        method: 'POST',
        data: {type: "info"},
        dataType: 'json',
        success: function (data, state, xhr) {
            var row = 0;
            var col = 0;
            $.each(data, function (index, elem) {
                $("#table1 tr").eq(row + 1).find("td").eq(col).html(elem['id']);
                $("#table1 tr").eq(row + 1).find("td").eq(col + 1).html(elem['name']);
                $("#table1 tr").eq(row + 1).find("td").eq(col + 2).html(elem['passwd']);
                $("#table1 tr").eq(row + 1).find("td").eq(col + 3).html(elem['age']);
                $("#table1 tr").eq(row + 1).find("td").eq(col + 4).html(elem['job']);
                row++;
            });
        },
        error: function () {
            alert("Oops! failed to return data from php");
        }
    });

    $("#query_btn").click(function () {
        switch (itemSelected) {
            case "content":
            {
                var user = {
                    name: $("#name_content").val(),
                    passwd: $("#passwd_content").val(),
                    age: $("#age_content").val(),
                    job: $("#job_content").val()
                };
                $.ajax({
                    url: 'sql.php',
                    method: 'POST',
                    data: {
                        type: itemSelected, user
                    },
                    dataType: 'json',
                    success: function (data, state, xhr) {
                        if (data == "") {
                            {
                                $("#table2").hide();
                                $("#no_results").show();
                                return;
                            }
                        } else {
                            $("#table2").show();
                            $("#no_results").hide();
                            DisplayTable2();

                            var row = 0;
                            var col = 0;
                            $.each(data, function (index, elem) {
                                $("#table2 tr").eq(row + 1).find("td").eq(col).html(elem['id']).show();
                                $("#table2 tr").eq(row + 1).find("td").eq(col + 1).html(elem['name']).show();
                                $("#table2 tr").eq(row + 1).find("td").eq(col + 2).html(elem['passwd']).show();
                                $("#table2 tr").eq(row + 1).find("td").eq(col + 3).html(elem['age']).show();
                                $("#table2 tr").eq(row + 1).find("td").eq(col + 4).html(elem['job']).show();
                                row++;
                            });
                        }
                    },
                    error: function () {
                        alert("Oops! failed to return data from php");
                    }
                });
                break;
            }
            case "time": {
                $.ajax({
                    url: 'sql.php',
                    method: 'POST',
                    data: {type: itemSelected, user: $("#cmd_time").val()},
                    dataType: 'json',
                    success: function(data, state, xhr) {
                        alert("Done!");
                    },
                    error: function () {
                        alert("Oops! Failed to return data from php:w");
                    }

                });
            }
            default:
                break;
        }
    });

    $("#clear_btn").click(function () {
        switch (itemSelected) {
            case "content":
            {
                $("#name_content").val("");
                $("#passwd_content").val("");
                $("#age_content").val("");
                $("#job_content").val("");
                break;
            }
            case "time":
            {
                $("#cmd_time").val("");
                break;
            }
            case "A":
            {
                $("#a_A").val("");
                break;
            }
            case "B":
            {
                $("#b_B").val("");
                break;
            }
            default:
                break;
        }
    });

    $("#try_me").click(function() {
	switch(itemSelected) {
	    case "content": {
		$("#name_content").val("luck' or 1#");
		break;
	    }
	    case "time": {
		$("#cmd_time").val("SELECT IF(SUBSTRING(name,1,1)=char(119), BENCHMARK(10000000, encode(\"hello\",\"bye\")), null) FROM person WHERE id=1"); 
		break;
	    }
	    case "A": {
		break;
	    }
	    case "B": {
		break;
	    }
	    default:
		break;
	}
    });

});

var blind_isShown = false;
var normal_isShown = false;

function ShowItem(type) {
    console.log("enter ShowItem");
    switch (type) {
        case "blind":
        {
            if (blind_isShown === false) {
                $("#blind_item").show();
                blind_isShown = true;
                $("#blind_title").html("- Blind Injection");
                $("#blind_input").show();
            } else {
                $("#blind_item").hide();
                blind_isShown = false;
                $("#blind_title").html("+ Blind Injection");
                $("#blind_input").hide();
            }
            break;
        }
        case "normal":
        {
            if (normal_isShown === false) {
                $("#normal_item").show();
                normal_isShown = true;
                $("#normal_title").html("- Normal Injection");
                $("#normal_input").show();
            } else {
                $("#normal_item").hide();
                normal_isShown = false;
                $("#normal_title").html("+ Normal Injection");
                $("#normal_input").hide();
            }
            break;
        }
        default:
            console.log('default');
            break;
    }
}

var itemState = ['content', 'time', 'A', 'B'];
itemSelected = "";

function ShowQuery(item) {
    console.log("enter ShowQuery");
    for (i = 0; i < itemState.length; i++) {
        if (item == itemState[i]) {
	    $("#try_me").show();
            $("#" + itemState[i]).append($("#try_me")).show();
            itemSelected = itemState[i];
            continue;
        } else {
            $("#" + itemState[i]).hide();
        }
    }


}

function DisplayTable2() {
    var row = 0;
    var col = 0;
    for (row = 0, col = 0; row < 5; row++) {
        $("#table2 tr").eq(row + 1).find("td").eq(col).html("").hide();
        $("#table2 tr").eq(row + 1).find("td").eq(col + 1).html("").hide();
        $("#table2 tr").eq(row + 1).find("td").eq(col + 2).html("").hide();
        $("#table2 tr").eq(row + 1).find("td").eq(col + 3).html("").hide();
        $("#table2 tr").eq(row + 1).find("td").eq(col + 4).html("").hide();
    }

}
