function formatMoney(num, digital = 2) {
  num = isNaN(+num) ? 0 : +num;
  return num.toFixed(digital).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export default formatMoney;