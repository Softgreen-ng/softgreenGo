const setPhoneFormat = (phone) => {
    return phone.replace("+","")  
}
const getProductMeasure = (unit) => {
    if(unit == "kilo" )
        return "kg"
    if(unit == "grams" )
        return "g"
    return ""
}
// const getFullProductName = (product) => {
//     const unit = getProductMeasure(product.unit)
//     return product.title + (product.weight ? product.weight : '') + unit
// }

export { setPhoneFormat , getProductMeasure}