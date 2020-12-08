function addErrorBox(element){
	// element = document.getElementById(id)
	element.style.border = "1px solid red";
}

function removeErrorBox(element){
	element.style.border = "1px solid #ccc";
}

function validateInput(ele){
	if(ele.id === "author" || ele.id === "source"){
		let len = ele.value.length
		let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		if(len >= 4 && len <=20 && !format.test(ele.value)){
			removeErrorBox(ele)
			return true
		}
	}
	else if(ele.id === "title"){
		let len = ele.value.length
		if(len >= 15 && len <=65){
			removeErrorBox(ele)
			return true
		}
	}
	else if(ele.id === "url"){
		let val = ele.value
		let res = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	    if(res == null){
	    	console.log("Its null")
	        return false;
	    }
	    else{
	    	console.log("Its true", res)
	    	removeErrorBox(ele)
	        return true;
	    }
	}
	else if(ele.id === "desc"){
		let len = ele.value.length
		if(len >= 30 && len <= 150){
			removeErrorBox(ele)
			return true
		}
	}
	return false

}

function addEvent(ele){
	ele.addEventListener('focusout', (event) => {
		if(!validateInput(ele)){
			addErrorBox(ele)
		}
	})
}

function sendData(data){
	var xmlhttp = new XMLHttpRequest()
	var url = "localhost:8080/news"
	// xmlhttp.open("POST", url)
	// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	// xmlhttp.send(JSON.stringify(data));
}

var author = document.getElementById("author")
var source = document.getElementById("source")
var url = document.getElementById("url")
var title = document.getElementById("title")
var desc = document.getElementById("desc")

addEvent(author)
addEvent(source)
addEvent(url)
addEvent(title)
addEvent(desc)

function sanitize(){
	if(validateInput(author) && validateInput(source) && validateInput(url) && validateInput(title) && validateInput(desc)){
		data = {author: author.value, source: source.value, url: url.value, title: title.value, desc: desc.value}
		sendData(data)
	}
	else{
		console.log("Check all the values are true")
	}
}