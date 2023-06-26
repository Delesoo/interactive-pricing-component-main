document.addEventListener('DOMContentLoaded', function(){
const slider = document.getElementById("slider");
const valueDisplay = document.querySelector(".sliderValue");
const pageViewsDisplay = document.querySelector(".sliderPageViews");
const billingToggle = document.getElementById("billingToggle");
const toggleText = document.querySelector(".toggleText");
const toggleSlider = document.querySelector(".toggleSlider");


const pricePerStep = 4;
const pageViewsPerStep = 50000;

billingToggle.addEventListener('change', updateBilling);

billingToggle.addEventListener('change', function(){
  toggleSlider.style.transform = billingToggle.checked ? "translateX(26px)" : "translateX(0)";
});

function updateBilling() {
    const sliderValue = parseInt(slider.value);
    const steps = (sliderValue - slider.min) / slider.step;
    const pageViews = calculatePageviews(steps);
    const monthlyPrice = calculatePrice(steps);
    const yearlyPrice = monthlyPrice * 12;


    const toggleLabel = document.querySelector('.toggle-label');
    toggleLabel.classList.toggle('yearly-billing', billingToggle.checked);

    toggleText.innerHTML = `${billingToggle.checked ? '' : ''}${billingToggle.checked ? '' : ''}`;

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