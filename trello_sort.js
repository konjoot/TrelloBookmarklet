// ==UserScript==
// @name			Trello : Sorted cards
// @author			konjoot
// @version			0.2
// @include			https://trello.com/*/cards
// @include			http://trello.com/*/cards
// @grant				none
// ==/UserScript==

var TAG_NAME = 'sorted-cards-0.2-css'

//Allowed labels: red, purple, orange, yellow, blue, green, other(for cards without any label)

var BODY_LABELS = {orange: [], yellow: [], blue: [], other: [], green: []}; //order in which cards will be sorted inside HEAD_LABELS blocks

var HEAD_LABELS = {red: BODY_LABELS, purple: BODY_LABELS, other: BODY_LABELS}; //for these json you must define css styles (class names in CSS must be same as keys in this json), like that:

var CSS_STRING = '\
.red{\
	background: none repeat scroll 0 0 rgba(244, 78, 78, 0.2);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}\
.purple{\
	background: none repeat scroll 0 0 rgba(153, 51, 204, 0.1);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}\
.other{\
	background: none repeat scroll 0 0 rgba(82, 121, 214, 0.2);\
	float: left;\
	margin-bottom: 10px;\
	padding: 10px 0 0 10px;\
	width: 99%;\
}';


function addJavascript(pos, funct) {
	$.get( "https://rawgithub.com/konjoot/TrelloBookmarklet/master/libs/mutation_summary_min.js", function( data, callback ) {
		$(pos).append('<script type="text/javascript">' + data + '</script>');
		funct();
	});
}

function sortCards(cards){

	$('.js-cards-content div.float-cards').each(function(){
		var container = $(this);
		container.find('div.list-card-container').each(function(){
			var card = $(this)
			$.each(cards, function(key, val){
				if(card.find('span.' + key + '-label').length > 0){
					if(card.find('span.orange-label').length > 0){
						cards.red.orange.push(card.detach());
					}else if(card.find('span.yellow-label').length > 0){
						cards.red.yellow.push(card.detach());
					}else if(card.find('span.blue-label').length > 0){
						cards.red.blue.push(card.detach());
					}else if(card.find('span.green-label').length > 0){
						cards.red.green.push(card.detach());
					}else{
						cards.red.other.push(card.detach());
					}
				}
			});
			if(card.find('span.red-label').length > 0){
				if(card.find('span.orange-label').length > 0){
					cards.red.orange.push(card.detach());
				}else if(card.find('span.yellow-label').length > 0){
					cards.red.yellow.push(card.detach());
				}else if(card.find('span.blue-label').length > 0){
					cards.red.blue.push(card.detach());
				}else if(card.find('span.green-label').length > 0){
					cards.red.green.push(card.detach());
				}else{
					cards.red.other.push(card.detach());
				}
			}else if(card.find('span.purple-label').length > 0){
				if(card.find('span.orange-label').length > 0){
					cards.purple.orange.push(card.detach());
				}else if(card.find('span.yellow-label').length > 0){
					cards.purple.yellow.push(card.detach());
				}else if(card.find('span.blue-label').length > 0){
					cards.purple.blue.push(card.detach());
				}else if(card.find('span.green-label').length > 0){
					cards.purple.green.push(card.detach());
				}else{
					cards.purple.other.push(card.detach());
				}
			}else{
				if(card.find('span.orange-label').length > 0){
					cards.other.orange.push(card.detach());
				}else if(card.find('span.yellow-label').length > 0){
					cards.other.yellow.push(card.detach());
				}else if(card.find('span.blue-label').length > 0){
					cards.other.blue.push(card.detach());
				}else if(card.find('span.green-label').length > 0){
					cards.other.green.push(card.detach());
				}else{
					cards.other.other.push(card.detach());
				}
			}
		});
		var red = $('<div class="red"></div>');
		var purple = $('<div class="purple"></div>');
		var other = $('<div class="other"></div>');
		$.each(cards.red, function(){
			while(this.length > 0){
				$(this.shift()).appendTo($(red));
			}
		});
		$.each(cards.purple, function(){
			while(this.length > 0){
				$(this.shift()).appendTo($(purple));
			}
		});
		$.each(cards.other, function(){
			while(this.length > 0){
				$(this.shift()).appendTo($(other));
			}
		});
		$.each([red, purple, other], function(){
			if(this.find('div.list-card-container').length > 0){
				container.append(this);
			}
		});
	});
}

function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
			return;
	var style=document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.setAttribute('id', TAG_NAME);
	style.appendChild(document.createTextNode(cssToInsert));
	var old_style = document.getElementById(TAG_NAME);
	if(old_style){
			head.replaceChild(style, old_style);
	}else{
			head.appendChild(style);
	}
}

function initSort(){
	var observer = new MutationSummary({
		callback: sortCards(HEAD_LABELS),
		queries: [{
			element: '.window-module'
		}]
	});
}

$(insertCSS(CSS_STRING));
$(sortCards(HEAD_LABELS));
addJavascript('head', initSort);
