// track mouse, for image preview popup
var mouse_x = 0;
var mouse_y = 0;
$(document).mousemove(function(event) {
    mouse_x = event.pageX;
    mouse_y = event.pageY;
});

function getChildren(data)
{
    var res = []
    for (var key in data)
    {
        c = getChildren(data[key]["children"])
        var id = data[key]["id"]
        res.push( { "text" :  data[key]["name"] , "children" : c  , "type": data[key]["type"] , "data" : data[key]["id"] } )
    }
    return res
}

function ConstructSelectionPopup(selectElement, triggerPopup , targetInput, data, selectionType ,thumbUrl)
{
	convertedForJsTree = {}
	childrend = getChildren(data)
    convertedForJsTree = { "text" : "Omero" , "children" : childrend}

    var popupContainer = document.createElement('div');
    popupContainer.className += " popuptext";
    selectElement.appendChild(popupContainer)
	$(popupContainer).jstree({
		'core' : {'data' : [convertedForJsTree]},
		"multiple" : false,

		"types" :
		{
		    "group" : {"icon" :groupIcon},
		    "dataset" : {"icon" :datasetIcon},
		    "image" : {"icon" :imageIcon},
            "folder" : {"icon" : "icon-folder-open"},
            "file" : {"icon" : "icon-file"},
        },

		"plugins" : [ "types" ]
	});

	$(popupContainer).on("select_node.jstree",
        function(evt, data){
            if (data.node.type == selectionType)
            {
                var id = data.node.data
                targetInput.value = id
                togglePopUp(popupContainer);
            }
         });
    $(popupContainer).on('dehover_node.jstree', function() {$("#preview").remove();});
    $(popupContainer).bind("hover_node.jstree", function(e, data)
        {

            var id = data.node.data
            if (data.node.type == "image")
            {
                var url = thumbUrl
                url = url.replace('9999999999',id)
                bound = e.currentTarget.getBoundingClientRect()

                $.ajax({
                    url : url,
                     dataType: 'text',
                     async: false,
                     success: function(previewUrl) {
                           $("body").append("<p id='preview'><img class='ImagePreview' src="+previewUrl+"></p>");
                           xOffset = 10;
		                   yOffset = 30;
                           $("#preview")
                             .css("top",(mouse_y - xOffset) + "px")
                              .css("left",(mouse_x + yOffset) + "px")
                              .css("position", "absolute")
                              .css("z-index", "30")
                              .fadeIn("fast");
                    }
                });
            }
        })

    $(triggerPopup).click(function() {
        togglePopUp(popupContainer);
    });
}


function togglePopUp(popup)
{
    popup.classList.toggle("show");
}

function supressEvent(event,arg)
{
    event.stopPropagation();
}