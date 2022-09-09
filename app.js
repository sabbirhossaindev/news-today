const noData = document.getElementById('noData')
const spinner = document.getElementById('spinner')
 function catagory(){
    try{
      fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
    spinner.classList.remove('d-none');
    }
    catch{
      console.log('not data available')
    }
 }

 // -------------------------displayCatagory---------------------
 const displayCatagory = (catagories) =>{
  
    const catagorySection = document.getElementById('catagorySection');
    catagories.forEach(catagory => {
      const phoneDiv  = document.createElement('li');
        phoneDiv.classList.add('px-3');
        phoneDiv.classList.add('hoverr')
        phoneDiv.innerHTML = `
        <a onclick="displayNews('${catagory.category_id}')">${catagory.category_name}</a>
        `;
         
       catagorySection.appendChild(phoneDiv)
       spinner.classList.add('d-none');
    });

};


// -----------------------displayNews.........................
const displayNews = (ami)=>{
 
    try{
      const url = `https://openapi.programming-hero.com/api/news/category/${ami}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.data)
      let emp = data.data;
      emp.sort((a, b) => b.total_view - a.total_view);

    emp.forEach((e) => {
        console.log(`${e} , ${e.total_view}`);
   });

      Blockdisplay(data.data)
    });
    spinner.classList.remove('d-none');
    }
    catch{
      console.log('not data available')
    }
};

// ........................Blockdisplay........................

const Blockdisplay = (data) => {
const total = data.length;
 document.getElementById('data').innerText = total;

const News = document.getElementById('NewsPart');
News.textContent = '';

if(total >0){
data.forEach(news =>{

let details = '';
if(news.details.length >= 200){
  details = news.details.slice(0,200) + '...'
}
else{
    details = news.details;
}
const Extra = document.createElement('div');

Extra.classList.add('row');
Extra.innerHTML = `
<div class="col-md-12 my-5 cardd">
        <div class="row">
            <div class="col-md-4">
                <img class="w-100" src=${news.image_url} alt="">
            </div>
            <div class="col-md-8">
                <h3>${news.title}</h3>
                <p class="py-3">${details}</p>
                <div class="row">
                    <div class="col-md-4">
                        <div class="d-flex">
                            <img class="h-100 author" src=${news.author.img} alt="">
                            <div class="px-3">
                                <p>${news.author.name ? news.author.name : 'no data available'}</p>
                                <p>${news.author.published_date ?news.author.published_date : 'no data available' }</p>
                             </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="d-flex text-left">
                           
                            <div>
                                <p><i class="fa-regular fa-eye"></i> ${news.total_view ?news.total_view : 'no data available' }</p>
                             </div>
                        </div>

                    </div>
                    <div class="col-md-2">
                        <h5 onclick="loadNewsDetails('${news._id}')" class="title" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-sharp fa-solid fa-arrow-right text-primary"></i></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
News.appendChild(Extra)
// ......................spinner d-none.......................
spinner.classList.add('d-none');
noData.classList.add('d-none');
});

}

else{
  noData.classList.remove('d-none')
  spinner.classList.add('d-none');
}

};
// ----------------------modal---------------------- 

const loadNewsDetails = async news_id => {
const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
const res = await fetch(url);
const data = await res.json();
displayNewsDetails(data.data[0]);
}

const displayNewsDetails = newsDetails => {
const modalTitle = document.getElementById('exampleModalToggleLabel');
modalTitle.innerText = newsDetails.title;

const modelDetails = document.getElementById('modal-main-body');
modelDetails.innerHTML = `
<div class="card" >
<img src="${newsDetails.thumbnail_url}" class="card-img-top" alt="...">
<div class="card-body">
<p class="card-text">${newsDetails.details}</p>
</div>
</div>

<div class="my-4" >
    <div class="d-flex justify-content-between row g-0">
        <div class="col-md-2">
            <img src="${newsDetails.author.img ? newsDetails.author.img : 'The Author Image Is Not Founded'}" style="width: 50px; height: 50px;" class="rounded-circle" alt="...">
        </div>
        <div class="col-md-6">
            <h5 class="title">${newsDetails.author.name ? newsDetails.author.name : 'The Author Name Is Not Founded'}</h5>
            <p class="text">${newsDetails.author.published_date ? newsDetails.author.published_date : 'Author Publishing Date Is Not Founded'}</p>

        </div>

        <div class="col-md-4">
            <h5 class="title"><i class="fa-regular fa-eye"></i> ${newsDetails.total_view ? newsDetails.total_view : 'Total View Is Not Founded'}</h5>
        </div>
    </div>
</div>
`;
};

catagory();