const formatMoney = (money: string) => {
  const convertedMoney = parseInt(money);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    currencySign: "accounting",
    minimumFractionDigits: 0,
  });

  const formattedMoney = formatter.format(convertedMoney);

  return formattedMoney;
};

export default formatMoney;
