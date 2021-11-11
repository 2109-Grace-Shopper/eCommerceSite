import axios from 'axios'

//action type
const GOT_PRODUCT = "GOT_PRODUCT";

//action creator

const setProduct = (product)=> ({
    type: GOT_PRODUCT,
    product
})

//thunk

export const fetchProduct = (productId) => {
    return async (dispatch) => {
        try{
            const {data: product} = await axios.get(`/api/products/${productId}`);
            dispatch(setProduct(product));
            console.log(product, "this is the product returned in the thunk")
        }catch(error){
            console.log("Error in FetchProduct thunk", error)
        }
    }
}

//reducer

export default function singleProductReducer(state = {}, action){
    switch(action.type){
        case GOT_PRODUCT:
            return action.product;
        default:
            return state;
    }
}