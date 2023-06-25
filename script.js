document.addEventListener('DOMContentLoaded', function(){
const slider = document.getElementById("slider");
const valueDisplay = document.querySelector(".sliderValue");
const pageViewsDisplay = document.querySelector(".sliderPageViews");
const billingToggle = document.getElementById("billingToggle");
const toggleText = document.querySelector(".toggleText");


const pricePerStep = 4;
const pageViewsPerStep = 50000;

billingToggle.addEventListener('change', updateBilling);

function updateBilling() {
    const sliderValue = parseInt(slider.value);
    const steps = (sliderValue - slider.min) / slider.step;
    const pageViews = calculatePageviews(steps);
    const monthlyPrice = calculatePrice(steps);
    const yearlyPrice = monthlyPrice * 12;


    toggleText.textContent = billingToggle.checked ? "Yearly Billing" : "Monthly Billing";
    valueDisplay.innerHTML = billingToggle.checked ? `$${yearlyPrice.toFixed(2)}<span class="sidekick"> /year</span>` : `$${monthlyPrice.toFixed(2)}<span class="sidekick"> /month</span>`;
    pageViewsDisplay.textContent = `${formatPageViews(pageViews)} PAGEVIEWS`;
}

function calculatePrice(steps) {
    return 10 + steps * pricePerStep;
}

function calculatePageviews(steps) {
  const billingFactor = billingToggle.checked ? 12 : 1;
    return (100000 + steps * pageViewsPerStep) * billingFactor;
}

function formatPageViews(pageViews) {
    if (pageViews >= 1000000) {
      return `${(pageViews / 1000000).toFixed(1)}M`;
    } else if (pageViews >= 1000) {
      return `${(pageViews / 1000).toFixed(1)}K`;
    } else {
      return pageViews;
    }
  }


slider.addEventListener('input', updateSlider);

function updateSlider() {
    const sliderValue = parseInt(slider.value);
    const steps = (sliderValue - slider.min) / slider.step;
    const pageViews = calculatePageviews(steps);;
    const monthlyPrice = calculatePrice(steps);
    const yearlyPrice = monthlyPrice * 12;

    valueDisplay.innerHTML = billingToggle.checked ? `$${yearlyPrice.toFixed(2)}<span class="sidekick"> /year</span>` : `$${monthlyPrice.toFixed(2)}<span class="sidekick"> /month</span>`;
    pageViewsDisplay.textContent = `${formatPageViews(pageViews)} PAGEVIEWS`;
    }
    
    
    updateBilling();

});