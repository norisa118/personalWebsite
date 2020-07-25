const TypeWriter = function(txtElement, words, wait = 3000) {
 this.txtElement = txtElement; 
 this.words = words;
 this.txt = ''; 
 this.wordIndex=0;
 this.wait = parseInt(wait, 10); 
 this.type(); 
 this.isDeleting = false; 
}

//Typing 
TypeWriter.prototype.type = function(){
    // words index: 
    const currInd = this.wordIndex % this.words.length;
    const full = this.words[currInd]; 
    if(this.isDeleting){
        //delete a character 
        this.txt = full.substring(0, this.txt.length - 1); 

    } else{
        //add
        this.txt = full.substring(0, this.txt.length + 1); 
    }

    //inserting into element: 
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 
   
    // Speed, puse when it ends and deltes faster, so it is dynamic: 
    let typeSpeed = 300; 

    if(this.isDeleting){
        typeSpeed /= 2; 
    }

    if(!this.isDeleting && this.txt === full){
        typeSpeed = this.wait; 
        this.isDeleting = true; 
    } else if(this.isDeleting && this.txt === ''){
        //change the word index
        this.isDeleting = false; 
        this.wordIndex++;
        typeSpeed = 500; 
    }

    setTimeout(()=> this.type(), typeSpeed); 
}

//Initializing:
document.addEventListener('DOMContentLoaded', init);
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words')); 
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement,words,wait); 
}