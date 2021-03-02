
// for switch iamges in firt section
let count=0;
setInterval(()=>{
let array=["img1.png","img2.png"];
count++;
imgsrc.src=array[count%2]

},5000);

//----------------------
let food_json=localStorage.getItem("food_array");
let food_array_from_json=JSON.parse(food_json);

// for foods table
let input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
  if(!(input.value=="" || input.value==" ")){// if user doesnt type anything in text field.

    // Cancel the default action, if needed
    event.preventDefault();
    let table, tr, td, i, txtValue;
    table = document.getElementById("tbody");
    for (let item of food_array_from_json) {
        if(item.food.toLowerCase().includes(input.value.toLowerCase()))
        {
          let row=document.createElement("tr");
          console.log(item.food)
          row.innerHTML=`<td> ${item.food}</td>
          <td> ${item.calories}</td>
            <td> ${item.measure}</td>
              <td> ${item.grams}</td>
          <td><button type="button" name="button" data-id=${item.id}   onclick="showModel(${item.id})">CHART</button></td>`

          table.append(row);
        }
      }
      let tbodyRowCount = myTable.tBodies[0].rows.length;
      if(tbodyRowCount==0){
        textMsg.style.display="block";
      }else{
          textMsg.style.display="none";
      }
    }else{
      alert("plz fill the search text.")
    }

  }else{
    tbody.innerHTML="";
  }
});


// draw a chart .
  function createContext(width, height) {
      let canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.id="myChart"
      canvasContainer.innerHTML="";
      canvasContainer.append(canvas);
      return canvas.getContext("2d");
  }
function showModel(id){
    modal.style.display = "block";
    drawChart(id);
}

  function drawChart(id){
  let ctx = createContext(500,500);
  let item=food_array_from_json.find(x => x.id === id)
  console.log(item);
  let myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['protein', 'fat', 'sat-fat', 'carbs', 'fiber'],
          datasets: [{
              data:  [item.protein, item.fat, item.sat_fat, item.carbs, item.fiber],
              backgroundColor: [
                  '#e76f51',
                  '#f4a261',
                  '#e9c46a',
                  '#2a9d8f',
                  '#264653',

              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',

              ],
              borderWidth: 0.5
          }]
      },
      options: {
        title: {
           display: true,
           fontsize: 30,
           text: `Nutritional Facts for ${item.food}`
        },
        legend: {
           display: true,
           position: 'bottom',

        },
        responsive: false,
      animation:{
        animateScale:true
      }

      }
  });

}
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {

  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {

    modal.style.display = "none";
  }
}
let date=new Date().getFullYear();
year.innerText=`${date}`;
//-------------------------------------------------------------------
// program to sort array by property name
function compareCarbs(a, b) {
    return a.carbs - b.carbs;
}
function compareFat(a, b) {
    return a.fat - b.fat;
}
function compareFiber(a, b) {
    return a.fiber - b.fiber;
}
function compareProtein(a, b) {
    return a.protein - b.protein;
}

//-------------------------------------------------------------------
// let food_json=localStorage.getItem("food_array");
// let food_array_from_json=JSON.parse(food_json);

food_array_from_json.sort(compareCarbs);
let carbs_array=food_array_from_json.slice(330);
console.log(carbs_array)
let carbs_array_names=[];
let carbs_array_values=[];
for(let item of carbs_array){
  carbs_array_names.push(item.food);
  carbs_array_values.push(item.carbs);
  console.log(item.food,item.carbs);
}
console.log(carbs_array_names,carbs_array_values);
var ctx = document.getElementById('carbs_canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: carbs_array_names,
        datasets: [{
            label: '# of carbs',
            data: carbs_array_values,
            backgroundColor: [
                '#e76f51',
                '#2a9d8f',
                '#e9c46a',
                '#264653',
                '#79942e',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
          display: true,
          fontsize: 30,
          text: '5 items of food high in carbs'
      },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//------------------------------------------------------------------------------
food_array_from_json.sort(compareProtein);
let protein_array=food_array_from_json.slice(330);
let protein_array_names=[];
let protein_array_values=[];
for(let item of protein_array){
  protein_array_names.push(item.food);
  protein_array_values.push(item.protein);
  console.log(item.food,item.protein);
}
var ctx = document.getElementById('protein_canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: protein_array_names,
        datasets: [{
            label: '# of protein',
            data: protein_array_values,
            backgroundColor: [
                '#e76f51',
                '#2a9d8f',
                '#e9c46a',
                '#264653',
                '#79942e',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
          display: true,
          text: '5 items of food high in protein'
      },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//-----------------------------------------------------------
food_array_from_json.sort(compareFiber);
let fiber_array=food_array_from_json.slice(330);
console.log(fiber_array)
let fiber_array_names=[];
let fiber_array_values=[];
for(let item of fiber_array){
  fiber_array_names.push(item.food);
  fiber_array_values.push(item.fiber);
  console.log(item.food,item.fiber);
}

var ctx = document.getElementById('fiber_canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: fiber_array_names,
        datasets: [{
            label: '# Fiber',
            data: fiber_array_values,
            backgroundColor: [
                '#e76f51',
                '#2a9d8f',
                '#e9c46a',
                '#264653',
                '#79942e',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
          display: true,
          text: '5 items of food high in fiber'
      },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
//------------------------------------------------------------------------------

food_array_from_json.sort(compareFat);
let fat_array=food_array_from_json.slice(330);
let fat_array_names=[];
let fat_array_values=[];
for(let item of fat_array){
  fat_array_names.push(item.food);
  fat_array_values.push(item.fat);
  console.log(item.food,item.fat);
}
console.log(fat_array_names,fat_array_values);
var ctx = document.getElementById('fat_canvas').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: fat_array_names,
        datasets: [{
            label: '# of fat',
            data: fat_array_values,
            backgroundColor: [
                '#e76f51',
                '#2a9d8f',
                '#e9c46a',
                '#264653',
                '#79942e',

            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
          display: true,
          text: '5 items of food high in fat'
      },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
