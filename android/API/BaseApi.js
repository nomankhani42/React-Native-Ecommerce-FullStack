import axios from "axios";


export const API=axios.create({
    baseURL:'https://backend-for-react-native-full-stack.vercel.app'
})