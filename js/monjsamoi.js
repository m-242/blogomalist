// thank's D.J. for optimization
function BlogExternalLinks()
{
    if (!document.getElementsByTagName) {
        return;
    }
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        if (anchor.getAttribute("href")) {
            // Check rel value with extra rels, like "external noflow". No test for performance yet
            var $pattern = new RegExp("external", "i");
            if ($pattern.test(anchor.getAttribute("rel"))) {
                /*anchor.onclick = function() {
                 window.open(this.href);
                 return false;
                 }*/
                anchor.target = "_blank";
            }
        }
    }
}
function BlogOnloadEvent(func)
{
    if (window.onload) {
        BlogAddEvent(window, 'load', window.onload);
    }
    BlogAddEvent(window, 'load', func);
}

function BlogAddEvent(obj, evType, fn)
{
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, true);
        return true;
    } else {
        if (obj.attachEvent) {
            var r = obj.attachEvent("on" + evType, fn);
            return r;
        } else {
            return false;
        }
    }
}
BlogOnloadEvent(BlogExternalLinks);

// Thank's David Walsh
jQuery.fn.topLink = function(settings) {
	settings = jQuery.extend({
		min: 1,
		fadeSpeed: 200
	}, settings);
	return this.each(function() {
		//listen for scroll
		var el = $(this);
		el.hide(); //in case the user forgot
		$(window).scroll(function() {
			if($(window).scrollTop() >= settings.min)
			{
				el.fadeIn(settings.fadeSpeed);
			}
			else
			{
				el.fadeOut(settings.fadeSpeed);
			}
		});
	});
};
//usage w/ smoothscroll
$(document).ready(function() {
	//set the link
	$('#top-link').topLink({
		min: 400,
		fadeSpeed: 500
	});
	//smoothscroll
	 $('#top-link').click(function(e) {
	 e.preventDefault();
	 $('body,html').animate({scrollTop:0},800);
	 });
});
/* show hide div id */
	function xoToggleBlock( id )
		{
        var value = (document.getElementById(id).style.display == 'none') ? 'block' : 'none';
		xoSetBlock( id, value );
        xoSetCookie( id, value );
		}
    function xoSetBlock( id, value )
		{
		document.getElementById(id).style.display = value;
		}
    function xoTrim( str )
		{
        return str.replace(/^\s+|\s+$/g, '') ;
		}
    function xoGetCookie( name )
    {
	 var cookieName = 'XoMorpho_' + name;
	 var cookie = document.cookie;

	 var cookieList = cookie.split( ";" );
		for( var idx in cookieList )
    {
	cookie = cookieList[idx].split( "=" );
		if ( xoTrim( cookie[0] ) == cookieName )
			{
		return( cookie[1] );
	  }
	 }
	return 'none';
		}
		function xoSetCookie( name, value )
		{
	 var cookieName = 'XoMorpho_' + name;
	 var expires = new Date();
	 expires.setTime( expires.getTime() + (365 * 24 * 60 * 60 * 1000));
	 document.cookie = cookieName + "=" + value + "; expires=" + expires + ";";
    }
/* show hide popup id */
	function XoHideDiv(id) {
		if (document.getElementById(id)) { // DOM3 = IE5, NS6
		document.getElementById(id).style.visibility = 'hidden';
		}
		else {
			if (document.layers) { // Netscape 4
			document.getElementById(id).visibility = 'hidden';
			}
			else { // IE 4
			document.all.getElementById(id).style.visibility = 'hidden';
			}
		}
	}
	
	function XoShowDiv(id) {
		if (document.getElementById(id)) { // DOM3 = IE5, NS6
		document.getElementById(id).style.visibility = 'visible';
		}
		else {
			if (document.layers) { // Netscape 4
			document.getElementById(id).visibility = 'visible';
			}
			else { // IE 4
			document.all.getElementById(id).style.visibility = 'visible';
			}
		}
	}
	

/* Tag script found at : http://www.siteduzero.com/tutoriel-3-34703-insertion-de-balises-dans-une-zone-de-texte.html */
function insertTag(startTag, endTag, tag, tagType) {
	var field = document.getElementById(tag);
	var scroll = field.scrollTop;
	field.focus();

	if (window.ActiveXObject) { // C'est IE
		var textRange = document.selection.createRange();            
		var currentSelection = textRange.text;

		textRange.text = startTag + currentSelection + endTag;
		textRange.moveStart("character", -endTag.length - currentSelection.length);
		textRange.moveEnd("character", -endTag.length);
		textRange.select();     
	} else { // c'est pas IE.
		var startSelection   = field.value.substring(0, field.selectionStart);
		var currentSelection = field.value.substring(field.selectionStart, field.selectionEnd);
		var endSelection     = field.value.substring(field.selectionEnd);
		if (currentSelection == "") { currentSelection = "TEXTE"; }
		field.value = startSelection + startTag + currentSelection + endTag + endSelection;
		field.focus();
		field.setSelectionRange(startSelection.length + startTag.length, startSelection.length + startTag.length + currentSelection.length);
	}
	field.scrollTop = scroll;
}

function reply(code) {
	var field = document.getElementById('form-commentaire').getElementsByTagName('textarea')[0];
	field.focus();
	if (field.value !== '') {
		field.value += '\n\n';
	}
	field.value += code;
	field.scrollTop = 10000;
	field.focus();
}

function resize(id, dht) {
	var elem = document.getElementById(id);
	var ht = elem.offsetHeight;
	size = Number(ht)+Number(dht);
	elem.style.height = size+"px";
	return false;
}