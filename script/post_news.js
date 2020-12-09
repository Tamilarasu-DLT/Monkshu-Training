var addErrorBox = (id) => {
	element = document.getElementById(id)
	element.style.border = "1px solid red";
}

var removeErrorBox = (id) => {
	element = document.getElementById(id)
	element.style.border = "1px solid #ccc";
}

var validateInput = (id, value) => {
	if(id === "author" || id === "source"){
		let len = value.length
		let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
		if(len >= 4 && len <=20 && !format.test(value)){
			removeErrorBox(id)
			return true
		}
	}
	else if(id === "title"){
		let len = value.length
		if(len >= 15 && len <=65){
			removeErrorBox(id)
			return true
		}
	}
	else if(id === "url"){
		let val = value
		let res = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	    if(res == null){
	    	console.log("Its null")
	        return false;
	    }
	    else{
	    	console.log("Its true", res)
	    	removeErrorBox(id)
	        return true;
	    }
	}
	else if(id === "desc"){
		let len = value.length
		if(len >= 30 && len <= 150){
			removeErrorBox(id)
			return true
		}
	}
	return false

}

var addEvent = (element) => {
	element.addEventListener('focusout', (event) => {
		if(!validateInput(element.id, element.value)){
			addErrorBox(element.id)
		}
	})
}

var sendData = (data) => {
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

// Event handler adding
addEvent(author)
addEvent(source)
addEvent(url)
addEvent(title)
addEvent(desc)

var isValid = () => {
	console.log(validateInput(author.id, author.value), validateInput(source.id, source.value), validateInput(url.id, url.value), validateInput(title.id, title.value), validateInput(desc.id, desc.value)) 
	if(validateInput(author.id, author.value) && validateInput(source.id, source.value) && validateInput(url.id, url.value) && validateInput(title.id, title.value) && validateInput(desc.id, desc.value)){
		return true
	}
	return false
}

var getData = () => {
	data = {author: author.value, source: source.value, url: url.value, title: title.value, desc: desc.value}
}

var submit = () => {
	var data = getData()
	if(isValid()){
		sendData(data)
	}
	else{
		console.log("Check all the values are valid")
	}

}