const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); 
  const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); 
  const lastDayofLastMonth = new Date(currYear, currMonth, 0).getDate(); 

  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDayofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    const isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear();
    const dayOfWeek = new Date(currYear, currMonth, i).getDay();
    const weekendClass = (dayOfWeek === 0 || dayOfWeek === 6) ? "weekend" : "";
    liTag += `<li class="${isToday ? "active" : ""} ${weekendClass}">${i}</li>`;
  }

  const remainingDays = 7 - ((firstDayofMonth + lastDateofMonth) % 7);
  if (remainingDays < 7) {
    for (let i = 1; i <= remainingDays; i++) {
      liTag += `<li class="inactive">${i}</li>`;
    }
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`; 
  daysTag.innerHTML = liTag; 
};

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0) {
      currMonth = 11;
      currYear--;
    } else if (currMonth > 11) {
      currMonth = 0;
      currYear++;
    }
    renderCalendar();
  });
});

