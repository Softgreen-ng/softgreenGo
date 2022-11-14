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

export { setPhoneFormat , getProductMeasure}