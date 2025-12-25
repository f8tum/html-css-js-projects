const display = document.getElementById("display");

function appendToDisplay(input) 
{
  display.value += input;
}

function clearDisplay()
{
  display.value = "";
}

function calculate()
{
  if (display.value == "")
      display.value = "Error"
  else
  {
    try 
    {
      display.value = eval(display.value);  
    } 
    catch (error) 
    {
      display.value = "Error press AC";
    }
  }
}

document.querySelectorAll('button').forEach(btn => {
  btn.onclick = () => {
    if (btn.textContent === '=') 
      calculate();
    else if (btn.textContent === 'AC') 
      clearDisplay();
    else 
      appendToDisplay(btn.textContent);
  };
});
