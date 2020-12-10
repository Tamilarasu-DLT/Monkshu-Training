const addErrorBox = (id) => {
	element = document.getElementById(id)
	element.style.border = "1px solid red";
}

const removeErrorBox = (id) => {
	element = document.getElementById(id)
	element.style.border = "1px solid #ccc";
}

const validateInput = (id, value) => {
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
	        return false;
	    }
	    else{
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

const addEvent = (element) => {
	element.addEventListener('focusout', (event) => {
		if(!validateInput(element.id, element.value)){
			addErrorBox(element.id)
		}
	})
}

const sendData = (data) => {
	let xmlhttp = new XMLHttpRequest()
	let url = "localhost:8080/news"
	// xmlhttp.open("POST", url)
	// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	// xmlhttp.send(JSON.stringify(data));
}

let author = document.getElementById("author")
let source = document.getElementById("source")
let url = document.getElementById("url")
let title = document.getElementById("title")
let desc = document.getElementById("desc")

// Event handler adding
addEvent(author)
addEvent(source)
addEvent(url)
addEvent(title)
addEvent(desc)

const isValid = () => {
	if(validateInput(author.id, author.value) && validateInput(source.id, source.value) && validateInput(url.id, url.value) && validateInput(title.id, title.value) && validateInput(desc.id, desc.value)){
		return true
	}
	return false
}

const getData = () => {
	let data = {author: author.value, source: source.value, url: url.value, title: title.value, desc: desc.value}
	return data
}

const submit = () => {
	let data = getData()
	if(isValid()){
		console.log(data)
		sendData(data)
	}
	else{
		console.log("Check all the values are valid")
	}

}