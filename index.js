const searchBox=document.querySelector("#mName");
const fullInfoBox=document.querySelector(".fullinfo");
const apiKey="76f8f9c9";
const aImageBox=document.querySelector(".aImage")
const threeLineBtn=document.querySelector("#threeLine")

// for responsiveness
let flag=0;
threeLineBtn.addEventListener("click",()=>{
    if(flag==0){
    flag=1;
    document.querySelector(".lists").style.position="absolute"
    document.querySelector(".lists").style.display="flex"
    document.querySelector(".lists").style.flexDirection="column"
    document.querySelector(".lists").style.height="20vh"
    document.querySelector(".lists").style.width="30vw"
    document.querySelector(".lists").style.right="0"
    document.querySelector(".lists").style.top="10vh"
    document.querySelector(".lists").style.fontSize="4vw"
    document.querySelector(".lists").style.zIndex="999"
    document.querySelector(".lists").style.backgroundColor="rgb(43, 20, 20)"

//     const aTags = document.querySelectorAll("a");

// // Loop through each a tag and set the color property to "black"
// aTags.forEach(aTag => {
//     aTag.style.color = "black";
// });

    }
    else{
        flag=0;
        document.querySelector(".lists").style.display="none"

    }
    


    console.log("pressed")
})

const posterMoviesNames=["Avengers: Infinity War","fighter","Loki","RRR","Doctor Strange in the Multiverse of Madness","pathaan","Spider-Man","Animal","The Amazing Spider-Man","K.G.F: Chapter 1","Baahubali: The Beginning"]
let combinePoster=""
async function getPosterUrl(posterImageName){
        
    const reqUrl=`https://www.omdbapi.com/?apikey=${apiKey}&t=${posterImageName}`
    const promise1=await fetch(reqUrl);
    const data=await promise1.json();
    return data.Poster
    
}
// getPosterUrl will return promise 
// creating the array of the promises
// map returns me new array after performing the tasks
//in this case map returns array of the promises 
// promise all function takes the array of the promises and resolves when all the promises is resolved 
const posterArr=[]
posterMoviesNames.forEach((names)=> {
   
    posterArr.push(getPosterUrl(names))
})
Promise.all(posterArr).then((dats)=>{
    dats.forEach((dets,i)=>{
        combinePoster += `<img id='i${i}' src="${dets}" >`
    })
    aImageBox.innerHTML=combinePoster; 
    document.querySelector("#i0").style.display="block";
    changeandgiveposter()
})

function changeandgiveposter(){
let index=0;
setInterval(()=>{
    document.querySelector(`#i${index}`).style.display="none";
    if(index==posterMoviesNames.length-1)
    index=0;
else index++;

    document.querySelector(`#i${index}`).style.display="block";

},1500)
}



searchBox.addEventListener("keyup",(target)=>{
    fullInfoBox.style.display = "flex";
    fullInfoBox.style.flexWrap = "wrap";
    fullInfoBox.style.justifyContent = "space-between";
    fullInfoBox.style.alignContent = "center";
    document.querySelector(".container").style.display="none";
    target.preventDefault();
     const mName=searchBox.value.trim();
     if(mName!=""){
       getMovieDetail(mName).then((dets)=>{
        console.log(dets)
        if(dets.Title==undefined){
            fullInfoBox.innerHTML= `
        <div class="infoOfMovie">
        <div class='innerinfo'>
        <h1>Movie Not Found!!! </h1>
        <h1>Try Entering Correct Name!!!</h1>
        </div></div>
        <div class='searchPoster'><img src="notfound.webp"> </div>`
        }

        else{
        fullInfoBox.innerHTML=`
        <div class="infoOfMovie">
        <div class='innerinfo'>
        <h1>Title         : ${dets.Title}</h1>
        <h1>Release Date  :${dets.Released}</h1>
        <h1>Actors        :${dets.Actors}</h1>
        <h1>imdb Ratings  :${dets.imdbRating}</h1>
        <h1>Runtime       :${dets.Runtime}</h1>
        <h1>Language      :${dets.Language}</h1>

        </div></div>
        <div class='searchPoster'><img src="${dets.Poster}"> </div>
        `}
       })
       .catch(()=>{
        console.log("error fetching the file")
       })
     }
     else{
        fullInfoBox.style.display="none"
        document.querySelector(".container").style.display="flex";
     }
})

// fetching OMDB api 
async function getMovieDetail(mName){
        
        const reqUrl=`https://www.omdbapi.com/?apikey=${apiKey}&t=${mName}`
        const promise1=await fetch(reqUrl);
        const data=await promise1.json();
        return data;
        console.log(data)

}

