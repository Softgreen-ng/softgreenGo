export default {
    methods: {
        getFullProductName(product){
            const unit = this.getProductMeasure(product.unit)
            return product.title + " " + (product.weight ? product.weight : '') + unit
        },
        getProductMeasure(unit){
            if(unit == "kilo" )
                return "kg"
            if(unit == "grams" )
                return "g"
            return ""
        }
    }
}