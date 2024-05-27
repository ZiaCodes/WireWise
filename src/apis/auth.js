import client from "./client";

export const signInUser = async(userInfo) =>{

    try {
        const {data} = await client.post('/user/sign-in',userInfo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

export const createNewUser = async(userInfo) =>{

    try {
        const {data} = await client.post('/user/createUserByAdmin',userInfo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

export const getAllUsers = async() =>{

    try {
        const {data} = await client.get('/user/get-all-user');
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

export const forgetPassword = async(email) =>{

    try {
        const {data} = await client.post('/user/forget-password',{email});
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}

// user active status real time 

export const updateUserActiveStatus = async(userInfo) =>{

    try {
        const {data} = await client.post('/user/update-user-status',userInfo);
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}



export const serviceNowCablingRequest = async() =>{

    try {
        const {data} = await client.get('',{
            headers: {
                // Authorization: 'Bearer ' + token,
                accept: 'application/json', 
            },
            body: JSON.stringify('')
        });
        return data;
    } catch (error) {
        const {response} = error;
        if(response?.data) return response.data;
        return {error: error.message || error};
    }
}
