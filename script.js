const apiKey = "cur_live_yHbDap7glOa3dI5IQUMFEQvnWPhqyoRU005MVskV";
const apiURL = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`;
const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=";

const dropdowns = document.querySelectorAll(".dropdown select ");
const btn = document.querySelector(".btn");
const fromcurr= document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg = document.querySelector(".msg");


for ( let select of dropdowns){
    for ( currCode in countryList ){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if ( select.name=== "from" && currCode==="USD"){
        newOption.selected = "selected";
    } else if ( select.name=== "to" && currCode==="INR"){
        newOption.selected = "selected";
    };
    select.append(newOption);
  };
 select.addEventListener("change" , (evt) => {
    updateFlag(evt.target);
 });
};

const  updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    //console.log(element);
    img.src = newSrc;
};

btn.addEventListener("click" ,   (evt) => {
    evt.preventDefault();
    updateExachnageRate();
    
});

const updateExachnageRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVlu= amount.value;
    if (amtVlu ==="" || amtVlu < 1){
        amtVlu = 1;
        amount.value = "1";
    };

      //console.log(fromcurr.value , tocurr.value);
    const URL = `${apiURL}&base_currency = ${fromcurr.value}&currencies=${tocurr.value}`;
    try {
        let response = await fetch(URL);
        let data = await response.json();

        // API ka rate nikalna
        let rate = data.data[tocurr.value].value;
        let finalAmount = (amtVlu * rate).toFixed(2);

        // Result console me aur UI me
        console.log(`${amtVlu} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`);
        document.querySelector(".msg").innerText =
          `${amtVlu} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;

      } catch (error) {
        console.error("Error fetching data:", error);
    };
}
  window.addEventListener ("load", () =>{
    updateExachnageRate();
  });
