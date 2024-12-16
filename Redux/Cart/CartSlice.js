import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState:{
              items:[],
              netAmount:0,
              qty:0
  },
  reducers: {
    addToCart:(state, action) => {
      console.log(state)
      const newItem = action.payload;
      // console.log(state)
      if(state.items==undefined){
       state.items=[];
      }

      
      
      const existingItem = state.items.find(item => item._id === newItem._id);

      
      if (existingItem) {
        // If item already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart
         state.items.push(newItem);
         
      }
       let amount=0;
      state.items.map((item)=>amount+=item.price*item.quantity)

      state.netAmount=amount;

      let quantity=0;
      state.items.map((item)=>quantity+=item.quantity)
      state.qty=quantity;
      return state;

    },
    removeProductFromCart: (state, action) => {
         console.log(action.payload)

     items =state.items.filter((item)=>item._id!==action.payload);
     state.items=items;
     let amount=0;
     state.items.map((item)=>amount+=item.price*item.quantity)

     state.netAmount=amount;

     let quantity=0;
      state.items.map((item)=>quantity+=item.quantity)
      state.qty=quantity;
     return state;
     
      
    },
    increaseQuantity:(state,action)=>{
          const index=state.items.findIndex((item)=>item._id===action.payload);
          state.items[index].quantity+=1;
          let amount=0;
          state.items.map((item)=>amount+=item.price*item.quantity)
    
          state.netAmount=amount;
          return state;
    },
    decraseQuantity:(state,action)=>{
      const index=state.items.findIndex((item)=>item._id===action.payload);
        if(state.items[index].quantity==1){
          console.log('removed why')
          state.items= state.items.filter((item)=>item._id!==action.payload);
          let amount=0;
          state.items.map((item)=>amount+=item.price*item.quantity)
    
          state.netAmount=amount;
          return state;
        }
        else{
          state.items[index].quantity-=1;
          let amount=0;
          state.items.map((item)=>amount+=item.price*item.quantity)
    
          state.netAmount=amount;
          return state;
        }
       
    },
    clearCart: (state, action) => {
        state.items=[];
        let amount=0;
        state.items.map((item)=>amount+=item.price*item.quantity)
  
        state.netAmount=amount;
        state.qty=0;
        return state;
    }
  }
});

export const { addToCart,increaseQuantity,decraseQuantity, removeProductFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;