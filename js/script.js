var count1 = 0;
$('#cat1_img').click(function(e) {
  //the element has been clicked... do stuff here
  count1++;
  $('#cc1').text('Clicker count:'+count1);
});
var count2 = 0;
$('#cat2_img').click(function(e) {
  //the element has been clicked... do stuff here
  count2++;
  $('#cc2').text('Clicker count:'+count2);
});

var cat_img = [
    "img/cat1.jpg",
    "img/cat2.jpg",
    "img/cat3.jpg"
];
var count = [0, 0, 0];

// clear the screen for testing
document.body.innerHTML = '';
document.body.style.background="white";

var nums = [1,2,3];

// Let's loop over the numbers in our array
for (var i = 0; i < nums.length; i++) {

    // We're creating a DOM element for the number
    var div_elem = document.createElement('div');

    // Add cat's name
    var cat_name = document.createElement('h1');
    cat_name.textContent = 'Cat '+(i+1);
    div_elem.appendChild(cat_name);

    // Add cat's image
    var cat_pic = document.createElement('img');
    cat_pic.setAttribute('src',cat_img[i]);
    var cat_count = document.createElement('h2');
    cat_count.textContent = 'Click the cat';
    cat_pic.addEventListener('click', (function(count, elem) {
    return function() {
        count++;
        elem.textContent = 'Click count: '+count;
    };
    })(count[i],cat_count));
    div_elem.appendChild(cat_pic);
    div_elem.appendChild(cat_count);

    // finally, let's add this element to the document
    document.body.appendChild(div_elem);
};