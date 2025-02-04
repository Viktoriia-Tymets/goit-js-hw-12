import{a as L,S as w,i as u}from"./assets/vendor-CMB7Fqvg.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const g=r=>`
      <li class="gallery-card">
        <a class="gallery-link"  href="${r.largeImageURL}">
          <img class="gallery-img" src="${r.webformatURL}" alt="${r.tags}" /> 
          <ul class="text-info">

            <li class="image-info">
              <h4>Likes</h4>
              <p>${r.likes}</p>
            </li>

            <li class="image-info">
              <h4>Views</h4>
              <p>${r.views}</p>
            </li>

            <li class="image-info">
              <h4>Comments</h4>
              <p>${r.comments}</p>
            </li>
            
            <li class="image-info">
              <h4>Downloads</h4>
              <p>${r.downloads}</p>
          </ul>
          </a>
      </li>
    `,y=(r,t)=>{const o=new URLSearchParams({q:r,key:"48586897-e2ee4ea242ed1cc66f698b76b",image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:21});return L.get(`https://pixabay.com/api/?${o}`,o)},h=document.querySelector(".search-form"),m=document.querySelector(".gallery"),i=document.querySelector(".load-more");let p="";const n=document.querySelector(".loader"),v=new w(".gallery");let l=1,c="",b=21;i.classList.add("is-hidden");const S=async r=>{try{if(r.preventDefault(),c=h.elements[0].value.trim(),c===""){u.error({title:"",message:"Please enter your request",position:"topRight"});return}l=1,i.classList.add("is-hidden"),n.classList.add("show-loader");const{data:t}=await y(c,l);if(t.total===0){u.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),m.innerHTML="",h.reset();return}t.totalHits>1&&(i.classList.remove("is-hidden"),i.addEventListener("click",f));const o=t.hits.map(a=>g(a)).join("");m.innerHTML=o,v.refresh()}catch(t){console.log(t)}finally{n.classList.remove("show-loader")}};h.addEventListener("submit",S);const f=async r=>{try{const t=document.querySelector(".endResults");n.classList.add("show-loader"),l+=1;const{data:o}=await y(c,l),a=o.hits.map(s=>g(s)).join("");m.insertAdjacentHTML("beforeend",a),n.classList.remove("show-loader"),p=document.querySelector(".gallery-card").getBoundingClientRect();let e=p.height;window.scrollBy({top:e*2,behavior:"smooth"}),l*b>=o.totalHits&&(i.classList.add("is-hidden"),u.show({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"red"}),i.removeEventListener("click",f))}catch(t){console.log(t)}};
//# sourceMappingURL=index.js.map
