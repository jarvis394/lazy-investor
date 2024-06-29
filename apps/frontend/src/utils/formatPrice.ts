const formatPrice = (price: number): string => {
  const stringPrice = price.toString()
  let res = ''
  let count = 0

  for (let i = stringPrice.length - 1; i >= 0; i--) {
    const shouldAddSpace = count !== 0 && count % 3 === 0
    res = `${stringPrice[i]}${shouldAddSpace ? ' ' : ''}${res}`
    count++
  }

  return res
}

export default formatPrice
