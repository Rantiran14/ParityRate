module.exports = (source, checkinDate, checkoutDate) => {
  let hotelName;
  return source
    .flatMap(Object.entries)
    .reduce((array, [key, value]) => {
      if (key !== 'Hotel')
        return [
          ...array,
          {
            hotelName,
            url: value,
            vendor: key,
            checkinDate,
            checkoutDate
          },
        ];
      else hotelName = value;
      return array;
    }, []);
};
