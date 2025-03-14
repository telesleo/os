export const time: { value: number } = $state({
  value: 0,
});

function updateTime() {
  time.value = new Date().getTime();
}

setInterval(updateTime, 1000);

updateTime();

export default time;
