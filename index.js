const jsonData = "/data.json";

let summary = "";
let result = "";
let average = 0;

const getSummary = (data) => {
  summary = data.map(({ score, category, icon }) => {
    return `
   <div class="result-summary__summary--item ${category}">
     <div>
       <img
         src=${icon}
       />
       <p class="bold">${category}</p>
     </div>
     <div class="bold">${score}<span> / 100</span></div>
   </div>
   `;
  });

  const finalContent = `<h3>Summary</h3>${summary.join(
    ""
  )}<button class="bold">Continue</button>`;

  document.querySelector(".result-summary__summary").innerHTML = finalContent;
};

const getResults = (data) => {
  const average = data.reduce((acc, { score }) => acc + score, 0) / data.length;

  result = `<h3>Your Result</h3>
  <div class="circle">
    <p class="bold">${average.toPrecision(2)}</p>
    <span>of 100</span>
  </div>
  <div class="result-summary__description">
    <p class="bold title">Great</p>
    <p>
      You scored higher than 65% of the people who have taken these
      tests.
    </p>
  </div>`;

  document.querySelector(".result-summary__your-result").innerHTML = result;
};

fetch(jsonData)
  .then((response) => response.text())
  .then((text) => {
    const data = JSON.parse(text);

    getSummary(data);
    getResults(data);
  });
